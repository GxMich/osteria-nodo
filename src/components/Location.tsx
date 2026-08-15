import Image from "next/image";
import { immagini } from "@/lib/immagini";
import { orari, site } from "@/data/site";
import { Rivelazione } from "@/components/Rivelazione";

/**
 * Where and when. The colophon of the publication.
 *
 * A marginal mark rather than a chapter head: after the booking there is
 * nothing left to open, only the details to file. Two registers and one
 * photograph, set quietly.
 *
 * Everything here that could be mistaken for real business data has been
 * withheld rather than invented. There is no street address, no phone number
 * and no map: a fabricated address belongs to a real building, and a
 * fabricated phone number rings on somebody's real phone. The email is on
 * `.example`, a domain reserved by RFC 2606 so it can never resolve to anyone.
 */
export function Location() {
  return (
    <section
      id="contatti"
      className="sala tratto dove"
      aria-labelledby="dove-titolo"
    >
      <div className="dove-corpo">
        <div>
          <p className="marca">Dove siamo</p>
          <h2 id="dove-titolo" className="titolo" style={{ marginTop: "0.75rem" }}>
            {site.regione}
          </h2>
          <p className="testo">
            Osteria Nodo è un progetto concettuale: non ha un indirizzo, perché
            un indirizzo inventato è l&apos;indirizzo di qualcun altro. La
            regione basta a dire da dove viene la cucina.
          </p>
        </div>

        <div className="dove-registri">
          <div>
          <h3 className="marca dove-etichetta">Orari</h3>
          <dl>
            {orari.map((riga) => (
              <div key={riga.voce} className="dove-voce">
                <dt>{riga.voce}</dt>
                <dd className="dato">{riga.valore}</dd>
              </div>
            ))}
          </dl>
          </div>

          <div>
          <h3 className="marca dove-etichetta">Contatti</h3>
          <dl>
            <div className="dove-voce">
              <dt>Prenotazioni</dt>
              <dd className="dato">Dal modulo qui sopra</dd>
            </div>
            <div className="dove-voce">
              <dt>Email</dt>
              <dd className="dato">{site.email}</dd>
            </div>
            <div className="dove-voce">
              <dt>Telefono</dt>
              <dd className="dato">Non indicato</dd>
            </div>
          </dl>
          <p className="nota dove-avvertenza">
            Recapiti di esempio. Il dominio <code>.example</code> è riservato e
            non appartiene a nessuno; nessun numero è pubblicato per lo stesso
            motivo.
          </p>
          </div>
        </div>

        <Rivelazione come="lastra" elemento="figure" className="dove-figura">
          <Image
              src={immagini.fuori}
              alt="Una strada stretta di pietra fra edifici bassi, in una giornata coperta."
              fill
              sizes="(max-width: 899px) 100vw, 34vw"
              style={{ objectFit: "cover" }}
            />
          <figcaption className="nota">
            Immagine di riferimento, non il luogo.
          </figcaption>
        </Rivelazione>
      </div>
    </section>
  );
}
