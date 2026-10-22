/* SocoCup V2 - corregge soltanto i link SocoSocial del menu */
(()=>{
 const fix=()=>{
  document.querySelectorAll('#nav a, .tabs a').forEach(a=>{
   const label=(a.textContent||'').trim().toLowerCase();
   const href=(a.getAttribute('href')||'').toLowerCase();
   if(label.includes('socosocial') || href==='#social' || href==='#socosocial') a.setAttribute('href','#socosocial');
  });
 };
 document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.getElementById('nav');if(!nav)return;
  fix();new MutationObserver(fix).observe(nav,{childList:true,subtree:true});
 });
})();
