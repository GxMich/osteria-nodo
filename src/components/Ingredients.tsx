import Image from "next/image";
import { immagini } from "@/lib/immagini";
import { ingredienti } from "@/data/cucina";
import { Rivelazione } from "@/components/Rivelazione";

/**
 * Before the plate. Six panes running off the right trim edge — the words
 * come after the pictures, as annotation rather than as introduction.
 */
export function Ingredients() {
  return (
    <section
      id="ingredienti"
      className="tratto"
      aria-labelledby="ingredienti-titolo"
    >
      <Rivelazione className="sala">
        <p className="marca">Prima del piatto</p>
        <h2
          id="ingredienti-titolo"
          className="titolo"
          style={{ marginTop: "0.75rem", maxWidth: "18ch" }}
        >
          Il piatto comincia molto prima della cucina.
        </h2>
        <p className="nota" style={{ marginTop: "1.25rem" }}>
          Sei cose che tornano ogni anno, con le loro settimane contate. Fuori
          da quelle settimane non entrano.
        </p>
      </Rivelazione>

      <ul
        className="materie-nastro"
        /* A scroll container has to be reachable and operable from the
           keyboard, and a list of non-focusable figures is not. */
        tabIndex={0}
        aria-label="Ingredienti della stagione, scorrimento orizzontale"
      >
        {ingredienti.map((ingrediente) => (
          <li key={ingrediente.id} className="lastra materia">
            <div className="materia-lastra">
              <Image
                src={immagini.ingredienti[ingrediente.id]}
                alt={ingrediente.alt}
                fill
                quality={60}
                sizes="(max-width: 899px) 62vw, 19rem"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="materia-riga">
              <h3 className="sottotitolo">{ingrediente.nome}</h3>
              <span className="dato">{ingrediente.mesi}</span>
            </div>

            <p className="marca materia-provenienza">
              {ingrediente.provenienza}
            </p>
            <p className="nota">{ingrediente.nota}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
