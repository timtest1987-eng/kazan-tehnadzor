// Cloudflare Worker — Telegram Chat Bridge
// KV namespace: MESSAGES
// Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

function sendTelegram(botToken, chatId, text) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: parseInt(chatId, 10), text, parse_mode: "Markdown" }),
  }).then(r => r.json());
}

function replyToTelegram(botToken, chatId, replyToMessageId, text) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, reply_to_message_id: replyToMessageId, parse_mode: "Markdown" }),
  }).then(r => r.json());
}

export default {
  async fetch(request, env, context) {
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

        // Forward to Telegram in background
        const sender = name || "Клиент";
        context.waitUntil(
          sendTelegram(
            TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID,
            `✉️ *${sender}* (${visitorId.substring(0, 8)}…)\n\n${message}`
          ).then(telRes => {
            // Map Telegram message ID → visitorId
            if (telRes.ok && telRes.result) {
              return MESSAGES.put(`map:${telRes.result.message_id}`, visitorId, { expirationTtl: 2592000 });
            }
          }).catch(() => {})
        );

        // Respond immediately
        return new Response(JSON.stringify({ ok: true }), {
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
