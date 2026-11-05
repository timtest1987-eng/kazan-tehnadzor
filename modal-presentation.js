/* =========================================================
   Modal presentation: "Строительный контроль"
   Shared behaviour + content for all pages.
   Existing Yandex.Metrika counter: 109291720
   ========================================================= */
(function () {
  'use strict';

  if (window.__mpPresentationLoaded) return;
  window.__mpPresentationLoaded = true;

  var METRIKA_ID = 109291720;
  var SESSION_KEY = 'mpPresentationShown';
  var EMAILJS_SRC = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  var EMAILJS_KEY = '-S1e762arpbUov2ic';
  var EMAILJS_SERVICE = 'service_c2yal7e';
  var EMAILJS_TEMPLATE = 'template_q3t7rj8';

  var MAX_URL = 'https://max.ru/u/f9LHodD0cOK3m6XT34Ff8gnfgXcbfCGvttJNKUN3tTNgbq5SEdkC0vqnHzw';

  var ICON = {
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
    worker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="3"/><path d="M6 21v-3a6 6 0 0 1 12 0v3"/><path d="M4 7h16"/></svg>',
    client: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="7" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/><path d="M9 12h6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5z"/><path d="M8.5 9.2c.3 2.8 2.5 5 5.3 5.3l1.1-1.4-1.8-1-.9.9c-1-.5-1.7-1.2-2.2-2.2l.9-.9-1-1.8z"/></svg>',
    tg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg>',
    max: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/><path d="M8 14V9l4 3 4-3v5"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H5l-2 2V12a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8z"/><path d="M8 10h8M8 14h5"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 10h2M13 10h2M9 14h2M13 14h2M10 21v-3h4v3"/></svg>'
  };

  function art(inner) {
    return '<svg class="mp-art" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' + inner + '</svg>';
  }

  var ART = {
    engineer: art(
      '<g stroke="#F8FAFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M18 222h284" opacity=".55"/>' +
        '<path d="M30 222v-8M60 222v-4M90 222v-8M120 222v-4M150 222v-8M180 222v-4M210 222v-8M240 222v-4M270 222v-8M300 222v-4" opacity=".3"/>' +
        '<path d="M178 222V84h112v138" opacity=".85"/>' +
        '<path d="M178 120h112M178 158h112M178 196h112" opacity=".5"/>' +
        '<path d="M208 84v138M240 84v138M270 84v138" opacity=".38"/>' +
        '<circle cx="92" cy="110" r="12"/>' +
        '<path d="M78 110h28" opacity=".75"/>' +
        '<path d="M78 110c2-10 7-15 14-15s12 5 14 15" stroke="#D4A853"/>' +
        '<path d="M92 122v34M92 132l-16 12M92 134l15 8M92 156l-12 30M92 156l12 30"/>' +
        '<rect x="108" y="138" width="26" height="34" rx="3" stroke="#D4A853"/>' +
        '<path d="M114 148h14M114 155h14M114 162h9" stroke="#D4A853" opacity=".75"/>' +
        '<circle cx="246" cy="164" r="25" stroke="#D4A853"/>' +
        '<path d="M264 183l17 17" stroke="#D4A853" stroke-width="3"/>' +
        '<path d="M236 164l7 7 12-14"/>' +
      '</g>'
    ),
    risk: art(
      '<g stroke="#F8FAFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M22 224h276" opacity=".5"/>' +
        '<path d="M108 216h46v-30h46v-34h46v-36h48"/>' +
        '<path d="M108 216h46M154 186h46M200 152h46M246 116h48" opacity=".3"/>' +
        '<path d="M63 194l7-12 7 12z" stroke="#D4A853"/>' +
        '<path d="M117 164l7-12 7 12z" stroke="#D4A853"/>' +
        '<path d="M171 130l7-12 7 12z" stroke="#D4A853"/>' +
        '<path d="M225 94l7-12 7 12z" stroke="#D4A853"/>' +
        '<path d="M100 220c46-8 80-34 108-62 24-24 48-40 78-48" stroke="#D4A853" stroke-dasharray="4 6"/>' +
        '<path d="M278 104l12 6-4-13" stroke="#D4A853"/>' +
        '<path d="M58 138l24 9v18c0 17-10 27-24 34-14-7-24-17-24-34v-18z" stroke="#D4A853"/>' +
        '<path d="M47 164l8 8 15-17"/>' +
      '</g>'
    ),
    parties: art(
      '<g stroke="#F8FAFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="70" cy="88" r="15"/>' +
        '<path d="M46 150c0-16 11-27 24-27s24 11 24 27v14H46z"/>' +
        '<rect x="42" y="158" width="56" height="40" rx="5"/>' +
        '<path d="M58 158v-8h24v8" opacity=".6"/>' +
        '<circle cx="250" cy="88" r="15"/>' +
        '<path d="M226 150c0-16 11-27 24-27s24 11 24 27v14h-48z"/>' +
        '<path d="M224 78c4-10 12-15 26-15s22 5 26 15" stroke="#D4A853"/>' +
        '<path d="M250 158v38M250 168l-14 14M250 168l14 12"/>' +
        '<path d="M160 92l30 11v22c0 22-13 35-30 43-17-8-30-21-30-43v-22z" stroke="#D4A853"/>' +
        '<path d="M146 132l9 9 18-20"/>' +
        '<path d="M100 112h28M192 112h28" stroke-dasharray="4 5" opacity=".6"/>' +
        '<path d="M100 112l8-5v10zM220 112l-8-5v10z" fill="#F8FAFA" stroke="none" opacity=".6"/>' +
      '</g>'
    ),
    stages: art(
      '<g stroke="#F8FAFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle cx="160" cy="130" r="82" stroke-dasharray="4 6" opacity=".3"/>' +
        '<circle cx="160" cy="48" r="14" stroke="#D4A853"/>' +
        '<circle cx="231" cy="89" r="14" stroke="#D4A853"/>' +
        '<circle cx="231" cy="171" r="14" stroke="#D4A853"/>' +
        '<circle cx="160" cy="212" r="14" stroke="#D4A853"/>' +
        '<circle cx="89" cy="171" r="14" stroke="#D4A853"/>' +
        '<circle cx="89" cy="89" r="14" stroke="#D4A853"/>' +
        '<path d="M160 106l26 10v19c0 19-11 30-26 37-15-7-26-18-26-37v-19z"/>' +
        '<path d="M148 136l8 8 16-18" stroke="#D4A853" stroke-width="2.4"/>' +
      '</g>' +
      '<g fill="#F8FAFA" font-size="11" font-weight="700" text-anchor="middle">' +
        '<text x="160" y="52">1</text><text x="231" y="93">2</text><text x="231" y="175">3</text>' +
        '<text x="160" y="216">4</text><text x="89" y="175">5</text><text x="89" y="93">6</text>' +
      '</g>'
    ),
    hidden: art(
      '<g stroke="#F8FAFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="32" y="40" width="256" height="182" rx="8" opacity=".85"/>' +
        '<path d="M32 82h256M32 122h256M32 154h256M32 186h256" opacity=".5"/>' +
        '<path d="M40 46l24 30M62 46l24 30M84 46l24 30M106 46l24 30M128 46l24 30M150 46l24 30M172 46l24 30M194 46l24 30M216 46l24 30M238 46l24 30" opacity=".18"/>' +
        '<path d="M40 92h240M40 104h240M40 116h240" opacity=".4"/>' +
        '<path d="M56 82v40M80 82v40M104 82v40M128 82v40M152 82v40M176 82v40M200 82v40M224 82v40M248 82v40" opacity=".35"/>' +
        '<circle cx="72" cy="98" r="4" stroke="#D4A853"/><circle cx="120" cy="110" r="4" stroke="#D4A853"/><circle cx="168" cy="98" r="4" stroke="#D4A853"/><circle cx="216" cy="110" r="4" stroke="#D4A853"/>' +
        '<path d="M36 138c10-8 20-8 30 0s20 8 30 0 20-8 30 0 20 8 30 0 20-8 30 0 20 8 30 0 20-8 30 0" stroke="#D4A853"/>' +
        '<path d="M38 174l16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14 16 14 16-14" opacity=".65"/>' +
        '<circle cx="226" cy="102" r="15" stroke="#D4A853"/>' +
        '<circle cx="226" cy="102" r="7" stroke="#D4A853" opacity=".55"/>' +
        '<path d="M32 102h179" stroke="#D4A853" opacity=".4"/>' +
        '<circle cx="130" cy="102" r="23" opacity=".8"/>' +
        '<path d="M147 119l14 14" opacity=".8"/>' +
        '<path d="M130 92v-7M130 119v-7M120 102h-7M140 102h-7" opacity=".5"/>' +
      '</g>' +
      '<g fill="#D4A853" stroke="none">' +
        '<circle cx="130" cy="62" r="9"/><circle cx="130" cy="145" r="9"/><circle cx="254" cy="62" r="9"/>' +
      '</g>' +
      '<g fill="#0E3038" font-size="10" font-weight="800" text-anchor="middle">' +
        '<text x="130" y="66">1</text><text x="130" y="149">2</text><text x="254" y="66">3</text>' +
      '</g>' +
      '<g stroke="#D4A853" stroke-width="1.2" stroke-linecap="round" opacity=".7">' +
        '<path d="M130 71v12"/><path d="M130 154v9"/><path d="M254 71l-12 14"/>' +
      '</g>'
    ),
    norms: art(
      '<g stroke="#F8FAFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M160 32v46M136 46h48" opacity=".7"/>' +
        '<path d="M120 46l-14 26h28zM200 46l-14 26h28z" stroke="#D4A853"/>' +
        '<path d="M106 72h28M186 72h28" stroke="#D4A853" opacity=".65"/>' +
        '<path d="M160 78l-5 9h10z" fill="#D4A853" stroke="none"/>' +
        '<rect x="58" y="120" width="120" height="104" rx="6" transform="rotate(-6 118 172)" opacity=".35"/>' +
        '<rect x="74" y="114" width="120" height="104" rx="6" transform="rotate(-2 134 166)" opacity=".6"/>' +
        '<rect x="90" y="108" width="120" height="104" rx="6"/>' +
        '<path d="M106 130h74M106 144h74M106 158h54M106 172h66M106 186h44" opacity=".5"/>' +
        '<path d="M236 138l30 11v24c0 22-13 36-30 44-17-8-30-22-30-44v-24z" stroke="#D4A853"/>' +
        '<path d="M220 180l10 10 19-22" stroke-width="2.4"/>' +
        '<path d="M246 58h14v46h-14z" opacity=".3"/>' +
      '</g>'
    ),
    finance: art(
      '<g stroke="#F8FAFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M42 216h254M42 216V44" opacity=".55"/>' +
        '<path d="M288 210l8 6-8 6M36 52l6-8 6 8" opacity=".55"/>' +
        '<path d="M52 202c44 0 58-22 88-40s50-38 78-62 42-34 58-38v154H52z" fill="rgba(212,168,83,.12)" stroke="none"/>' +
        '<path d="M52 202c44 0 58-22 88-40s50-38 78-62 42-34 58-38" stroke="#D4A853" stroke-width="2.2"/>' +
        '<path d="M150 210V96" stroke-dasharray="4 6" opacity=".65"/>' +
        '<path d="M150 84l22 8v18c0 16-9 26-22 32-13-6-22-16-22-32V92z"/>' +
        '<path d="M140 104l7 7 13-15" stroke="#D4A853" stroke-width="2.2"/>' +
        '<ellipse cx="236" cy="198" rx="20" ry="7" stroke="#D4A853"/>' +
        '<path d="M216 198v-9c0 4 9 7 20 7s20-3 20-7v9M216 189c0 4 9 7 20 7s20-3 20-7" stroke="#D4A853"/>' +
        '<ellipse cx="270" cy="198" rx="16" ry="6" stroke="#D4A853"/>' +
        '<path d="M254 198v-7c0 3 7 6 16 6s16-3 16-6v7" stroke="#D4A853"/>' +
      '</g>'
    ),
    contact: art(
      '<g stroke="#F8FAFA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M22 224h276" opacity=".5"/>' +
        '<path d="M46 224V92h96v132"/>' +
        '<path d="M46 124h96M46 156h96M46 188h96" opacity=".4"/>' +
        '<path d="M66 92v132M88 92v132M110 92v132M132 92v132" opacity=".28"/>' +
        '<path d="M70 108h8v8h-8zM102 108h8v8h-8zM124 108h8v8h-8zM70 140h8v8h-8zM102 140h8v8h-8zM124 140h8v8h-8z" fill="#F8FAFA" stroke="none" opacity=".4"/>' +
        '<path d="M186 84l38 14v30c0 27-16 44-38 54-22-10-38-27-38-54v-30z" stroke="#D4A853"/>' +
        '<path d="M168 128l13 13 24-28" stroke-width="2.6"/>' +
        '<path d="M252 146c-8-8-18-10-24-4l-7 7c-2 2-2 6 0 9l24 24c3 2 7 2 9 0l7-7c6-6 4-16-4-24z"/>' +
        '<path d="M244 150l-9 9" opacity=".5"/>' +
        '<path d="M258 118c8 4 14 10 18 18M266 104c14 7 24 18 30 32" stroke="#D4A853" opacity=".85"/>' +
        '<path d="M250 190h34a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8h-20l-10 8v-8h-4a8 8 0 0 1-8-8v-12a8 8 0 0 1 8-8z" opacity=".72"/>' +
      '</g>' +
      '<g fill="#D4A853" stroke="none">' +
        '<circle cx="258" cy="204" r="2.4"/><circle cx="270" cy="204" r="2.4"/><circle cx="282" cy="204" r="2.4"/>' +
      '</g>'
    )
  };

  var SLIDES = [
    {
      nav: 'Зачем нужен строительный контроль',
      kicker: '01 · Зачем нужен контроль',
      title: 'Строительный контроль — защита ваших денег, качества и безопасности объекта',
      lead: 'Ошибки на стройке легче предупредить, чем исправлять после завершения работ.',
      body:
        '<ul class="mp-points">' +
          '<li class="mp-point"><b>Своевременное выявление нарушений</b><span>Проверяем работы на каждом этапе — пока ошибку можно исправить без демонтажа и лишних затрат.</span></li>' +
          '<li class="mp-point"><b>Качество работ и материалов</b><span>Контролируем соответствие проектной и рабочей документации, техническим регламентам и результатам инженерных изысканий.</span></li>' +
          '<li class="mp-point"><b>Безопасность объекта</b><span>Следим за строительными конструкциями и инженерными сетями, от которых зависят надёжность и безопасность эксплуатации.</span></li>' +
        '</ul>',
      caption: 'Инженер строительного контроля работает на объекте, а не только с документами.',
      art: ART.engineer,
      detailsTitle: 'Читать полное пояснение',
      details:
        '<h4>В каком случае требуется Строительный Контроль?</h4>' +
        '<p class="mp-doc-src">(Статья 53 Градостроительный Кодекс РФ Строительный контроль)</p>' +
        '<p>Строительный контроль — обязательное и важнейшее мероприятие, обеспечивающее качество, надежность и безопасность объектов капитального строительства. Его необходимость закреплена законодательно в статье 53 Градостроительного кодекса Российской Федерации (ГрК РФ).</p>' +
        '<p>Согласно ст. 53 ГрК РФ, строительный контроль проводится для проверки соответствия выполняемых работ проектной и рабочей документации, техническим регламентам и результатам инженерных изысканий. Особое внимание уделяется контролю скрытых работ, строительных конструкций и инженерных сетей, поскольку своевременное выявление нарушений позволяет избежать серьезных дефектов, дополнительных затрат на их устранение и угроз безопасности объекта.</p>' +
        '<p>Таким образом, строительный контроль — это не просто формальное соблюдение законодательных требований, а необходимый инструмент предупреждения строительных ошибок, защиты интересов заказчика и обеспечения надлежащего качества и безопасности возводимого объекта.</p>'
    },
    {
      nav: 'От каких проблем защищает',
      kicker: '02 · Риски',
      title: 'От каких проблем защищает строительный контроль?',
      lead: 'Своевременный контроль закрывает типичные сценарии, из-за которых стройка дорожает и теряет качество.',
      body:
        '<ul class="mp-risks">' +
          '<li>некачественные строительные материалы</li>' +
          '<li>нарушения строительных технологий</li>' +
          '<li>отклонения от проектной документации</li>' +
          '<li>завышение объёмов выполненных работ</li>' +
          '<li>скрытые дефекты</li>' +
          '<li>дополнительные расходы на устранение ошибок</li>' +
          '<li>проблемы при приёмке и эксплуатации объекта</li>' +
        '</ul>' +
        '<p class="mp-callout">Наша задача — выявить проблему до того, как её устранение потребует дополнительных затрат.</p>',
      caption: 'Чем позже выявлено нарушение, тем дороже и сложнее его исправлять.',
      art: ART.risk,
      detailsTitle: 'Читать полное пояснение',
      details:
        '<p>Особую роль строительный контроль играет в защите финансовых и имущественных интересов заказчика. Своевременное выявление отклонений от проектной документации, применение некачественных материалов, нарушение строительных технологий и ненадлежащее выполнение работ позволяют предотвратить появление дефектов, дополнительные расходы на их устранение и возможные проблемы при приемке и дальнейшей эксплуатации объекта.</p>'
    },
    {
      nav: 'Кто осуществляет контроль',
      kicker: '03 · Кто отвечает',
      title: 'Кто должен осуществлять строительный контроль?',
      lead: 'Контроль осуществляется двумя сторонами — и у каждой своя зона ответственности.',
      body:
        '<div class="mp-parties">' +
          '<div class="mp-party">' +
            '<span class="mp-party-ico">' + ICON.worker + '</span>' +
            '<b>Подрядчик</b>' +
            '<p>Контролирует качество собственных работ, материалов, соблюдение технологий и требований проектной документации.</p>' +
          '</div>' +
          '<div class="mp-party mp-party--accent">' +
            '<span class="mp-party-ico">' + ICON.client + '</span>' +
            '<b>Заказчик (застройщик)</b>' +
            '<p>Осуществляет независимую проверку полноты и качества строительного контроля подрядчика, соответствие работ проектной документации и установленным требованиям.</p>' +
          '</div>' +
        '</div>' +
        '<p class="mp-callout">Заказчику важно иметь профессиональное представительство своих интересов: независимый инженер проверяет фактическое качество на объекте, а не отчётность подрядчика.</p>',
      caption: 'Независимый контроль — это представительство интересов заказчика на стройке.',
      art: ART.parties,
      detailsTitle: 'Читать полное пояснение',
      details:
        '<h4>Кто проводит строительный контроль?</h4>' +
        '<p class="mp-doc-src">(Постановление Правительства РФ от 21.06.2010 № 468 «О порядке проведения строительного контроля при осуществлении строительства, реконструкции и капитального ремонта объектов капитального строительства»)</p>' +
        '<p>Контроль осуществляется двумя сторонами:</p>' +
        '<ul>' +
          '<li><strong>Подрядчиком</strong> — контролирует качество выполняемых им работ, материалов и соблюдение строительных технологий. Контролирует качество собственных работ, материалов, соблюдение технологий и требований проектной документации</li>' +
          '<li><strong>Заказчиком (застройщиком)</strong> — проверяет качество и полноту контроля со стороны подрядчика, соответствие работ проектной документации и соблюдение установленных требований. Осуществляет независимую проверку полноты и качества строительного контроля подрядчика.</li>' +
        '</ul>'
    },
    {
      nav: 'Что именно проверяет контроль',
      kicker: '04 · Что проверяем',
      title: 'Что именно проверяет строительный контроль?',
      lead: 'Шесть обязательных направлений проверки — от поступления материалов до итоговой приёмки.',
      tall: true,
      body:
        '<ul class="mp-stages">' +
          '<li class="mp-stage"><span class="mp-stage-num">1</span><b>Входной контроль</b><span>Проверка качества поступающих строительных материалов, изделий, конструкций и оборудования, а также сопроводительной документации.</span></li>' +
          '<li class="mp-stage"><span class="mp-stage-num">2</span><b>Контроль хранения материалов</b><span>Проверка соблюдения правил складирования и хранения строительной продукции.</span></li>' +
          '<li class="mp-stage"><span class="mp-stage-num">3</span><b>Операционный контроль</b><span>Проверка соблюдения последовательности и технологии выполнения строительных работ.</span></li>' +
          '<li class="mp-stage"><span class="mp-stage-num">4</span><b>Контроль скрытых работ</b><span>Освидетельствование работ, которые впоследствии будут закрыты другими конструкциями или отделочными материалами.</span></li>' +
          '<li class="mp-stage"><span class="mp-stage-num">5</span><b>Промежуточная приемка</b><span>Проверка строительных конструкций и инженерных сетей, влияющих на безопасность объекта.</span></li>' +
          '<li class="mp-stage"><span class="mp-stage-num">6</span><b>Итоговый контроль</b><span>Проверка соответствия законченного строительством объекта проектной документации и установленным требованиям.</span></li>' +
        '</ul>',
      caption: 'Маршрут контроля: материалы → технологии → скрытые работы → приёмка.',
      art: ART.stages,
      detailsTitle: 'Читать полное пояснение',
      details:
        '<h4>Какие мероприятия включает строительный контроль?</h4>' +
        '<p class="mp-doc-src">(Постановление Правительства РФ от 21.06.2010 № 468 «О порядке проведения строительного контроля при осуществлении строительства, реконструкции и капитального ремонта объектов капитального строительства»; СП 543.1325800.2024 (утверждён Приказом Минстроя России от 27.12.2024 № 950/пр и введён в действие 28 января 2025 года.))</p>' +
        '<p>Постановление предусматривает несколько обязательных направлений проверки:</p>' +
        '<ul>' +
          '<li><strong>Входной контроль</strong> — проверка качества поступающих строительных материалов, изделий, конструкций и оборудования, а также сопроводительной документации.</li>' +
          '<li><strong>Контроль хранения материалов</strong> — проверка соблюдения правил складирования и хранения строительной продукции.</li>' +
          '<li><strong>Операционный контроль</strong> — проверка соблюдения последовательности и технологии выполнения строительных работ.</li>' +
          '<li><strong>Контроль скрытых работ</strong> — освидетельствование работ, которые впоследствии будут закрыты другими конструкциями или отделочными материалами.</li>' +
          '<li><strong>Промежуточная приемка</strong> — проверка строительных конструкций и инженерных сетей, влияющих на безопасность объекта.</li>' +
          '<li><strong>Итоговый контроль</strong> — проверка соответствия законченного строительством объекта проектной документации и установленным требованиям.</li>' +
        '</ul>'
    },
    {
      nav: 'Контроль скрытых работ',
      kicker: '05 · Скрытые работы',
      title: 'Почему особенно важен контроль скрытых работ?',
      lead: 'После закрытия конструкций многие нарушения становятся недоступны для визуальной проверки без демонтажа или повреждения других элементов.',
      body:
        '<p class="mp-lead mp-lead--sub">Строительный контроль предусматривает освидетельствование:</p>' +
        '<ul class="mp-checks">' +
          '<li><b>Скрытых работ</b><span>узлов и элементов, которые будут закрыты следующими конструкциями или отделкой.</span></li>' +
          '<li><b>Ответственных конструкций</b><span>несущих элементов, влияющих на безопасность объекта.</span></li>' +
          '<li><b>Участков инженерных сетей</b><span>трубопроводов, кабельных трасс, систем отопления и вентиляции.</span></li>' +
          '<li><b>Смонтированного оборудования</b><span>инженерного оборудования до запуска и закрытия отделкой.</span></li>' +
        '</ul>' +
        '<p class="mp-callout">Проверить качество до того, как работа станет скрытой, значительно проще и экономически выгоднее, чем исправлять дефекты после завершения строительства.</p>',
      caption: '1 — армирование, 2 — гидроизоляция, 3 — инженерные сети.',
      art: ART.hidden,
      detailsTitle: 'Подробнее о нормативных требованиях',
      details:
        '<h4>Контроль скрытых работ и ответственных конструкций</h4>' +
        '<p>Особое внимание уделяется работам, результаты которых впоследствии становятся недоступными для проверки без демонтажа или повреждения других конструкций.</p>' +
        '<p>СП предусматривает освидетельствование:</p>' +
        '<ul>' +
          '<li>скрытых работ;</li>' +
          '<li>ответственных строительных конструкций;</li>' +
          '<li>участков инженерных сетей;</li>' +
          '<li>смонтированного инженерного оборудования.</li>' +
        '</ul>'
    },
    {
      nav: 'Нормативная база',
      kicker: '06 · Нормативная база',
      title: 'Строительный контроль — это нормативное требование',
      lead: 'Это не добровольная дополнительная услуга, а регламентированный законом процесс.',
      tall: true,
      body:
        '<p class="mp-callout" style="margin-top:0;">Строительный контроль обязателен по ст. 53 ГрК РФ. Порядок проведения установлен Постановлением Правительства РФ № 468, детальные требования — СП 543.1325800.2024 и СП 48.13330.2019.</p>' +
        '<ul class="mp-docs">' +
          '<li>' + ICON.doc + '<span><b>Статья 53 ГрК РФ</b> — строительный контроль</span></li>' +
          '<li>' + ICON.doc + '<span><b>Постановление Правительства РФ № 468</b> — порядок проведения контроля</span></li>' +
          '<li>' + ICON.doc + '<span><b>СП 543.1325800.2024</b> — организация и проведение контрольных мероприятий</span></li>' +
          '<li>' + ICON.doc + '<span><b>СП 48.13330.2019</b> — организация строительства</span></li>' +
          '<li>' + ICON.doc + '<span><b>Федеральный закон № 384-ФЗ</b> — безопасность зданий и сооружений</span></li>' +
          '<li>' + ICON.doc + '<span><b>Федеральный закон № 123-ФЗ</b> — требования пожарной безопасности</span></li>' +
          '<li>' + ICON.doc + '<span><b>Приказ Минстроя России № 344/пр</b> — исполнительная документация</span></li>' +
          '<li>' + ICON.doc + '<span><b>Приказ Минстроя России № 1026/пр</b> — общий журнал работ</span></li>' +
          '<li>' + ICON.doc + '<span><b>Статья 55.5-1 ГрК РФ</b> — требования к специалистам</span></li>' +
          '<li>' + ICON.doc + '<span><b>Профстандарт</b> «Специалист строительного контроля»</span></li>' +
        '</ul>' +
        '<div class="mp-vs">' +
          '<div><b>Строительный контроль</b><span>Участники строительства: застройщик, технический заказчик, подрядчик, а при необходимости — специализированная организация.</span></div>' +
          '<div><b>Государственный строительный надзор</b><span>Уполномоченные органы в соответствии со статьёй 54 ГрК РФ.</span></div>' +
        '</div>',
      caption: 'Нормативная основа: ГрК РФ, Постановление № 468, СП и профильные приказы.',
      art: ART.norms,
      detailsTitle: 'Подробнее о нормативных требованиях',
      details:
        '<p>Таким образом, строительный контроль в Российской Федерации является не добровольной дополнительной услугой, а нормативно регламентированным процессом. Его проведение предусмотрено ст. 53 Градостроительного кодекса РФ, а непосредственный порядок реализации установлен Постановлением Правительства РФ № 468. Соблюдение данных требований позволяет обеспечить системную проверку качества строительства на всех этапах — от поступления материалов на объект до приемки завершенных работ.</p>' +
        '<p>При этом нормативное регулирование строительного контроля не ограничивается только Градостроительным кодексом и Постановлением № 468. Важное место занимает СП 543.1325800.2024, который устанавливает требования к организации и проведению контрольных мероприятий, включая входной, операционный, приемочный и лабораторный контроль, проверку строительных конструкций, инженерных систем и оформление результатов проверок.</p>' +
        '<p>Дополнительно необходимо учитывать СП 48.13330.2019 «Организация строительства», Федеральные законы № 384-ФЗ «Технический регламент о безопасности зданий и сооружений» и № 123-ФЗ «Технический регламент о требованиях пожарной безопасности», а также профильные своды правил и ГОСТы, регулирующие качество отдельных видов строительных работ и конструкций.</p>' +
        '<p>Отдельное значение имеет правильное ведение исполнительной документации. Приказ Минстроя России от 16.05.2023 № 344/пр устанавливает требования к ее составу и порядку ведения. В свою очередь, Приказ Минстроя России от 02.12.2022 № 1026/пр регламентирует форму и порядок ведения общего журнала работ. Именно исполнительная документация позволяет подтвердить фактическое выполнение работ, результаты освидетельствований, испытаний и проверок, а также проследить соответствие построенного объекта проектным решениям.</p>' +
        '<p>Не менее важным условием эффективного строительного контроля является квалификация специалистов, которые его осуществляют. Требования к специалистам по организации строительства установлены статьей 55.5-1 Градостроительного кодекса РФ. При этом профессиональные функции инженеров строительного контроля определяются с учетом профессионального стандарта «Специалист строительного контроля», утвержденного Приказом Минтруда России от 29.10.2020 № 760н. Наличие необходимых знаний, образования, опыта и квалификации позволяет специалистам своевременно выявлять нарушения и принимать обоснованные технические решения.</p>' +
        '<p>Следует также понимать, что строительный контроль и государственный строительный надзор — это разные механизмы обеспечения безопасности строительства. Строительный контроль осуществляется участниками строительного процесса, в том числе застройщиком, техническим заказчиком и подрядчиком, а в предусмотренных законодательством случаях — привлекаемыми специализированными организациями. Государственный строительный надзор, в свою очередь, осуществляется уполномоченными органами в соответствии со статьей 54 Градостроительного кодекса РФ.</p>'
    },
    {
      nav: 'Финансовые интересы',
      kicker: '07 · Финансовая защита',
      title: 'Строительный контроль защищает ваши финансовые интересы',
      lead: 'Лучше обнаружить нарушение сегодня, чем оплачивать его исправление завтра.',
      body:
        '<ul class="mp-benefits">' +
          '<li>предотвращение строительных дефектов</li>' +
          '<li>выявление некачественных материалов</li>' +
          '<li>проверка соответствия проектным решениям</li>' +
          '<li>предупреждение необоснованных расходов</li>' +
          '<li>контроль объёмов и качества работ</li>' +
          '<li>снижение рисков при приёмке объекта</li>' +
          '<li>обеспечение надлежащего качества и безопасности строительства</li>' +
        '</ul>',
      caption: 'Контроль вмешивается в момент, когда исправление ещё не требует демонтажа.',
      art: ART.finance,
      detailsTitle: 'Читать полное пояснение',
      details:
        '<p>Особую роль строительный контроль играет в защите финансовых и имущественных интересов заказчика. Своевременное выявление отклонений от проектной документации, применение некачественных материалов, нарушение строительных технологий и ненадлежащее выполнение работ позволяют предотвратить появление дефектов, дополнительные расходы на их устранение и возможные проблемы при приемке и дальнейшей эксплуатации объекта.</p>' +
        '<p>При этом ответственность за ненадлежащее выполнение обязательств может наступать не только для подрядчика, но и для организации, оказывающей услуги строительного контроля, в пределах ее договорных и установленных законом обязанностей. В этой связи особое значение приобретают положения Гражданского кодекса РФ, регулирующие качество работ и услуг, исполнение договорных обязательств и возмещение причиненных убытков.</p>' +
        '<p>Таким образом, строительный контроль следует рассматривать как комплексную систему технических, организационных и документальных мероприятий, направленных на обеспечение качества, надежности и безопасности объектов капитального строительства.</p>'
    },
    {
      nav: 'Доверьте контроль профессионалам',
      kicker: '08 · Контакты',
      title: 'Ваш объект заслуживает профессионального контроля',
      lead: 'Мы осуществляем независимый строительный контроль в интересах заказчика. Помогаем выявлять нарушения, проверять качество работ, контролировать подрядчиков и защищать ваши финансовые интересы.',
      tall: true,
      body:
        '<div class="mp-client-types">' +
          '<span>' + ICON.user + ' Частные заказчики</span>' +
          '<span>' + ICON.building + ' Юридические лица</span>' +
        '</div>' +
        '<div class="mp-contact-rows">' +
          '<a class="mp-contact-row" href="tel:+79053198257" data-mp-contact="phone"><small>Телефон</small><b>+7 (905) 319-82-57</b></a>' +
          '<a class="mp-contact-row" href="mailto:info@technadzorkazan.ru" data-mp-contact="email"><small>E-mail</small><b>info@technadzorkazan.ru</b></a>' +
        '</div>' +
        '<div class="mp-contact-grid">' +
          '<a class="mp-contact" href="tel:+79053198257" data-mp-contact="phone">' + ICON.phone + ' Позвонить</a>' +
          '<a class="mp-contact mp-contact--wa" href="https://wa.me/79053198257" target="_blank" rel="noopener" data-mp-contact="whatsapp">' + ICON.wa + ' WhatsApp</a>' +
          '<a class="mp-contact mp-contact--tg" href="https://t.me/+79053198257" target="_blank" rel="noopener" data-mp-contact="telegram">' + ICON.tg + ' Telegram</a>' +
          '<a class="mp-contact mp-contact--max" href="' + MAX_URL + '" target="_blank" rel="noopener" data-mp-contact="max">' + ICON.max + ' Max</a>' +
        '</div>' +
        '<button type="button" class="mp-consult" id="mpConsultBtn" aria-expanded="false" aria-controls="mpConsultWrap">' + ICON.chat + ' Получить консультацию</button>' +
        '<div class="mp-consult-wrap" id="mpConsultWrap" hidden>' +
          '<p class="mp-consult-title">Оставьте контакты — инженер свяжется с вами</p>' +
          '<p class="mp-consult-note">Коротко опишите объект и задачу. Это поможет подготовиться к разговору.</p>' +
          '<form class="mp-form" id="mpRequestForm">' +
            '<input type="text" name="mpName" id="mpName" placeholder="Ваше имя" required autocomplete="name">' +
            '<input type="tel" name="mpPhone" id="mpPhone" placeholder="+7 (900) 000-00-00" required autocomplete="tel" inputmode="tel">' +
            '<input type="email" name="mpEmail" id="mpEmail" placeholder="E-mail" required autocomplete="email">' +
            '<textarea name="mpDescription" id="mpDescription" placeholder="Краткое описание задачи" rows="3" required></textarea>' +
            '<button type="submit" id="mpSubmitBtn">Отправить</button>' +
            '<p class="mp-form-status" id="mpFormStatus" role="status" aria-live="polite"></p>' +
          '</form>' +
        '</div>',
      caption: 'Работаем с физическими и юридическими лицами в Казани и Республике Татарстан.',
      art: ART.contact,
      detailsTitle: 'Читать полное пояснение',
      details:
        '<p>Его главная задача — не просто зафиксировать допущенные нарушения, а предупредить их возникновение, обеспечить соблюдение проектных решений и нормативных требований, защитить интересы заказчика и создать условия для безопасной эксплуатации построенного объекта.</p>' +
        '<p>Именно поэтому профессионально организованный строительный контроль является одним из важнейших условий успешной реализации любого строительного проекта.</p>'
    }
  ];

  var CURRENT = 0;
  var LAST_FOCUS = null;
  var REFS = {};
  var TOUCH = { x: 0, y: 0, active: false };

  function goal(name, params) {
    try {
      if (typeof window.ym === 'function') {
        window.ym(METRIKA_ID, 'reachGoal', name, params || {});
      }
    } catch (e) {
      /* analytics must never break the interface */
    }
  }

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function buildModal() {
    var slidesHTML = SLIDES.map(function (s, i) {
      var articleClass = 'mp-slide' + (s.tall ? ' mp-slide--tall' : '') + (i === 0 ? ' is-active' : '');
      var hidden = i === 0 ? 'false' : 'true';
      var inert = i === 0 ? '' : ' inert';
      return (
        '<article class="' + articleClass + '" data-index="' + i + '" role="group" aria-roledescription="слайд" aria-label="' + (i + 1) + ' из ' + SLIDES.length + ': ' + s.nav + '" aria-hidden="' + hidden + '"' + inert + '>' +
          '<div class="mp-slide-inner">' +
            '<div class="mp-content">' +
              '<div class="mp-kicker mp-anim" style="--d:0ms">' + s.kicker + '</div>' +
              '<h2 class="mp-title mp-anim" style="--d:40ms" id="mpTitle-' + i + '">' + s.title + '</h2>' +
              '<p class="mp-lead mp-anim" style="--d:80ms">' + s.lead + '</p>' +
              '<div class="mp-body mp-anim" style="--d:120ms">' + s.body + '</div>' +
              '<details class="mp-details mp-anim" style="--d:170ms">' +
                '<summary>' + s.detailsTitle + '</summary>' +
                '<div class="mp-doc">' + s.details + '</div>' +
              '</details>' +
            '</div>' +
            '<aside class="mp-visual mp-anim" style="--d:100ms" aria-hidden="true">' +
              '<span class="mp-visual-num">' + pad(i + 1) + '</span>' +
              s.art +
              '<p class="mp-visual-cap">' + s.caption + '</p>' +
            '</aside>' +
          '</div>' +
        '</article>'
      );
    }).join('');

    var dotsHTML = SLIDES.map(function (s, i) {
      return '<button type="button" class="mp-dot" data-mp-dot="' + i + '" aria-label="Перейти к слайду ' + (i + 1) + ': ' + s.nav + '"' + (i === 0 ? ' aria-current="true"' : '') + '></button>';
    }).join('');

    return (
      '<div id="requestModal" class="mp-overlay" role="dialog" aria-modal="true" aria-label="Строительный контроль: краткая презентация" aria-hidden="true">' +
        '<div class="mp-backdrop" data-mp-close></div>' +
        '<div class="mp-shell" role="document">' +
          '<header class="mp-bar">' +
            '<div class="mp-brand">' +
              '<svg class="mp-brand-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">' +
                '<path d="M16 2l12 4v9c0 8-5 12-12 15C9 27 4 23 4 15V6z" fill="rgba(212,168,83,.16)" stroke="#D4A853" stroke-width="1.6"/>' +
                '<path d="M10 16l4 4 8-9" stroke="#F8FAFA" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
              '</svg>' +
              '<span>Независимый технадзор</span>' +
              '<span class="mp-brand-sep" aria-hidden="true"></span>' +
              '<span class="mp-brand-sub">строительный контроль</span>' +
            '</div>' +
            '<button type="button" class="mp-close" data-mp-close aria-label="Закрыть презентацию">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
            '</button>' +
          '</header>' +
          '<div class="mp-progress" aria-hidden="true"><span class="mp-progress-fill" id="mpProgressFill"></span></div>' +
          '<div class="mp-viewport" id="mpViewport">' +
            '<h2 class="mp-sr-only">Строительный контроль — краткая презентация</h2>' +
            '<div class="mp-track" id="mpTrack" style="--mp-index:0">' + slidesHTML + '</div>' +
          '</div>' +
          '<footer class="mp-nav">' +
            '<button type="button" class="mp-navbtn mp-prev" id="mpPrev" aria-label="Предыдущий слайд">' +
              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg> Назад' +
            '</button>' +
            '<div class="mp-dots" id="mpDots" role="group" aria-label="Слайды презентации">' + dotsHTML + '</div>' +
            '<span class="mp-counter" id="mpCounter" aria-live="polite">01 / ' + pad(SLIDES.length) + '</span>' +
            '<button type="button" class="mp-navbtn mp-next" id="mpNext" aria-label="Следующий слайд">' +
              'Далее <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>' +
            '</button>' +
          '</footer>' +
        '</div>' +
      '</div>'
    );
  }

  function goTo(index, options) {
    options = options || {};
    var total = SLIDES.length;
    index = Math.max(0, Math.min(total - 1, index));
    if (index === CURRENT && !options.force) return;

    var previous = CURRENT;
    CURRENT = index;

    if (REFS.track) REFS.track.style.setProperty('--mp-index', index);
    if (REFS.slides) {
      REFS.slides.forEach(function (slide, i) {
        var active = i === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        if (active) {
          slide.removeAttribute('inert');
          slide.scrollTop = 0;
        } else {
          slide.setAttribute('inert', '');
        }
      });
    }
    if (REFS.dots) {
      REFS.dots.forEach(function (dot, i) {
        if (i === index) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }
    if (REFS.prev) REFS.prev.disabled = index === 0;
    if (REFS.next) REFS.next.disabled = index === total - 1;
    if (REFS.counter) REFS.counter.textContent = pad(index + 1) + ' / ' + pad(total);
    if (REFS.progress) REFS.progress.style.width = ((index + 1) / total * 100) + '%';

    if (options.analytics !== false && index !== previous) {
      goal('mp_slide_view', { slide: index + 1 });
    }
  }

  function openModal(source) {
    if (!REFS.overlay || REFS.overlay.classList.contains('active')) return;

    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch (e) {}

    LAST_FOCUS = document.activeElement;
    REFS.overlay.classList.add('active');
    REFS.overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('mp-lock');
    document.body.classList.add('mp-lock');

    goTo(0, { force: true, analytics: false });
    setTimeout(function () {
      if (REFS.close) REFS.close.focus();
    }, 60);

    goal('mp_presentation_open', { source: source || 'button' });
  }

  function closeModal() {
    if (!REFS.overlay || !REFS.overlay.classList.contains('active')) return;

    REFS.overlay.classList.remove('active');
    REFS.overlay.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('mp-lock');
    document.body.classList.remove('mp-lock');

    goal('mp_presentation_close', { slide: CURRENT + 1 });

    if (LAST_FOCUS && typeof LAST_FOCUS.focus === 'function') {
      try { LAST_FOCUS.focus(); } catch (e) {}
    }
  }

  window.openModal = openModal;
  window.closeModal = closeModal;

  function formatPhone(input) {
    var v = input.value.replace(/\D/g, '');
    if (v.indexOf('7') === 0) v = '+' + v;
    else if (v.indexOf('8') === 0) v = '+7' + v.slice(1);
    else if (v.indexOf('+') !== 0) v = '+7' + v;

    var r = '';
    if (v.length > 0) r = v[0];
    if (v.length > 1) r += v[1];
    if (v.length > 2) r += ' (' + v.slice(2, 5);
    if (v.length > 5) r += ') ' + v.slice(5, 8);
    if (v.length > 8) r += ' ' + v.slice(8, 10);
    if (v.length > 10) r += ' ' + v.slice(10, 12);
    input.value = r;
  }

  window.formatPhone = formatPhone;

  function getFocusable() {
    if (!REFS.overlay) return [];
    var selector = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),summary,[tabindex]:not([tabindex="-1"])';
    return Array.prototype.slice.call(REFS.overlay.querySelectorAll(selector)).filter(function (el) {
      if (el.closest('[inert]')) return false;
      if (el.closest('[hidden]')) return false;
      return el.getClientRects().length > 0;
    });
  }

  function trapFocus(event) {
    var list = getFocusable();
    if (!list.length) return;
    var first = list[0];
    var last = list[list.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function loadEmailJs() {
    return new Promise(function (resolve, reject) {
      if (window.emailjs) {
        try { window.emailjs.init(EMAILJS_KEY); } catch (e) {}
        return resolve(window.emailjs);
      }
      var script = document.createElement('script');
      script.src = EMAILJS_SRC;
      script.async = true;
      script.onload = function () {
        try { window.emailjs.init(EMAILJS_KEY); } catch (e) {}
        resolve(window.emailjs);
      };
      script.onerror = function () { reject(new Error('EmailJS load failed')); };
      document.head.appendChild(script);
    });
  }

  function setupForm() {
    var form = document.getElementById('mpRequestForm');
    var status = document.getElementById('mpFormStatus');
    var button = document.getElementById('mpSubmitBtn');
    var phone = document.getElementById('mpPhone');

    if (phone) {
      phone.addEventListener('input', function () { formatPhone(phone); });
    }

    var consultBtn = document.getElementById('mpConsultBtn');
    var consultWrap = document.getElementById('mpConsultWrap');
    if (consultBtn && consultWrap) {
      consultBtn.addEventListener('click', function () {
        var willOpen = consultWrap.hasAttribute('hidden');
        if (willOpen) {
          consultWrap.removeAttribute('hidden');
          consultBtn.setAttribute('aria-expanded', 'true');
          setTimeout(function () {
            var first = consultWrap.querySelector('input');
            if (first) first.focus();
          }, 120);
        } else {
          consultWrap.setAttribute('hidden', '');
          consultBtn.setAttribute('aria-expanded', 'false');
        }
        goal('mp_contact_click', { type: 'consultation' });
      });
    }

    if (!form || !status || !button) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      button.disabled = true;
      button.textContent = 'Отправка...';
      status.textContent = '';
      status.className = 'mp-form-status';

      var payload = {
        name: document.getElementById('mpName').value,
        phone: document.getElementById('mpPhone').value,
        email: document.getElementById('mpEmail').value,
        description: document.getElementById('mpDescription').value
      };

      loadEmailJs()
        .then(function (emailjs) {
          return emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, payload);
        })
        .then(function () {
          status.textContent = 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.';
          status.className = 'mp-form-status';
          form.reset();
          goal('mp_form_submit', { slide: 8 });
          setTimeout(closeModal, 2200);
        })
        .catch(function () {
          status.textContent = 'Ошибка отправки. Попробуйте позже или напишите на info@technadzorkazan.ru';
          status.className = 'mp-form-status is-error';
        })
        .then(function () {
          button.disabled = false;
          button.textContent = 'Отправить';
        });
    });
  }

  function setupAnalytics() {
    if (!REFS.overlay) return;

    REFS.overlay.addEventListener('click', function (event) {
      var contact = event.target.closest('[data-mp-contact]');
      if (contact) {
        goal('mp_contact_click', { type: contact.getAttribute('data-mp-contact') });
      }
    });

    REFS.slides.forEach(function (slide, i) {
      slide.querySelectorAll('details.mp-details').forEach(function (details) {
        details.addEventListener('toggle', function () {
          if (details.open) goal('mp_details_open', { slide: i + 1 });
        });
      });
    });
  }

  function setupSwipe() {
    if (!REFS.viewport) return;

    REFS.viewport.addEventListener('touchstart', function (event) {
      if (event.touches.length !== 1) return;
      TOUCH.x = event.touches[0].clientX;
      TOUCH.y = event.touches[0].clientY;
      TOUCH.active = true;
    }, { passive: true });

    REFS.viewport.addEventListener('touchend', function (event) {
      if (!TOUCH.active) return;
      TOUCH.active = false;
      var touch = event.changedTouches[0];
      if (!touch) return;
      var dx = touch.clientX - TOUCH.x;
      var dy = touch.clientY - TOUCH.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.15) {
        goTo(CURRENT + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });
  }

  function setupKeyboard() {
    document.addEventListener('keydown', function (event) {
      if (!REFS.overlay || !REFS.overlay.classList.contains('active')) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(CURRENT + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(CURRENT - 1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        goTo(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        goTo(SLIDES.length - 1);
      } else if (event.key === 'Tab') {
        trapFocus(event);
      }
    });
  }

  function scheduleAutoOpen() {
    var alreadyShown = false;
    try { alreadyShown = !!sessionStorage.getItem(SESSION_KEY); } catch (e) {}
    if (alreadyShown) return;

    var startTimer = function () {
      setTimeout(function () {
        var shown = false;
        try { shown = !!sessionStorage.getItem(SESSION_KEY); } catch (e) {}
        if (!shown) openModal('auto');
      }, 5000);
    };

    if (document.readyState === 'complete') startTimer();
    else window.addEventListener('load', startTimer, { once: true });
  }

  function init() {
    if (!document.body || document.getElementById('requestModal')) return;

    document.body.insertAdjacentHTML('beforeend', buildModal());

    REFS.overlay = document.getElementById('requestModal');
    REFS.track = document.getElementById('mpTrack');
    REFS.viewport = document.getElementById('mpViewport');
    REFS.slides = Array.prototype.slice.call(document.querySelectorAll('#requestModal .mp-slide'));
    REFS.dots = Array.prototype.slice.call(document.querySelectorAll('#requestModal .mp-dot'));
    REFS.prev = document.getElementById('mpPrev');
    REFS.next = document.getElementById('mpNext');
    REFS.counter = document.getElementById('mpCounter');
    REFS.progress = document.getElementById('mpProgressFill');
    REFS.close = document.querySelector('#requestModal .mp-close');

    if (!REFS.overlay) return;

    REFS.overlay.querySelectorAll('[data-mp-close]').forEach(function (el) {
      el.addEventListener('click', function (event) {
        event.preventDefault();
        closeModal();
      });
    });

    if (REFS.prev) REFS.prev.addEventListener('click', function () { goTo(CURRENT - 1); });
    if (REFS.next) REFS.next.addEventListener('click', function () { goTo(CURRENT + 1); });
    REFS.dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(dot.getAttribute('data-mp-dot'), 10));
      });
    });

    setupSwipe();
    setupKeyboard();
    setupAnalytics();
    setupForm();

    goTo(0, { force: true, analytics: false });
    scheduleAutoOpen();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
