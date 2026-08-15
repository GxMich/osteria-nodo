"use client";

import { useState } from "react";
import Image from "next/image";
import { immagini } from "@/lib/immagini";
import {
  PIATTO_INIZIALE,
  numeroDi,
  piattiNumerati,
  sezioniMenu,
  type Piatto,
} from "@/data/menu";

type Id = Piatto["id"];

/**
 * IL PASSE — the signature.
 *
 * A single glass disc, the only curved form anywhere on the site, holding
 * whichever dish the reader is on. The photograph is sharp at the centre and
 * dissolves into frost toward the rim, which is what looking down into a
 * glass actually does: the blur is optics rather than decoration, and it is
 * the reason this interface is made of glass at all.
 *
 * One state model for pointer, keyboard and touch. Pointing at a dish or
 * tabbing onto it puts it on the plate; committing to it opens its
 * description in the card. Nothing needs a second mode for a finger.
 */
export function MenuInterattivo() {
  const [mostrato, setMostrato] = useState<Id>(PIATTO_INIZIALE);
  const [aperto, setAperto] = useState<Id | null>(null);
  const [montate, setMontate] = useState<readonly Id[]>([PIATTO_INIZIALE]);
  const [pronte, setPronte] = useState<readonly Id[]>([]);
  /*
   * Recency of the frames that have been on the plate. The last entry is what
   * is painted — which is not always what is selected, because a dish whose
   * file has not arrived yet leaves the previous one up until it decodes —
   * and the order sets the stacking, so the frame directly beneath the one
   * dissolving in is always the one it replaces.
   */
  const [ordine, setOrdine] = useState<readonly Id[]>([PIATTO_INIZIALE]);
  const visibile = ordine[ordine.length - 1];

  const scopri = (id: Id) =>
    setOrdine((precedenti) => [...precedenti.filter((x) => x !== id), id]);

  const mostra = (id: Id) => {
    setMostrato(id);
    setMontate((precedenti) =>
      precedenti.includes(id) ? precedenti : [...precedenti, id],
    );
    if (pronte.includes(id)) scopri(id);
  };

  const segnalaPronta = (id: Id) => {
    setPronte((precedenti) =>
      precedenti.includes(id) ? precedenti : [...precedenti, id],
    );
    if (id === mostrato) scopri(id);
  };

  const commuta = (id: Id) => {
    mostra(id);
    setAperto((precedente) => (precedente === id ? null : id));
  };

  const rilascia = () => mostra(aperto ?? PIATTO_INIZIALE);

  const piatto = piattiNumerati.find((p) => p.id === mostrato)!;

  return (
    <div className="carta-impianto">
      {/*
       * The plate is a visual echo of a row that already announces its own
       * name, price and description, so it is hidden from assistive
       * technology. Everything it shows in pictures, the open row says in
       * words.
       */}
      <figure className="passe" aria-hidden="true">
        <div className="passe-disco">
          {montate.map((id) => (
            <Image
              key={id}
              src={immagini.piatti[id]}
              alt=""
              fill
              sizes="(max-width: 899px) 58vw, 26vw"
              onLoad={() => segnalaPronta(id)}
              style={{
                objectFit: "cover",
                zIndex: ordine.indexOf(id) + 1,
                visibility: ordine.includes(id) ? "visible" : "hidden",
                opacity: id === visibile ? 1 : 0,
                transition: "opacity var(--t-vetro) var(--e-vetro)",
              }}
            />
          ))}
          <span className="passe-gelo" />
          <span className="passe-cerchio" />
        </div>

        <figcaption className="passe-piede">
          <span className="dato passe-numero">{numeroDi(piatto.id)}</span>
          <span className="passe-nome">{piatto.nome}</span>
        </figcaption>
      </figure>

      <div className="carta-elenco" onPointerLeave={rilascia}>
        {sezioniMenu.map((sezione) => (
          <section key={sezione.id}>
            <h3 className="marca carta-portata-nome">{sezione.titolo}</h3>

            <ul>
              {sezione.piatti.map((p) => {
                const vivo = p.id === mostrato;
                const espanso = p.id === aperto;

                return (
                  <li
                    key={p.id}
                    className={`carta-voce${vivo ? " carta-voce-viva" : ""}`}
                  >
                    <button
                      type="button"
                      className="carta-piatto"
                      aria-expanded={espanso}
                      aria-controls={`piatto-${p.id}`}
                      onClick={() => commuta(p.id)}
                      onFocus={() => mostra(p.id)}
                      onPointerEnter={(evento) => {
                        /* Pointer preview is for mice. On touch the same
                           gesture is already a tap. */
                        if (evento.pointerType === "mouse") mostra(p.id);
                      }}
                    >
                      <span className="carta-numero">{numeroDi(p.id)}</span>
                      <span className="carta-nome">{p.nome}</span>
                      <span className="carta-prezzo">{p.prezzo}</span>
                    </button>

                    <div
                      id={`piatto-${p.id}`}
                      className="carta-dettaglio"
                      hidden={!espanso}
                    >
                      <p className="marca carta-nodo">
                        {p.nodo.map((termine) => (
                          <span key={termine}>{termine}</span>
                        ))}
                      </p>
                      <p className="nota">{p.descrizione}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
