import Image from "next/image";
import { immagini } from "@/lib/immagini";
import { gesti } from "@/data/cucina";
import { Rivelazione } from "@/components/Rivelazione";

/**
 * The kitchen is behind the room, so here it is literally behind: the
 * photograph sits under the type at low opacity, a ghost of the pass rather
 * than a picture of it.
 *
 * There is no chef. No name, no biography, no previous restaurants, no
 * awards: that whole genre of copy is fiction dressed as credentials. The
 * subject is the work.
 */
export function Kitchen() {
  return (
    <section id="cucina" className="tratto cucina" aria-labelledby="cucina-titolo">
      <div className="cucina-fondo" aria-hidden="true">
        <Image
          src={immagini.cucina.passe}
          alt=""
          fill
          quality={55}
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="sala">
        <Rivelazione className="cucina-apertura">
          <div>
            <p className="marca">In cucina</p>
            <h2
              id="cucina-titolo"
              className="titolo"
              style={{ marginTop: "0.75rem", maxWidth: "16ch" }}
            >
              Una squadra piccola. Una carta che cambia di continuo.
            </h2>
          </div>

          <p className="testo cucina-testo">
            Nessuna firma sopra la porta. In cucina si lavora in cinque, si
            entra alle nove del mattino e si tira la sfoglia prima di ogni
            altra cosa. Le tecniche sono sei e sono sempre quelle: cambia
            l&apos;ingrediente a cui si applicano.
          </p>
        </Rivelazione>

        <Rivelazione ritardo={80} elemento="dl" className="cucina-gesti">
          {gesti.map((gesto, indice) => (
            <div key={gesto.nome} className="cucina-gesto">
              <dt>
                <span className="dato">
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <span className="sottotitolo">{gesto.nome}</span>
              </dt>
              <dd className="nota">{gesto.descrizione}</dd>
            </div>
          ))}
        </Rivelazione>
      </div>
    </section>
  );
}
