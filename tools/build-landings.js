// Landings de pauta: /agente-whatsapp/ y /obras/. No usan el molde SEO de build-pages.js: repiten el gancho del reel,
// muestran el producto andando (chat animado / tablero de obras) y empujan a WhatsApp. Toman estilos, nav y footer de index.html.
// Uso: node tools/build-landings.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), SITE = 'https://autopilot.com.ar';
const idx = fs.readFileSync(path.join(__dirname, 'base-oscura.html'), 'utf8');
const entre = (a, b) => { const i = idx.indexOf(a), j = idx.indexOf(b, i); if (i < 0 || j < 0) throw new Error('no encuentro ' + a); return idx.slice(i, j + b.length); };
const estilos = entre('<style>', '</style>');
const nav = entre('<nav>', '</nav>').replace(/href="#top"/g, 'href="/"').replace(/href="#(\w+)"/g, 'href="/#$1"');
const footer = entre('<footer>', '</footer>').replace(/href="#top"/g, 'href="/"');
const wa = t => 'https://wa.me/5491157676283?text=' + encodeURIComponent(t);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// estilos propios de las landings (sobre los de la portada)
const CSS = `<style>
  .lp-hero { padding: 40px 0 72px; }
  .lp-hero h1 { font-size: clamp(2.1rem, 4.4vw, 3.3rem); line-height: 1.02; }
  .lp-hero .sub { font-size: 1.15rem; }
  .tag-ej { display: inline-block; font-family: var(--font-mono); font-size: .72rem; letter-spacing: .08em; color: var(--gray); border: 1px solid var(--border-2); border-radius: 999px; padding: 4px 10px; margin-bottom: 18px; }
  .price-line { margin-top: 18px; font-size: .95rem; color: var(--gray2); }
  .price-line b { color: var(--white); }
  .dolor { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .dolor div, .acc div, .roles div, .vs > div { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; }
  .dolor b { display: block; font-family: var(--font-display); font-size: 1.25rem; margin-bottom: 8px; }
  .dolor p, .acc p, .roles p { color: var(--gray); font-size: .98rem; }
  .acc { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .acc .n { font-family: var(--font-mono); color: var(--accent); font-size: .85rem; }
  .acc h3, .roles h3 { font-size: 1.5rem; margin: 6px 0 8px; }
  .acc .ej { margin-top: 14px; font-family: var(--font-mono); font-size: .8rem; color: var(--accent2); background: rgba(139,255,214,.06); border-radius: 8px; padding: 8px 10px; }
  .vs { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .vs h3 { font-size: 1.2rem; margin-bottom: 12px; }
  .vs ul { list-style: none; display: grid; gap: 10px; color: var(--gray2); }
  .vs li::before { content: '✕  '; color: #ff6b57; }
  .vs .si { border-color: var(--border-strong); background: rgba(200,230,46,.04); }
  .vs .si li::before { content: '✓  '; color: var(--accent); }
  .roles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .roles .ve { margin-top: 12px; font-size: .85rem; font-family: var(--font-mono); color: var(--accent2); }
  .plan { display: flex; flex-wrap: wrap; gap: 28px; align-items: center; justify-content: space-between; background: var(--card); border: 1px solid var(--border-strong); border-radius: 20px; padding: 32px; }
  .plan .num { font-family: var(--font-display); font-size: clamp(2.6rem, 6vw, 3.6rem); font-weight: 800; line-height: 1; }
  .plan .num small { font-size: 1rem; color: var(--gray); font-weight: 600; }
  .plan ul { list-style: none; color: var(--gray2); display: grid; gap: 6px; }
  .plan ul li::before { content: '✓  '; color: var(--accent); }
  .pasos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; counter-reset: p; }
  .pasos div { border-left: 2px solid var(--accent); padding: 4px 0 4px 18px; }
  .pasos b { display: block; font-size: 1.1rem; margin-bottom: 4px; }
  .pasos p { color: var(--gray); }
  .faq-l details { border-bottom: 1px solid var(--border); padding: 18px 0; }
  .faq-l summary { cursor: pointer; font-weight: 600; font-size: 1.05rem; }
  .faq-l p { color: var(--gray); margin-top: 10px; max-width: 720px; }
  .final { text-align: center; padding: 110px 0; }
  .final h2 { font-size: clamp(2rem, 4.6vw, 3.2rem); line-height: 1.05; max-width: 820px; margin: 0 auto 26px; }
  .sticky-cta { display: none; }
  /* tablero de obras */
  .board { background: #0f0f13; border: 1px solid var(--border-2); border-radius: 22px; padding: 18px; box-shadow: 0 30px 60px -20px rgba(0,0,0,.8); }
  .board-h { display: flex; justify-content: space-between; align-items: center; font-family: var(--font-mono); font-size: .75rem; color: var(--gray); margin-bottom: 12px; }
  .ob { display: grid; grid-template-columns: 1fr auto; gap: 4px 12px; padding: 14px; border-radius: 14px; background: var(--card); border: 1px solid var(--border); margin-bottom: 10px; transition: border-color .4s, background .4s, transform .4s var(--ease); }
  .ob small { font-family: var(--font-mono); font-size: .68rem; color: var(--gray); letter-spacing: .06em; }
  .ob b { font-family: var(--font-display); font-size: 1.05rem; }
  .ob .g { grid-row: 1 / 3; grid-column: 2; align-self: center; text-align: right; font-family: var(--font-mono); font-weight: 600; font-size: 1.05rem; }
  .ob .g i { display: block; font-style: normal; font-size: .72rem; color: var(--gray); font-weight: 400; }
  .ob .bar { grid-column: 1 / 3; height: 6px; border-radius: 4px; background: rgba(255,255,255,.06); overflow: hidden; margin-top: 6px; }
  .ob .bar span { display: block; height: 100%; width: 0; background: var(--accent); transition: width 1s var(--ease); }
  .ob.neg { border-color: rgba(255,107,87,.55); background: rgba(255,107,87,.07); transform: scale(1.02); }
  .ob.neg .g { color: #ff8a78; } .ob.neg .bar span { background: #ff6b57; }
  .ficha { background: #fbf7ec; color: #2a211a; border-radius: 22px; padding: 28px; max-width: 520px; box-shadow: 0 30px 60px -20px rgba(0,0,0,.8); }
  .ficha h3 { font-size: 1.6rem; margin: 4px 0 16px; color: #2a211a; }
  .ficha .k { font-family: var(--font-mono); font-size: .72rem; letter-spacing: .08em; color: #1c8f76; }
  .ficha .ln { display: flex; justify-content: space-between; padding: 10px 0; border-top: 2px dashed #d8cfbd; font-weight: 600; }
  .ficha .tot { display: flex; justify-content: space-between; align-items: baseline; border-top: 4px solid #2a211a; margin-top: 6px; padding-top: 12px; font-weight: 800; }
  .ficha .tot b { font-family: var(--font-display); font-size: 2.2rem; color: #1c8f76; }
  .chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
  .chips span { font-size: .78rem; font-weight: 700; border-radius: 999px; padding: 4px 10px; background: #e9e1cf; }
  .chips .r { background: #ffd9d2; color: #a3361f; }
  .split { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  @media (max-width: 900px) {
    .dolor, .acc, .roles, .pasos, .vs, .split { grid-template-columns: 1fr; }
    .lp-hero { padding-top: 24px; }
    .sticky-cta { display: flex; position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 50; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,.6); }
    body { padding-bottom: 76px; }
  }
</style>`;

