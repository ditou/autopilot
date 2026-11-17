// Portada clara (17/11, referencia contactship.ai): celular realista con el agente andando, "probalo ahora",
// panel de la app, 3 pasos, rubros, Obras, precios, Fer, preguntas y contacto. Acento: lima de Autopilot.
// Toma de tools/base-oscura.html (la portada anterior) el <head> con metadatos, el chat de la web y el formulario.
// Uso: node tools/build-home.js
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const vieja = fs.readFileSync(path.join(__dirname, 'base-oscura.html'), 'utf8');
const corta = (a, b, desde = 0) => { const i = vieja.indexOf(a, desde), j = vieja.indexOf(b, i + a.length); if (i < 0 || j < 0) throw new Error('no encuentro ' + a); return [i, j]; };
// <head> hasta antes del <style>, con título y descripción nuevos
let [h0, h1] = corta('<!doctype html>', '<style>');
let head = vieja.slice(h0, h1)
  .replace(/<title>[^<]*<\/title>/, '<title>Agente de WhatsApp que toma pedidos, cobra y avisa · Autopilot</title>')
  .replace(/(<meta name="description" content=")[^"]*/, '$1Un agente en el WhatsApp de tu negocio: contesta con tus precios, arma el pedido, lo cobra con Mercado Pago y lo deja cargado. Desde USD 69 por mes, sin permanencia.')
  .replace(/<meta name="theme-color" content="[^"]*"/, '<meta name="theme-color" content="#ffffff"');
// chat de la web: estilos, html y script
const [w0, w1] = corta('/* CHAT WIDGET */', '/* SERVICES STRIP */');
const widgetCss = vieja.slice(w0, w1);
const rootVars = /:root \{[\s\S]*?\}/.exec(vieja)[0].replace(':root', '#ap-btn, #ap-panel, #ap-tooltip');
const [x0] = corta('<div id="ap-tooltip">', '</div>');
const widgetHtml = vieja.slice(x0, vieja.indexOf('<script>', x0));
const sW = vieja.lastIndexOf('<script>', vieja.indexOf("var WEBHOOK"));
const widgetJs = vieja.slice(sW, vieja.indexOf('</script>', sW) + 9);
const [f0, f1] = corta('<form class="reveal" method="POST"', '</form>');
const form = vieja.slice(f0, f1 + 7).replace('class="reveal" ', '');

const WA = t => 'https://wa.me/5491157676283?text=' + encodeURIComponent(t);
const REG = 'https://app.autopilot.com.ar/registro.html';
const ctaMain = REG + '?utm_source=web';
const ctaSoporte = WA('Hola, estoy probando Autopilot y necesito una mano para configurarlo.');
const check = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const flecha = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const waIco = '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z"/></svg>';

