# SocoCup V2

Unico README del repository. Non creare README numerati o file di versioni precedenti.

## Stato
Questa è un'anteprima di sviluppo: Home, Campionato e Squadre leggono dati reali estratti dai tre Excel forniti il 20/10/2026. Le altre sezioni sono dichiarate in preparazione. Non sono presenti login, PIN, database, pannello amministratore o sincronizzazione automatica.

## Cartelle
- `index.html` — punto d'ingresso
- `css/style.css` — grafica
- `js/app.js` — navigazione e visualizzazione dati
- `data/league.json` — copia statica dei dati Excel importati

## Aggiornare il repository
Sostituire i file con lo stesso nome, senza creare duplicati o README aggiuntivi. La cronologia delle versioni è già in GitHub.

## Sicurezza
Il repository privato **non** rende privato un sito pubblicato tramite GitHub Pages o un altro hosting. Questa versione non implementa alcun controllo d'accesso: non pubblicarla come sito privato. Per un test riservato serve un hosting con autenticazione davanti a tutti i file, inclusi i JSON. Non caricare PIN o segreti nel repository.

## Dati
I risultati ufficiali disponibili terminano alla giornata 5; dalla giornata 6 sono incontri programmati, con segnaposto originali `-` e 0 negli Excel. Le rose includono nomi e costi ma non i ruoli. Non sono stati inventati stemmi, presidenti o voti.
