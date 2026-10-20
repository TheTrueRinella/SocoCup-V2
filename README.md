# SocoCup V2 — Fase 1

Questa è la prima base grafica e interattiva del nuovo portale, indipendente dal vecchio SocoCup.

## Incluso
- Accesso mobile-first con palette blu notte/azzurro.
- Elenco delle 10 squadre.
- Esattamente cinque campi quadrati per il PIN: niente sesta barra di input.
- Avanzamento automatico, correzione con Backspace, incolla numeri, tastiera numerica mobile.
- Pulsante abilitato solo con squadra e cinque cifre.
- Messaggio esplicito quando l'autenticazione non è ancora configurata.

## NON ancora incluso
- Autenticazione reale, account presidente, recupero/reimpostazione PIN.
- Pannello amministratore e database.
- Protezione dell'ambiente privato, integrazione Leghe Fantacalcio.

**Non pubblicare questo pacchetto come sito operativo**: la UI non autentica utenti. Non inserire PIN reali, hash o credenziali nei file pubblici. I PIN a cinque cifre richiedono controllo server-side, hash robusti, limiti tentativi, lockout e un accesso admin separato con autenticazione forte. Prima di pubblicare un test riservato, usare hosting con controllo di accesso effettivo; un indirizzo GitHub Pages non è privato.

## Anteprima locale
Aprire `index.html` nel browser. Non servono dipendenze per verificare l'aspetto e la navigazione dei cinque quadratini.

## Passo successivo
Configurare backend e autenticazione in un ambiente protetto; poi aggiungere il pannello admin. Non sostituire i file del vecchio repository.

## Organizzazione repository
La radice del repository contiene `index.html`, `README.md` e solo le cartelle effettivamente necessarie: `css/` e `js/`. Quando serviranno immagini o pagine aggiuntive, creare `assets/` e `pages/`. Non aggiungere README numerati, backup ZIP o copie con suffissi V1/V2. La cronologia di Git conserva le revisioni.

Caricare su GitHub **il contenuto della cartella**, non la cartella contenitore.