const CSS = `<style>
  :root { --bg: #ffffff; --bg2: #f6f7f4; --ink: #0e1210; --ink2: #3c4440; --gray: #6b726e; --line: #e6e9e4; --lima: #c8e62e; --lima2: #e9f6a8; --lima-ink: #3d5200; --verde: #1f9c6b; --rojo: #e2553f;
    --font-display: 'Syne', sans-serif; --font-body: 'DM Sans', system-ui, sans-serif; --font-mono: 'DM Mono', ui-monospace, monospace; --max: 1160px; --ease: cubic-bezier(.22,1,.36,1);
    --sombra: 0 1px 2px rgba(16,24,16,.04), 0 12px 32px -12px rgba(16,24,16,.14); }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; overflow-x: clip; }
  body { background: var(--bg); color: var(--ink); font-family: var(--font-body); line-height: 1.5; overflow-x: clip; }
  a { color: inherit; text-decoration: none; }
  h1, h2, h3 { font-family: var(--font-body); font-weight: 700; letter-spacing: -0.03em; text-wrap: balance; line-height: 1.08; }
  p { text-wrap: pretty; }
  mark { background: linear-gradient(transparent 12%, var(--lima) 12%, var(--lima) 88%, transparent 88%); color: inherit; padding: 0 .12em; border-radius: 4px; }
  .wrap { width: min(var(--max), calc(100% - 40px)); margin: 0 auto; }
  section { padding: 104px 0; }
  .pill { display: inline-flex; align-items: center; gap: 8px; font-size: .82rem; font-weight: 600; color: var(--ink2); background: var(--bg); border: 1px solid var(--line); border-radius: 999px; padding: 6px 12px; box-shadow: var(--sombra); }
  .pill i { width: 8px; height: 8px; border-radius: 50%; background: var(--verde); box-shadow: 0 0 0 4px rgba(31,156,107,.15); }
  .head { text-align: center; max-width: 720px; margin: 0 auto 56px; }
  .head h2 { font-size: clamp(2rem, 4.4vw, 3.1rem); margin: 16px 0 14px; }
  .head p { color: var(--gray); font-size: 1.12rem; }
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; border-radius: 12px; font-weight: 700; font-size: 1rem; padding: 14px 22px; transition: transform .25s var(--ease), box-shadow .25s; cursor: pointer; border: 0; font-family: inherit; }
  .btn:hover { transform: translateY(-2px); }
  .btn-main { background: var(--ink); color: #fff; box-shadow: 0 10px 24px -10px rgba(14,18,16,.55); }
  .btn-lima { background: var(--lima); color: var(--ink); box-shadow: 0 10px 24px -12px rgba(140,170,0,.8); }
  .btn-ghost { background: #fff; color: var(--ink); border: 1px solid var(--line); }
  .btn-sm { padding: 10px 16px; font-size: .92rem; }
  .js .reveal { opacity: 0; transform: translateY(22px); transition: opacity .8s var(--ease), transform .8s var(--ease); }
  .js .reveal.in { opacity: 1; transform: none; }
  :focus-visible { outline: 2px solid var(--verde); outline-offset: 3px; }

  /* nav */
  nav { position: sticky; top: 0; z-index: 40; background: rgba(255,255,255,.82); backdrop-filter: saturate(1.6) blur(14px); border-bottom: 1px solid var(--line); }
  .nav-in { display: flex; align-items: center; gap: 28px; height: 66px; }
  .logo { font-family: var(--font-display); font-weight: 800; font-size: 1.35rem; letter-spacing: -.02em; }
  .logo span { color: var(--lima-ink); background: var(--lima); border-radius: 4px; padding: 0 3px; margin-left: 1px; }
  .nav-links { display: flex; gap: 26px; list-style: none; margin-left: 14px; font-size: .95rem; color: var(--ink2); font-weight: 500; }
  .nav-links a:hover { color: var(--ink); }
  .nav-r { margin-left: auto; display: flex; gap: 10px; align-items: center; }
  .legal-top { font-size: .72rem; color: var(--gray); padding: 6px 0; border-bottom: 1px solid var(--line); background: var(--bg2); }
  .legal-top a { text-decoration: underline; text-underline-offset: 2px; }

  /* hero */
  .hero { position: relative; padding: 64px 0 88px; overflow: hidden; }
  .hero::before { content: ''; position: absolute; inset: -20% -10% auto auto; width: 760px; height: 760px; background: radial-gradient(closest-side, rgba(200,230,46,.35), rgba(200,230,46,0)); pointer-events: none; }
  .hero::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px); background-size: 48px 48px; mask-image: radial-gradient(ellipse at 30% 30%, #000 0%, transparent 65%); opacity: .55; pointer-events: none; }
  .hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); gap: 56px; align-items: center; }
  .hero h1 { font-size: clamp(2.5rem, 5.6vw, 4.3rem); margin: 22px 0 20px; letter-spacing: -.045em; }
  .hero .sub { font-size: 1.18rem; color: var(--ink2); max-width: 540px; }
  .ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 30px; }
  .checks { display: flex; flex-wrap: wrap; gap: 8px 20px; margin-top: 20px; font-size: .9rem; color: var(--ink2); }
  .checks span { display: inline-flex; align-items: center; gap: 6px; }
  .checks svg { color: var(--verde); }
  .try { margin-top: 34px; background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 18px; box-shadow: var(--sombra); max-width: 540px; }
  .try small { display: block; font-family: var(--font-mono); font-size: .7rem; letter-spacing: .1em; color: var(--gray); margin-bottom: 12px; }
  .try a { display: flex; gap: 14px; align-items: center; padding: 10px; border-radius: 12px; transition: background .2s; }
  .try a:hover { background: var(--bg2); }
  .try .ic { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; background: #e7f8ee; color: #1a9d55; flex: none; }
  .try b { display: block; font-size: .98rem; }
  .try span { font-size: .86rem; color: var(--gray); }
  .try .go { margin-left: auto; color: var(--ink); }

  /* teléfono */
  .stage { position: relative; display: flex; flex-direction: column; align-items: center; }
  .iphone { position: relative; width: 340px; height: 690px; border-radius: 54px; background: #111; padding: 12px; box-shadow: 0 50px 90px -30px rgba(16,24,16,.45), inset 0 0 0 2px #2a2a2a; }
  .iphone::before { content: ''; position: absolute; top: 22px; left: 50%; transform: translateX(-50%); width: 104px; height: 30px; background: #000; border-radius: 20px; z-index: 3; }
  .scr { width: 100%; height: 100%; border-radius: 43px; overflow: hidden; background: #efeae2; display: flex; flex-direction: column; }
  .sbar { display: flex; justify-content: space-between; padding: 16px 28px 0; font-size: .78rem; font-weight: 700; height: 44px; background: #f7f7f7; }
  .wah { display: flex; align-items: center; gap: 10px; padding: 8px 14px 10px; background: #f7f7f7; border-bottom: 1px solid #e3e3e3; }
  .wah .av { width: 36px; height: 36px; border-radius: 50%; background: var(--lima); display: grid; place-items: center; font-weight: 800; font-size: .9rem; }
  .wah b { display: block; font-size: .92rem; }
  .wah span { font-size: .74rem; color: #667781; }
  .cht { flex: 1; padding: 14px 12px; display: flex; flex-direction: column; justify-content: flex-end; gap: 6px; overflow: hidden;
    background-color: #efeae2; background-image: radial-gradient(rgba(0,0,0,.035) 1px, transparent 1px); background-size: 14px 14px; }
  .m { max-width: 82%; padding: 7px 10px 6px; border-radius: 10px; font-size: .84rem; line-height: 1.38; box-shadow: 0 1px .5px rgba(0,0,0,.13); opacity: 0; transform: translateY(8px) scale(.98); transition: opacity .45s var(--ease), transform .45s var(--ease); }
  .m.show { opacity: 1; transform: none; }
  .m.in { background: #fff; align-self: flex-start; border-top-left-radius: 2px; }
  .m.out { background: #d9fdd3; align-self: flex-end; border-top-right-radius: 2px; }
  .m small { display: block; text-align: right; font-size: .66rem; color: #667781; margin-top: 2px; }
  .m .lst { margin: 6px 0 4px; display: grid; gap: 2px; font-size: .78rem; }
  .m .lst div { display: flex; justify-content: space-between; gap: 12px; }
  .m .lst div:last-child { font-weight: 700; border-top: 1px dashed #c9d3c7; padding-top: 3px; margin-top: 2px; }
  .tip { display: inline-flex; gap: 3px; }
  .tip i { width: 6px; height: 6px; border-radius: 50%; background: #9aa5a0; animation: dt 1s infinite; }
  .tip i:nth-child(2) { animation-delay: .15s; } .tip i:nth-child(3) { animation-delay: .3s; }
  @keyframes dt { 0%, 60%, 100% { opacity: .3; transform: none; } 30% { opacity: 1; transform: translateY(-3px); } }
  .wai { display: flex; gap: 8px; align-items: center; padding: 8px 10px 22px; background: #f0f0f0; }
  .wai div { flex: 1; background: #fff; border-radius: 20px; padding: 8px 14px; font-size: .8rem; color: #9aa; }
  .wai i { width: 34px; height: 34px; border-radius: 50%; background: #1a9d55; }
  .flot { position: absolute; z-index: 5; background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 12px 14px; box-shadow: 0 18px 40px -14px rgba(16,24,16,.3); font-size: .82rem; width: 228px; opacity: 0; transform: translateY(10px) scale(.96); transition: opacity .5s var(--ease), transform .5s var(--ease); }
  .flot.show { opacity: 1; transform: none; }
  .flot .t { display: flex; align-items: center; gap: 6px; font-weight: 700; font-size: .78rem; color: var(--verde); }
  .flot b { display: block; font-size: 1rem; margin: 4px 0 2px; }
  .flot span { color: var(--gray); font-size: .76rem; }
  .f1 { left: -150px; top: 210px; } .f2 { right: -120px; bottom: 170px; } .f3 { left: -40px; bottom: 60px; }
  .f3 .t { color: #b7791f; }
  .rtabs { display: flex; gap: 4px; margin-top: 22px; background: var(--bg2); border: 1px solid var(--line); border-radius: 999px; padding: 4px; }
  .rtabs button { border: 0; background: transparent; font: inherit; font-size: .86rem; font-weight: 600; color: var(--gray); padding: 7px 14px; border-radius: 999px; cursor: pointer; }
  .rtabs button.on { background: #fff; color: var(--ink); box-shadow: var(--sombra); }
  .nota { margin-top: 10px; font-size: .74rem; color: var(--gray); }

  /* prueba social */
  .trust { padding: 40px 0 8px; }
  .trust p { text-align: center; font-size: .85rem; color: var(--gray); margin-bottom: 22px; }
  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .stat { border: 1px solid var(--line); border-radius: 18px; padding: 22px; background: #fff; }
  .stat b { display: block; font-size: 2.3rem; letter-spacing: -.04em; line-height: 1; }
  .stat span { display: block; margin-top: 8px; color: var(--gray); font-size: .9rem; }
  .stat:nth-child(1) b { color: var(--verde); }

  /* panel de la app */
  .app { border: 1px solid var(--line); border-radius: 22px; background: #fff; box-shadow: 0 40px 80px -40px rgba(16,24,16,.35); overflow: hidden; display: grid; grid-template-columns: 56px 290px minmax(0, 1fr) 300px; min-height: 540px; font-size: .86rem; }
  .app .rail { background: var(--ink); display: flex; flex-direction: column; align-items: center; gap: 18px; padding: 16px 0; }
  .app .rail b { width: 30px; height: 30px; border-radius: 9px; background: var(--lima); display: grid; place-items: center; font-family: var(--font-display); font-weight: 800; }
  .app .rail i { width: 20px; height: 20px; border-radius: 6px; background: rgba(255,255,255,.18); }
  .app .rail i.on { background: rgba(200,230,46,.8); }
  .lst-c { border-right: 1px solid var(--line); background: #fbfbfa; }
  .lst-c h4 { padding: 16px 16px 10px; font-size: .95rem; display: flex; justify-content: space-between; }
  .lst-c h4 span { font-weight: 500; color: var(--gray); font-size: .8rem; }
  .cv { display: grid; grid-template-columns: 34px 1fr auto; gap: 2px 10px; padding: 11px 16px; border-top: 1px solid var(--line); cursor: pointer; }
  .cv.on { background: #fff; box-shadow: inset 3px 0 0 var(--lima); }
  .cv .av { grid-row: 1 / 3; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; font-weight: 700; font-size: .78rem; background: #eef0ec; }
  .cv b { font-size: .86rem; }
  .cv small { color: var(--gray); font-size: .72rem; }
  .cv em { grid-column: 2 / 4; font-style: normal; color: var(--gray); font-size: .78rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .chip { display: inline-block; font-size: .68rem; font-weight: 700; border-radius: 999px; padding: 2px 8px; background: #e7f6ee; color: #177a4d; }
  .chip.am { background: #fff4dc; color: #8a5a00; } .chip.az { background: #e8eefc; color: #2b4fa8; }
  .trs { display: flex; flex-direction: column; }
  .trs .top { padding: 14px 18px; border-bottom: 1px solid var(--line); display: flex; gap: 10px; align-items: center; }
  .trs .top b { font-size: .95rem; }
  .trs .body { flex: 1; padding: 18px; display: flex; flex-direction: column; gap: 10px; background: #fafbf9; }
  .bb { max-width: 78%; padding: 9px 12px; border-radius: 12px; line-height: 1.4; }
  .bb.c { background: #fff; border: 1px solid var(--line); align-self: flex-start; }
  .bb.a { background: #f2f9d2; align-self: flex-end; }
  .bb small { display: block; font-size: .68rem; color: var(--gray); margin-bottom: 2px; font-weight: 600; }
  .side { border-left: 1px solid var(--line); padding: 18px; display: flex; flex-direction: column; gap: 14px; }
  .side h5 { font-size: .74rem; letter-spacing: .08em; color: var(--gray); font-family: var(--font-mono); font-weight: 500; }
  .card-p { border: 1px solid var(--line); border-radius: 14px; padding: 14px; }
  .card-p .r { display: flex; justify-content: space-between; padding: 4px 0; }
  .card-p .r.t { border-top: 1px solid var(--line); margin-top: 6px; padding-top: 8px; font-weight: 700; font-size: .95rem; }
  .ok { display: flex; gap: 8px; align-items: center; color: #177a4d; font-weight: 600; font-size: .82rem; }
  .ok i { width: 18px; height: 18px; border-radius: 50%; background: #e7f6ee; display: grid; place-items: center; font-style: normal; font-size: .7rem; }
  .cap { text-align: center; color: var(--gray); font-size: .8rem; margin-top: 14px; }

  /* caso */
  .caso { display: grid; grid-template-columns: 1.1fr .9fr; gap: 56px; align-items: center; border: 1px solid var(--line); border-radius: 28px; padding: 48px; background: linear-gradient(135deg, #fbfdf3, #fff 60%); }
  .caso h2 { font-size: clamp(1.9rem, 3.6vw, 2.6rem); margin: 16px 0 14px; }
  .caso p { color: var(--ink2); font-size: 1.04rem; }
  .caso ul { list-style: none; display: grid; gap: 10px; margin: 18px 0 6px; color: var(--ink2); }
  .caso li { display: flex; gap: 10px; } .caso li svg { color: var(--verde); flex: none; margin-top: 4px; }
  .caso-num { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .caso-num > div { background: #fff; border: 1px solid var(--line); border-radius: 18px; padding: 20px; }
  .caso-num b { display: block; font-size: 2.2rem; letter-spacing: -.04em; line-height: 1; }
  .caso-num span { color: var(--gray); font-size: .88rem; }
  .caso-num .orden { grid-column: 1 / 3; font-size: .88rem; }
  .orden small { display: block; font-family: var(--font-mono); font-size: .7rem; letter-spacing: .1em; color: var(--gray); margin-bottom: 10px; }
  .orden .r { display: flex; justify-content: space-between; padding: 6px 0; border-top: 1px dashed var(--line); }
  .orden code { font-family: var(--font-mono); background: var(--lima2); color: var(--lima-ink); border-radius: 6px; padding: 1px 8px; }
  .orden p { margin-top: 10px; color: var(--verde); font-weight: 600; font-size: .86rem; }
  @media (max-width: 980px) { .caso { grid-template-columns: 1fr; padding: 28px 20px; } }
  /* pasos */
  .pasos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .paso { border: 1px solid var(--line); border-radius: 22px; padding: 26px; background: #fff; position: relative; }
  .paso .n { width: 34px; height: 34px; border-radius: 10px; background: var(--ink); color: #fff; display: grid; place-items: center; font-weight: 700; margin-bottom: 18px; }
  .paso:nth-child(3) .n { background: var(--lima); color: var(--ink); }
  .paso h3 { font-size: 1.3rem; margin-bottom: 8px; }
  .paso p { color: var(--gray); }
  .mini { margin-top: 20px; border: 1px solid var(--line); border-radius: 14px; padding: 12px; background: var(--bg2); font-size: .8rem; display: grid; gap: 6px; }
  .mini .r { display: flex; justify-content: space-between; background: #fff; border-radius: 8px; padding: 7px 10px; }
  .mini .r b { font-family: var(--font-mono); font-weight: 500; }
  .mini .qr { display: flex; gap: 12px; align-items: center; background: #fff; border-radius: 8px; padding: 10px; }
  .mini .qr i { width: 46px; height: 46px; border-radius: 6px; background: conic-gradient(var(--ink) 25%, #fff 0 50%, var(--ink) 0 75%, #fff 0) 0 0 / 12px 12px; flex: none; }
  .mini .nt { background: #fff; border-radius: 8px; padding: 9px 10px; border-left: 3px solid var(--lima); }
  .centro { text-align: center; margin-top: 40px; }
  .centro small { display: block; color: var(--gray); margin-top: 10px; font-size: .85rem; }

  /* tres acciones + comparación */
  .gris { background: var(--bg2); }
  .acc { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .acc div { background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 26px; }
  .acc h3 { font-size: 1.5rem; margin: 6px 0 8px; }
  .acc p { color: var(--gray); }
  .acc code { display: block; margin-top: 16px; font-family: var(--font-mono); font-size: .78rem; background: var(--lima2); color: var(--lima-ink); border-radius: 8px; padding: 8px 10px; }
  .acc span { font-family: var(--font-mono); font-size: .8rem; color: var(--gray); }
  .vs { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 18px; }
  .vs > div { border-radius: 22px; padding: 26px; border: 1px solid var(--line); background: #fff; }
  .vs .si { background: var(--ink); color: #fff; border-color: var(--ink); }
  .vs h3 { font-size: 1.15rem; margin-bottom: 14px; }
  .vs ul { list-style: none; display: grid; gap: 10px; }
  .vs li { display: flex; gap: 10px; }
  .vs li::before { content: '✕'; color: var(--rojo); font-weight: 700; }
  .vs .si li::before { content: '✓'; color: var(--lima); }

  /* rubros */
  .rub { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .rub div { border: 1px solid var(--line); border-radius: 22px; padding: 24px; }
  .rub h3 { font-size: 1.25rem; margin-bottom: 12px; }
  .rub ul { list-style: none; display: grid; gap: 8px; color: var(--ink2); font-size: .95rem; }
  .rub li::before { content: '→ '; color: var(--verde); font-weight: 700; }

  /* obras */
  .obras { background: var(--ink); color: #fff; border-radius: 28px; padding: 56px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
  .obras h2 { font-size: clamp(1.9rem, 3.8vw, 2.8rem); margin: 14px 0; }
  .obras p { color: #b9bfbb; font-size: 1.05rem; }
  .obras .pill { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.14); color: #e6e9e4; box-shadow: none; }
  .ob { display: grid; grid-template-columns: 1fr auto; gap: 2px 12px; padding: 13px 14px; border-radius: 14px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); margin-bottom: 8px; }
  .ob small { font-family: var(--font-mono); font-size: .66rem; color: #9aa29d; letter-spacing: .06em; }
  .ob b { font-size: .98rem; }
  .ob .g { grid-row: 1 / 3; grid-column: 2; align-self: center; font-family: var(--font-mono); font-weight: 500; }
  .ob.neg { border-color: rgba(255,107,87,.6); background: rgba(255,107,87,.1); }
  .ob.neg .g { color: #ff8a78; }

  /* precios */
  .planes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; align-items: stretch; }
  .plan { border: 1px solid var(--line); border-radius: 22px; padding: 28px; background: #fff; display: flex; flex-direction: column; }
  .plan.dest { border: 2px solid var(--ink); box-shadow: 0 30px 60px -30px rgba(16,24,16,.4); transform: translateY(-8px); }
  .plan .eti { align-self: flex-start; font-size: .74rem; font-weight: 700; background: var(--lima); border-radius: 999px; padding: 3px 10px; margin-bottom: 12px; }
  .plan h3 { font-size: 1.2rem; }
  .plan .q { color: var(--gray); font-size: .92rem; margin: 4px 0 18px; min-height: 2.6em; }
  .plan .p { font-size: 2.6rem; font-weight: 700; letter-spacing: -.04em; }
  .plan .p small { font-size: .95rem; color: var(--gray); font-weight: 500; letter-spacing: 0; }
  .plan ul { list-style: none; display: grid; gap: 8px; margin: 18px 0 24px; font-size: .93rem; color: var(--ink2); flex: 1; }
  .plan li { display: flex; gap: 8px; } .plan li svg { color: var(--verde); flex: none; margin-top: 3px; }
  .plan .sp { text-align: center; font-size: .8rem; color: var(--gray); margin-top: 10px; }

  /* fer */
  .who { display: grid; grid-template-columns: 300px 1fr; gap: 56px; align-items: center; }
  .who img { width: 100%; aspect-ratio: 4/5; object-fit: cover; border-radius: 24px; }
  .who h2 { font-size: clamp(1.8rem, 3.4vw, 2.5rem); margin-bottom: 18px; }
  .who p { color: var(--ink2); font-size: 1.06rem; margin-bottom: 14px; }

  /* faq + contacto */
  .faq { max-width: 820px; margin: 0 auto; }
  .faq details { border-bottom: 1px solid var(--line); padding: 20px 4px; }
  .faq summary { cursor: pointer; font-weight: 700; font-size: 1.06rem; list-style: none; display: flex; justify-content: space-between; gap: 20px; }
  .faq summary::after { content: '+'; color: var(--gray); font-size: 1.3rem; line-height: 1; }
  .faq details[open] summary::after { content: '–'; }
  .faq p { color: var(--gray); margin-top: 10px; }
  .contact { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  .contact h2 { font-size: clamp(2rem, 4vw, 2.9rem); margin: 14px 0; }
  .contact p { color: var(--ink2); font-size: 1.06rem; }
  form { background: #fff; border: 1px solid var(--line); border-radius: 22px; padding: 26px; display: grid; gap: 14px; box-shadow: var(--sombra); }
  form .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  form label { display: block; font-size: .85rem; font-weight: 600; margin-bottom: 6px; }
  form input, form textarea { width: 100%; font: inherit; border: 1px solid var(--line); border-radius: 10px; padding: 11px 12px; background: var(--bg2); }
  form textarea { min-height: 110px; resize: vertical; }
  form .btn { background: var(--ink); color: #fff; }
  .bot-field { position: absolute; left: -9999px; }
  .form-note { font-size: .8rem; color: var(--gray); }

  footer { border-top: 1px solid var(--line); padding: 48px 0; color: var(--gray); font-size: .9rem; margin-top: 40px; }
  .foot { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 32px; }
  .foot ul { list-style: none; display: grid; gap: 8px; }
  .foot-cols { display: flex; flex-wrap: wrap; gap: 48px; }
  .foot a:hover { color: var(--ink); }

  @media (max-width: 980px) {
    .hero-grid, .obras, .contact, .who { grid-template-columns: 1fr; }
    .stats { grid-template-columns: 1fr 1fr; }
    .pasos, .acc, .rub, .planes, .vs { grid-template-columns: 1fr; }
    .plan.dest { transform: none; }
    .app { grid-template-columns: 1fr; } .app .rail, .app .lst-c, .app .side { display: none; }
    .nav-links { display: none; }
    .f1 { left: -6px; top: 120px; } .f2 { right: -6px; } .f3 { display: none; }
    .obras { padding: 32px 22px; }
    section { padding: 72px 0; }
    .who img { max-width: 260px; }
  }
  @media (max-width: 520px) { .iphone { transform: scale(.92); transform-origin: top center; margin-bottom: -50px; } form .row { grid-template-columns: 1fr; } .nav-r .btn-ghost { display: none; } }
  @media (prefers-reduced-motion: reduce) { .js .reveal { opacity: 1; transform: none; } .m, .flot { transition: none; } .tip i { animation: none; } }
  ${rootVars}
  ${widgetCss}
</style>`;