const head = ({ path: p, title, desc }) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <link rel="canonical" href="${SITE + p}" />
  <meta name="theme-color" content="#060608" />
  <meta property="og:locale" content="es_AR" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${SITE + p}" />
  <meta property="og:image" content="${SITE}/og-image.png" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="preload" href="/assets/fonts/syne-latin-8vIH7w4q.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/fonts/dmsans-latin-rP2Yp2yw.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/assets/fonts.css" />
  <script>document.documentElement.classList.add('js')</script>
  ${estilos}
  ${CSS}
</head>
<body id="top">
  ${nav}
  <main>`;

const pie = (cta, ctaTxt, scripts) => `  </main>
  ${footer}
  <a class="btn btn-main sticky-cta" href="${cta}" target="_blank" rel="noopener">${ctaTxt}</a>
  <script>
  (function () {
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .15 }) : null;
    document.querySelectorAll('.reveal').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });
  })();
  </script>
  ${scripts}
</body>
</html>
`;

const faq = items => `<div class="faq-l">${items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;

// ---------- reproductor del chat (mismas clases que la portada) ----------
const chatPlayer = escenas => `<script>
(function () {
  var S = ${JSON.stringify(escenas)};
  var chat = document.getElementById('chat'), wname = document.getElementById('wname'), wst = document.getElementById('wst'), tabs = document.getElementById('tabs'), stepsEl = document.getElementById('steps');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches, run = 0, cur = 0, pinned = false;
  S.forEach(function (s, i) { var b = document.createElement('button'); b.type = 'button'; b.className = 'tab'; b.textContent = s.tab; b.setAttribute('role', 'tab'); b.onclick = function () { pinned = true; play(i); }; tabs.appendChild(b); });
  function add(cls, html) { var d = document.createElement('div'); d.className = 'msg ' + cls; d.innerHTML = html; chat.appendChild(d); while (chat.children.length > 9) chat.removeChild(chat.firstChild); return d; }
  function hl(n) { [].forEach.call(stepsEl.children, function (li, i) { li.classList.toggle('on', i + 1 === n); }); }
  function play(i) {
    var r = ++run, s = S[i]; cur = i; chat.innerHTML = ''; wname.textContent = s.name; wst.textContent = 'en línea';
    [].forEach.call(tabs.children, function (b, k) { b.setAttribute('aria-selected', k === i ? 'true' : 'false'); b.classList.toggle('on', k === i); });
    stepsEl.innerHTML = s.steps.map(function (p, k) { return '<li><b>0' + (k + 1) + '</b><div><strong>' + p[0] + '</strong><span>' + p[1] + '</span></div></li>'; }).join('');
    if (reduce) { s.seq.forEach(function (m) { if (m[2] !== 'typing') add(m[2], m[3]).classList.add('show'); }); hl(s.steps.length); return; }
    var t = 0, typ = null;
    s.seq.forEach(function (m) { t += m[0]; setTimeout(function () { if (r !== run) return; hl(m[1]);
      if (typ) { typ.remove(); typ = null; wst.textContent = 'en línea'; }
      if (m[2] === 'typing') { typ = add('in', '<span class="typing"><i></i><i></i><i></i></span>'); typ.classList.add('show'); wst.textContent = 'escribiendo…'; return; }
      var d = add(m[2], m[3]); requestAnimationFrame(function () { d.classList.add('show'); }); }, t); });
    setTimeout(function () { if (r === run && !pinned) play((cur + 1) % S.length); else if (r === run) play(cur); }, t + 4200);
  }
  play(0);
})();
</script>`;

// =====================================================================================
// /agente-whatsapp/
// =====================================================================================
const ctaAg = wa('Hola, vi el video del mensaje de $26.400. Quiero probar el agente en mi negocio.');
const lista = rows => '<div class="list">' + rows.map(([a, b]) => `<div>${a} <code>${b}</code></div>`).join('') + '</div>';
const ESC_AG = [
  { tab: 'Pizzería', name: 'Pizzería · pedidos', steps: [
      ['Entra el mensaje', 'A la hora pico, mientras vos estás en el horno.'],
      ['Contesta con tu carta', 'Precios, envío y demora reales, no respuestas armadas.'],
      ['Arma el pedido y lo cobra', 'Mercado Pago o efectivo. Queda confirmado y cargado.'],
      ['Te avisa a vos', 'Cocina recibe el pedido. Si hace falta una persona, te lo pasa.']],
    seq: [
      [500, 1, 'out', 'Hola! ¿Tienen muzza? ¿Hacen envío a Caseros?'],
      [800, 2, 'typing'],
      [1700, 2, 'in', '¡Hola! Sí: la Muzzarella grande sale $10.900. A Caseros el envío es $1.500 y tarda unos 40 min. ¿Te armo el pedido?'],
      [1700, 3, 'out', 'Dale, 2 muzza y una coca 1,5 L'],
      [800, 3, 'typing'],
      [1600, 3, 'in', 'Sumé todo:' + lista([['2 Muzzarella', '$21.800'], ['Coca-Cola 1,5 L', '$3.100'], ['Envío a Caseros', '$1.500'], ['Total', '$26.400']]) + '¿Pagás con Mercado Pago o en efectivo?'],
      [1600, 3, 'out', 'Mercado Pago'],
      [1100, 3, 'in', 'Listo ✓ Pedido confirmado. Te paso el link de pago: mpago.la/ejemplo'],
      [1300, 4, 'sys', '✓ Pedido #184 cargado · cobro con Mercado Pago'],
      [1200, 4, 'sys', '→ Cocina avisada: 2 Muzzarella + Coca 1,5 L, sale para Caseros']] },
  { tab: 'Estética', name: 'Estética · consultas', steps: [
      ['Pregunta precio', 'Lo que te preguntan 30 veces por día.'],
      ['Responde con tus precios', 'Sale de tu lista de servicios, actualizada.'],
      ['Toma los datos', 'Nombre, servicio y qué necesita: queda registrado.'],
      ['Le pasa el caso armado', 'La persona que coordina recibe todo listo.']],
    seq: [
      [500, 1, 'out', 'Hola! ¿Cuánto sale el alisado? Tengo el pelo largo'],
      [800, 2, 'typing'],
      [1700, 2, 'in', '¡Hola! Para pelo largo el alisado arranca en $45.000 y lleva unas 3 horas. ¿Me decís tu nombre así lo coordina Sofi con vos?'],
      [1600, 3, 'out', 'Caro. Si puede ser un sábado mejor'],
      [1100, 3, 'in', 'Gracias, Caro. Ya le paso tu consulta a Sofi para ver el sábado 👍'],
      [1300, 3, 'sys', '✓ Consulta registrada: Caro · alisado pelo largo · prefiere sábado'],
      [1200, 4, 'sys', '→ Sofi recibe la consulta armada']] },
  { tab: 'Comercio', name: 'Ferretería · ventas', steps: [
      ['Llega la consulta', 'Stock y precio, a cualquier hora.'],
      ['Consulta tu sistema', 'Responde con lo que hay en el depósito.'],
      ['Registra al cliente', 'Minorista, mayorista, urgente: queda anotado.'],
      ['Avisa al vendedor', 'Sólo lo que vale la pena, con el pedido armado.']],
    seq: [
      [500, 1, 'out', '¿Tienen la bordeadora Gamma 1000W? ¿Qué precio?'],
      [800, 2, 'typing'],
      [1700, 2, 'in', 'Sí, quedan 6 en el depósito. Sale $89.900 en efectivo o en 3 cuotas sin interés.'],
      [1600, 3, 'out', 'Necesito 10 para mi local, ¿hacen precio por cantidad?'],
      [1100, 3, 'in', 'Por cantidad te atiende Lucas, de mayoristas. Ya le paso tu pedido.'],
      [1300, 3, 'sys', '✓ Cliente mayorista registrado · 10 bordeadoras'],
      [1100, 4, 'sys', '→ Lucas recibe el pedido armado']] },
];
const agente = head({ path: '/agente-whatsapp/', title: 'Este mensaje vale $26.400 y nadie lo contestó | Agente de WhatsApp · Autopilot',
  desc: 'Un agente de WhatsApp que contesta con tus precios, arma el pedido, lo cobra con Mercado Pago y lo deja cargado en tu sistema. Desde USD 69 por mes, sin permanencia.' }) + `
    <div class="wrap hero lp-hero">
      <div>
        <p class="eyebrow">Agente de WhatsApp para comercios</p>
        <h1>Este mensaje vale $26.400. <em>Y nadie lo contestó.</em></h1>
        <p class="sub">Mientras estás en el horno, en el sillón o atendiendo el mostrador, el agente contesta con tus precios, arma el pedido, lo cobra y lo deja cargado. Vos sólo lo preparás.</p>
        <div class="ctas">
          <a class="btn btn-main" href="${ctaAg}" target="_blank" rel="noopener">Probalo con tu negocio</a>
          <a class="link-wa" href="/precios/">Ver precios →</a>
        </div>
        <p class="price-line">Desde <b>USD 69 por mes</b> · sin permanencia · arrancás con un piloto acompañado</p>
        <ol class="steps" id="steps"></ol>
      </div>
      <div class="demo" id="demo">
        <div class="tabs" id="tabs" role="tablist" aria-label="Elegí un rubro"></div>
        <div class="phone" aria-label="Ejemplo animado de una charla que atiende el agente">
          <div class="screen">
            <div class="wa-head"><div class="wa-av">A<span>.</span></div><div><div class="wa-name" id="wname">Pizzería</div><div class="wa-st" id="wst">en línea</div></div></div>
            <div class="chat" id="chat"></div>
          </div>
        </div>
        <p class="demo-note">Recreación con precios de ejemplo.</p>
      </div>
    </div>

    <section>
      <div class="wrap">
        <div class="sec-head reveal"><p class="eyebrow">Lo que pasa hoy</p><h2>Cada mensaje sin contestar es un cliente <em>que pide en otro lado.</em></h2></div>
        <div class="dolor reveal">
          <div><b>Contestás tarde</b><p>Cuando por fin agarrás el celular, ya pidió en el local de enfrente.</p></div>
          <div><b>Repetís lo mismo</b><p>Precio, horario, si hacen envío, si aceptan Mercado Pago. Todo el día.</p></div>
          <div><b>Anotás a mano</b><p>El pedido queda en un chat, un papel o tu memoria. Y a veces se pierde.</p></div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sec-head reveal"><p class="eyebrow">Lo que hace</p><h2>Trabaja <em>adentro de tu negocio</em>, no al costado.</h2><p>No es un menú de botones. Hace tres cosas con tus datos reales.</p></div>
        <div class="acc reveal">
          <div><span class="n">01</span><h3>Consulta</h3><p>Precios, stock, carta, horarios y zonas de envío, de tu lista o de tu sistema.</p><div class="ej">«¿Tienen muzza?» → $10.900, hay</div></div>
          <div><span class="n">02</span><h3>Registra</h3><p>El pedido o la consulta quedan cargados, con el cobro de Mercado Pago o efectivo.</p><div class="ej">Pedido #184 · cobrado ✓</div></div>
          <div><span class="n">03</span><h3>Avisa</h3><p>A cocina, al dueño o a quien corresponda. Si hace falta una persona, le pasa la charla armada.</p><div class="ej">→ Cocina: sale para Caseros</div></div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sec-head reveal"><p class="eyebrow">La diferencia</p><h2>No vendemos un chatbot.</h2></div>
        <div class="vs reveal">
          <div><h3>Un chatbot común</h3><ul><li>Te hace elegir opciones de un menú</li><li>No sabe tus precios ni tu stock</li><li>Termina en «un asesor te va a contactar»</li><li>El pedido lo cargás vos igual</li></ul></div>
          <div class="si"><h3>El agente de Autopilot</h3><ul><li>Entiende lo que escribe la gente, como lo escribe</li><li>Responde con tu carta y tus precios reales</li><li>Cierra el pedido y lo cobra</li><li>Lo deja cargado y avisa a quien corresponde</li></ul></div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sec-head reveal"><p class="eyebrow">Ya funciona</p><h2>Una red de laboratorios atiende así <em>6.500 conversaciones por mes.</em></h2><p>Más de 36.000 mensajes mensuales, con el sistema contestando y su equipo atendiendo sólo lo que necesita una persona. <a href="/casos/laboratorio-biorossi/" style="color:var(--white);border-bottom:1px solid rgba(255,255,255,.3)">Ver el caso</a></p></div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="plan reveal">
          <div><p class="eyebrow">Precio</p><div class="num">USD 69 <small>por mes</small></div><p style="color:var(--gray);margin-top:8px">Plan Inicial. Con turnos y cobros, Negocio a USD 149.</p></div>
          <ul><li>Sin permanencia: cancelás cuando quieras</li><li>Piloto acompañado de 2 semanas</li><li>Lo configuramos con tu carta y tus precios</li><li>La integración con tu sistema se cotiza aparte</li></ul>
          <div><a class="btn btn-main" href="${ctaAg}" target="_blank" rel="noopener">Quiero probarlo</a><p style="margin-top:10px;text-align:center"><a class="link-wa" href="/precios/">Ver todos los planes →</a></p></div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sec-head"><h2>Preguntas</h2></div>
        ${faq([
          ['¿Usa mi número de WhatsApp?', 'Sí, trabaja en el número de tu negocio. Tus clientes escriben donde ya escriben.'],
          ['¿Qué pasa si no entiende algo?', 'Le pasa la charla a una persona de tu equipo, con el pedido o la consulta ya armados. No inventa.'],
          ['¿De dónde saca los precios?', 'De tu carta o lista de precios, que cargamos al empezar y podés cambiar cuando quieras. Si tenés un sistema, se puede conectar (eso se cotiza aparte).'],
          ['¿Cobra de verdad?', 'Sí: manda el link de Mercado Pago de tu cuenta y el pedido queda confirmado. También acepta efectivo o transferencia, según cómo trabajes.'],
          ['¿Cuánto tarda en estar andando?', 'Arrancamos con un piloto acompañado de 2 semanas: lo configuramos con vos y lo miramos juntos los primeros días.'],
        ])}
      </div>
    </section>

    <section class="final">
      <div class="wrap">
        <h2>El próximo mensaje de $26.400, <em>que lo conteste alguien.</em></h2>
        <a class="btn btn-main" href="${ctaAg}" target="_blank" rel="noopener">Escribinos por WhatsApp</a>
      </div>
    </section>
` + pie(ctaAg, 'Probalo con tu negocio', chatPlayer(ESC_AG));

// =====================================================================================
// /obras/
// =====================================================================================
const ctaOb = wa('Hola, vi el video de las obras. Quiero probar Obras y rentabilidad 7 días gratis.');
const OBRAS = [
  ['ADROGUÉ', 'Toldo retráctil 6 m', 1240000, 26],
  ['LOMAS', 'Pérgola + policarbonato', -180000, -6],
  ['BANFIELD', 'Cerramiento de balcón', 860000, 19],
  ['TEMPERLEY', 'Techo de policarbonato', 410000, 11],
];
const obras = head({ path: '/obras/', title: 'Una de tus obras te hace perder plata. ¿Sabés cuál? | Obras y rentabilidad · Autopilot',
  desc: 'Cargás cada obra con presupuesto, cobros y gastos, y ves la ganancia real, lo que falta cobrar y el estado. Para talleres y contratistas. USD 69 por mes, 7 días gratis.' }) + `
    <div class="wrap hero lp-hero">
      <div>
        <p class="eyebrow">Obras y rentabilidad · para talleres y contratistas</p>
        <h1>Una de tus obras te hace perder plata. <em>¿Sabés cuál?</em></h1>
        <p class="sub">Cargás cada obra con su presupuesto, cobros y gastos, y ves la ganancia real, con comisión e impuestos, lo que falta cobrar y en qué estado está. Se termina la planilla que nadie entiende.</p>
        <div class="ctas">
          <a class="btn btn-main" href="${ctaOb}" target="_blank" rel="noopener">Probalo 7 días gratis</a>
          <a class="link-wa" href="#ficha">Ver una obra por dentro →</a>
        </div>
        <p class="price-line"><b>USD 69 por mes</b> · sin permanencia · pasamos tu planilla vieja al sistema</p>
        <p class="proof"><span>Un taller de toldos y policarbonatos ya lleva sus obras así.</span></p>
      </div>
      <div class="demo">
        <div class="board" id="board" aria-label="Ejemplo: ganancia real de cuatro obras">
          <div class="board-h"><span>OBRAS · ESTE MES</span><span id="bst">calculando…</span></div>
          ${OBRAS.map(([z, n, g, m], i) => `<div class="ob" id="ob${i}" data-g="${g}" data-m="${m}"><small>OBRA · ${z}</small><b>${n}</b><div class="g"><span>$ ???</span><i>ganancia real</i></div><div class="bar"><span></span></div></div>`).join('')}
        </div>
        <p class="demo-note">Cifras de ejemplo.</p>
      </div>
    </div>

    <section>
      <div class="wrap">
        <div class="sec-head reveal"><p class="eyebrow">Por qué la planilla te miente</p><h2>Facturaste un montón. <em>¿Cuánto te quedó?</em></h2></div>
        <div class="dolor reveal">
          <div><b>La comisión no está</b><p>El vendedor cobra su parte y en la planilla la obra sigue «ganando» lo mismo.</p></div>
          <div><b>Los gastos están en el celular</b><p>Viáticos, un flete, chapas de más: tickets sueltos que nunca llegan a la obra.</p></div>
          <div><b>Los cobros van a medias</b><p>Seña, un pago, otro pago. Nadie sabe bien cuánto falta cobrar de cada una.</p></div>
        </div>
      </div>
    </section>

    <section id="ficha">
      <div class="wrap split">
        <div class="reveal">
          <p class="eyebrow">Cada obra, en una ficha</p>
          <h2 style="font-size:clamp(1.8rem,3.6vw,2.6rem);line-height:1.1">La ganancia real, <em>sin hacer cuentas.</em></h2>
          <p style="color:var(--gray);margin-top:14px;font-size:1.05rem">Cargás el presupuesto, los cobros y cada gasto. El sistema descuenta comisión e impuestos como los calculás vos, y te muestra cuánto ganaste, cuánto falta cobrar y en qué está la obra.</p>
        </div>
        <div class="ficha reveal">
          <span class="k">OBRA · EN CURSO</span>
          <h3>Toldo retráctil 6 m · Adrogué</h3>
          <div class="ln"><span>Presupuesto</span><span>$4.800.000</span></div>
          <div class="ln"><span>Costos y gastos</span><span>−$2.950.000</span></div>
          <div class="ln"><span>Comisión e impuestos</span><span>−$610.000</span></div>
          <div class="tot"><span>Ganancia real</span><b>$1.240.000</b></div>
          <div class="chips"><span>Instalación: jueves</span><span class="r">Falta cobrar $1.800.000</span><span>Margen 26 %</span></div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sec-head reveal"><p class="eyebrow">Cada uno ve lo suyo</p><h2>El dueño ve todo. <em>El resto, lo que le toca.</em></h2></div>
        <div class="roles reveal">
          <div><h3>Dueño</h3><p>Ganancias, sueldos, cobros y el estado de todas las obras.</p><div class="ve">ve: todo</div></div>
          <div><h3>Administración</h3><p>Carga cobros y gastos y sigue las obras. No ve ganancias ni sueldos.</p><div class="ve">ve: cobros, gastos, estado</div></div>
          <div><h3>Técnico</h3><p>Ve la ficha de la obra que le toca y, si querés, ficha las horas.</p><div class="ve">ve: su ficha</div></div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sec-head reveal"><p class="eyebrow">Cómo arrancás</p><h2>En una semana tenés tus obras <em>adentro.</em></h2></div>
        <div class="pasos reveal">
          <div><b>1. Nos pasás tu planilla</b><p>La que usás hoy, como esté. La ordenamos y la cargamos nosotros.</p></div>
          <div><b>2. La revisamos juntos</b><p>Ajustamos comisiones e impuestos para que las cuentas den como las hacés vos.</p></div>
          <div><b>3. Usalo 7 días gratis</b><p>Si te sirve, seguís con el abono. Si no, no pagás nada.</p></div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="plan reveal">
          <div><p class="eyebrow">Precio</p><div class="num">USD 69 <small>por mes</small></div><p style="color:var(--gray);margin-top:8px">Fichaje de horas con ubicación, opcional: USD 19 por mes.</p></div>
          <ul><li>7 días de prueba gratis</li><li>Sin permanencia: cancelás cuando quieras</li><li>Migración de tu planilla incluida</li><li>Usuarios con permisos por rol</li></ul>
          <div><a class="btn btn-main" href="${ctaOb}" target="_blank" rel="noopener">Empezar la prueba</a></div>
        </div>
      </div>
    </section>

    <section>
      <div class="wrap">
        <div class="sec-head"><h2>Preguntas</h2></div>
        ${faq([
          ['¿Sirve para mi rubro?', 'Si trabajás por obra o por trabajo, con presupuesto, cobros y gastos: toldos, metalúrgica, carpintería, instalaciones, construcción. Lo vemos en una llamada.'],
          ['¿Tengo que cargar todo de nuevo?', 'No. Nos pasás tu planilla y la migramos nosotros, ordenada.'],
          ['¿Se usa desde el celular?', 'Sí, en la computadora y en el celular. El técnico puede ver su ficha y fichar desde la obra.'],
          ['¿Cómo calcula la ganancia?', 'Presupuesto menos costos y gastos, menos comisión e impuestos, con los porcentajes que uses vos. Lo configuramos juntos al empezar.'],
          ['¿Qué pasa después de los 7 días?', 'Si seguís, pagás USD 69 por mes. Si no, se da de baja y no pagás nada.'],
        ])}
      </div>
    </section>

    <section class="final">
      <div class="wrap">
        <h2>Encontrá la obra que te hace perder plata <em>antes de cotizar la próxima.</em></h2>
        <a class="btn btn-main" href="${ctaOb}" target="_blank" rel="noopener">Probalo 7 días gratis</a>
      </div>
    </section>
` + pie(ctaOb, 'Probalo 7 días gratis', `<script>
(function () {
  var obs = [].slice.call(document.querySelectorAll('.ob')), st = document.getElementById('bst');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fmt = function (n) { return (n < 0 ? '−$' : '$') + Math.abs(Math.round(n)).toLocaleString('es-AR'); };
  function revelar() {
    obs.forEach(function (o, i) { var g = +o.dataset.g, m = +o.dataset.m, sp = o.querySelector('.g span'), bar = o.querySelector('.bar span');
      setTimeout(function () { var t0 = performance.now(), D = reduce ? 0 : 900;
        (function paso(t) { var k = D ? Math.min(1, (t - t0) / D) : 1; sp.textContent = fmt(g * k) + '  ·  ' + Math.round(m * k) + ' %'; bar.style.width = Math.min(100, Math.abs(m) * 3) * k + '%'; if (k < 1) requestAnimationFrame(paso); else if (g < 0) o.classList.add('neg'); })(t0);
      }, reduce ? 0 : 500 + i * 450); });
    setTimeout(function () { st.textContent = '1 obra en rojo'; st.style.color = '#ff8a78'; }, reduce ? 0 : 2600);
  }
  function ciclo() { obs.forEach(function (o) { o.classList.remove('neg'); o.querySelector('.g span').textContent = '$ ???'; o.querySelector('.bar span').style.width = '0'; }); st.textContent = 'calculando…'; st.style.color = ''; setTimeout(revelar, 900); }
  ciclo(); if (!reduce) setInterval(ciclo, 9000);
})();
</script>`);

fs.mkdirSync(path.join(ROOT, 'agente-whatsapp'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'obras'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'agente-whatsapp', 'index.html'), agente);
fs.writeFileSync(path.join(ROOT, 'obras', 'index.html'), obras);
console.log('landings ok:', agente.length, obras.length);
