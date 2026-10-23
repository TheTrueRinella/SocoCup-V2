/* Progressive enhancement: keeps existing Supabase posts and login intact. */
(() => {
  'use strict';
  const teams=['Berlusca Dortmund','STOKE AZZO','Palermo Saint-Rosalia','Hertavernello','Aston Birra','Lamin Kiadura','ipsiwich down','Vecio Lanificio Rossi United','palermo','Ciccio Kebab FC'];
  const app=document.getElementById('app');
  if(!app)return;
  let active='perte';
  let busy=false;
  function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;}
  function renderPanel(shell){const panel=shell.querySelector('.curva-panel');panel.replaceChildren();if(active==='squadre'){
    const grid=el('div','curva-teamgrid');teams.forEach((name,i)=>{const a=el('a','curva-team');a.href='#squadre/'+encodeURIComponent(name);a.append(el('span','curva-avatar',String(i+1)),el('span','curva-team-name',name));grid.append(a);});panel.append(grid);
  }else if(active==='seguiti'){panel.append(el('p','curva-note','La sezione Seguiti sarà disponibile quando saranno attivati i follow tra presidenti. I post esistenti rimangono nella scheda Per te.'));
  }else if(active==='notizie'){const p=el('p','curva-note','Notizie calcistiche e aggiornamenti della lega.');panel.append(p);const links=[['ANSA Calcio','https://www.ansa.it/sito/notizie/sport/calcio/calcio.shtml'],['Gazzetta dello Sport','https://www.gazzetta.it/Calcio/'],['Palermo FC','https://www.palermofc.com/']];links.forEach(([name,url])=>{const a=el('a','curva-team',name+' ↗');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.style.marginBottom='8px';panel.append(a);});
  }else{panel.append(el('p','curva-note','Qui sotto trovi i post reali della lega, con pubblicazione e interazioni già collegate al sito.'));}
  shell.querySelectorAll('.curva-tab').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===active)));
  // Hide original feed only while browsing other sections, without removing its handlers.
  [...app.children].forEach(n=>{if(n!==shell){if(active==='perte'){if(n.dataset.curvaHidden==='yes'){n.hidden=false;delete n.dataset.curvaHidden;}}else if(!n.hidden){n.hidden=true;n.dataset.curvaHidden='yes';}}});
  }
  function enhance(){if(busy)return;busy=true;try{
    if(!location.hash.startsWith('#social'))return;
    if(document.getElementById('soco-curva-shell'))return;
    const shell=el('section');shell.id='soco-curva-shell';shell.setAttribute('aria-label','SocoSocial La Curva');
    const head=el('div','curva-head');const left=el('div');left.append(el('h2','','⚽ La Curva'),el('div','curva-sub','Il social della SocoLeague'));head.append(left);shell.append(head);
    const tabs=el('div','curva-tabs');tabs.setAttribute('role','tablist');[['perte','Per te'],['seguiti','Seguiti'],['squadre','Squadre'],['notizie','Notizie']].forEach(([id,label])=>{const b=el('button','curva-tab',label);b.type='button';b.dataset.tab=id;b.setAttribute('role','tab');b.addEventListener('click',()=>{active=id;renderPanel(shell)});tabs.append(b)});shell.append(tabs);
    const panel=el('div','curva-panel');shell.append(panel);app.prepend(shell);renderPanel(shell);
  }finally{busy=false}}
  window.addEventListener('hashchange',()=>{active='perte';setTimeout(enhance,80)});
  const observer=new MutationObserver(()=>{if(location.hash.startsWith('#social')&&!document.getElementById('soco-curva-shell'))enhance()});observer.observe(app,{childList:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',enhance);else enhance();
})();
