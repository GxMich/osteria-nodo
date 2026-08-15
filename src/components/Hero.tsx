import Image from "next/image";
import { immagini } from "@/lib/immagini";
import { site } from "@/data/site";

const dati = [
  { voce: "Luogo", valore: site.regione },
  { voce: "Sala", valore: `${site.coperti} coperti` },
  { voce: "Carta", valore: `${site.piattiInCarta} piatti` },
  { voce: "Servizio", valore: "Un turno a cena" },
];

/**
 * The room, seen from the door.
 *
 * The photograph is not a rectangle in a column: it is the only lit thing in
 * a black field, dissolving into the dark on every side. The statement holds
 * the dark beside it, and the two never touch — the black between them is
 * the composition.
 */
export function Hero() {
  return (
    <section className="sala apertura" aria-labelledby="apertura-titolo">
      <div className="apertura-corpo">
        <p
          className="marca apertura-marca entra"
          style={{ "--attesa": "120ms" } as React.CSSProperties}
        >
          <strong>{site.insegna}</strong> — {site.regioneBreve}
        </p>

        <h1
          id="apertura-titolo"
          className="enunciato apertura-enunciato entra"
          style={{ "--attesa": "200ms" } as React.CSSProperties}
        >
          Ingredienti, tempo, contrasti.
        </h1>

        <div
          className="lastra apertura-lastra entra"
          style={{ "--attesa": "420ms" } as React.CSSProperties}
        >
          <p className="testo">
            Una cucina italiana contemporanea costruita intorno a ciò che
            arriva, cambia e scompare con le stagioni.
          </p>

          <div className="apertura-azioni">
            <a href="#prenota" className="azione azione-piena">
              Prenota un tavolo
            </a>
            <a href="#menu" className="rimando">
              Scopri il menu
            </a>
          </div>
        </div>
      </div>

      {/* The one cinematic frame: the plate the room is lit by. */}
      <div
        className="apertura-luce entra"
        style={{ "--attesa": "40ms" } as React.CSSProperties}
      >
        <Image
          src={immagini.copertina}
          alt="Le mani di un cuoco che completano un piatto con una pinzetta, inquadrate da vicino."
          fill
          priority
          sizes="(max-width: 899px) 100vw, 50vw"
          className="dissolve"
          style={{ objectPosition: "center 42%" }}
        />
      </div>

      <dl
        className="apertura-dati entra"
        style={{ "--attesa": "540ms" } as React.CSSProperties}
      >
        {dati.map((riga) => (
          <div key={riga.voce}>
            <dt className="marca">{riga.voce}</dt>
            <dd>{riga.valore}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
