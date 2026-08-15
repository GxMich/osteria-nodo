import Image from "next/image";
import { immagini } from "@/lib/immagini";
import { stagioni } from "@/data/calendario";
import { Rivelazione } from "@/components/Rivelazione";
import { StagioneCorrente } from "@/components/StagioneCorrente";

/**
 * DEPTH OF FIELD AS A WAY OF SAYING "NOW".
 *
 * The season the reader is actually in is in focus; the other three sit
 * behind glass, further away in the year. It is the same optical idea as the
 * plate applied to time instead of to a dish — and unlike a row of tabs it
 * tells you where you are without asking you to click anything.
 *
 * Only the photographs blur. The lists stay sharp: a section that hides three
 * quarters of its information behind a blur is a section nobody can read.
 */
export function Seasonality() {
  return (
    <section
      id="calendario"
      className="sala tratto"
      aria-labelledby="calendario-titolo"
    >
      <Rivelazione>
        <p className="marca">Il calendario</p>
        <h2
          id="calendario-titolo"
          className="titolo"
          style={{ marginTop: "0.75rem", maxWidth: "20ch" }}
        >
          Il menu non è un documento. È un calendario.
        </h2>
        <p className="nota" style={{ marginTop: "1.25rem" }}>
          Quattro momenti, e in mezzo tutte le settimane in cui una cosa
          finisce e un&apos;altra non è ancora arrivata.
        </p>
      </Rivelazione>

      <ol className="anno-griglia">
        {stagioni.map((stagione, indice) => (
          <Rivelazione
            key={stagione.id}
            elemento="li"
            ritardo={indice * 70}
            className="lastra stagione"
          >
            <StagioneCorrente id={stagione.id} />

            <div className="stagione-lastra">
              <Image
                src={immagini.calendario[stagione.id]}
                alt={stagione.alt}
                fill
                quality={60}
                sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 22vw"
                style={{ objectFit: "cover" }}
              />
            </div>

            <p className="dato">{stagione.mesi}</p>
            <h3 className="sottotitolo stagione-nome">{stagione.nome}</h3>

            <ul className="stagione-elenco">
              {stagione.entrano.map((voce) => (
                <li key={voce}>{voce}</li>
              ))}
            </ul>

            <p className="nota stagione-nota">{stagione.nota}</p>
          </Rivelazione>
        ))}
      </ol>
    </section>
  );
}
