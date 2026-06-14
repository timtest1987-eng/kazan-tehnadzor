import json, os, subprocess

basedir = r"C:\Users\Тимур\Desktop\technadzor"

code = """export default {
  async fetch(request, env, context) {
    const { VK_GROUP_TOKEN, VK_OPERATOR_ID, VK_CONFIRMATION_CODE, VK_SECRET_KEY, MESSAGES } = env;
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
        const vkText = "[" + visitorId + "]\\n\\u2709\\ufe0f " + sender + "\\n\\n" + message;

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
        try {
          const raw = await MESSAGES.get("msg:" + visitorId);
          if (raw) messages = JSON.parse(raw);
        } catch (e) {}
        return new Response(JSON.stringify({ messages }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
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
              const match = replyText.match(/^\\[([a-f0-9\\-]{36})\\]/);
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
                      name: "\\u0421\\u043a\\u0440\\u0435\\u043f\\u044b\\u0447 \\ud83d\\udcce",
                      message: msg.text || "",
                      ts: Date.now(),
                    });
                    await MESSAGES.put("msg:" + visitorId, JSON.stringify(existing), { expirationTtl: 2592000 }).catch(() => {});
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
"""

with open(os.path.join(basedir, "worker.js"), "r", encoding="utf-8") as f:
    actual_code = f.read()

meta = json.dumps({
    "main_module": "worker.js",
    "bindings": [
        {"type": "kv_namespace", "name": "MESSAGES", "namespace_id": "44e44195a7f842d78b90a1f5e6da5d99"},
        {"type": "plain_text", "name": "VK_CONFIRMATION_CODE", "text": "d91f3462"}
    ]
})

boundary = "----Boundary" + os.urandom(4).hex()

parts = []
parts.append("--" + boundary)
parts.append('Content-Disposition: form-data; name="metadata"')
parts.append("Content-Type: application/json")
parts.append("")
parts.append(meta)
parts.append("--" + boundary)
parts.append('Content-Disposition: form-data; name="worker.js"; filename="worker.js"')
parts.append("Content-Type: application/javascript+module")
parts.append("")
parts.append(actual_code)
parts.append("--" + boundary + "--")
parts.append("")

body = "\r\n".join(parts)

payload_path = os.path.join(basedir, "payload2.bin")
with open(payload_path, "wb") as f:
    f.write(body.encode("utf-8"))

print("Boundary:", boundary)
print("Payload size:", len(body.encode("utf-8")), "bytes")

token = os.environ.get("CF_API_TOKEN")
url = "https://api.cloudflare.com/client/v4/accounts/136241a2c01bd02edd93628200fa28ca/workers/scripts/telegram-chat"

result = subprocess.run(
    ["curl.exe", "-s", "-X", "PUT", url,
     "-H", "Authorization: Bearer " + token,
     "-H", "Content-Type: multipart/form-data; boundary=" + boundary,
     "--data-binary", "@" + payload_path,
     "--connect-timeout", "30", "--max-time", "120"],
    capture_output=True, text=True, timeout=180
)
print("Deploy STDOUT:", result.stdout)
print("Deploy STDERR:", result.stderr)
