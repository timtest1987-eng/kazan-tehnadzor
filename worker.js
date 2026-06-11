// Cloudflare Worker — Telegram Chat Bridge
// KV namespace: MESSAGES (used only as backup, reads from memory)
// Secrets: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID

// In-memory message cache to avoid KV reads on every poll
const msgCache = new Map();

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
      // ---------- GET /api/health ----------
      if (path === "/api/health") {
        return new Response(JSON.stringify({ ok: true, t: Date.now() }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // ---------- POST /api/send — widget sends a message ----------
      if (path === "/api/send" && method === "POST") {
        let visitorId, message, name;
        try {
          const body = await request.json();
          visitorId = body.visitorId;
          message = body.message;
          name = body.name;
        } catch (e) {
          return new Response(JSON.stringify({ ok: false, error: "invalid json" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        if (!visitorId || !message) {
          return new Response(JSON.stringify({ ok: false, error: "visitorId and message required" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const ts = Date.now();

        // Load from memory cache
        let existing = msgCache.get(visitorId);
        if (!existing) {
          // Cold start — load from KV
          existing = [];
          try {
            const raw = await MESSAGES.get("msg:" + visitorId, { cacheTtl: 0 });
            if (raw) existing = JSON.parse(raw);
          } catch (e) {}
          msgCache.set(visitorId, existing);
        }

        const newMsg = { role: "visitor", name: name || "Клиент", message, ts };
        existing.push(newMsg);

        // Write to KV asynchronously (backup)
        context.waitUntil(
          MESSAGES.put("msg:" + visitorId, JSON.stringify(existing), { expirationTtl: 2592000 }).catch(() => {})
        );

        // Forward to Telegram in background
        const sender = name || "Клиент";
        const escapedMsg = message.replace(/[_*[\]()~`>#+\-=|{}.!]/g, "\\$&");
        context.waitUntil(
          fetch("https://api.telegram.org/bot" + TELEGRAM_BOT_TOKEN + "/sendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: parseInt(TELEGRAM_CHAT_ID, 10),
              text: "[" + visitorId + "]\n\u2709\ufe0f *" + sender + "*\n\n" + escapedMsg,
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
          return new Response(JSON.stringify({ ok: false, error: "visitorId required" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        // Serve from memory cache — no KV read
        let messages = msgCache.get(visitorId);
        if (!messages) {
          messages = [];
          // Cold start — try KV
          try {
            const raw = await MESSAGES.get("msg:" + visitorId, { cacheTtl: 0 });
            if (raw) messages = JSON.parse(raw);
          } catch (e) {}
          msgCache.set(visitorId, messages);
        }

        return new Response(JSON.stringify({ messages }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // ---------- POST /api/telegram-webhook — Telegram replies ----------
      if (path === "/api/telegram-webhook" && method === "POST") {
        let body;
        try {
          body = await request.json();
        } catch (e) {
          return new Response("ok", { status: 200 });
        }

        const msg = body.message || body.edited_message;
        if (!msg || !msg.reply_to_message) {
          return new Response("ok", { status: 200 });
        }

        const replyText = msg.text || msg.caption || "";
        if (!replyText) {
          return new Response("ok", { status: 200 });
        }

        const repliedText = msg.reply_to_message.text || msg.reply_to_message.caption || "";
        const match = repliedText.match(/^\[([a-f0-9\-]{36})\]/);
        if (!match) {
          return new Response("ok", { status: 200 });
        }
        const visitorId = match[1];

        // Update memory cache
        let existing = msgCache.get(visitorId);
        if (!existing) {
          existing = [];
          try {
            const raw = await MESSAGES.get("msg:" + visitorId, { cacheTtl: 0 });
            if (raw) existing = JSON.parse(raw);
          } catch (e) {}
          msgCache.set(visitorId, existing);
        }

        existing.push({
          role: "operator",
          name: "\u0421\u043a\u0440\u0435\u043f\u044b\u0447 \ud83d\udcce",
          message: replyText,
          ts: Date.now(),
        });

        // Persist to KV in background
        context.waitUntil(
          MESSAGES.put("msg:" + visitorId, JSON.stringify(existing), { expirationTtl: 2592000 }).catch(() => {})
        );

        return new Response("ok", { status: 200 });
      }

      return new Response(JSON.stringify({ ok: false, error: "not found" }), {
        status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ ok: false, error: err.message }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  },
};
