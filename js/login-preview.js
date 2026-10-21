"use strict";
// Anteprima grafica. Nessuna verifica PIN avviene nel browser.
(() => {
 const overlay=document.getElementById('login-overlay');
 const open=document.getElementById('login-open');
 const close=document.getElementById('login-close');
 const select=document.getElementById('login-team');
 const pins=[...document.querySelectorAll('#pin-row input')];
 const teams=[
 [1,'Berlusca Dortmund'],[2,'STOKE AZZO'],[3,'Palermo Saint-Rosalia'],
 [4,'Hertavernello'],[5,'Aston Birra'],[6,'Lamin Kiadura'],
 [7,'ipsiwich down'],[8,'Vecio Lanificio Rossi United'],
 [9,'palermo'],[10,'Ciccio Kebab FC']
 ];
 teams.forEach(([id,name])=>select.add(new Option(name,String(id))));
 open.addEventListener('click',()=>{overlay.hidden=false;select.focus();});
 close.addEventListener('click',()=>{overlay.hidden=true;pins.forEach(x=>x.value='');});
 overlay.addEventListener('click',e=>{if(e.target===overlay)close.click();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!overlay.hidden)close.click();});
 pins.forEach((input,i)=>{
  input.addEventListener('input',()=>{input.value=input.value.replace(/\D/g,'').slice(0,1);if(input.value&&i<4)pins[i+1].focus();});
  input.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!input.value&&i>0)pins[i-1].focus();});
  input.addEventListener('paste',e=>{const t=e.clipboardData.getData('text').replace(/\D/g,'').slice(0,5);if(t){e.preventDefault();pins.forEach((p,j)=>p.value=t[j]||'');pins[Math.min(t.length,4)].focus();}});
 });
})();
