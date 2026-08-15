import { Rivelazione } from "@/components/Rivelazione";

/**
 * Type on black and nothing else — the one section with no glass and no
 * photograph. After a cover that fills the frame the page needs somewhere to
 * put the idea down before the restaurant starts.
 */
export function Intro() {
  return (
    <section
      id="principio"
      className="sala tratto principio"
      aria-labelledby="principio-titolo"
    >
      <Rivelazione>
        <h2
          id="principio-titolo"
          className="enunciato principio-enunciato"
        >
          La cucina non segue una formula. Segue la stagione.
        </h2>
      </Rivelazione>

      <Rivelazione ritardo={90} className="lastra principio-lastra">
        <p className="testo">
          <strong>Nodo vuol dire legame.</strong> Fra un ingrediente e il posto
          da cui viene, fra chi lo coltiva e chi lo cucina, fra un piatto e il
          mese in cui ha senso mangiarlo. È l&apos;unica regola che questa
          cucina si è data.
        </p>
        <p className="testo testo-lieve">
          In pratica significa una carta corta, che si riscrive quando serve e
          non quando è previsto. Poche cose per piatto, tecniche vecchie usate
          senza nostalgia, e il contrasto — amaro contro grasso, brace contro
          acido — come strumento invece che come effetto.
        </p>
        <p className="nota principio-nota">
          Dieci piatti in carta. Quando un ingrediente finisce, il piatto esce
          e non torna fino all&apos;anno dopo.
        </p>
      </Rivelazione>
    </section>
  );
}
