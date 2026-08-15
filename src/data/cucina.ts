import { immagini } from "@/lib/immagini";

/**
 * Ingredients, before anything is done to them.
 *
 * Each one carries the same three fields the dishes carry, so the connection
 * the project is named after is legible in both directions: from the plate
 * back to the field, and from the field forward to the plate.
 */
export type Ingrediente = {
  id: keyof typeof immagini.ingredienti;
  nome: string;
  provenienza: string;
  mesi: string;
  nota: string;
  alt: string;
};

export const ingredienti: readonly Ingrediente[] = [
  {
    id: "carciofo",
    nome: "Carciofo",
    provenienza: "Alta Langa",
    mesi: "Mar — Mag",
    nota: "Si prende piccolo, prima che il fieno si formi.",
    alt: "Carciofi accatastati, gambi e brattee ancora coperti di polvere.",
  },
  {
    id: "trota",
    nome: "Trota",
    provenienza: "Valle Maira",
    mesi: "Tutto l'anno",
    nota: "Arriva intera la mattina e si sfiletta in cucina.",
    alt: "Due trote intere appoggiate su un piano scuro.",
  },
  {
    id: "nocciola",
    nome: "Nocciola",
    provenienza: "Alta Langa",
    mesi: "Set — Ott",
    nota: "Tostata a bassa temperatura, mai il giorno prima.",
    alt: "Nocciole sgusciate raccolte in un mucchio.",
  },
  {
    id: "pomodoro",
    nome: "Pomodoro",
    provenienza: "Astigiano",
    mesi: "Lug — Set",
    nota: "Nove settimane l'anno. Fuori stagione non entra.",
    alt: "Un pomodoro maturo isolato su una superficie nera.",
  },
  {
    id: "fungo",
    nome: "Fungo",
    provenienza: "Valli cuneesi",
    mesi: "Set — Nov",
    nota: "Dipende dalla pioggia, non dal calendario.",
    alt: "Funghi appena raccolti posati su un tavolo di legno.",
  },
  {
    id: "cipolla",
    nome: "Cipolla",
    provenienza: "Monferrato",
    mesi: "Giu — Feb",
    nota: "La più costante di tutte. Regge la carta d'inverno.",
    alt: "Cipolle tagliate a metà in una ciotola di legno.",
  },
];

/**
 * What the kitchen actually does, said as verbs.
 *
 * This is the section where a restaurant site usually invents a chef with a
 * biography and a list of awards. There is no chef here: the subject is the
 * work, and the work is a short list of techniques applied to a short list of
 * ingredients.
 */
export type Gesto = {
  nome: string;
  descrizione: string;
};

export const gesti: readonly Gesto[] = [
  {
    nome: "Brace",
    descrizione:
      "Legna di faggio, mai carbone. Serve il fumo tanto quanto il calore.",
  },
  {
    nome: "Cenere",
    descrizione:
      "Cottura sotto la brace spenta: lenta, senza acqua, senza grassi.",
  },
  {
    nome: "Affumicatura",
    descrizione: "A freddo, in casa, su segatura di ciliegio. Da otto ore.",
  },
  {
    nome: "Fermentazione",
    descrizione:
      "Verdure in salamoia da fine estate. È così che passa l'inverno.",
  },
  {
    nome: "Sfoglia",
    descrizione: "Tirata a mano ogni mattina. Finita entro il servizio di sera.",
  },
  {
    nome: "Estrazione",
    descrizione:
      "Brodi e fondi da scarti della settimana. Niente si prepara due volte.",
  },
];

/**
 * The cellar, described the way the kitchen is described.
 *
 * No producer is named. A concept restaurant that lists real winemakers is
 * implying a relationship that does not exist, and the section works better
 * as a stated method anyway.
 */
export type VoceCantina = {
  categoria: string;
  etichette: number;
  nota: string;
};

export const cantina: readonly VoceCantina[] = [
  { categoria: "Bianchi", etichette: 34, nota: "Metà da vitigni non aromatici" },
  { categoria: "Rossi", etichette: 58, nota: "Il fondo della carta, per territorio" },
  { categoria: "Macerati", etichette: 12, nota: "Serviti a temperatura di cantina" },
  { categoria: "Bollicine", etichette: 9, nota: "Nessuna cuvée da dessert" },
  { categoria: "Al calice", etichette: 14, nota: "Cambiano ogni due settimane" },
];
