# Проект: Независимый технадзор (technadzorkazan.ru)

## Структура
- `index.html` — Главная
- `about.html` — О нас
- `brochure.html` — Что входит в сопровождение
- `legal.html` — Технадзор для юрлиц
- `physical.html` — Технадзор для физлиц
- `landing.html` — Дубликат главной (noindex)
- `chastnyj-zakazchik.html` — SEO «Частный заказчик»
- `yurlico.html` — SEO «Юрлицо»
- `who-needs.html` — Кому подходит услуга
- `services-and-prices.html` — Услуги и цены
- `losses.html` — Где теряют деньги
- `404.html` — Ошибка 404
- `robots.txt`, `sitemap.xml`, `CNAME`, `favicon.ico`, `favicon.png`, `brochure.pdf`

## Дизайн чата
- Кнопка 140×140px (90×90px mobile): скрепка + 2 дуги
  - Верхняя дуга: «Чат!» (читаемо)
  - Нижняя дуга: «Контакты не требуются» (читаемо, не перевёрнуто)
- Виджет: bottom: 195px (120px mobile), заголовок «Скрепыч 📎»
- Приветствие: «Привет! Сейчас единственный способ связаться — этот чат»

## Двусторонний чат (Telegram)
- Cloudflare Worker (`worker.js`) связывает виджет с Telegram Bot API
- KV storage: `msg:<visitorId>` → [] (TTL 30 дней), `map:<telegramMsgId>` → visitorId
- Owner отвечает в Telegram → webhook → KV → widget polling (каждые 3 сек)
- Для деплоя: wrangler deploy, установка секретов и webhook
- Пока не подключено — работает EmailJS (односторонне, как раньше)

## Инструменты в корне
- `worker.js` — код Cloudflare Worker
- `wrangler.toml` — конфиг Wrangler (KV namespace MESSAGES)
- `SETUP.md` — инструкция по развёртыванию Telegram-бота (во временной папке)

## Дальнейшие шаги
1. Развернуть Cloudflare Worker (wrangler deploy)
2. Создать бота (@BotFather), получить токен, установить webhook
3. Обновить inline-скрипт виджета на всех страницах — заменить EmailJS на fetch к Worker
4. Запросить переобход в Яндекс.Вебмастер и Google Search Console
5. Сжать изображения в WebP