// ---------- escenas del celular ----------
const lista = rows => '<div class="lst">' + rows.map(([a, b]) => `<div><span>${a}</span><span>${b}</span></div>`).join('') + '</div>';
const ESC = [
  { tab: 'Pizzería', nombre: 'Pizzería La Esquina', ini: 'P', f1: ['Pedido confirmado', '$26.400', 'Mercado Pago · acreditado'], f2: ['Cocina avisada', '2 Muzzarella + Coca', 'sale para Caseros · 40 min'],
    seq: [[500, 'out', 'Hola! ¿Tienen muzza? ¿Hacen envío a Caseros?'], [700, 'tip'], [1500, 'in', '¡Hola! Sí 🍕 La Muzzarella grande sale $10.900. A Caseros el envío es $1.500 y tarda unos 40 min. ¿Te armo el pedido?'],
      [1600, 'out', 'Dale, 2 muzza y una coca 1,5 L'], [700, 'tip'], [1500, 'in', 'Sumé todo:' + lista([['2 Muzzarella', '$21.800'], ['Coca-Cola 1,5 L', '$3.100'], ['Envío a Caseros', '$1.500'], ['Total', '$26.400']]) + '¿Mercado Pago o efectivo?'],
      [1500, 'out', 'Mercado Pago'], [900, 'in', 'Listo ✓ Te paso el link de pago. Apenas se acredita, sale tu pedido.'], [900, 'f1'], [1300, 'f2']] },
  { tab: 'Estética', nombre: 'Estudio Bruma', ini: 'B', f1: ['Consulta registrada', 'Caro · alisado', 'pelo largo · prefiere sábado'], f2: ['Sofi avisada', 'Consulta armada', 'para coordinar día y hora'],
    seq: [[500, 'out', 'Hola! ¿Cuánto sale el alisado? Tengo el pelo largo'], [700, 'tip'], [1500, 'in', '¡Hola! Para pelo largo arranca en $45.000 y lleva unas 3 horas. ¿Me decís tu nombre así Sofi coordina el día con vos?'],
      [1600, 'out', 'Caro. Si puede ser un sábado mejor'], [700, 'tip'], [1300, 'in', 'Gracias, Caro 😊 Ya le paso tu consulta a Sofi para ver el sábado.'], [900, 'f1'], [1300, 'f2']] },
  { tab: 'Laboratorio', nombre: 'Laboratorio', ini: 'L', f1: ['Orden leída', '4 estudios', 'con su código del sistema del laboratorio'], f2: ['Derivada a sede Centro', 'Caso armado', 'orden, cobertura y consulta'],
    seq: [[500, 'out', 'Hola, ¿me cubren estos análisis? Les mando la orden'], [900, 'out', '<div style="background:#fff;border-radius:6px;padding:8px;font-size:.72rem;line-height:1.35;color:#444"><b>Dr. M. Pérez</b> · MN 84.112<br>Paciente: Laura G. · OSDE 210<br>Rp/ Hemograma · Glucemia · TSH · Perfil lipídico</div>'],
      [700, 'tip'], [1800, 'in', '¡Hola Laura! Leí tu orden: hemograma, glucemia, TSH y perfil lipídico. Con OSDE 210 están cubiertos. ¿A qué sede te queda más cómodo ir?'],
      [1600, 'out', 'Centro. ¿Puedo ir el sábado?'], [700, 'tip'], [1300, 'in', 'Te paso con Marina de sede Centro para el horario. Ya tiene tu orden cargada 👍'], [900, 'f1'], [1300, 'f2']] },
  { tab: 'Comercio', nombre: 'Ferretería Ramos', ini: 'R', f1: ['Cliente registrado', 'Mayorista · 10 u.', 'bordeadora Gamma 1000W'], f2: ['Lucas avisado', 'Pedido armado', 'para cotizar por cantidad'],
    seq: [[500, 'out', '¿Tienen la bordeadora Gamma 1000W? ¿Qué precio?'], [700, 'tip'], [1500, 'in', 'Sí, quedan 6 en el depósito. Sale $89.900 en efectivo o en 3 cuotas sin interés.'],
      [1600, 'out', 'Necesito 10 para mi local, ¿hacen precio por cantidad?'], [700, 'tip'], [1300, 'in', 'Por cantidad te atiende Lucas, de mayoristas. Ya le paso tu pedido 👍'], [900, 'f1'], [1300, 'f2']] },
];

