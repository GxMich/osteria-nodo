import Image from "next/image";
import { immagini } from "@/lib/immagini";
import { cantina } from "@/data/cucina";
import { Rivelazione } from "@/components/Rivelazione";

/**
 * The cellar. The register is the largest thing in the section and the prose
 * is a note beside it: a wine list is a list, and setting the categories at
 * reading size says more about how the cellar is chosen than two paragraphs
 * claiming it.
 *
 * No producer is named anywhere — listing real winemakers on a fictional
 * restaurant's list implies a relationship that does not exist.
 */
export function Wine() {
  return (
    <section
      id="cantina"
      className="sala tratto"
      aria-labelledby="cantina-titolo"
    >
      <Rivelazione>
        <p className="marca">Cantina</p>
        <h2
          id="cantina-titolo"
          className="titolo"
          style={{ marginTop: "0.75rem", maxWidth: "20ch" }}
        >
          La carta segue la stessa logica della cucina.
        </h2>
      </Rivelazione>

      <div className="cantina-corpo" style={{ marginTop: "clamp(2rem,5vw,3rem)" }}>
        <Rivelazione come="lastra" elemento="figure" className="cantina-figura">
          <Image
            src={immagini.cantina.scaffale}
            alt="Bottiglie coricate su una scaffalatura di legno scuro."
            fill
            sizes="(max-width: 899px) 100vw, 38vw"
            className="dissolve"
            style={{ objectFit: "cover" }}
          />
        </Rivelazione>

        <div>
          <Rivelazione elemento="dl" className="lastra cantina-lastra">
            {cantina.map((riga) => (
              <div key={riga.categoria} className="cantina-voce">
                <dt className="cantina-categoria">{riga.categoria}</dt>
                <dd className="cantina-numero">{riga.etichette}</dd>
                <dd className="nota cantina-nota">{riga.nota}</dd>
              </div>
            ))}
          </Rivelazione>

          <Rivelazione ritardo={70}>
            <p className="testo" style={{ marginTop: "2rem" }}>
              Piccoli produttori, territori riconoscibili, bottiglie scelte per
              stare a tavola e non per essere raccontate. Se un vino ha bisogno
              di una spiegazione lunga per funzionare con un piatto, di solito
              vuol dire che non funziona.
            </p>
            <p className="nota cantina-avvertenza">
              Il fondo è piemontese e ligure. Numeri di progetto: nessun
              produttore reale è citato o coinvolto.
            </p>
          </Rivelazione>
        </div>
      </div>
    </section>
  );
}
