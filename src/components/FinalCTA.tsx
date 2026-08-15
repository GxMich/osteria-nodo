import { Rivelazione } from "@/components/Rivelazione";

/**
 * The lights go out. One line, one sentence, one button, on black with no
 * glass and no photograph — the page ends the way the room does.
 */
export function FinalCTA() {
  return (
    <section className="sala tratto chiusura">
      <Rivelazione>
        <p className="enunciato chiusura-enunciato">Ci vediamo a tavola.</p>
        <p className="testo chiusura-testo">
          Guarda il menu della stagione e trova il momento giusto per venire a
          trovarci.
        </p>
        <a href="#prenota" className="azione azione-piena">
          Prenota un tavolo
        </a>
      </Rivelazione>
    </section>
  );
}