const plan = (nom, usd, q, items, dest) => `<div class="plan${dest ? ' dest' : ''} reveal">${dest ? '<span class="eti">El más elegido</span>' : ''}<h3>${nom}</h3><p class="q">${q}</p><div class="p">USD ${usd} <small>/ mes</small></div><ul>${items.map(i => `<li>${check}<span>${i}</span></li>`).join('')}</ul><a class="btn ${dest ? 'btn-main' : 'btn-ghost'}" href="${WA('Hola, quiero el plan ' + nom + ' del agente de WhatsApp.')}" target="_blank" rel="noopener">Elegir ${nom}</a><p class="sp">Sin permanencia. Cancelás cuando quieras.</p></div>`;
const faq = [
  ['¿Usa mi número de WhatsApp?', 'Sí. Trabaja en el número de tu negocio: tus clientes escriben donde ya escriben.'],
  ['¿Qué pasa si no entiende algo?', 'Le pasa la charla a una persona de tu equipo, con el pedido o la consulta ya armados. No inventa precios ni promete lo que no hay.'],
  ['¿De dónde saca los precios?', 'De tu carta o tu lista, que cargamos al empezar y podés cambiar cuando quieras. Si tenés un sistema, se puede conectar: esa integración se cotiza aparte.'],
  ['¿Cobra de verdad?', 'Sí. Manda el link de Mercado Pago de tu cuenta y el pedido queda confirmado cuando se acredita. También toma efectivo o transferencia, según cómo trabajes.'],
  ['¿Cuánto tarda en estar andando?', 'Arrancamos con un piloto acompañado de 2 semanas: lo configuramos con vos y lo miramos juntos los primeros días.'],
  ['¿Hacen cosas a medida?', 'Sí. Lectura de documentos, integraciones entre sistemas y procesos internos. Contanos qué te come tiempo y te decimos si se puede automatizar.'],
];

