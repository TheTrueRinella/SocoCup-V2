import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const cfg = window.SOCO_SUPABASE;
const client = createClient(cfg.url, cfg.publishableKey);
const names = {1:'Berlusca Dortmund',2:'STOKE AZZO',3:'Palermo Saint-Rosalia',4:'Hertavernello',5:'Aston Birra',6:'Lamin Kiadura',7:'ipsiwich down',8:'Vecio Lanificio Rossi United',9:'palermo',10:'Ciccio Kebab FC'};
const button = document.getElementById('my-team-link');
let currentTeam = null;
function update() {
  button.hidden = !currentTeam;
  if (currentTeam) button.href = '#squadre/' + encodeURIComponent(names[currentTeam]);
}
async function refresh() {
  try {
    const { data: { user }, error } = await client.auth.getUser();
    if (error || !user?.is_anonymous) { currentTeam = null; update(); return; }
    const { data, error: profileError } = await client.from('sococup_profiles').select('team_id').eq('user_id',user.id).maybeSingle();
    currentTeam = profileError ? null : (names[data?.team_id] ? data.team_id : null);
  } catch { currentTeam = null; }
  update();
}
button.addEventListener('click', () => { if (!currentTeam) return; });
client.auth.onAuthStateChange(() => { setTimeout(refresh, 0); });
// Il modulo login gestisce l'accesso; il profilo legge soltanto il proprio team_id.
refresh();
// Aggiorna il collegamento dopo il login e dopo l'uscita, senza alterare login.js.
const loginButton = document.getElementById('login-open');
loginButton?.addEventListener('click', () => { setTimeout(refresh, 1200); });
window.addEventListener('focus', refresh);
