const fs = require('fs'), path = require('path');
const ROOT = 'F:/autopilot/web', SITE = 'https://autopilot.com.ar';
const WA = 'https://wa.me/5491157676283?text=' + encodeURIComponent('Hola, quiero ver si puedo automatizar un proceso con Autopilot.');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = s => s.replace(/<[^>]+>/g, '');

const SERVICIOS = [
  ['/servicios/lectura-de-documentos-con-ia/', 'Lectura de documentos con IA'],
  ['/servicios/integracion-de-sistemas/', 'Integración de sistemas'],
  ['/servicios/automatizacion-whatsapp/', 'Automatización de WhatsApp'],
];
const RUBROS = [
  ['/rubros/laboratorios/', 'Laboratorios'],
  ['/rubros/distribuidoras/', 'Distribuidoras'],
];

const card = (n, t, p) => `<div class="card"><span class="num">${n}</span><h3>${t}</h3><p>${p}</p></div>`;
const linkCard = (href, t, p) => `<a class="card" href="${href}"><h3>${t} →</h3><p>${p}</p></a>`;
const list = items => `<ul class="list">${items.map(i => `<li>${i}</li>`).join('')}</ul>`;

function page(p) {
  const url = SITE + p.path;
  const crumbs = [['/', 'Inicio'], ...(p.crumb ? [p.crumb] : []), [p.path, p.short]];
  const ld = [
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map(([h, n], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE + h })) },
    p.schema,
  ];
  if (p.faq) ld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) });
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.desc)}" />
  <link rel="canonical" href="${url}" />
  <meta name="theme-color" content="#060608" />
  <meta property="og:locale" content="es_AR" />
  <meta property="og:type" content="${p.ogType || 'website'}" />
  <meta property="og:title" content="${esc(p.title)}" />
  <meta property="og:description" content="${esc(p.desc)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:site_name" content="Autopilot" />
  <meta property="og:image" content="${SITE}/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="preload" href="/assets/fonts/syne-latin-8vIH7w4q.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/assets/fonts/dmsans-latin-rP2Yp2yw.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/assets/fonts.css" />
  <link rel="stylesheet" href="/assets/site.css" />
