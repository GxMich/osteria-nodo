"use client";

import { useEffect, useRef, useState } from "react";
import { navigazione, site } from "@/data/site";

export function Header() {
  const [vetro, setVetro] = useState(false);
  const [aperto, setAperto] = useState(false);
  const bottoneMenu = useRef<HTMLButtonElement>(null);
  const pannello = useRef<HTMLDivElement>(null);

  /*
   * The bar turns to glass once the cover has gone behind it. Driven by a
   * sentinel rather than a scroll listener: one observer callback instead of
   * a handler on every frame.
   */
  useEffect(() => {
    const sentinella = document.createElement("div");
    sentinella.style.cssText =
      "position:absolute;top:5rem;left:0;height:1px;width:1px;pointer-events:none";
    document.body.prepend(sentinella);

    const osservatore = new IntersectionObserver(([voce]) =>
      setVetro(!voce.isIntersecting),
    );
    osservatore.observe(sentinella);

    return () => {
      osservatore.disconnect();
      sentinella.remove();
    };
  }, []);

  /*
   * While the panel is open: Escape closes, focus moves inside, the page
   * behind stops scrolling and — the part that is easy to forget — stops
   * being reachable. `inert` is the native answer, so there is no key-trapping
   * loop to get wrong, and it removes the same elements from the
   * accessibility tree at the same time.
   */
  useEffect(() => {
    if (!aperto) return;

    const allaPressione = (evento: KeyboardEvent) => {
      if (evento.key !== "Escape") return;
      setAperto(false);
      bottoneMenu.current?.focus();
    };

    const dietro = [
      document.querySelector("main"),
      document.querySelector("footer"),
      document.querySelector(".salta"),
    ];
    dietro.forEach((nodo) => nodo?.setAttribute("inert", ""));

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const paddingPrecedente = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    document.addEventListener("keydown", allaPressione);
    pannello.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.removeEventListener("keydown", allaPressione);
      dietro.forEach((nodo) => nodo?.removeAttribute("inert"));
      document.body.style.overflow = "";
      document.body.style.paddingRight = paddingPrecedente;
    };
  }, [aperto]);

  /* Lifts `inert` synchronously: the link that triggered this is about to
     jump into the element being un-inerted. */
  const chiudi = () => {
    document
      .querySelectorAll("[inert]")
      .forEach((nodo) => nodo.removeAttribute("inert"));
    setAperto(false);
  };

  return (
    <header className={`barra${vetro ? " barra-vetro" : ""}`}>
      <div className="sala barra-corpo">
        {/*
         * The wordmark. Two words, the second inset by exactly the width of
         * the rule that ties them — the knot the restaurant is named after,
         * drawn in steel rather than in a brand colour, because this
         * interface does not have one.
         */}
        <a href="#contenuto" className="insegna" onClick={chiudi}>
          <span className="insegna-riga">{site.nomeRighe[0]}</span>
          <span className="insegna-riga">{site.nomeRighe[1]}</span>
        </a>

        <nav className="barra-nav" aria-label="Principale">
          <ul>
            {navigazione.map((voce) => (
              <li key={voce.href}>
                <a href={voce.href}>{voce.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#prenota"
          className="azione azione-piena barra-azione"
          onClick={chiudi}
        >
          Prenota
        </a>

        <button
          ref={bottoneMenu}
          type="button"
          className="barra-bottone"
          aria-expanded={aperto}
          aria-controls="pannello-mobile"
          onClick={() => setAperto((v) => !v)}
        >
          <span className="marca marca-viva">{aperto ? "Chiudi" : "Menu"}</span>
        </button>
      </div>

      <div
        ref={pannello}
        id="pannello-mobile"
        className="pannello"
        hidden={!aperto}
      >
        <nav className="sala" aria-label="Principale, mobile">
          <ul>
            {navigazione.map((voce, indice) => (
              <li key={voce.href}>
                <a href={voce.href} onClick={chiudi}>
                  <span className="dato pannello-numero">
                    {String(indice + 1).padStart(2, "0")}
                  </span>
                  <span className="sottotitolo">{voce.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#prenota"
            className="azione azione-piena pannello-azione"
            onClick={chiudi}
          >
            Prenota un tavolo
          </a>

          <p className="marca pannello-meta">
            {site.insegna} — {site.regione}
          </p>
        </nav>
      </div>
    </header>
  );
}
