// Cloudflare Worker — Telegram Chat Bridge
// KV namespace: MESSAGES
// Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

export default {
  async fetch(request, env, context) {
    const { MESSAGES, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = env;
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

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

        let existing = [];
        try {
          const raw = await MESSAGES.get(msgKey);
          if (raw) existing = JSON.parse(raw);
        } catch {}

        const newMsg = { role: "visitor", name: name || "Клиент", message, ts };
        existing.push(newMsg);
        await MESSAGES.put(msgKey, JSON.stringify(existing), { expirationTtl: 2592000 });

        // Forward to Telegram — embed visitorId in the message itself
        // Format: [visitorId]\n✉️ *sender*\n\nmessage
        const sender = name || "Клиент";
        context.waitUntil(
          fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: parseInt(TELEGRAM_CHAT_ID, 10),
              text: `[${visitorId}]\n\u2709\ufe0f *${sender}*\n\n${message}`,
              parse_mode: "Markdown",
            }),
          }).catch(() => {})
        );

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
          const raw = await MESSAGES.get(`msg:${visitorId}`, { cacheTtl: 0 });
          if (raw) messages = JSON.parse(raw);
        } catch {}

        return new Response(JSON.stringify({ messages }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // ---------- POST /api/telegram-webhook — Telegram replies ----------
      if (path === "/api/telegram-webhook" && method === "POST") {
        const body = await request.json();
        const msg = body.message || body.edited_message;
        if (!msg || !msg.reply_to_message) {
          return new Response("ok", { status: 200 });
        }

        const replyText = msg.text || msg.caption || "";
        if (!replyText) {
          return new Response("ok", { status: 200 });
        }

        // Extract visitorId from the replied-to message text
        // Format: [uuid]\n✉️ *name*\n\nmessage
        const repliedText = msg.reply_to_message.text || msg.reply_to_message.caption || "";
        const match = repliedText.match(/^\[([a-f0-9\-]{36})\]/);
        if (!match) {
          return new Response("ok", { status: 200 });
        }
        const visitorId = match[1];

        const msgKey = `msg:${visitorId}`;
        let existing = [];
        try {
          const raw = await MESSAGES.get(msgKey);
          if (raw) existing = JSON.parse(raw);
        } catch {}

        existing.push({
          role: "operator",
          name: "\u0421\u043a\u0440\u0435\u043f\u044b\u0447 \ud83d\udcce",
          message: replyText,
          ts: Date.now(),
        });
        await MESSAGES.put(msgKey, JSON.stringify(existing), { expirationTtl: 2592000 });

        return new Response("ok", { status: 200 });
      }

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