const NAV = `  <nav><div class="wrap nav-in">
    <a class="logo" href="/">Autopilot<span>.</span></a>
    <ul class="nav-links"><li><a href="#como">Cómo funciona</a></li><li><a href="#rubros">Rubros</a></li><li><a href="/obras/">Obras</a></li><li><a href="#precios">Precios</a></li><li><a href="#preguntas">Preguntas</a></li></ul>
    <div class="nav-r"><a class="btn btn-ghost btn-sm" href="https://app.autopilot.com.ar/">Ingresar</a><a class="btn btn-main btn-sm" href="${ctaMain}">Probalo 7 días gratis</a></div>
  </div></nav>`;
const FOOTER = `  <footer><div class="wrap foot">
    <div><a class="logo" href="/">Autopilot<span>.</span></a><p style="margin-top:8px">© 2026 Autopilot · Buenos Aires, Argentina</p></div>
    <div class="foot-cols">
      <ul><li><a href="/agente-whatsapp/">Agente de WhatsApp</a></li><li><a href="/obras/">Obras y rentabilidad</a></li><li><a href="/precios/">Precios</a></li></ul>
      <ul><li><a href="/servicios/lectura-de-documentos-con-ia/">Documentos con IA</a></li><li><a href="/servicios/integracion-de-sistemas/">Integraciones</a></li><li><a href="/casos/laboratorio-biorossi/">Caso Biorossi</a></li></ul>
      <ul><li><a href="/terminos/">Términos y condiciones</a></li><li><a href="/privacidad/">Política de privacidad</a></li><li><a href="/terminos/#arrepentimiento">Botón de arrepentimiento</a></li><li><a href="/terminos/#baja">Botón de baja de servicio</a></li></ul>
      <ul><li><a href="https://www.instagram.com/autopilot.com.ar/" target="_blank" rel="noopener noreferrer">Instagram</a></li><li><a href="https://www.tiktok.com/@autopilot.com.ar" target="_blank" rel="noopener noreferrer">TikTok</a></li></ul>
    </div>
  </div></footer>`;
