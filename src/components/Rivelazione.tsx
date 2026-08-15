"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/*
 * One IntersectionObserver for the whole page rather than one per element.
 * Each element unobserves itself the moment it has arrived.
 */
const azioni = new WeakMap<Element, () => void>();
let osservatore: IntersectionObserver | null = null;

function osserva(nodo: Element, azione: () => void): () => void {
  osservatore ??= new IntersectionObserver(
    (voci) => {
      for (const voce of voci) {
        if (!voce.isIntersecting) continue;
        azioni.get(voce.target)?.();
        azioni.delete(voce.target);
        osservatore?.unobserve(voce.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );

  azioni.set(nodo, azione);
  osservatore.observe(nodo);

  return () => {
    azioni.delete(nodo);
    osservatore?.unobserve(nodo);
  };
}

type Props = {
  children: ReactNode;
  /**
   * `lastra` opens a photograph from its top edge. `testo` brings a block
   * into focus — blur resolving to zero, which is the only arrival on this
   * site because it is the only one made of the same material as the site.
   * `segnale` styles nothing and only marks the element as arrived.
   */
  come?: "testo" | "lastra" | "segnale";
  ritardo?: number;
  elemento?: ElementType;
  className?: string;
};

const classi = {
  testo: "arriva",
  lastra: "arriva-lastra",
  segnale: "",
} as const;

export function Rivelazione({
  children,
  come = "testo",
  ritardo = 0,
  elemento: Elemento = "div",
  className = "",
}: Props) {
  const nodo = useRef<HTMLElement>(null);

  useEffect(() => {
    const elemento = nodo.current;
    if (!elemento) return;

    return osserva(elemento, () => {
      if (ritardo) elemento.style.transitionDelay = `${ritardo}ms`;
      elemento.classList.add("in-vista");
    });
  }, [ritardo]);

  return (
    <Elemento ref={nodo} className={`${classi[come]} ${className}`.trim()}>
      {children}
    </Elemento>
  );
}
