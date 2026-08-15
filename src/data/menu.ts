import { immagini } from "@/lib/immagini";

/**
 * The card.
 *
 * Fictional concept dishes for a fictional restaurant. They are deliberately
 * plain — three or four elements, a technique, nothing that reads like a
 * tasting-menu press release — because the point of the section is the
 * typography and the connection each dish declares, not culinary invention.
 *
 * `nodo` is the device the whole project turns on: ingredient, territory,
 * gesture. Three words that say where a plate comes from and what was done
 * to it. Every dish has to be able to answer all three.
 */

export type Piatto = {
  id: keyof typeof immagini.piatti;
  nome: string;
  descrizione: string;
  /** [ ingrediente, territorio, gesto ] */
  nodo: readonly [string, string, string];
  prezzo: number;
};

export type SezioneMenu = {
  id: string;
  titolo: string;
  piatti: readonly Piatto[];
};

export const sezioniMenu: readonly SezioneMenu[] = [
  {
    id: "antipasti",
    titolo: "Antipasti",
    piatti: [
      {
        id: "carciofo",
        nome: "Carciofo, nocciola, erbe amare",
        descrizione:
          "Cuori scottati sulla brace, crema di nocciola tostata, un'insalata di erbe che resta amara fino in fondo.",
        nodo: ["Carciofo", "Alta Langa", "Brace"],
        prezzo: 15,
      },
      {
        id: "trota",
        nome: "Trota affumicata, mela verde, rafano",
        descrizione:
          "Affumicata in casa a freddo, servita appena tiepida. La mela e il rafano tengono il grasso a distanza.",
        nodo: ["Trota", "Valle Maira", "Affumicatura"],
        prezzo: 16,
      },
      {
        id: "cipolla",
        nome: "Cipolla alla brace, fonduta, aceto",
        descrizione:
          "Intera sotto la cenere per due ore, aperta al momento. Fonduta di formaggio d'alpeggio, aceto di vino nostro.",
        nodo: ["Cipolla", "Monferrato", "Cenere"],
        prezzo: 14,
      },
    ],
  },
  {
    id: "primi",
    titolo: "Primi",
    piatti: [
      {
        id: "tagliatelle",
        nome: "Tagliatelle, burro nocciola, salvia",
        descrizione:
          "Sfoglia tirata a mano ogni mattina, tagliata stretta. Burro portato al punto di nocciola e niente altro.",
        nodo: ["Grano", "Roero", "Sfoglia"],
        prezzo: 17,
      },
      {
        id: "risotto",
        nome: "Risotto, cardo, midollo",
        descrizione:
          "Mantecato senza panna. Il cardo dà l'amaro, il midollo lo copre a metà: il piatto sta in quel disaccordo.",
        nodo: ["Riso", "Vercellese", "Mantecatura"],
        prezzo: 19,
      },
      {
        id: "agnolotti",
        nome: "Agnolotti, brodo di arrosto",
        descrizione:
          "Ripieno di tre carni arrostite il giorno prima. Serviti nel loro brodo, senza altro condimento.",
        nodo: ["Carne", "Cuneese", "Arrosto"],
        prezzo: 18,
      },
    ],
  },
  {
    id: "secondi",
    titolo: "Secondi",
    piatti: [
      {
        id: "luccio",
        nome: "Luccio, porri bruciati, alloro",
        descrizione:
          "Pesce di lago, cotto sulla pelle. Porri lasciati annerire fuori e restati dolci dentro.",
        nodo: ["Luccio", "Lago d'Orta", "Fiamma"],
        prezzo: 26,
      },
      {
        id: "manzo",
        nome: "Manzo, cipollotto, senape",
        descrizione:
          "Taglio di spalla, cottura lunga e poi griglia. Senape fatta in casa, più acida che piccante.",
        nodo: ["Manzo", "Cuneese", "Griglia"],
        prezzo: 28,
      },
    ],
  },
  {
    id: "dolci",
    titolo: "Dolci",
    piatti: [
      {
        id: "nocciola",
        nome: "Nocciola, latte, sale",
        descrizione:
          "Tre temperature della stessa nocciola. Il sale arriva alla fine e cambia tutto il resto.",
        nodo: ["Nocciola", "Alta Langa", "Tostatura"],
        prezzo: 10,
      },
      {
        id: "pera",
        nome: "Pera, alloro, panna acida",
        descrizione:
          "Cotta piano nel suo sciroppo con l'alloro. La panna acida serve a togliere zucchero, non ad aggiungerne.",
        nodo: ["Pera", "Astigiano", "Cottura lenta"],
        prezzo: 9,
      },
    ],
  },
] as const;

/**
 * The card in reading order, numbered continuously across the sections —
 * 01 to 10, the way a printed menu numbers its dishes rather than restarting
 * at each heading. Derived rather than written by hand so the numbers cannot
 * drift out of step when a dish is added or moved.
 */
export const piattiNumerati = sezioniMenu.flatMap((sezione) =>
  sezione.piatti.map((piatto) => ({ ...piatto, sezione: sezione.id })),
);

export type PiattoNumerato = (typeof piattiNumerati)[number];

/** Zero-padded position in the card. */
export function numeroDi(id: Piatto["id"]): string {
  const posizione = piattiNumerati.findIndex((p) => p.id === id);
  return String(posizione + 1).padStart(2, "0");
}

export const PIATTO_INIZIALE = piattiNumerati[0].id;
