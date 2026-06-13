// Cloudflare Worker — VK Chat Bridge
// KV: MESSAGES, Secrets: VK_GROUP_TOKEN, VK_OPERATOR_ID, VK_CONFIRMATION_CODE, VK_SECRET_KEY

export default {
  async fetch(request, env, context) {
    const { MESSAGES, VK_GROUP_TOKEN, VK_OPERATOR_ID, VK_CONFIRMATION_CODE, VK_SECRET_KEY } = env;
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
      // GET /api/health
      if (path === "/api/health") {
        return new Response(JSON.stringify({ ok: true, t: Date.now() }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // POST /api/send — widget sends a message
      if (path === "/api/send" && method === "POST") {
        let visitorId = "", message = "", name = "";
        try {
          const body = await request.json();
          visitorId = body.visitorId || "";
          message = body.message || "";
          name = body.name || "";
        } catch (e) {
          return new Response(JSON.stringify({ ok: false, error: "bad json" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        if (!visitorId || !message) {
          return new Response(JSON.stringify({ ok: false, error: "visitorId and message required" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        context.waitUntil((async () => {
          try {
            let existing = [];
            try {
              const raw = await MESSAGES.get("msg:" + visitorId, { cacheTtl: 0 });
              if (raw) existing = JSON.parse(raw);
            } catch (e) {}
            existing.push({ role: "visitor", name: name || "Клиент", message, ts: Date.now() });
            await MESSAGES.put("msg:" + visitorId, JSON.stringify(existing), { expirationTtl: 2592000 }).catch(() => {});

            const sender = name || "Клиент";
            const vkText = "[" + visitorId + "]\n\u2709\ufe0f " + sender + "\n\n" + message;

            await fetch("https://api.vk.com/method/messages.send", {
              method: "POST",
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
              body: new URLSearchParams({
                access_token: VK_GROUP_TOKEN,
                user_id: VK_OPERATOR_ID,
                message: vkText,
                random_id: Math.floor(Math.random() * 1000000000),
                v: "5.199",
              }),
            });
          } catch (e) {}
        })());

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // GET /api/messages?visitorId=xxx — widget polls
      if (path === "/api/messages" && method === "GET") {
        const visitorId = url.searchParams.get("visitorId");
        if (!visitorId) {
          return new Response(JSON.stringify({ ok: false, error: "visitorId required" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        let messages = [];
        try {
          const raw = await MESSAGES.get("msg:" + visitorId, { cacheTtl: 0 });
          if (raw) messages = JSON.parse(raw);
        } catch (e) {}

        return new Response(JSON.stringify({ messages }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // POST /api/vk-webhook — VK Callback API (operator replies)
      if (path === "/api/vk-webhook" && method === "POST") {
        let body;
        try { body = await request.json(); } catch (e) { return new Response("ok", { status: 200 }); }

        // Confirmation
        if (body.type === "confirmation") {
          return new Response(VK_CONFIRMATION_CODE, { status: 200 });
        }

        // Verify secret
        if (VK_SECRET_KEY && body.secret !== VK_SECRET_KEY) {
          return new Response("ok", { status: 200 });
        }

        // Handle new message from operator
        if (body.type === "message_new") {
          const msg = body.object?.message;
          if (msg && msg.from_id && String(msg.from_id) === String(VK_OPERATOR_ID)) {
            const replyMsg = msg.reply_message;
            if (replyMsg) {
              const replyText = replyMsg.text || "";
              const match = replyText.match(/^\[([a-f0-9\-]{36})\]/);
              if (match) {
                const visitorId = match[1];
                let existing = [];
                try {
                  const raw = await MESSAGES.get("msg:" + visitorId, { cacheTtl: 0 });
                  if (raw) existing = JSON.parse(raw);
                } catch (e) {}

                existing.push({
                  role: "operator",
                  name: "\u0421\u043a\u0440\u0435\u043f\u044b\u0447 \ud83d\udcce",
                  message: msg.text || "",
                  ts: Date.now(),
                });

                await MESSAGES.put("msg:" + visitorId, JSON.stringify(existing), { expirationTtl: 2592000 }).catch(() => {});
              }
            }
          }
        }

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
