// Landings de pauta /agente-whatsapp/ y /obras/, en el estilo claro de la portada (17/11).
// Repiten el gancho del reel, muestran el producto andando y llevan a la prueba gratis.
// Toman de build-home.js el CSS, el menú, el pie, el iPhone y el reproductor del chat. Uso: node tools/build-landings.js
const fs = require('fs'), path = require('path');
const H = require('./build-home.js');
const ROOT = path.join(__dirname, '..'), SITE = 'https://autopilot.com.ar';
const REG = 'https://app.autopilot.com.ar/registro.html';
const { check, flecha, waIco, WA } = H;

const headDe = (p, title, desc) => H.head
  .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  .replace(/(<meta name="description" content=")[^"]*/, '$1' + desc)
  .replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${SITE + p}"`)
  .replace(/(<meta property="og:url" content=")[^"]*/, '$1' + SITE + p)
  .replace(/(<meta property="og:title" content=")[^"]*/, '$1' + title)
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');
const CSS_EXTRA = `<style>
  .dolor { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .dolor div { border: 1px solid var(--line); border-radius: 22px; padding: 26px; background: #fff; }
  .dolor b { display: block; font-size: 1.25rem; margin-bottom: 8px; letter-spacing: -.02em; }
  .dolor p { color: var(--gray); }
  .band { background: var(--ink); color: #fff; border-radius: 28px; padding: 48px; display: flex; flex-wrap: wrap; gap: 32px; align-items: center; justify-content: space-between; }
  .band .num { font-size: clamp(2.6rem, 6vw, 3.6rem); font-weight: 700; letter-spacing: -.04em; line-height: 1; }
  .band .num small { font-size: 1rem; color: #b9bfbb; font-weight: 500; letter-spacing: 0; }
  .band ul { list-style: none; display: grid; gap: 8px; color: #dfe4e0; }
  .band li { display: flex; gap: 8px; } .band li svg { color: var(--lima); margin-top: 4px; flex: none; }
  .band p { color: #b9bfbb; }
  .board { background: var(--ink); border-radius: 26px; padding: 18px; box-shadow: 0 50px 90px -30px rgba(16,24,16,.45); width: 100%; max-width: 440px; }
  .board-h { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: .72rem; color: #9aa29d; margin: 4px 4px 12px; }
  .board .ob { color: #fff; }
  .board .ob .bar { grid-column: 1 / 3; height: 6px; border-radius: 4px; background: rgba(255,255,255,.08); overflow: hidden; margin-top: 8px; }
  .board .ob .bar span { display: block; height: 100%; width: 0; background: var(--lima); transition: width 1s var(--ease); }
  .board .ob.neg .bar span { background: #ff6b57; }
  .ficha { background: #fff; border: 1px solid var(--line); border-radius: 24px; padding: 28px; box-shadow: var(--sombra); }
  .ficha .k { font-family: var(--font-mono); font-size: .72rem; letter-spacing: .08em; color: var(--verde); }
  .ficha h3 { font-size: 1.5rem; margin: 4px 0 16px; }
  .ficha .ln { display: flex; justify-content: space-between; padding: 10px 0; border-top: 1px dashed var(--line); font-weight: 600; }
  .ficha .tot { display: flex; justify-content: space-between; align-items: baseline; border-top: 3px solid var(--ink); margin-top: 6px; padding-top: 12px; font-weight: 700; }
  .ficha .tot b { font-size: 2.1rem; letter-spacing: -.04em; color: var(--verde); }
  .chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 14px; }
  .chips span { font-size: .78rem; font-weight: 700; border-radius: 999px; padding: 4px 10px; background: var(--bg2); border: 1px solid var(--line); }
  .chips .r { background: #ffe9e4; border-color: #ffd0c6; color: #a3361f; }
  .split { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
  .split h2 { font-size: clamp(1.9rem, 3.8vw, 2.7rem); margin: 14px 0; }
  .split p { color: var(--ink2); font-size: 1.08rem; }
  .roles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .roles div { border: 1px solid var(--line); border-radius: 22px; padding: 26px; background: #fff; }
  .roles h3 { font-size: 1.35rem; margin-bottom: 8px; } .roles p { color: var(--gray); }
  .roles code { display: inline-block; margin-top: 14px; font-family: var(--font-mono); font-size: .78rem; background: var(--lima2); color: var(--lima-ink); border-radius: 8px; padding: 6px 10px; }
  .final { text-align: center; }
  .final h2 { font-size: clamp(2rem, 4.6vw, 3.2rem); max-width: 820px; margin: 0 auto 26px; }
  .sticky-cta { display: none; }
  @media (max-width: 980px) {
    .dolor, .roles, .split { grid-template-columns: 1fr; }
    .band { padding: 30px 22px; }
    .sticky-cta { display: flex; position: fixed; left: 12px; right: 12px; bottom: 12px; z-index: 50; }
    body { padding-bottom: 76px; }
  }
</style>`;
const reveal = `<script>(function(){var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12}):null;document.querySelectorAll('.reveal').forEach(function(el){io?io.observe(el):el.classList.add('in');});})();</script>`;
const faq = items => `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;
const pagina = ({ p, title, desc, cuerpo, sticky, scripts }) => `${headDe(p, title, desc)}${H.CSS}${CSS_EXTRA}
</head>
<body id="top">
  ${H.NAV.replace(/href="#(\w+)"/g, 'href="/#$1"')}
  <main>