${ld.map(o => `  <script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body>
  <nav>
    <div class="nav-inner">
      <a href="/" class="nav-logo">Autopilot<span>.</span></a>
      <ul class="nav-links">
        <li><a href="/servicios/lectura-de-documentos-con-ia/">Documentos</a></li>
        <li><a href="/servicios/integracion-de-sistemas/">Integraciones</a></li>
        <li><a href="/servicios/automatizacion-whatsapp/">WhatsApp</a></li>
        <li><a href="/casos/laboratorio-biorossi/">Caso Biorossi</a></li>
      </ul>
      <a class="nav-cta" href="/#contacto">Pedir diagnóstico</a>
    </div>
  </nav>

  <main>
    <div class="wrap crumbs">${crumbs.map(([h, n], i) => i < crumbs.length - 1 ? `<a href="${h}">${n}</a> / ` : `<span>${n}</span>`).join('')}</div>
    <header class="hero">
      <div class="wrap">
        <p class="label">${p.label}</p>
        <h1>${p.h1}</h1>
        <p class="lead">${p.lead}</p>
        <div class="actions">
          <a class="btn" href="/#contacto">Pedir diagnóstico gratis</a>
          <a class="btn-ghost" href="${WA}" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>
        </div>
      </div>
    </header>

${p.sections.map(s => `    <section>
      <div class="wrap">
        <h2>${s.h2}</h2>
        ${s.body}
      </div>
    </section>`).join('\n\n')}
${p.faq ? `
    <section class="faq">
      <div class="wrap">
        <h2>Preguntas frecuentes</h2>
        ${p.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n        ')}
      </div>
    </section>` : ''}

    <section class="cta">
      <div class="wrap">
        <div class="cta-box">
          <h2>${p.ctaTitle || 'Contanos qué querés automatizar'}</h2>
          <p>El diagnóstico es gratis. Te decimos si vale la pena, qué alcance tendría, en cuánto tiempo y cuánto cuesta.</p>
          <div class="actions">
            <a class="btn" href="/#contacto">Pedir diagnóstico</a>
            <a class="btn-ghost" href="${WA}" target="_blank" rel="noopener noreferrer">WhatsApp: +54 9 11 5767-6283</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer>
    <div class="footer-inner">
      <div>
        <a href="/" class="footer-logo">Autopilot<span>.</span></a>
        <p class="footer-copy">© 2026 Autopilot · Buenos Aires, Argentina</p>
      </div>
      <div class="footer-cols">
        <div><p>Servicios</p>${SERVICIOS.map(([h, n]) => `<a href="${h}">${n}</a>`).join('')}</div>
        <div><p>Rubros</p>${RUBROS.map(([h, n]) => `<a href="${h}">${n}</a>`).join('')}<a href="/casos/laboratorio-biorossi/">Caso Biorossi</a></div>
        <div><p>Autopilot</p><a href="/#contacto">Contacto</a><a href="https://www.linkedin.com/in/fernando-alonso-75b9a086/" target="_blank" rel="noopener">LinkedIn</a><a href="https://www.instagram.com/autopilot.com.ar/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://www.tiktok.com/@autopilot.com.ar" target="_blank" rel="noopener noreferrer">TikTok</a></div>
      </div>
    </div>
  </footer>
</body>
</html>
`;
  const out = path.join(ROOT, p.path, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  return p.path;
}

const provider = { '@id': SITE + '/#org' };
const service = (name, desc, extra = {}) => ({ '@context': 'https://schema.org', '@type': 'Service', name, description: desc, provider: { '@type': 'ProfessionalService', name: 'Autopilot', url: SITE + '/', ...provider }, areaServed: { '@type': 'Country', name: 'Argentina' }, ...extra });

const pages = [
  {
    path: '/servicios/lectura-de-documentos-con-ia/', short: 'Lectura de documentos con IA', crumb: null,
    title: 'Lectura de documentos con IA: facturas y órdenes | Autopilot',
    desc: 'Sistema que lee facturas, órdenes y formularios con IA, valida los datos contra tus sistemas y los carga solo. A medida y en producción. Diagnóstico gratis.',
    label: 'Servicio · Documentos',
    h1: 'Lectura de documentos con IA para tu empresa',
    lead: 'Facturas, órdenes médicas, remitos y formularios llegan por mail, WhatsApp o foto. El sistema los lee, valida cada dato contra tus sistemas y lo carga donde corresponde.',
    schema: service('Lectura de documentos con IA', 'Extracción de datos de facturas, órdenes y formularios con IA, validación contra los sistemas de la empresa y carga automática.', { serviceType: 'Procesamiento de documentos con IA' }),
    sections: [
      { h2: 'Qué documentos lee', body: `<div class="grid">${[
        card('01', 'Facturas de proveedores', 'PDF o foto. Se extraen CUIT, número, fecha, ítems e importes y se cruzan con el proveedor y la orden de compra.'),
        card('02', 'Órdenes médicas', 'Se identifica cada estudio pedido y se busca su código en el sistema del laboratorio.'),
        card('03', 'Remitos y órdenes de compra', 'Lo que llega se compara con lo que se pidió, y las diferencias quedan marcadas para revisar.'),
        card('04', 'Formularios y planillas', 'Formularios escaneados, planillas que manda un cliente o datos que hoy alguien tipea a mano.'),
      ].join('')}</div>` },
      { h2: 'Cómo funciona', body: `<p>La IA lee el documento. El resto del sistema decide qué hacer con lo que leyó, con reglas escritas para tu proceso.</p>${list([
        '<strong>Entrada.</strong> El documento llega por el canal que ya usan: mail, WhatsApp, una carpeta compartida o un formulario.',
        '<strong>Lectura.</strong> La IA extrae los datos aunque el formato cambie de un proveedor a otro.',
        '<strong>Validación.</strong> Cada dato se controla contra tus sistemas: proveedores, órdenes de compra, códigos, precios.',
        '<strong>Carga.</strong> Lo que cierra se carga solo en el ERP o el sistema que corresponda. Lo que no cierra va a una persona con el campo dudoso marcado.',
      ])}<p>Cada paso queda registrado, así podés ver qué se cargó, cuándo y por qué.</p>` },
      { h2: 'En producción', body: `<p>En el <a href="/casos/laboratorio-biorossi/">Laboratorio Biorossi</a> el sistema lee las órdenes médicas que mandan los pacientes y cruza cada estudio con los códigos de GLYMS, su sistema de gestión, con búsqueda exacta, por alias, aproximada y semántica.</p><p>Para ver cómo queda con facturas de proveedores, mirá la <a href="/demo-facturas">demo de lectura de facturas</a>.</p>` },
    ],
    faq: [
      ['¿Qué pasa si la foto o el PDF vienen mal?', 'El sistema marca los campos que no pudo leer con seguridad y los manda a revisión. Nada dudoso se carga solo.'],
      ['¿Se integra con mi ERP?', 'Si tu ERP tiene API, base de datos accesible o importación por archivo, sí. Lo confirmamos en el diagnóstico antes de presupuestar.'],
      ['¿Sirve si cada proveedor manda un formato distinto?', 'Sí. La lectura con IA trabaja sobre el contenido del documento, así que no hace falta armar una plantilla por proveedor.'],
      ['¿Dónde quedan los datos?', 'En tus sistemas. En el diseño definimos con vos dónde se procesa cada documento y quién accede a qué.'],
    ],
  },
  {
    path: '/servicios/integracion-de-sistemas/', short: 'Integración de sistemas', crumb: null,
    title: 'Integración de sistemas: ERP, CRM y planillas | Autopilot',
    desc: 'Conectamos tu ERP, CRM, planillas y sistemas propios para que el dato se cargue una sola vez. Integraciones a medida en Argentina. Diagnóstico gratis.',
    label: 'Servicio · Integraciones',
    h1: 'Integración de sistemas para que el dato se cargue una sola vez',
    lead: 'CRM, ERP, planillas, sistemas propios y APIs conectados entre sí. Tu equipo deja de copiar datos de una pantalla a otra.',
    schema: service('Integración de sistemas', 'Integración a medida de ERP, CRM, planillas, bases de datos y sistemas propios mediante APIs y automatizaciones.', { serviceType: 'Integración de sistemas' }),
    sections: [
      { h2: 'Cuándo conviene integrar', body: list([
        'Alguien pasa a mano los pedidos del CRM al sistema de facturación.',
        'La misma información vive en tres planillas y ninguna coincide.',
        'Para contestar una consulta hay que abrir dos o tres sistemas.',
        'Un proceso depende de que una persona se acuerde de exportar e importar un archivo.',
      ]) },
      { h2: 'Qué conectamos', body: `<div class="grid">${[
        card('01', 'ERP y facturación', 'Pedidos, facturas, cobranzas y stock que se actualizan solos.'),
        card('02', 'CRM y ventas', 'Prospectos y clientes que llegan calificados y con su historial.'),
        card('03', 'Planillas y bases de datos', 'Google Sheets, Excel o bases SQL como fuente o destino de datos.'),
        card('04', 'Sistemas propios', 'Si tu sistema es viejo o hecho a medida, trabajamos con su base, sus exportaciones o lo que tenga disponible.'),
      ].join('')}</div>` },
      { h2: 'Cómo lo hacemos', body: `${list([
        '<strong>Relevamiento.</strong> Vemos qué sistemas usan, por dónde entra cada dato y dónde se traba.',
        '<strong>Diseño técnico.</strong> Definimos qué se conecta con qué, las reglas y qué pasa cuando algo falla. Te pasamos alcance, plazo y costo cerrados.',
        '<strong>Implementación y operación.</strong> Código propio para tu caso, registro de cada paso, alertas y documentación. El sistema queda a tu nombre.',
      ])}<p>Un ejemplo en producción: en el <a href="/casos/laboratorio-biorossi/">Laboratorio Biorossi</a> la atención por Chatwoot está integrada con GLYMS, el sistema del laboratorio.</p>` },
    ],
    faq: [
      ['¿Hace falta cambiar de sistema?', 'No necesariamente. Casi siempre el valor está en conectar mejor lo que ya usás.'],
      ['Mi sistema no tiene API, ¿se puede?', 'En muchos casos sí, trabajando con la base de datos, exportaciones automáticas o archivos. Lo evaluamos en el diagnóstico.'],
      ['¿Qué pasa si una integración falla?', 'Queda registrado, se reintenta cuando corresponde y te llega una alerta. Ningún dato se pierde en silencio.'],
    ],
  },
  {
    path: '/servicios/automatizacion-whatsapp/', short: 'Automatización de WhatsApp', crumb: null,
    title: 'Automatización de WhatsApp para empresas | Autopilot',
    desc: 'WhatsApp, mail y web conectados a tu operación: respuestas con datos reales, lectura de documentos y derivación a la persona correcta. Diagnóstico gratis.',
    label: 'Servicio · Canales',
    h1: 'Automatización de WhatsApp conectada a tu operación',
    lead: 'Las consultas que llegan por WhatsApp, mail o la web se responden con datos reales de tus sistemas. Lo que necesita una persona le llega a la persona correcta, con el contexto armado.',
    schema: service('Automatización de WhatsApp para empresas', 'Atención por WhatsApp, mail y web conectada a los sistemas de la empresa, con lectura de documentos y derivación a personas.', { serviceType: 'Automatización de atención por WhatsApp' }),
    sections: [
      { h2: 'Un bot contesta. Un sistema resuelve.', body: `<p>Un bot suelto responde preguntas con textos armados. Lo que construimos está conectado a tu stock, tus precios, tu agenda o tu sistema de gestión, y aplica las reglas de tu negocio antes de responder.</p><p>El canal es la puerta de entrada. El trabajo lo hace el sistema que está atrás.</p>` },
      { h2: 'Qué puede resolver', body: `<div class="grid">${[
        card('01', 'Consultas con datos reales', 'Stock, precios, estado de un pedido, preparación de un estudio o cobertura de una obra social, sacados de tus sistemas.'),
        card('02', 'Documentos por WhatsApp', 'El cliente manda una orden, un comprobante o una factura y el sistema la lee y la procesa.'),
        card('03', 'Cobranzas y recordatorios', 'Seguimiento de deuda con reglas, registro de promesas de pago y aviso a una persona cuando hace falta.'),
        card('04', 'Derivación con contexto', 'Cuando la consulta la tiene que tomar alguien del equipo, le llega con la nota lista y a la persona que corresponde.'),
      ].join('')}</div>` },
      { h2: 'Cómo se ve', body: `<p>En el <a href="/casos/laboratorio-biorossi/">Laboratorio Biorossi</a> un orquestador sobre Chatwoot resuelve el flujo de cada paciente (consultas, obras sociales, particular, domicilio), aplica la configuración de cada sede y deriva con todo el contexto.</p><p>También podés probar la <a href="/demo-bot-cobranzas">demo de cobranzas</a> y la <a href="/demo-bot-prospectos">demo de captura de prospectos</a>.</p>` },
    ],
    faq: [
      ['¿Necesito la API oficial de WhatsApp Business?', 'Para automatizar con volumen, sí. La licencia y el costo de los mensajes se cotizan aparte y te ayudamos a darla de alta.'],
      ['¿Reemplaza a mi equipo de atención?', 'No. Se encarga de lo repetitivo y le pasa a tu equipo las conversaciones que necesitan una persona, ya ordenadas.'],
      ['¿Qué pasa si el sistema no sabe la respuesta?', 'Deriva a una persona con el resumen de la conversación. Preferimos derivar antes que inventar una respuesta.'],
      ['¿Funciona también con mail y la web?', 'Sí. El mismo sistema puede atender WhatsApp, mail y el chat de tu web con las mismas reglas.'],
    ],
  },
  {
    path: '/rubros/laboratorios/', short: 'Laboratorios', crumb: null,
    title: 'Automatización para laboratorios clínicos | Autopilot',
    desc: 'Sistema de atención para laboratorios: lectura de órdenes médicas con IA, cruce con los códigos de tu sistema, reglas por sede y derivación. Caso real.',
    label: 'Rubro · Laboratorios y salud',
    h1: 'Automatización para laboratorios de análisis clínicos',
    lead: 'Órdenes médicas que llegan por WhatsApp, consultas por obra social y preparación, varias sedes con reglas distintas. Armamos el sistema que ordena todo eso detrás de tu call center.',
    schema: service('Automatización para laboratorios de análisis clínicos', 'Sistema de atención para laboratorios con lectura de órdenes médicas con IA, cruce con códigos del sistema de gestión, reglas por sede y derivación a agentes.', { audience: { '@type': 'BusinessAudience', name: 'Laboratorios de análisis clínicos' } }),
    sections: [
      { h2: 'Lo que el sistema resuelve', body: `<div class="grid">${[
        card('01', 'Lectura de la orden', 'El paciente manda la foto de la orden y la IA identifica cada estudio pedido.'),
        card('02', 'Cruce con tus códigos', 'Cada estudio se busca en el sistema del laboratorio con búsqueda exacta, por alias, aproximada y semántica.'),
        card('03', 'Reglas por sede', 'Horarios, estudios disponibles y condiciones de cada sede aplicados automáticamente.'),
        card('04', 'Nota lista para el agente', 'Cuando hace falta una persona, recibe la consulta resuelta en lo posible y con todo el contexto.'),
      ].join('')}</div>` },
      { h2: 'Caso real: Laboratorio Biorossi', body: `<p>Biorossi es un laboratorio de análisis clínicos de zona sur del Gran Buenos Aires con varias sedes. Diseñamos el sistema completo detrás de su call center, integrado con GLYMS y Chatwoot, y hoy está en producción.</p><p><a class="btn-ghost" href="/casos/laboratorio-biorossi/">Ver el caso completo →</a></p>` },
      { h2: 'Por dónde empezar', body: `<p>No hace falta automatizar todo de una vez. Se puede arrancar por la lectura de órdenes, que suele ser donde más tiempo se va, y después sumar las reglas por sede y la derivación.</p><p>En el diagnóstico vemos cómo atienden hoy, qué sistema usan y qué conviene hacer primero.</p>` },
    ],
    faq: [
      ['¿Funciona con mi sistema de laboratorio?', 'En Biorossi está integrado con GLYMS. Si usás otro sistema, vemos en el diagnóstico cómo conectarlo.'],
      ['¿Qué pasa con los datos de los pacientes?', 'Se usan para resolver la consulta y quedan en los sistemas del laboratorio. En el diseño definimos con vos quién accede a cada dato.'],
      ['¿Los pacientes tienen que instalar algo?', 'No. Escriben por el canal que ya usan, normalmente WhatsApp.'],
    ],
    ctaTitle: 'Contanos cómo atiende hoy tu laboratorio',
  },
  {
    path: '/rubros/distribuidoras/', short: 'Distribuidoras', crumb: null,
    title: 'Automatización para distribuidoras | Autopilot',
    desc: 'Carga de facturas de proveedores al ERP con IA, pedidos por WhatsApp con stock y precios reales, cobranzas e integraciones. Diagnóstico gratis.',
    label: 'Rubro · Distribuidoras',
    h1: 'Automatización para distribuidoras',
    lead: 'Facturas de proveedores, pedidos por WhatsApp, stock y precios que cambian todas las semanas. Conectamos todo eso para que tu equipo deje de cargar a mano.',
    schema: service('Automatización para distribuidoras', 'Lectura de facturas de proveedores con IA, pedidos y consultas por WhatsApp con datos reales, cobranzas e integración de sistemas para distribuidoras.', { audience: { '@type': 'BusinessAudience', name: 'Distribuidoras' } }),
    sections: [
      { h2: 'Dónde se va el tiempo', body: list([
        'Cargar a mano cada factura de proveedor en el ERP y controlarla contra la orden de compra.',
        'Contestar por WhatsApp la misma consulta de stock o precio decenas de veces por día.',
        'Perseguir cobranzas con una planilla y recordatorios manuales.',
        'Pasar pedidos de un sistema a otro porque no se hablan.',
      ]) },
      { h2: 'Qué automatizamos', body: `<div class="grid">${[
        linkCard('/servicios/lectura-de-documentos-con-ia/', 'Facturas de proveedores al ERP', 'La IA lee la factura, se valida contra proveedor y orden de compra y se carga sin tipeo.'),
        linkCard('/servicios/automatizacion-whatsapp/', 'Pedidos y consultas por WhatsApp', 'Respuestas con el stock y los precios reales, y pedidos que entran directo al sistema.'),
        linkCard('/servicios/automatizacion-whatsapp/', 'Cobranzas con reglas', 'Seguimiento de deuda, promesas de pago registradas y aviso a una persona cuando hace falta.'),
        linkCard('/servicios/integracion-de-sistemas/', 'ERP, CRM y planillas conectados', 'El dato se carga una vez y llega a donde tiene que llegar.'),
      ].join('')}</div>` },
      { h2: 'Miralo funcionando', body: `<p>En la <a href="/demo-facturas">demo de lectura de facturas</a> ves cómo una factura en PDF pasa al ERP con validación. En la <a href="/demo-bot-cobranzas">demo de cobranzas</a>, cómo se hace el seguimiento de deuda.</p>` },
    ],
    faq: [
      ['Uso un ERP chico o planillas, ¿sirve igual?', 'Sí. Hay un nivel puntual pensado para automatizar un solo proceso, y se integra con lo que ya usás.'],
      ['¿Por dónde conviene empezar?', 'Por la tarea con más volumen y más errores, que suele ser la carga de facturas o las consultas por WhatsApp. Lo definimos en el diagnóstico.'],
    ],
    ctaTitle: 'Contanos qué se carga a mano en tu distribuidora',
  },
  {
    path: '/casos/laboratorio-biorossi/', short: 'Caso Biorossi', crumb: null, ogType: 'article',
    title: 'Caso Laboratorio Biorossi: atención con IA | Autopilot',
    desc: 'Cómo construimos el sistema detrás del call center de Laboratorio Biorossi: lectura de órdenes médicas con IA, cruce con GLYMS, reglas por sede y Chatwoot.',
    label: 'Caso real · En producción',
    h1: 'Laboratorio Biorossi: el sistema detrás del call center',
    lead: 'Biorossi es un laboratorio de análisis clínicos de zona sur del Gran Buenos Aires con varias sedes. Diseñamos y operamos el sistema que atiende a sus pacientes, lee las órdenes médicas y deja cada consulta lista para el equipo.',
    schema: { '@context': 'https://schema.org', '@type': 'Article', headline: 'Laboratorio Biorossi: el sistema detrás del call center', inLanguage: 'es-AR', author: { '@type': 'Person', name: 'Fernando Alonso', url: 'https://www.linkedin.com/in/fernando-alonso-75b9a086/' }, publisher: { '@type': 'Organization', name: 'Autopilot', logo: { '@type': 'ImageObject', url: SITE + '/logo.png' } }, image: SITE + '/og-image.png', datePublished: '2026-10-24', about: { '@type': 'MedicalBusiness', name: 'Laboratorio Biorossi', url: 'https://biorossi.com.ar/' } },
    sections: [
      { h2: 'El desafío', body: `<p>Los pacientes escriben por el canal que usan y mandan la foto de su orden. Cada estudio de esa orden hay que identificarlo y encontrar su código en GLYMS, el sistema de gestión del laboratorio. Además, cada sede tiene su configuración, y las consultas cambian según sea obra social, particular o domicilio.</p><p>Todo eso pasaba por el call center.</p>` },
      { h2: 'Lo que construimos', body: list([
        '<strong>Lectura de órdenes con IA.</strong> El sistema lee la orden e identifica cada estudio pedido.',
        '<strong>Cruce con GLYMS.</strong> Cada estudio se busca contra los códigos del laboratorio con cuatro niveles: coincidencia exacta, por alias, aproximada y semántica.',
        '<strong>Orquestador sobre Chatwoot.</strong> Resuelve el flujo de cada conversación: consultas, obras sociales, particular y domicilio.',
        '<strong>Reglas por sede.</strong> Se aplica la configuración de cada sede sin que el agente tenga que recordarla.',
        '<strong>Derivación con contexto.</strong> El agente recibe la nota lista y la consulta llega a la persona correcta.',
      ]) },
      { h2: 'Cómo lo trabajamos', body: `<p>Arrancamos con un relevamiento junto al equipo del laboratorio para entender cómo atendían y dónde se trababan. Después diseñamos la arquitectura, la integramos con los sistemas que ya usaban y la pusimos en producción.</p><p>Hoy el sistema corre en producción. Lo monitoreamos todos los días y lo seguimos mejorando con lo que aparece en las conversaciones reales.</p>` },
      { h2: 'Tecnología', body: `<div class="grid">${[
        card('Lectura', 'IA para documentos', 'Extracción de los estudios desde la foto de la orden médica.'),
        card('Integración', 'GLYMS', 'Códigos de estudios y datos del laboratorio.'),
        card('Atención', 'Chatwoot', 'Bandeja de conversaciones del equipo, con el orquestador por encima.'),
      ].join('')}</div><p style="margin-top:20px">Sitio del laboratorio: <a href="https://biorossi.com.ar/" target="_blank" rel="noopener">biorossi.com.ar</a></p>` },
      { h2: '¿Tenés un laboratorio o un call center parecido?', body: `<p>Mirá cómo lo planteamos para el rubro en <a href="/rubros/laboratorios/">automatización para laboratorios</a>, o contanos tu caso y lo vemos en el diagnóstico.</p>` },
    ],
    faq: null,
    ctaTitle: 'Contanos cómo atiende hoy tu equipo',
  },
];

console.log(pages.map(page));
