/**
 * Facts about the restaurant.
 *
 * Osteria Nodo does not exist. Everything here is conceptual and internally
 * consistent, and nothing in it can be mistaken for a real business: the
 * location stops at the region, there is no street address, there is no phone
 * number, and the email sits on `.example` — a domain reserved by RFC 2606
 * precisely so that it can never belong to anyone.
 */

export const site = {
  nome: "Osteria Nodo",
  nomeRighe: ["Osteria", "Nodo"] as const,
  insegna: "Cucina contemporanea",
  regione: "Piemonte, Italia",
  /* The cover kicker only has one line to spend, and "Italia" is the part a
     reader standing in Italy can work out for themselves. */
  regioneBreve: "Piemonte",
  email: "prenotazioni@osterianodo.example",
  coperti: 28,
  /** Dishes on the card at any one time. Small on purpose — see Intro. */
  piattiInCarta: 10,
} as const;

export const navigazione = [
  { label: "Il ristorante", href: "#luogo" },
  { label: "Menu", href: "#menu" },
  { label: "Cucina", href: "#cucina" },
  { label: "Cantina", href: "#cantina" },
  { label: "Contatti", href: "#contatti" },
] as const;

export type Servizio = {
  giorni: string;
  /** Weekday indices as returned by Date.getDay(), 0 = Sunday. */
  indici: readonly number[];
  orario: string;
};

/**
 * The week. The reservation form reads `indici` to work out which services
 * exist on a chosen date, so this array is the single source of truth for
 * both the printed hours and the booking logic.
 */
export const servizi = {
  pranzo: {
    giorni: "Venerdì — domenica",
    indici: [5, 6, 0],
    orario: "12:30 — 14:30",
  },
  cena: {
    giorni: "Martedì — domenica",
    indici: [2, 3, 4, 5, 6, 0],
    orario: "19:30 — 22:00",
  },
  /* `satisfies` without `as const`: the weekday lists have to stay assignable
     to number[] so the booking form can test an arbitrary date against them. */
} satisfies Record<string, Servizio>;

/** Monday. Closed, both services. */
export const GIORNO_CHIUSURA = 1;

/**
 * Bookable slots. Half-hour steps because the room does one sitting at
 * dinner: the spread of arrival times is the only thing that keeps the pass
 * from receiving twenty-eight covers at once.
 */
export const fasce = {
  pranzo: ["12:30", "13:00", "13:30", "14:00"],
  cena: ["19:30", "20:00", "20:30", "21:00", "21:30"],
} as const;

export type IdServizio = keyof typeof fasce;

export const orari = [
  { voce: "Pranzo", valore: `${servizi.pranzo.giorni}, ${servizi.pranzo.orario}` },
  { voce: "Cena", valore: `${servizi.cena.giorni}, ${servizi.cena.orario}` },
  { voce: "Chiuso", valore: "Lunedì tutto il giorno" },
  { voce: "Sala", valore: `${site.coperti} coperti, un solo turno a cena` },
] as const;
