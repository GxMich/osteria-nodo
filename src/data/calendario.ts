import { immagini } from "@/lib/immagini";

/**
 * The year, as the card sees it.
 *
 * Four moments, not four categories: what the section has to communicate is
 * that the menu is a calendar rather than a document. The lists are short and
 * concrete for that reason — an abstract sentence about seasonality proves
 * nothing, six ingredients with a month range proves it immediately.
 */
export type Stagione = {
  id: keyof typeof immagini.calendario;
  nome: string;
  mesi: string;
  /** Month indices as returned by Date.getMonth(), 0 = January. */
  indici: readonly number[];
  entrano: readonly string[];
  nota: string;
  alt: string;
};

export const stagioni: readonly Stagione[] = [
  {
    id: "primavera",
    nome: "Primavera",
    mesi: "Marzo — Maggio",
    indici: [2, 3, 4],
    entrano: ["Asparago", "Carciofo", "Pisello", "Erbe amare", "Agnello"],
    nota: "La carta si accorcia: arriva tutto insieme e dura poco.",
    alt: "Asparagi legati in mazzo su fondo scuro.",
  },
  {
    id: "estate",
    nome: "Estate",
    mesi: "Giugno — Agosto",
    indici: [5, 6, 7],
    entrano: ["Pomodoro", "Zucchina", "Pesca", "Basilico", "Peperone"],
    nota: "Nove settimane di pomodoro. Il resto dell'anno non esiste.",
    alt: "Pomodori maturi fotografati da vicino.",
  },
  {
    id: "autunno",
    nome: "Autunno",
    mesi: "Settembre — Novembre",
    indici: [8, 9, 10],
    entrano: ["Fungo", "Nocciola", "Zucca", "Uva", "Castagna"],
    nota: "La stagione più lunga in cucina, la più corta sul banco.",
    alt: "Zucche allineate su una superficie nera.",
  },
  {
    id: "inverno",
    nome: "Inverno",
    mesi: "Dicembre — Febbraio",
    indici: [11, 0, 1],
    entrano: ["Cardo", "Cavolo", "Radicchio", "Porro", "Conserve"],
    nota: "Si vive di fermentati e di radici. È quando si cucina di più.",
    alt: "Cespi di cicoria appena raccolti su un tavolo.",
  },
];

/** The season a given month falls in. Used only for the "siamo qui" marker. */
export function stagioneDelMese(mese: number): Stagione["id"] {
  return (
    stagioni.find((s) => s.indici.includes(mese))?.id ?? stagioni[0].id
  );
}