const STAGE = nota => `      <div class="stage">
        <div class="iphone"><div class="scr">
          <div class="sbar"><span>21:02</span><span>●●● 5G</span></div>
          <div class="wah"><div class="av" id="wav">P</div><div><b id="wnom">Pizzería La Esquina</b><span id="wst">en línea</span></div></div>
          <div class="cht" id="cht"></div>
          <div class="wai"><div>Mensaje</div><i></i></div>
        </div></div>
        <div class="flot f1" id="f1"><div class="t">${check}<span></span></div><b></b><span></span></div>
        <div class="flot f2" id="f2"><div class="t">${check}<span></span></div><b></b><span></span></div>
        <div class="rtabs" id="rtabs" role="tablist" aria-label="Elegí un rubro"></div>
        <p class="nota">${nota}</p>
      </div>`;
const PLAYER = esc => `    var S = ${JSON.stringify(esc)};
    var cht = document.getElementById('cht'), tabs = document.getElementById('rtabs'), wst = document.getElementById('wst');
    var f1 = document.getElementById('f1'), f2 = document.getElementById('f2');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches, run = 0, cur = 0, pinned = false;
    S.forEach(function (s, i) { var b = document.createElement('button'); b.type = 'button'; b.textContent = s.tab; b.setAttribute('role', 'tab'); b.onclick = function () { pinned = true; play(i); }; tabs.appendChild(b); });
    function flot(el, d) { el.querySelector('.t span').textContent = d[0]; el.querySelector('b').textContent = d[1]; el.querySelector(':scope > span').textContent = d[2]; el.classList.add('show'); }
    function add(cls, html) { var d = document.createElement('div'); d.className = 'm ' + cls; d.innerHTML = html; cht.appendChild(d); while (cht.children.length > 8) cht.removeChild(cht.firstChild); return d; }
    function hora() { return '21:0' + Math.min(9, cht.children.length + 2); }
    function play(i) {
      var r = ++run, s = S[i]; cur = i; cht.innerHTML = ''; f1.classList.remove('show'); f2.classList.remove('show');
      document.getElementById('wnom').textContent = s.nombre; document.getElementById('wav').textContent = s.ini;
      [].forEach.call(tabs.children, function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i); });
      if (reduce) { s.seq.forEach(function (m) { if (m[1] === 'in' || m[1] === 'out') add(m[1], m[2]).classList.add('show'); }); flot(f1, s.f1); flot(f2, s.f2); return; }
      var t = 0, tip = null;
      s.seq.forEach(function (m) { t += m[0]; setTimeout(function () { if (r !== run) return;
        if (tip) { tip.remove(); tip = null; wst.textContent = 'en línea'; }
        if (m[1] === 'tip') { tip = add('in', '<span class="tip"><i></i><i></i><i></i></span>'); tip.classList.add('show'); wst.textContent = 'escribiendo…'; return; }
        if (m[1] === 'f1') return flot(f1, s.f1); if (m[1] === 'f2') return flot(f2, s.f2);
        var d = add(m[1], m[2] + '<small>' + hora() + (m[1] === 'out' ? ' ✓✓' : '') + '</small>'); requestAnimationFrame(function () { d.classList.add('show'); }); }, t); });
      setTimeout(function () { if (r === run) play(pinned ? cur : (cur + 1) % S.length); }, t + 4500);
    }
    play(0);`;

