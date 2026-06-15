export default {
  async fetch(request, env, context) {
    const { VK_GROUP_TOKEN, VK_OPERATOR_ID, VK_CONFIRMATION_CODE, VK_SECRET_KEY, MESSAGES, ADMIN_KEY } = env;
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
      if (path === "/api/health") {
        return new Response(JSON.stringify({ ok: true, t: Date.now() }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

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

        const sender = name || "Клиент";
        const vkText = "[" + visitorId + "]\n\u2709\ufe0f " + sender + "\n\n" + message;

        context.waitUntil(fetch("https://api.vk.com/method/messages.send", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            access_token: VK_GROUP_TOKEN,
            user_id: VK_OPERATOR_ID,
            message: vkText,
            random_id: Math.floor(Math.random() * 1000000000),
            v: "5.199",
          }),
        }).catch(() => {}));

        context.waitUntil((async () => {
          try {
            let visitors = [];
            const raw = await MESSAGES.get("visitors:all");
            if (raw) visitors = JSON.parse(raw);
            if (!visitors.includes(visitorId)) visitors.push(visitorId);
            await MESSAGES.put("visitors:all", JSON.stringify(visitors), { expirationTtl: 2592000 });
          } catch (e) {}
        })());

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      if (path === "/api/messages" && method === "GET") {
        const visitorId = url.searchParams.get("visitorId");
        if (!visitorId) {
          return new Response(JSON.stringify({ ok: false, error: "visitorId required" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        let messages = [];
        let error = null;
        try {
          const resp = await fetch("https://api.vk.com/method/messages.getHistory?" + new URLSearchParams({
            access_token: VK_GROUP_TOKEN,
            peer_id: VK_OPERATOR_ID,
            count: "20",
            v: "5.199",
          }));
          const data = await resp.json();
          if (data.response && data.response.items) {
            const seen = new Set();
            for (const item of data.response.items) {
              if (item.from_id && String(item.from_id) === String(VK_OPERATOR_ID) && item.reply_message) {
                const replyText = item.reply_message.text || "";
                const match = replyText.match(/^\[([a-f0-9\-]{36})\]/);
                if (match && match[1] === visitorId) {
                  const ts = item.date * 1000;
                  if (!seen.has(ts)) {
                    seen.add(ts);
                    messages.push({
                      role: "operator",
                      name: "\u0421\u043a\u0440\u0435\u043f\u044b\u0447 \ud83d\udcce",
                      message: item.text || "",
                      ts: ts,
                    });
                  }
                }
              }
            }
            context.waitUntil((async () => {
              try { await MESSAGES.put("msg:" + visitorId, JSON.stringify(messages), { expirationTtl: 2592000 }); } catch (e) {}
            })());
          } else {
            error = "vk_api_error";
          }
        } catch (e) {
          error = e.message;
          try {
            const raw = await MESSAGES.get("msg:" + visitorId);
            if (raw) messages = JSON.parse(raw);
          } catch (e2) {}
        }
        return new Response(JSON.stringify({ messages }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      if (path === "/api/admin/sync" && method === "GET") {
        const auth = request.headers.get("Authorization") || "";
        if (!auth.startsWith("Bearer ") || auth.slice(7) !== ADMIN_KEY) {
          return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
            status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        let visitors = [];
        try {
          const raw = await MESSAGES.get("visitors:all");
          if (raw) visitors = JSON.parse(raw);
        } catch (e) {}
        const result = {};
        for (const vid of visitors) {
          try {
            const raw = await MESSAGES.get("msg:" + vid);
            if (raw) result[vid] = JSON.parse(raw);
          } catch (e) {}
        }
        return new Response(JSON.stringify({ visitors, messages: result }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      if (path === "/api/debug-vk") {
        try {
          const resp = await fetch("https://api.vk.com/method/messages.getHistory?" + new URLSearchParams({
            access_token: VK_GROUP_TOKEN,
            peer_id: VK_OPERATOR_ID,
            count: "20",
            v: "5.199",
          }));
          const data = await resp.json();
          let reported = "-";
          if (data.response && data.response.items) {
            const allVids = [];
            for (const item of data.response.items) {
              if (item.reply_message) {
                const t = item.reply_message.text || "";
                const m = t.match(/^\[([a-f0-9\-]{36})\]/);
                allVids.push({ vid: m ? m[1] : "NO_MATCH", from: item.from_id, text: (item.text || "").slice(0,20) });
              }
            }
            reported = JSON.stringify(allVids);
          }
          return new Response(JSON.stringify({
            tokenPrefix: (VK_GROUP_TOKEN || "").slice(0, 10) + "...",
            items: data.response ? data.response.items.length : 0,
            matches: reported,
          }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
        } catch (e) {
          return new Response(JSON.stringify({ error: e.message }), {
            status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
      }

      if (path === "/api/vk-webhook" && method === "POST") {
        let body;
        try { body = await request.json(); } catch (e) { return new Response("ok", { status: 200 }); }
        if (body.type === "confirmation") {
          return new Response(VK_CONFIRMATION_CODE, { status: 200 });
        }
        if (VK_SECRET_KEY && body.secret !== VK_SECRET_KEY) {
          return new Response("ok", { status: 200 });
        }
        if (body.type === "message_new") {
          const msg = body.object?.message;
          if (msg && msg.from_id && String(msg.from_id) === String(VK_OPERATOR_ID)) {
            const replyMsg = msg.reply_message;
            if (replyMsg) {
              const replyText = replyMsg.text || "";
              const match = replyText.match(/^\[([a-f0-9\-]{36})\]/);
              if (match) {
                const visitorId = match[1];
                context.waitUntil((async () => {
                  try {
                    let existing = [];
                    try {
                      const raw = await MESSAGES.get("msg:" + visitorId);
                      if (raw) existing = JSON.parse(raw);
                    } catch (e) {}
                    existing.push({
                      role: "operator",
                      name: "\u0421\u043a\u0440\u0435\u043f\u044b\u0447 \ud83d\udcce",
                      message: msg.text || "",
                      ts: Date.now(),
                    });
                    await MESSAGES.put("msg:" + visitorId, JSON.stringify(existing), { expirationTtl: 2592000 }).catch(() => {});
                    let visitors = [];
                    try {
                      const raw = await MESSAGES.get("visitors:all");
                      if (raw) visitors = JSON.parse(raw);
                    } catch (e) {}
                    if (!visitors.includes(visitorId)) visitors.push(visitorId);
                    await MESSAGES.put("visitors:all", JSON.stringify(visitors), { expirationTtl: 2592000 }).catch(() => {});
                  } catch (e) {}
                })());
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
