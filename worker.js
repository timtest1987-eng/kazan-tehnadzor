// Cloudflare Worker — Telegram Chat Bridge
// Environment variables (secrets):
//   TELEGRAM_BOT_TOKEN — from @BotFather
//   TELEGRAM_CHAT_ID   — your Telegram user/group chat ID
// KV namespace: MESSAGES

async function sendTelegram(text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: parseInt(TELEGRAM_CHAT_ID, 10),
    text,
    parse_mode: "Markdown",
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

async function replyToTelegram(chatId, replyToMessageId, text) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const payload = {
    chat_id: chatId,
    text,
    reply_to_message_id: replyToMessageId,
    parse_mode: "Markdown",
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export default {
  async fetch(request, env) {
    const { MESSAGES, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = env;
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // ---------- CORS headers for widget ----------
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      // ---------- POST /api/send — widget sends a message ----------
      if (path === "/api/send" && method === "POST") {
        const { visitorId, message, name } = await request.json();
        if (!visitorId || !message) {
          return new Response(JSON.stringify({ error: "visitorId and message required" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const ts = Date.now();
        const msgKey = `msg:${visitorId}`;

        // Append message to KV
        let existing = [];
        try {
          const raw = await MESSAGES.get(msgKey);
          if (raw) existing = JSON.parse(raw);
        } catch {}

        const newMsg = { role: "visitor", name: name || "Клиент", message, ts };
        existing.push(newMsg);
        await MESSAGES.put(msgKey, JSON.stringify(existing), { expirationTtl: 2592000 });

        // Forward to Telegram
        const sender = name || "Клиент";
        const telRes = await sendTelegram(
          `✉️ *${sender}* (${visitorId.substring(0, 8)}…)\n\n${message}`
        );

        // Map Telegram message ID → visitorId
        if (telRes.ok) {
          const telMsgId = telRes.result.message_id;
          await MESSAGES.put(`map:${telMsgId}`, visitorId, { expirationTtl: 2592000 });
        }

        return new Response(JSON.stringify({ ok: true, telegram: telRes.ok }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // ---------- GET /api/messages?visitorId=xxx — widget polls ----------
      if (path === "/api/messages" && method === "GET") {
        const visitorId = url.searchParams.get("visitorId");
        if (!visitorId) {
          return new Response(JSON.stringify({ error: "visitorId required" }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        let messages = [];
        try {
          const raw = await MESSAGES.get(`msg:${visitorId}`);
          if (raw) messages = JSON.parse(raw);
        } catch {}

        return new Response(JSON.stringify({ messages }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // ---------- POST /api/telegram-webhook — Telegram replies ----------
      if (path === "/api/telegram-webhook" && method === "POST") {
        const body = await request.json();
        const msg = body.message;
        if (!msg || !msg.reply_to_message) {
          return new Response("ok", { status: 200 });
        }

        const repliedToId = msg.reply_to_message.message_id;
        const replyText = msg.text || msg.caption || "";

        // Look up visitorId via mapping
        const visitorId = await MESSAGES.get(`map:${repliedToId}`);
        if (!visitorId) {
          return new Response("ok", { status: 200 });
        }

        const msgKey = `msg:${visitorId}`;
        let existing = [];
        try {
          const raw = await MESSAGES.get(msgKey);
          if (raw) existing = JSON.parse(raw);
        } catch {}

        existing.push({
          role: "operator",
          name: "Скрепыч 📎",
          message: replyText,
          ts: Date.now(),
        });
        await MESSAGES.put(msgKey, JSON.stringify(existing), { expirationTtl: 2592000 });

        return new Response("ok", { status: 200 });
      }

      // ---------- 404 ----------
      return new Response(JSON.stringify({ error: "not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  },
};
