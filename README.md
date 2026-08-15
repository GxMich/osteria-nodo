# Osteria Nodo

Concept digitale per un ristorante italiano contemporaneo.

**Osteria Nodo non esiste.** È un progetto autoprodotto: nessun dato, recapito,
recensione, riconoscimento o produttore citato in queste pagine si riferisce a
un'attività reale.

---

## L'idea

*Nodo* vuol dire legame: fra un ingrediente e il posto da cui viene, fra chi lo
coltiva e chi lo cucina, fra un piatto e il mese in cui ha senso mangiarlo.

Il sito è costruito come una **pubblicazione editoriale indipendente** su un
ristorante, non come un sito di ristorante.

Due dispositivi lo tengono insieme.

**Il legame tipografico.** Un filetto corto lega NODO a OSTERIA nel marchio, ed
è l'unico elemento del logotipo che porta il colore. Lo stesso filetto ricompare
davanti ai numeri di capitolo e ai segni di margine: un solo gesto, tre luoghi.

**Il nodo di ogni piatto.** Tre parole — ingrediente, territorio, gesto — che
ogni piatto in carta deve saper dire.

## Struttura e ruoli

Ogni sezione ha un ruolo compositivo diverso, e **cinque sezioni su dodici non
hanno alcun segno**: un'intestazione uguale su ogni sezione trasforma una
pubblicazione in un modulo, e i numeri smettono di significare qualcosa proprio
quando servono.

| | Sezione | Ruolo compositivo |
|---|---|---|
| — | Copertina | Statement a sinistra, fotografia tagliata sul margine destro |
| — | Il principio | **Tipografia prima**: nessun segno, testo spinto a destra, vuoto in basso a sinistra |
| 01 | Il luogo | **Architettura prima**: la fotografia al vivo arriva prima del capitolo |
| 02 | La carta | **Informazione prima**: nessun cappello, solo una chiave in margine |
| — | Prima del piatto | **Fotografia prima**: il nastro corre, le parole annotano dopo |
| 03 | Il calendario | Segno di margine. L'anno come linea, non come quattro schede |
| 04 | In cucina | L'unica sezione su fondo scuro. Nessuno chef inventato |
| 05 | Cantina | **Elenco prima**: il registro domina, la prosa passa in margine |
| — | A tavola | Pausa. L'unica sovrapposizione della pagina |
| 06 | Prenota | **Conversione prima**: data, ora, ospiti — simulazione dichiarata |
| 07 | Dove siamo | Segno di margine. Colophon: regione, orari, recapiti di esempio |

## Scelte tecniche

**Stack** — Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 usato
per i token e il reset; la composizione è CSS scritto a mano in
`src/app/impaginato.css`. Nessuna dipendenza aggiunta per un effetto.

**Server first** — cinque soli Client Component: header, carta interattiva,
prenotazione, rivelazioni allo scroll, marcatore della stagione corrente.
Tutto il resto è statico.

**Interazione della carta** (`components/MenuInterattivo.tsx`) — puntare o
tabulare su un piatto cambia la fotografia, sceglierlo apre la descrizione.
Un solo modello di stato, quindi su touch un tocco fa quello che su desktop fa
il puntatore; la cornice è `sticky` a destra su desktop e sotto la testata su
telefono. Le immagini si montano su richiesta e la cornice non resta mai vuota:
tiene l'ultima caricata finché la nuova non ha decodificato.

**Prenotazione** (`components/Reservation.tsx`) — tre decisioni e nient'altro:
nessun account, nessun nome, nessuna email, nessun dato personale raccolto. La
logica di sala è vera (lunedì chiuso, pranzo solo venerdì–domenica, letta dallo
stesso oggetto che stampa gli orari); la risposta è dichiaratamente simulata.

**Fotografia** — manifesto unico in `src/lib/immagini.ts`. Sostituire un valore
con un percorso locale è sufficiente per passare a fotografia commissionata.
Le immagini sono servite da Unsplash con un loader custom (`unsplash-loader.ts`)
perché l'export statico non ha `/_next/image`: `srcset` e `sizes` continuano a
funzionare.

**Movimento** — nove rivelazioni in tutta la pagina, tutte fotografiche: la
lastra si apre dal bordo superiore. Nessun testo entra in dissolvenza. Una
pagina in cui ogni paragrafo compare salendo di quattordici pixel è una pagina
che si annuncia a ogni riga, ed è il segno più riconoscibile di un sito
generato.

**Colore** — tre voci e non una. Vino per l'identità (il legame del marchio, i
numeri di capitolo, i segni che il ristorante lascia sulla propria pagina),
rame quando il fondo passa alla notte, oliva per il territorio nella sezione
degli ingredienti. Il testo corrente è in inchiostro pieno: era in tono
secondario, ed è ciò che rendeva l'intera pagina esitante.

**Responsive** — stessa identità, composizione diversa. Su telefono la
copertina passa a un ritaglio quadrato (in 4/5 la fotografia spingeva sotto la
piega la frase che dice cos'è il ristorante), il calendario ruota di novanta
gradi e diventa una linea verticale con tacche, la carta tiene la cornice
fotografica appiccicata sotto la testata, e PRENOTA resta nella barra a ogni
larghezza — nessuna barra fissa in fondo allo schermo, che sarebbe un secondo
invito allo stesso gesto.

**Accessibilità** — HTML semantico, un solo `h1` e nessun salto di livello,
focus visibile, radio reali sotto le pastiglie di orario e coperti, `alt`
significativi, nessuna funzione essenziale affidata all'hover.

Il pannello mobile rende `inert` `main`, `footer` e il salto-contenuto finché è
aperto: senza, si esce a tabulazione da un overlay a schermo intero verso venti
link che non si vedono, e l'anello di focus semplicemente sparisce. `Esc`
chiude e restituisce il focus al pulsante che ha aperto.

Le dimensioni dei bersagli seguono il dispositivo di puntamento, non la
larghezza della finestra: `@media (pointer: coarse)` porta a 44px i link del
piè di pagina, perché un tablet in orizzontale è largo 1024px e si usa con un
pollice.

Le animazioni d'ingresso partono da uno stato nascosto solo dentro
`@media (scripting: enabled)`, così senza JavaScript la pagina è interamente
leggibile e non c'è nulla da rivelare.

**Niente dati strutturati** — `Restaurant` schema richiederebbe indirizzo,
telefono, orari e prenotabilità di un locale che non esiste.

## Sviluppo

```bash
npm run dev
```

```bash
npm run build
```

Il build produce un export statico in `out/`. Per pubblicare sotto un
sotto-percorso impostare `NEXT_PUBLIC_BASE_PATH`; per canonical, sitemap e Open
Graph impostare `NEXT_PUBLIC_SITE_URL`.

---

Concept e sviluppo: Michele Modica · Fotografie: [Unsplash](https://unsplash.com)
