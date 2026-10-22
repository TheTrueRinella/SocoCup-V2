(() => {
 'use strict';
 const css = document.createElement('style');
 css.textContent = `
 #social-root{max-width:1100px!important;display:grid;grid-template-columns:minmax(0,700px) minmax(220px,300px);column-gap:24px;align-items:start}
 #social-root[hidden]{display:none!important}
 #social-root>.soco-x-main{min-width:0}
 #social-root .social-card{border-radius:16px!important;background:#111e31!important;border:1px solid #30415c!important;box-shadow:0 4px 20px #0002}
 #social-root .social-card strong{font-size:16px}
 #social-root .social-card button{border-radius:999px!important;background:#213752!important;color:#e8eef8!important;font-weight:600!important}
 #social-root .social-card button:hover{background:#2f5075!important}
 #social-root #social-publish{background:#edb84b!important;color:#101d33!important}
 #social-root .soco-x-head{position:sticky;top:0;z-index:3;padding:16px 18px;background:#0e1b30f2;border:1px solid #30415c;border-radius:15px;margin-bottom:12px;backdrop-filter:blur(10px)}
 #social-root .soco-x-head h1{margin:0 0 6px;font-size:24px}
 #social-root .soco-x-head p{margin:0;color:#a9bad1}
 #social-root .soco-x-tabs{display:flex;gap:8px;margin-top:16px}
 #social-root .soco-x-tabs button{flex:1;border-radius:10px;background:#1c304a;color:#e8eef8;border:1px solid #344c6d;padding:10px;cursor:pointer}
 #social-root .soco-x-tabs button[aria-selected=true]{background:#eab84e;color:#132037;font-weight:800}
 #social-root .soco-x-aside{position:sticky;top:20px;background:#15243b;border:1px solid #30415c;border-radius:16px;padding:18px}
 #social-root .soco-x-aside h2{font-size:19px;margin:0 0 12px}
 #social-root .soco-x-aside a{display:block;color:#eab84e;padding:9px 0;text-decoration:none;border-bottom:1px solid #2d405a}
 #social-root .soco-x-aside small{display:block;color:#a9bad1;margin-top:12px;line-height:1.5}
 #social-root #soco-x-news{padding:18px;background:#15243b;border:1px solid #30415c;border-radius:15px}
 #social-root #soco-x-news a{color:#edb84b}
 @media(max-width:800px){#social-root{display:block}#social-root .soco-x-aside{position:static;margin:16px 0}}
 `;
 document.head.append(css);
 function setup(){
  const root=document.getElementById('social-root');
  if(!root || root.dataset.xReady)return !!root?.dataset.xReady;
  root.dataset.xReady='1';
  const main=document.createElement('div');main.className='soco-x-main';
  while(root.firstChild)main.append(root.firstChild);
  root.append(main);
  const h=main.querySelector('h1');if(h)h.remove();
  const intro=main.querySelector('p');if(intro&&intro.textContent.includes('social dei presidenti'))intro.remove();
  const head=document.createElement('div');head.className='soco-x-head';
  head.innerHTML='<h1>✦ SocoSocial</h1><p>La voce della Socoleague</p><div class="soco-x-tabs"><button type="button" data-view="feed" aria-selected="true">Per te</button><button type="button" data-view="news" aria-selected="false">Notizie</button></div>';
  main.prepend(head);
  const news=document.createElement('section');news.id='soco-x-news';news.hidden=true;
  news.innerHTML='<h2>Notizie calcistiche</h2><p>Apri le testate originali per leggere notizie aggiornate e verificabili.</p><p><a href="https://www.ansa.it/sito/notizie/sport/calcio/calcio.shtml" target="_blank" rel="noopener noreferrer">ANSA Calcio ↗</a></p><p><a href="https://www.gazzetta.it/Calcio/" target="_blank" rel="noopener noreferrer">La Gazzetta dello Sport ↗</a></p><p><a href="https://www.palermofc.com/" target="_blank" rel="noopener noreferrer">Palermo FC — notizie ufficiali ↗</a></p><small>Questa sezione contiene collegamenti a fonti, non ancora post importati automaticamente.</small>';
  head.after(news);
  const aside=document.createElement('aside');aside.className='soco-x-aside';aside.innerHTML='<h2>⚽ Dentro il calcio</h2><a href="https://www.ansa.it/sito/notizie/sport/calcio/calcio.shtml" target="_blank" rel="noopener noreferrer">ANSA Calcio ↗</a><a href="https://www.gazzetta.it/Calcio/" target="_blank" rel="noopener noreferrer">Gazzetta dello Sport ↗</a><a href="https://www.palermofc.com/" target="_blank" rel="noopener noreferrer">Palermo FC ↗</a><small>Notizie dalle fonti originali. I post della lega restano salvati su Supabase.</small>';
  root.append(aside);
  const feed=main.querySelector('#social-feed');const compose=main.querySelector('#social-compose');const status=main.querySelector('#social-status');
  function switchView(which){const show=which==='feed';news.hidden=show;[feed,compose,status].forEach(el=>{if(!el)return;if(show){if(el===compose)el.hidden=el.dataset.wasHidden==='true';else el.hidden=false}else{el.dataset.wasHidden=String(el.hidden);el.hidden=true}});head.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.view===which)))}
  head.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));
  return true;
 }
 if(!setup()){
  const observer=new MutationObserver(()=>{if(setup())observer.disconnect()});
  observer.observe(document.documentElement,{childList:true,subtree:true});
 }
})();
