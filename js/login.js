import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const { url, publishableKey } = window.SOCO_SUPABASE;
const supabase = createClient(url, publishableKey);
const endpoint = `${url}/functions/v1/sococup-team-login`;
const siteKey = '0x4AAAAAAFeTm6Q221sWh0U0';
const $ = id => document.getElementById(id);
const overlay = $('login-overlay'), open = $('login-open'), close = $('login-close');
const select = $('login-team'), submit = $('login-submit'), error = $('login-error');
const pins = [...document.querySelectorAll('#pin-row input')];
const teams = [
  [1,'Berlusca Dortmund'],[2,'STOKE AZZO'],[3,'Palermo Saint-Rosalia'],
  [4,'Hertavernello'],[5,'Aston Birra'],[6,'Lamin Kiadura'],
  [7,'ipsiwich down'],[8,'Vecio Lanificio Rossi United'],
  [9,'palermo'],[10,'Ciccio Kebab FC']
];
const teamName = id => teams.find(t => t[0] === id)?.[1] || `Squadra ${id}`;
teams.forEach(([id, name]) => select.add(new Option(name, String(id))));
let widgetId = null, busy = false, loggedInTeam = null;
function message(s) { error.textContent = s; }
function showLogin() { overlay.hidden = false; select.focus(); renderCaptcha(); }
function hideLogin() { overlay.hidden = true; pins.forEach(x => x.value = ''); message(''); }
function renderCaptcha() {
  if (widgetId !== null || !window.turnstile) return;
  widgetId = window.turnstile.render('#turnstile-widget', { sitekey: siteKey, theme: 'dark' });
}
function setLoggedIn(teamId) {
  loggedInTeam = teamId;
  open.textContent = `✓ ${teamName(teamId)} · Esci`;
  hideLogin();
}
open.addEventListener('click', async () => {
  if (loggedInTeam) {
    await supabase.auth.signOut();
    loggedInTeam = null;
    open.textContent = 'Accedi';
    message('');
  } else showLogin();
});
close.addEventListener('click', hideLogin);
overlay.addEventListener('click', e => { if (e.target === overlay) hideLogin(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !overlay.hidden) hideLogin(); });
pins.forEach((input, i) => {
  input.addEventListener('input', () => { input.value = input.value.replace(/\D/g, '').slice(0, 1); if (input.value && i < 4) pins[i+1].focus(); });
  input.addEventListener('keydown', e => { if (e.key === 'Backspace' && !input.value && i > 0) pins[i-1].focus(); });
  input.addEventListener('paste', e => {
    const t = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5);
    if (t) { e.preventDefault(); pins.forEach((p, j) => p.value = t[j] || ''); pins[Math.min(t.length, 4)].focus(); }
  });
});
async function restoreSession() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user?.is_anonymous) return;
  const { data, error: profileError } = await supabase.from('sococup_profiles').select('team_id').eq('user_id', user.id).maybeSingle();
  if (!profileError && data?.team_id) setLoggedIn(data.team_id);
}
async function waitForTurnstile() {
  for (let i = 0; i < 30 && !window.turnstile; i++) await new Promise(resolve => setTimeout(resolve, 100));
  renderCaptcha();
  return !!window.turnstile;
}
submit.addEventListener('click', async () => {
  if (busy) return;
  const teamId = Number(select.value);
  const pin = pins.map(x => x.value).join('');
  if (!teamId || !/^\d{5}$/.test(pin)) { message('Seleziona la squadra e inserisci tutte e cinque le cifre.'); return; }
  busy = true; submit.disabled = true; message('Verifica in corso…');
  try {
    if (!(await waitForTurnstile())) throw new Error('Verifica Cloudflare non caricata. Ricarica la pagina.');
    const captchaToken = window.turnstile.getResponse(widgetId);
    if (!captchaToken) throw new Error('Completa prima la verifica Cloudflare.');
    let { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.is_anonymous) throw new Error('Sessione non compatibile.');
      const { data: profile, error: profileError } = await supabase.from('sococup_profiles').select('team_id').eq('user_id', user.id).maybeSingle();
      if (profileError) throw new Error('Impossibile controllare la sessione.');
      if (profile) { setLoggedIn(profile.team_id); return; }
    } else {
      const { data, error: authError } = await supabase.auth.signInAnonymously({ options: { captchaToken } });
      if (authError || !data.session) throw new Error('Verifica di sicurezza o sessione non riuscita. Riprova.');
      session = data.session;
    }
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'apikey': publishableKey, 'Authorization': `Bearer ${session.access_token}` },
      body: JSON.stringify({ team_id: teamId, pin })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success !== true) throw new Error(result.error || `Errore di accesso (${response.status})`);
    setLoggedIn(result.team_id);
  } catch (e) {
    message(e?.message || 'Accesso non riuscito.');
  } finally {
    busy = false; submit.disabled = false;
    if (widgetId !== null && window.turnstile) window.turnstile.reset(widgetId);
  }
});
restoreSession().catch(() => {});