${cuerpo}
  </main>
  ${H.FOOTER}
  ${sticky}
  ${H.widgetHtml}
  ${reveal}
  ${scripts}
  ${H.widgetJs}
</body>
</html>
`;

// =====================================================================================
// /agente-whatsapp/
// =====================================================================================
const regAg = REG + '?utm_source=meta&utm_campaign=mensaje-26400';
const lista = rows => '<div class="lst">' + rows.map(([a, b]) => `<div><span>${a}</span><span>${b}</span></div>`).join('') + '</div>';
const ESC_AG = [
  { tab: 'Pizzería', nombre: 'Pizzería La Esquina', ini: 'P', f1: ['Pedido confirmado', '$26.400', 'Mercado Pago · acreditado'], f2: ['Cocina avisada', '2 Muzzarella + Coca', 'sale para Caseros · 40 min'],
    seq: [[500, 'out', 'Hola! ¿Tienen muzza? ¿Hacen envío a Caseros?'], [700, 'tip'], [1500, 'in', '¡Hola! Sí 🍕 La Muzzarella grande sale $10.900. A Caseros el envío es $1.500 y tarda unos 40 min. ¿Te armo el pedido?'],
      [1600, 'out', 'Dale, 2 muzza y una coca 1,5 L'], [700, 'tip'], [1500, 'in', 'Sumé todo:' + lista([['2 Muzzarella', '$21.800'], ['Coca-Cola 1,5 L', '$3.100'], ['Envío a Caseros', '$1.500'], ['Total', '$26.400']]) + '¿Mercado Pago o efectivo?'],
      [1500, 'out', 'Mercado Pago'], [900, 'in', 'Listo ✓ Te paso el link de pago. Apenas se acredita, sale tu pedido.'], [900, 'f1'], [1300, 'f2']] },
  { tab: 'Estética', nombre: 'Estudio Bruma', ini: 'B', f1: ['Consulta registrada', 'Caro · alisado', 'pelo largo · prefiere sábado'], f2: ['Sofi avisada', 'Consulta armada', 'para coordinar día y hora'],
    seq: [[500, 'out', 'Hola! ¿Cuánto sale el alisado? Tengo el pelo largo'], [700, 'tip'], [1500, 'in', '¡Hola! Para pelo largo arranca en $45.000 y lleva unas 3 horas. ¿Me decís tu nombre así Sofi coordina el día con vos?'],
      [1600, 'out', 'Caro. Si puede ser un sábado mejor'], [700, 'tip'], [1300, 'in', 'Gracias, Caro 😊 Ya le paso tu consulta a Sofi para ver el sábado.'], [900, 'f1'], [1300, 'f2']] },
  { tab: 'Comercio', nombre: 'Ferretería Ramos', ini: 'R', f1: ['Cliente registrado', 'Mayorista · 10 u.', 'bordeadora Gamma 1000W'], f2: ['Lucas avisado', 'Pedido armado', 'para cotizar por cantidad'],
    seq: [[500, 'out', '¿Tienen la bordeadora Gamma 1000W? ¿Qué precio?'], [700, 'tip'], [1500, 'in', 'Sí, quedan 6 en el depósito. Sale $89.900 en efectivo o en 3 cuotas sin interés.'],
      [1600, 'out', 'Necesito 10 para mi local, ¿hacen precio por cantidad?'], [700, 'tip'], [1300, 'in', 'Por cantidad te atiende Lucas, de mayoristas. Ya le paso tu pedido 👍'], [900, 'f1'], [1300, 'f2']] },
];
const agente = pagina({
  p: '/agente-whatsapp/', title: 'Este mensaje vale $26.400 y nadie lo contestó · Agente de WhatsApp | Autopilot',
  desc: 'Un agente en el WhatsApp de tu negocio: contesta con tus precios, arma el pedido, lo cobra con Mercado Pago y lo deja cargado. Probalo 7 días gratis.',
  sticky: `<a class="btn btn-main sticky-cta" href="${regAg}">Probalo 7 días gratis</a>`,
  scripts: `<script>(function(){ ${H.PLAYER(ESC_AG)} })();</script>`,
  cuerpo: `
    <header class="hero"><div class="wrap hero-grid">
      <div>
        <span class="pill"><i></i>Agente de WhatsApp para comercios</span>
        <h1>Este mensaje vale $26.400. <mark>Y nadie lo contestó.</mark></h1>
        <p class="sub">Mientras estás en el horno, en el sillón o atendiendo el mostrador, el agente contesta con tus precios, arma el pedido, lo cobra y lo deja cargado. Vos sólo lo preparás.</p>
        <div class="ctas"><a class="btn btn-main" href="${regAg}">Probalo 7 días gratis ${flecha}</a><a class="btn btn-ghost" href="${WA('Hola, vi el video del mensaje de $26.400. Tengo dudas sobre el agente.')}" target="_blank" rel="noopener">${waIco} Hablar por WhatsApp</a></div>
        <div class="checks"><span>${check}7 días gratis</span><span>${check}Te ayudamos por WhatsApp a configurarlo</span><span>${check}Sin permanencia</span></div>
      </div>
      ${H.STAGE('Recreación con precios de ejemplo.')}
    </div></header>

    <section class="gris"><div class="wrap">
      <div class="head reveal"><span class="pill">Lo que pasa hoy</span><h2>Cada mensaje sin contestar es un cliente <mark>que pide en otro lado.</mark></h2></div>
      <div class="dolor reveal">
        <div><b>Contestás tarde</b><p>Cuando por fin agarrás el celular, ya pidió en el local de enfrente.</p></div>
        <div><b>Repetís lo mismo</b><p>Precio, horario, si hacen envío, si aceptan Mercado Pago. Todo el día.</p></div>
        <div><b>Anotás a mano</b><p>El pedido queda en un chat, un papel o tu memoria. Y a veces se pierde.</p></div>
      </div>
    </div></section>

    <section><div class="wrap">
      <div class="head reveal"><span class="pill">No vendemos un chatbot</span><h2>Trabaja <mark>adentro de tu negocio</mark>, no al costado.</h2><p>Hace tres cosas con tus datos reales.</p></div>
      <div class="acc">
        <div class="reveal"><span>01</span><h3>Consulta</h3><p>Precios, stock, carta, horarios y envíos, de tu lista o de tu sistema.</p><code>«¿Tienen muzza?» → $10.900, hay</code></div>
        <div class="reveal"><span>02</span><h3>Registra</h3><p>El pedido o la consulta quedan cargados, con el cobro hecho.</p><code>Pedido #184 · pagado ✓</code></div>
        <div class="reveal"><span>03</span><h3>Avisa</h3><p>A cocina, al dueño o a quien corresponda. Si hace falta una persona, le pasa la charla armada.</p><code>→ Cocina: sale para Caseros</code></div>
      </div>
      <div class="vs">
        <div class="reveal"><h3>Un chatbot común</h3><ul><li>Te hace elegir opciones de un menú</li><li>No sabe tus precios ni tu stock</li><li>Termina en «un asesor te va a contactar»</li><li>El pedido lo cargás vos igual</li></ul></div>
        <div class="si reveal"><h3>El agente de Autopilot</h3><ul><li>Entiende lo que escribe la gente, como lo escribe</li><li>Responde con tus precios reales</li><li>Cierra el pedido y lo cobra</li><li>Lo deja cargado y avisa a quien corresponde</li></ul></div>
      </div>
    </div></section>

    <section class="gris"><div class="wrap">
      <div class="head reveal"><span class="pill">Ya funciona</span><h2>Un laboratorio atiende así <mark>6.500 conversaciones por mes.</mark></h2><p>Más de 36.000 mensajes mensuales en <a href="/casos/laboratorio-biorossi/" style="text-decoration:underline;text-underline-offset:3px">Laboratorio Biorossi</a>: el sistema lee las órdenes médicas, contesta y su equipo atiende sólo lo que necesita una persona.</p></div>
    </div></section>

    <section><div class="wrap">
      <div class="band reveal">
        <div><p>Plan Inicial</p><div class="num">USD 69 <small>/ mes</small></div><p style="margin-top:8px">Con turnos y cobros, Negocio a USD 149. <a href="/precios/" style="color:#fff;text-decoration:underline">Ver planes</a></p></div>
        <ul><li>${check}<span>7 días gratis, sin tarjeta para empezar</span></li><li>${check}<span>Te ayudamos por WhatsApp a dejarlo andando</span></li><li>${check}<span>Sin permanencia: cancelás cuando quieras</span></li><li>${check}<span>La integración con tu sistema se cotiza aparte</span></li></ul>
        <a class="btn btn-lima" href="${regAg}">Crear mi cuenta gratis ${flecha}</a>
      </div>
    </div></section>

    <section class="gris"><div class="wrap">
      <div class="head reveal"><h2>Preguntas</h2></div>
      ${faq([
        ['¿Usa mi número de WhatsApp?', 'Sí, trabaja en el número de tu negocio. Tus clientes escriben donde ya escriben.'],
        ['¿Qué pasa si no entiende algo?', 'Le pasa la charla a una persona de tu equipo, con el pedido o la consulta ya armados. No inventa.'],
        ['¿De dónde saca los precios?', 'De tu carta o lista de precios, que cargás al empezar (te ayudamos) y podés cambiar cuando quieras. Si tenés un sistema, se puede conectar: eso se cotiza aparte.'],
        ['¿Cobra de verdad?', 'Sí: manda el link de Mercado Pago de tu cuenta y el pedido queda confirmado. También acepta efectivo o transferencia, según cómo trabajes.'],
        ['¿Qué pasa después de los 7 días?', 'Si te sirve, elegís un plan desde USD 69 por mes. Si no, no pagás nada.'],
      ])}
    </div></section>

    <section class="final"><div class="wrap">
      <h2>El próximo mensaje de $26.400, <mark>que lo conteste alguien.</mark></h2>
      <div class="ctas" style="justify-content:center"><a class="btn btn-main" href="${regAg}">Probalo 7 días gratis ${flecha}</a></div>
    </div></section>`,
});

// =====================================================================================
// /obras/
// =====================================================================================
const ctaOb = WA('Hola, vi el video de las obras. Quiero probar Obras y rentabilidad 7 días gratis.');
const OBRAS = [['ADROGUÉ', 'Toldo retráctil 6 m', 1240000, 26], ['LOMAS', 'Pérgola + policarbonato', -180000, -6], ['BANFIELD', 'Cerramiento de balcón', 860000, 19], ['TEMPERLEY', 'Techo de policarbonato', 410000, 11]];
const obras = pagina({
  p: '/obras/', title: 'Una de tus obras te hace perder plata. ¿Sabés cuál? · Obras y rentabilidad | Autopilot',
  desc: 'Cargás cada obra con presupuesto, cobros y gastos, y ves la ganancia real, lo que falta cobrar y el estado. Para talleres y contratistas. USD 69 por mes, 7 días gratis.',
  sticky: `<a class="btn btn-main sticky-cta" href="${ctaOb}" target="_blank" rel="noopener">Probalo 7 días gratis</a>`,
  scripts: `<script>
