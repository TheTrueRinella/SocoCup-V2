'use strict';
// Phase 1 UI: no credentials or PINs are stored in frontend source.
const teams = ['Berlusca Dortmund','Aston Birra','Palermo Saint-Rosalia','STOKE AZZO','Hertavernello','Vecio Lanificio Rossi United','Ciccio Kebab FC','Lamin Kiadura','ipsiwich down','palermo'];
const select = document.querySelector('#team');
const inputs = [...document.querySelectorAll('.pin input')];
const button = document.querySelector('#submit');
const status = document.querySelector('#status');
for (const [i, name] of teams.entries()) { const option=document.createElement('option'); option.value=String(i+1); option.textContent=name; select.append(option); }
const complete=()=>{button.disabled=!(select.value&&inputs.every(el=>/^\d$/.test(el.value)));status.textContent='';};
select.addEventListener('change',complete);
inputs.forEach((input,index)=>{
  input.addEventListener('input',()=>{ const digits=input.value.replace(/\D/g,'');input.value=digits.slice(-1);if(input.value&&index<4)inputs[index+1].focus();complete(); });
  input.addEventListener('keydown',event=>{if(event.key==='Backspace'&&!input.value&&index>0){inputs[index-1].focus();inputs[index-1].value='';complete();}if(event.key==='ArrowLeft'&&index>0)inputs[index-1].focus();if(event.key==='ArrowRight'&&index<4)inputs[index+1].focus();});
  input.addEventListener('paste',event=>{const raw=event.clipboardData?.getData('text')??'';const digits=raw.replace(/\D/g,'').slice(0,5-index);if(!digits)return;event.preventDefault();for(let j=0;j<digits.length;j++)inputs[index+j].value=digits[j];inputs[Math.min(4,index+digits.length)].focus();complete();});
});
document.querySelector('#login').addEventListener('submit',event=>{event.preventDefault();if(button.disabled)return;status.textContent='Accesso non ancora attivo: occorre configurare il servizio di autenticazione sicuro.';inputs.forEach(el=>el.value='');button.disabled=true;inputs[0].focus();});
