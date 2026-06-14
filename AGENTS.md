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

## Двусторонний чат (VK)
- Cloudflare Worker (`worker.js`) связывает виджет с VK API
- KV storage: `msg:<visitorId>` → [] (TTL 30 дней)
- Воркер отправляет сообщение посетителя оператору в VK (VK_GROUP_TOKEN → messages.send)
- Оператор отвечает через Reply к сообщению → VK Callback API → webhook → KV → widget polling (каждые 3 сек)
- Webhook возвращает VK_CONFIRMATION_CODE=d91f3462
- VK_SECRET_KEY=Emma2017 (для верификации webhook), VK_OPERATOR_ID=1020120

## Особенности деплоя
- Cloudflare API из РФ недоступен — деплой через API токен (переменная окружения `CF_API_TOKEN`)
- Secrets API не работает с этим токеном — секреты нужно добавлять через Dashboard или как `plain_text` binding
- `deploy_proper.py` — деплой воркера (читает worker.js, формирует multipart payload)
- `worker.js` — код воркера (ES modules, `export default { async fetch(request, env, context) }`)
- При изменении VK_CONFIRMATION_CODE: обновить в deploy_proper.py метаданные

## Деплой
```
python deploy_proper.py
```

## Инструменты в корне
- `worker.js` — код Cloudflare Worker
- `wrangler.toml` — конфиг Wrangler (KV namespace MESSAGES)
- `deploy_proper.py` — скрипт деплоя через API
- `test_worker.py` — тест health/send/messages
- `test_confirm.py` — тест webhook confirmation
- `gen_payload.py`, `test_deploy.py`, `set_secret.py` — вспомогательные скрипты

## Дальнейшие шаги
1. Подтвердить сервер в VK (Callback API → Подтвердить)
2. Проверить, что сообщения из виджета приходят в VK
3. Если нет — обновить VK_GROUP_TOKEN (через Dashboard или как plain_text binding в deploy_proper.py)
4. Запросить переобход в Яндекс.Вебмастер и Google Search Console
5. Сжать изображения в WebP
