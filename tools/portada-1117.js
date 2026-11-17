// Cambio de portada 17/11: el gancho del agente arriba (como los anuncios), pizzería primero en el celular,
// y los dos productos con precio justo debajo del héroe. Uso único: node tools/portada-1117.js
const fs = require('fs'), path = require('path');
const f = path.join(__dirname, '..', 'index.html');
let s = fs.readFileSync(f, 'utf8');
const r = (a, b) => { if (!s.includes(a)) throw new Error('no encuentro: ' + a.slice(0, 80)); s = s.replace(a, b); };
const WA = 'https://wa.me/5491157676283?text=' + encodeURIComponent('Hola, quiero probar el agente de WhatsApp en mi negocio.');

r('<title>Automatización de procesos con IA para empresas | Autopilot</title>', '<title>Agente de WhatsApp que toma pedidos y cobra · Autopilot</title>');
r('<h1>Tus clientes escriben. <em>El sistema ya lo resolvió.</em></h1>', '<h1>Este mensaje vale $26.400. <em>Y nadie lo contestó.</em></h1>');
r(/<p class="sub">Leemos los pedidos[^<]*<\/p>/.exec(s)[0], '<p class="sub">Ponemos un agente en el WhatsApp de tu negocio: contesta con tus precios, arma el pedido, lo cobra y lo deja cargado en tu sistema. A tu equipo le llega sólo lo que necesita una persona.</p>');
r('<a class="btn btn-main" href="#contacto">Pedí tu diagnóstico gratis</a>', `<a class="btn btn-main" href="${WA}" target="_blank" rel="noopener">Probalo en tu negocio</a>`);
r(/<a class="link-wa" href="https:\/\/wa\.me\/5491157676283\?text=Hola%2C%20quiero%20automatizar[^>]*>o escribinos por WhatsApp<\/a>/.exec(s)[0], '<a class="link-wa" href="/precios/">Desde USD 69 por mes · ver precios →</a>');
r('Funcionando todos los días en <a href="/casos/laboratorio-biorossi/">Laboratorio Biorossi</a>: así atienden sus órdenes médicas.', 'Funcionando todos los días en <a href="/casos/laboratorio-biorossi/">Laboratorio Biorossi</a>: 6.500 conversaciones por mes.');

// los dos productos, justo debajo del héroe
const sis = /    <section id="sistemas">[\s\S]*?<\/section>\r?\n/.exec(s)[0];
s = s.replace(sis, '');
const card = (eyebrow, h, p, precio, href, txt) => `<a class="pain reveal" href="${href}" style="display:block;border-color:var(--border-strong)"><p class="eyebrow" style="margin-bottom:8px">${eyebrow}</p><h3 style="font-size:1.6rem;line-height:1.1">${h}</h3><p>${p}</p><p style="margin-top:14px;color:var(--white);font-weight:600">${precio}</p><p style="margin-top:10px;color:var(--accent);font-weight:600">${txt} →</p></a>`;
const nuevo = `    <section id="sistemas" style="padding-top:56px">
      <div class="wrap">
        <div class="sec-head reveal"><h2>Dos sistemas <em>listos para usar</em></h2><p>Arrancás en días, sin permanencia. Y si necesitás algo a medida, también lo hacemos.</p></div>
        <div class="pains" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))">
          ${card('Agente de WhatsApp', 'Contesta, arma el pedido, lo cobra y te avisa.', 'Para comida, estética y comercios. Trabaja con tus precios y tu carta, adentro de tu negocio.', 'Desde USD 69 por mes', '/agente-whatsapp/', 'Ver el agente andando')}
          ${card('Obras y rentabilidad', 'Una de tus obras te hace perder plata. ¿Sabés cuál?', 'Para talleres y contratistas: ganancia real de cada obra, lo que falta cobrar y el estado.', 'USD 69 por mes · 7 días gratis', '/obras/', 'Ver una obra por dentro')}
        </div>
      </div>
    </section>
`;
const hero = s.indexOf('<div class="wrap hero">'), primera = s.indexOf('    <section>', hero);
s = s.slice(0, primera) + nuevo + s.slice(primera);

// pizzería primero en el celular
const piz = `piz: { tab: 'Pizzería', name: 'Pizzería', steps: [
          ['Entra el pedido', 'A la hora pico, mientras vos estás en el horno.'],
          ['Contesta con tu carta', 'Precios, envío y demora reales.'],
          ['Arma el pedido y lo cobra', 'Mercado Pago o efectivo. Queda confirmado y cargado.'],
          ['Avisa a cocina', 'Y si hace falta una persona, le pasa la charla armada.']],
        seq: [
          [600, 1, 'out', 'Hola! ¿Tienen muzza? ¿Hacen envío a Caseros?'],
          [900, 2, 'typing'],
          [1900, 2, 'in', '¡Hola! Sí: la Muzzarella grande sale $10.900. A Caseros el envío es $1.500 y tarda unos 40 min. ¿Te armo el pedido?'],
          [1600, 3, 'out', 'Dale, 2 muzza y una coca 1,5 L'],
          [900, 3, 'typing'],
          [1700, 3, 'in', 'Sumé todo:<div class="list"><div>2 Muzzarella <code>$21.800</code></div><div>Coca-Cola 1,5 L <code>$3.100</code></div><div>Envío a Caseros <code>$1.500</code></div><div>Total <code>$26.400</code></div></div>¿Mercado Pago o efectivo?'],
          [1500, 3, 'out', 'Mercado Pago'],
          [1200, 3, 'in', 'Listo ✓ Pedido confirmado. Te paso el link de pago.'],
          [1300, 4, 'sys', '✓ Pedido #184 cargado · cobrado con Mercado Pago'],
          [1200, 4, 'sys', '→ Cocina avisada: sale para Caseros']] },
      lab: { tab: 'Laboratorio'`;
r("lab: { tab: 'Laboratorio'", piz);
r("var order = ['lab', 'fac', 'cob', 'ven'];", "var order = ['piz', 'lab', 'fac', 'cob', 'ven'];");
r("var cur = 'lab',", "var cur = 'piz',");
r("started = true; play('lab');", "started = true; play('piz');");
r('<div class="wa-name" id="wname">Laboratorio</div>', '<div class="wa-name" id="wname">Pizzería</div>');
r('<div class="chat" id="chat"><div class="msg in show">Hola, les mando la orden del médico. ¿Lo cubre mi obra social?</div><div class="msg out show">Ya la leí: son 3 estudios y los cubre tu obra social. Te paso horarios de la sede más cercana.</div></div>',
  '<div class="chat" id="chat"><div class="msg out show">Hola! ¿Tienen muzza? ¿Hacen envío a Caseros?</div><div class="msg in show">¡Hola! Sí: la Muzzarella grande sale $10.900. ¿Te armo el pedido?</div></div>');
fs.writeFileSync(f, s);
console.log('portada ok');
