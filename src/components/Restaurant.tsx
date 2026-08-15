import Image from "next/image";
import { immagini } from "@/lib/immagini";
import { Rivelazione } from "@/components/Rivelazione";

/* Facts about the room, not adjectives about the atmosphere. */
const sala = [
  { voce: "Coperti", valore: "28, su un piano solo" },
  { voce: "Turni", valore: "Uno a cena, due a pranzo" },
  { voce: "Tavoli", valore: "Rovere non trattato" },
  { voce: "Cucina", valore: "A vista, senza vetro" },
];

/**
 * The room.
 *
 * The pane of facts rides up over the lower edge of the photograph — the one
 * overlap on the site, and the thing the glass is actually for: you are
 * reading the room through a window onto it.
 */
export function Restaurant() {
  return (
    <section id="luogo" className="tratto-stretto luogo" aria-labelledby="luogo-titolo">
      <Rivelazione come="lastra" elemento="figure" className="luogo-grande">
        <Image
          src={immagini.luogo.sala}
          alt="La sala vuota di giorno: tavoli in fila lungo una vetrata, luce naturale radente."
          fill
          sizes="100vw"
          className="dissolve"
          style={{ objectPosition: "center 60%" }}
        />
      </Rivelazione>

      <Rivelazione className="lastra luogo-lastra">
        <p className="marca">Il luogo</p>
        <h2 id="luogo-titolo" className="titolo" style={{ marginTop: "0.75rem" }}>
          Una sala corta, una cucina aperta, niente in mezzo.
        </h2>
        <dl style={{ marginTop: "1.5rem" }}>
          {sala.map((riga) => (
            <div key={riga.voce} className="luogo-voce">
              <dt className="marca">{riga.voce}</dt>
              <dd>{riga.valore}</dd>
            </div>
          ))}
        </dl>
      </Rivelazione>

      <div className="sala luogo-corpo">
        <Rivelazione className="luogo-testo">
          <p className="testo">
            Ventotto coperti stanno in poco: un pavimento in cemento, pareti
            intonacate a calce, tavoli di rovere lasciati grezzi. Non c&apos;è
            un separé fra la sala e la cucina, quindi il rumore del servizio fa
            parte della cena — e la cucina sente quello che succede ai tavoli.
          </p>
          <p className="testo testo-lieve">
            La luce è la cosa a cui abbiamo dedicato più tempo. Di giorno entra
            da un lato solo; di sera si spegne tutto tranne quello che serve a
            vedere il piatto e la persona davanti.
          </p>
        </Rivelazione>

        <div className="luogo-dettagli">
          <Rivelazione come="lastra" elemento="figure" ritardo={60}>
            <div className="luogo-dettaglio-lastra">
              <Image
                src={immagini.luogo.sera}
                alt="La stessa sala di sera, illuminata solo dalle candele sui tavoli."
                fill
                sizes="(max-width: 899px) 45vw, 24vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="nota">Le nove e mezza.</figcaption>
          </Rivelazione>

          <Rivelazione come="lastra" elemento="figure" ritardo={130}>
            <div className="luogo-dettaglio-lastra">
              <Image
                src={immagini.luogo.materia}
                alt="Dettaglio di una panca di legno contro una parete piastrellata."
                fill
                sizes="(max-width: 899px) 45vw, 24vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption className="nota">Panca, piastrella, calce.</figcaption>
          </Rivelazione>
        </div>
      </div>
    </section>
  );
}
