"use client";

import { useSyncExternalStore } from "react";
import { stagioneDelMese, type Stagione } from "@/data/calendario";

/* Module-level so the references stay stable and React never resubscribes. */
const nessunaIscrizione = () => () => {};
const suClient = () => true;
const suServer = () => false;

/**
 * The marker on the moment of the year the reader is actually in.
 *
 * Read on the client rather than at build time on purpose: a static export is
 * only as fresh as its last deploy, and a calendar that insists it is still
 * autumn in February would undermine the one thing this section is trying to
 * prove.
 *
 * The mounted flag comes from useSyncExternalStore rather than an effect, so
 * the server snapshot (false) and the first client render agree and nothing
 * is rendered until hydration has happened — no mismatch, no flash.
 */
export function StagioneCorrente({ id }: { id: Stagione["id"] }) {
  const montato = useSyncExternalStore(nessunaIscrizione, suClient, suServer);
  if (!montato || stagioneDelMese(new Date().getMonth()) !== id) return null;

  return (
    <p className="marca stagione-ora-marca">
      <span aria-hidden="true" className="stagione-ora-punto" />
      Siamo qui
    </p>
  );
}
