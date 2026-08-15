import { MenuInterattivo } from "@/components/MenuInterattivo";
import { Rivelazione } from "@/components/Rivelazione";

/**
 * The card. No lead paragraph: a printed menu does not explain itself before
 * it starts, and the only prose here is a key the reader can take or leave.
 */
export function Menu() {
  return (
    <section id="menu" className="sala tratto" aria-labelledby="menu-titolo">
      <Rivelazione className="carta-apertura">
        <p className="marca">La carta</p>
        <h2
          id="menu-titolo"
          className="titolo"
          style={{ marginTop: "0.75rem" }}
        >
          Dieci piatti. Ognuno dichiara da dove viene.
        </h2>
        <p className="nota carta-chiave">
          Ogni piatto porta tre parole: l&apos;ingrediente che lo tiene in
          piedi, il territorio da cui arriva, il gesto che gli è stato fatto.
          È il nodo, ed è il motivo per cui la carta è corta.
        </p>
        <p className="marca marca-viva carta-istruzione">
          Scegli un piatto per vederlo
        </p>
      </Rivelazione>

      <MenuInterattivo />

      <div className="carta-piede">
        <p className="nota">
          Prezzi in euro. La carta si riscrive quando un ingrediente finisce.
          Piatti, prezzi e provenienze sono materiale di progetto: Osteria Nodo
          è un ristorante di fantasia.
        </p>
        <a href="#prenota" className="rimando">
          Prenota un tavolo
        </a>
      </div>
    </section>
  );
}