const html = `${head}${CSS}
</head>
<body id="top">
  <div class="legal-top"><div class="wrap"><a href="mailto:fernando@autopilot.com.ar?subject=Arrepentimiento%20de%20contratacion">Botón de arrepentimiento</a> · <a href="mailto:fernando@autopilot.com.ar?subject=Solicitud%20de%20baja%20de%20servicio">Botón de baja de servicio</a></div></div>
  ${NAV}

  <main>
    <header class="hero"><div class="wrap hero-grid">
      <div>
        <span class="pill"><i></i>Agentes de IA para WhatsApp</span>
        <h1>Este mensaje vale $26.400. <mark>Y nadie lo contestó.</mark></h1>
        <p class="sub">Un agente en el WhatsApp de tu negocio contesta con tus precios, arma el pedido, lo cobra y lo deja cargado. A tu equipo le llega sólo lo que necesita una persona.</p>
        <div class="ctas"><a class="btn btn-main" href="${ctaMain}">Crear mi agente ${flecha}</a><a class="btn btn-ghost" href="#como">Ver cómo funciona</a></div>
        <div class="checks"><span>${check}7 días gratis</span><span>${check}Sin permanencia</span><span>${check}Desde USD 69 por mes</span></div>
        <div class="try"><small>PROBALO AHORA · 7 DÍAS GRATIS</small>
          <a href="${ctaMain}"><span class="ic" style="background:var(--lima2);color:var(--lima-ink)">${flecha}</span><div><b>Creá tu cuenta en 2 minutos</b><span>Cargás tu carta, conectás tu WhatsApp y el agente empieza a atender.</span></div><span class="go">${flecha}</span></a>
          <a href="${ctaSoporte}" target="_blank" rel="noopener"><span class="ic">${waIco}</span><div><b>Te ayudamos por WhatsApp</b><span>Si te trabás en algo, te lo dejamos andando con vos.</span></div><span class="go">${flecha}</span></a>
        </div>
      </div>
      ${STAGE('Recreación con precios de ejemplo.')}
    </div></header>

    <div class="trust"><div class="wrap">
      <p>Funcionando todos los días en <a href="/casos/laboratorio-biorossi/" style="color:var(--ink);font-weight:600;text-decoration:underline;text-underline-offset:3px">Laboratorio Biorossi</a></p>
    </div></div>

    <section id="caso"><div class="wrap">
      <div class="caso reveal">
        <div>
          <span class="pill"><i></i>Caso real · en producción</span>
          <h2>Laboratorio Biorossi: <mark>6.500 conversaciones por mes</mark> sin agrandar el call center.</h2>
          <p>Laboratorio de análisis clínicos de zona sur, con varias sedes. Los pacientes mandan por WhatsApp la foto de su orden médica y el sistema hace el trabajo que antes pasaba por el call center:</p>
          <ul>
            <li>${check}<span>Lee la orden y encuentra cada estudio con su código en GLYMS, el sistema del laboratorio.</span></li>
            <li>${check}<span>Contesta cobertura, preparación y horarios según la obra social y la sede.</span></li>
            <li>${check}<span>Deriva a la persona indicada con la orden y la consulta ya armadas.</span></li>
          </ul>
          <div class="ctas"><a class="btn btn-ghost" href="/casos/laboratorio-biorossi/">Ver el caso completo ${flecha}</a></div>
        </div>
        <div class="caso-num">
          <div><b>6.500</b><span>conversaciones por mes</span></div>
          <div><b>36.000</b><span>mensajes mensuales</span></div>
          <div class="orden"><small>ORDEN MÉDICA · LEÍDA</small>
            <div class="r"><span>Hemograma completo</span><code>475</code></div><div class="r"><span>Glucemia</span><code>412</code></div><div class="r"><span>TSH</span><code>1035</code></div><div class="r"><span>Perfil lipídico</span><code>546</code></div>
            <p>✓ Cargada con 4 códigos · sin tipear nada</p></div>
        </div>
      </div>
    </div></section>

    <section><div class="wrap">
      <div class="head reveal"><span class="pill">Desde tu lado</span><h2>Ves cada charla, cada pedido y cada cobro.</h2><p>Un panel simple: qué se vendió, qué falta cobrar y qué charlas necesitan a una persona.</p></div>
      <div class="app reveal" aria-label="Ejemplo del panel de Autopilot">
        <div class="rail"><b>A</b><i class="on"></i><i></i><i></i><i></i></div>
        <div class="lst-c"><h4>Conversaciones <span>hoy · 47</span></h4>
          ${[['MG', 'Martín G.', '21:14', 'Pedido confirmado ✓', 'chip', 'Pagado'], ['LS', 'Lucía S.', '21:09', '¿Hacen envío a Banfield?', 'chip az', 'Consulta'], ['DR', 'Diego R.', '21:05', 'Quiero hablar con alguien', 'chip am', 'Derivada'], ['CF', 'Caro F.', '20:58', '2 grandes y una fainá', 'chip', 'Pagado'], ['AP', 'Andrés P.', '20:51', '¿Siguen tomando pedidos?', 'chip az', 'Consulta'], ['SN', 'Sofía N.', '20:44', 'Efectivo, retiro yo', 'chip', 'Efectivo']]
            .map(([i, n, h, e, c, t], k) => `<div class="cv${k === 0 ? ' on' : ''}"><span class="av">${i}</span><b>${n}</b><small>${h}</small><em><span class="${c}">${t}</span> ${e}</em></div>`).join('')}
        </div>
        <div class="trs"><div class="top"><span class="av" style="width:32px;height:32px;border-radius:50%;background:#eef0ec;display:grid;place-items:center;font-weight:700;font-size:.75rem">MG</span><div><b>Martín G.</b><br><small style="color:var(--gray)">+54 11 5•••• 2210 · WhatsApp</small></div><span class="chip" style="margin-left:auto">Pedido cerrado</span></div>
          <div class="body">
            <div class="bb c"><small>Martín</small>Hola! ¿Tienen muzza? ¿Hacen envío a Caseros?</div>
            <div class="bb a"><small>Agente</small>¡Hola! Sí, la Muzzarella grande sale $10.900. A Caseros el envío es $1.500. ¿Te armo el pedido?</div>
            <div class="bb c"><small>Martín</small>Dale, 2 muzza y una coca 1,5 L</div>
            <div class="bb a"><small>Agente</small>Sumé todo: total $26.400. ¿Mercado Pago o efectivo?</div>
            <div class="bb c"><small>Martín</small>Mercado Pago</div>
            <div class="bb a"><small>Agente</small>Listo ✓ Te paso el link. Apenas se acredita, sale tu pedido.</div>
          </div></div>
        <div class="side"><h5>PEDIDO #184</h5>
          <div class="card-p"><div class="r"><span>2 × Muzzarella</span><span>$21.800</span></div><div class="r"><span>Coca-Cola 1,5 L</span><span>$3.100</span></div><div class="r"><span>Envío · Caseros</span><span>$1.500</span></div><div class="r t"><span>Total</span><span>$26.400</span></div></div>
          <div class="ok"><i>✓</i>Pago acreditado · Mercado Pago</div>
          <div class="ok"><i>✓</i>Cargado en el sistema</div>
          <div class="ok"><i>✓</i>Cocina avisada · sale 21:20</div>
          <h5 style="margin-top:6px">RESUMEN</h5>
          <p style="color:var(--ink2);line-height:1.45">Cliente de Caseros pidió 2 Muzzarella y Coca 1,5 L con envío. Pagó con Mercado Pago. Sin derivación.</p>
        </div>
      </div>
      <p class="cap">Panel de Autopilot con datos de ejemplo.</p>
    </div></section>

    <section id="como" class="gris"><div class="wrap">
      <div class="head reveal"><span class="pill">Simple de arrancar</span><h2>Nunca más pierdas un pedido <mark>por no contestar.</mark></h2><p>Lo dejamos andando con vos. No tenés que saber nada de tecnología.</p></div>
      <div class="pasos">
        <div class="paso reveal"><div class="n">1</div><h3>Cargamos tu carta</h3><p>Productos, precios, zonas de envío y horarios. Lo que hoy contestás a mano.</p>
          <div class="mini"><div class="r"><span>Muzzarella grande</span><b>$10.900</b></div><div class="r"><span>Fugazzeta</span><b>$12.400</b></div><div class="r"><span>Envío Caseros</span><b>$1.500</b></div></div></div>
        <div class="paso reveal"><div class="n">2</div><h3>Conectamos tu WhatsApp</h3><p>Escaneás un código con el celular del negocio y listo. Tu número sigue siendo el mismo.</p>
          <div class="mini"><div class="qr"><i></i><div><b style="display:block">Vincular dispositivo</b><span style="color:var(--gray)">tu número de siempre</span></div></div></div></div>
        <div class="paso reveal"><div class="n">3</div><h3>Atiende y te avisa</h3><p>Contesta, arma el pedido, cobra y le avisa a quien corresponda. Vos mirás el panel.</p>
          <div class="mini"><div class="nt"><b>Pedido #184 · $26.400</b><br><span style="color:var(--gray)">pagado · sale para Caseros</span></div><div class="nt" style="border-color:#f0b429"><b>Diego quiere hablar con vos</b><br><span style="color:var(--gray)">la charla ya está armada</span></div></div></div>
      </div>
      <div class="centro"><a class="btn btn-main" href="${ctaMain}">Crear mi cuenta gratis ${flecha}</a><small>7 días gratis · te ayudamos por WhatsApp · sin permanencia</small></div>
    </div></section>

    <section><div class="wrap">
      <div class="head reveal"><span class="pill">No vendemos un chatbot</span><h2>Trabaja <mark>adentro de tu negocio</mark>, no al costado.</h2></div>
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

    <section id="rubros" class="gris"><div class="wrap">
      <div class="head reveal"><span class="pill">Rubros</span><h2>Hecho para negocios que viven en WhatsApp.</h2></div>
      <div class="rub">
        <div class="reveal" style="background:#fff"><h3>Comida y delivery</h3><ul><li>Toma el pedido con tu carta</li><li>Cobra con Mercado Pago o efectivo</li><li>Avisa a cocina y al delivery</li></ul></div>
        <div class="reveal" style="background:#fff"><h3>Estética y peluquería</h3><ul><li>Contesta precios y servicios</li><li>Toma los datos de la clienta</li><li>Le pasa la consulta armada a quien coordina</li></ul></div>
        <div class="reveal" style="background:#fff"><h3>Comercios y distribuidoras</h3><ul><li>Stock y precio de tu sistema</li><li>Separa minorista de mayorista</li><li>El vendedor recibe sólo lo bueno</li></ul></div>
      </div>
    </div></section>

    <section><div class="wrap">
      <div class="obras reveal">
        <div><span class="pill">Para talleres y contratistas</span><h2>Una de tus obras te hace perder plata. <mark style="color:var(--ink)">¿Sabés cuál?</mark></h2><p>Obras y rentabilidad: cada obra con su presupuesto, cobros y gastos, la ganancia real con comisión e impuestos, y lo que falta cobrar. USD 69 por mes, 7 días gratis.</p>
          <div class="ctas"><a class="btn btn-lima" href="/obras/">Ver una obra por dentro ${flecha}</a></div></div>
        <div>
          <div class="ob"><small>OBRA · ADROGUÉ</small><b>Toldo retráctil 6 m</b><span class="g">+$1.240.000</span></div>
          <div class="ob neg"><small>OBRA · LOMAS</small><b>Pérgola + policarbonato</b><span class="g">−$180.000</span></div>
          <div class="ob"><small>OBRA · BANFIELD</small><b>Cerramiento de balcón</b><span class="g">+$860.000</span></div>
          <p style="font-size:.75rem;color:#8a918c;margin-top:8px">Cifras de ejemplo.</p>
        </div>
      </div>
    </div></section>

    <section id="precios" class="gris"><div class="wrap">
      <div class="head reveal"><span class="pill">Precios</span><h2>Precios claros, en dólares.</h2><p>Sin permanencia. Pagando el año, 2 meses gratis. La integración con tu sistema se cotiza aparte.</p></div>
      <div class="planes">
        ${plan('Inicial', 69, 'Un local que contesta consultas y toma pedidos', ['1 número de WhatsApp', 'Pedidos con tu carta', '3.000 respuestas por mes', 'Panel de charlas'])}
        ${plan('Negocio', 149, 'Tu local con turnos, cobros y seguimiento', ['Hasta 3 números', 'Cobros con Mercado Pago', 'Turnos y seguimiento', '12.000 respuestas por mes'], true)}
        ${plan('Pro', 399, 'Varias sucursales o integración con tu sistema', ['Hasta 10 números', 'Integraciones', 'Estadísticas y webhooks', '35.000 respuestas por mes'])}
      </div>
      <div class="centro"><a href="/precios/" style="font-weight:600;text-decoration:underline;text-underline-offset:3px">Ver el detalle de los planes</a></div>
    </div></section>

    <section><div class="wrap who">
      <img class="reveal" src="/assets/fernando-alonso.webp" alt="Fernando Alonso, fundador de Autopilot" loading="lazy" width="300" height="375" />
      <div class="reveal"><span class="pill">Quién está atrás</span><h2 style="margin-top:14px">Hablás conmigo, no con un call center.</h2>
        <p>Soy Fernando Alonso. Armo los agentes y los sistemas de Autopilot y acompaño cada piloto: lo configuramos juntos, lo miramos los primeros días y lo ajustamos hasta que ande solo.</p>
        <p>Si tu caso necesita algo a medida (leer documentos, conectar sistemas, ordenar un proceso), también lo hacemos.</p>
        <div class="ctas"><a class="btn btn-ghost" href="${WA('Hola Fernando, quiero hablar de mi negocio.')}" target="_blank" rel="noopener">${waIco} Escribime</a></div></div>
    </div></section>

    <section id="preguntas" class="gris"><div class="wrap">
      <div class="head reveal"><h2>Preguntas</h2></div>
      <div class="faq">${faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
    </div></section>

    <section id="contacto"><div class="wrap contact">
      <div><span class="pill">Hablemos</span><h2>El próximo mensaje, <mark>que lo conteste alguien.</mark></h2><p>Dejanos tus datos y te escribimos por WhatsApp. O escribinos directo y lo vemos hoy.</p>
        <div class="ctas"><a class="btn btn-main" href="${ctaMain}">${waIco} Escribinos por WhatsApp</a></div></div>
      ${form.replace('¿Qué querés automatizar?', '¿Qué querés resolver?').replace('Pedir diagnóstico gratis', 'Quiero que me escriban')}
    </div></section>
  </main>

  ${FOOTER}
  ${widgetHtml}
  <script>
  (function () {
    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12 }) : null;
    document.querySelectorAll('.reveal').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });
    ${PLAYER(ESC)}
  })();
  </script>
  ${widgetJs}
</body>
</html>
`;
if (require.main === module) { fs.writeFileSync(path.join(ROOT, 'index.html'), html); console.log('home ok', html.length); }
module.exports = { CSS, NAV, FOOTER, STAGE, PLAYER, head, widgetHtml, widgetJs, check, flecha, waIco, WA };