(function () {
  var obs = [].slice.call(document.querySelectorAll('.board .ob')), st = document.getElementById('bst');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fmt = function (n) { return (n < 0 ? '−$' : '+$') + Math.abs(Math.round(n)).toLocaleString('es-AR'); };
  function revelar() {
    obs.forEach(function (o, i) { var g = +o.dataset.g, m = +o.dataset.m, sp = o.querySelector('.g'), bar = o.querySelector('.bar span');
      setTimeout(function () { var t0 = performance.now(), D = reduce ? 0 : 900;
        (function paso(t) { var k = D ? Math.min(1, (t - t0) / D) : 1; sp.textContent = fmt(g * k) + ' · ' + Math.round(m * k) + ' %'; bar.style.width = Math.min(100, Math.abs(m) * 3) * k + '%'; if (k < 1) requestAnimationFrame(paso); else if (g < 0) o.classList.add('neg'); })(t0);
      }, reduce ? 0 : 500 + i * 450); });
    setTimeout(function () { st.textContent = '1 obra en rojo'; st.style.color = '#ff8a78'; }, reduce ? 0 : 2600);
  }
  function ciclo() { obs.forEach(function (o) { o.classList.remove('neg'); o.querySelector('.g').textContent = '$ ???'; o.querySelector('.bar span').style.width = '0'; }); st.textContent = 'calculando…'; st.style.color = ''; setTimeout(revelar, 900); }
  ciclo(); if (!reduce) setInterval(ciclo, 9000);
})();
</script>`,
  cuerpo: `
    <header class="hero"><div class="wrap hero-grid">
      <div>
        <span class="pill"><i></i>Obras y rentabilidad · talleres y contratistas</span>
        <h1>Una de tus obras te hace perder plata. <mark>¿Sabés cuál?</mark></h1>
        <p class="sub">Cargás cada obra con su presupuesto, cobros y gastos, y ves la ganancia real, con comisión e impuestos, lo que falta cobrar y en qué estado está. Se termina la planilla que nadie entiende.</p>
        <div class="ctas"><a class="btn btn-main" href="${ctaOb}" target="_blank" rel="noopener">Probalo 7 días gratis ${flecha}</a><a class="btn btn-ghost" href="#ficha">Ver una obra por dentro</a></div>
        <div class="checks"><span>${check}USD 69 por mes</span><span>${check}Pasamos tu planilla al sistema</span><span>${check}Sin permanencia</span></div>
      </div>
      <div class="stage">
        <div class="board" aria-label="Ejemplo: ganancia real de cuatro obras">
          <div class="board-h"><span>OBRAS · ESTE MES</span><span id="bst">calculando…</span></div>
          ${OBRAS.map(([z, n, g, m]) => `<div class="ob" data-g="${g}" data-m="${m}"><small>OBRA · ${z}</small><b>${n}</b><span class="g">$ ???</span><div class="bar"><span></span></div></div>`).join('')}
        </div>
        <p class="nota">Cifras de ejemplo. Un taller de toldos y policarbonatos ya lleva sus obras así.</p>
      </div>
    </div></header>

    <section class="gris"><div class="wrap">
      <div class="head reveal"><span class="pill">Por qué la planilla te miente</span><h2>Facturaste un montón. <mark>¿Cuánto te quedó?</mark></h2></div>
      <div class="dolor reveal">
        <div><b>La comisión no está</b><p>El vendedor cobra su parte y en la planilla la obra sigue «ganando» lo mismo.</p></div>
        <div><b>Los gastos están en el celular</b><p>Viáticos, un flete, chapas de más: tickets sueltos que nunca llegan a la obra.</p></div>
        <div><b>Los cobros van a medias</b><p>Seña, un pago, otro pago. Nadie sabe bien cuánto falta cobrar de cada una.</p></div>
      </div>
    </div></section>

    <section id="ficha"><div class="wrap split">
      <div class="reveal"><span class="pill">Cada obra, en una ficha</span><h2>La ganancia real, <mark>sin hacer cuentas.</mark></h2><p>Cargás el presupuesto, los cobros y cada gasto. El sistema descuenta comisión e impuestos como los calculás vos y te muestra cuánto ganaste, cuánto falta cobrar y en qué está la obra.</p></div>
      <div class="ficha reveal">
        <span class="k">OBRA · EN CURSO</span><h3>Toldo retráctil 6 m · Adrogué</h3>
        <div class="ln"><span>Presupuesto</span><span>$4.800.000</span></div>
        <div class="ln"><span>Costos y gastos</span><span>−$2.950.000</span></div>
        <div class="ln"><span>Comisión e impuestos</span><span>−$610.000</span></div>
        <div class="tot"><span>Ganancia real</span><b>$1.240.000</b></div>
        <div class="chips"><span>Instalación: jueves</span><span class="r">Falta cobrar $1.800.000</span><span>Margen 26 %</span></div>
      </div>
    </div></section>

    <section class="gris"><div class="wrap">
      <div class="head reveal"><span class="pill">Cada uno ve lo suyo</span><h2>El dueño ve todo. <mark>El resto, lo que le toca.</mark></h2></div>
      <div class="roles reveal">
        <div><h3>Dueño</h3><p>Ganancias, sueldos, cobros y el estado de todas las obras.</p><code>ve: todo</code></div>
        <div><h3>Administración</h3><p>Carga cobros y gastos y sigue las obras. No ve ganancias ni sueldos.</p><code>ve: cobros, gastos, estado</code></div>
        <div><h3>Técnico</h3><p>Ve la ficha de la obra que le toca y, si querés, ficha las horas.</p><code>ve: su ficha</code></div>
      </div>
    </div></section>

    <section><div class="wrap">
      <div class="head reveal"><span class="pill">Cómo arrancás</span><h2>En una semana tenés tus obras <mark>adentro.</mark></h2></div>
      <div class="pasos">
        <div class="paso reveal"><div class="n">1</div><h3>Nos pasás tu planilla</h3><p>La que usás hoy, como esté. La ordenamos y la cargamos nosotros.</p></div>
        <div class="paso reveal"><div class="n">2</div><h3>La revisamos juntos</h3><p>Ajustamos comisiones e impuestos para que las cuentas den como las hacés vos.</p></div>
        <div class="paso reveal"><div class="n">3</div><h3>Usalo 7 días gratis</h3><p>Si te sirve, seguís con el abono. Si no, no pagás nada.</p></div>
      </div>
      <div class="band reveal" style="margin-top:40px">
        <div><p>Obras y rentabilidad</p><div class="num">USD 69 <small>/ mes</small></div><p style="margin-top:8px">Fichaje de horas con ubicación, opcional: USD 19 por mes.</p></div>
        <ul><li>${check}<span>7 días de prueba gratis</span></li><li>${check}<span>Migración de tu planilla incluida</span></li><li>${check}<span>Usuarios con permisos por rol</span></li><li>${check}<span>Sin permanencia</span></li></ul>
        <a class="btn btn-lima" href="${ctaOb}" target="_blank" rel="noopener">Empezar la prueba ${flecha}</a>
      </div>
    </div></section>

    <section class="gris"><div class="wrap">
      <div class="head reveal"><h2>Preguntas</h2></div>
      ${faq([
        ['¿Sirve para mi rubro?', 'Si trabajás por obra o por trabajo, con presupuesto, cobros y gastos: toldos, metalúrgica, carpintería, instalaciones, construcción. Lo vemos en una llamada.'],
        ['¿Tengo que cargar todo de nuevo?', 'No. Nos pasás tu planilla y la migramos nosotros, ordenada.'],
        ['¿Se usa desde el celular?', 'Sí, en la computadora y en el celular. El técnico puede ver su ficha y fichar desde la obra.'],
        ['¿Cómo calcula la ganancia?', 'Presupuesto menos costos y gastos, menos comisión e impuestos, con los porcentajes que uses vos. Lo configuramos juntos al empezar.'],
        ['¿Qué pasa después de los 7 días?', 'Si seguís, pagás USD 69 por mes. Si no, se da de baja y no pagás nada.'],
      ])}
    </div></section>

    <section class="final"><div class="wrap">
      <h2>Encontrá la obra que te hace perder plata <mark>antes de cotizar la próxima.</mark></h2>
      <div class="ctas" style="justify-content:center"><a class="btn btn-main" href="${ctaOb}" target="_blank" rel="noopener">Probalo 7 días gratis ${flecha}</a></div>
    </div></section>`,
});

fs.mkdirSync(path.join(ROOT, 'agente-whatsapp'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'obras'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'agente-whatsapp', 'index.html'), agente);
fs.writeFileSync(path.join(ROOT, 'obras', 'index.html'), obras);
console.log('landings ok:', agente.length, obras.length);
