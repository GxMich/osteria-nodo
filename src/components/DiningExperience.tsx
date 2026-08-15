import Image from "next/image";
import { immagini } from "@/lib/immagini";
import { Rivelazione } from "@/components/Rivelazione";

/**
 * The one section with no glass at all. After eight panes the page needs a
 * moment with nothing between the reader and the room — so this is a
 * photograph, a sentence, and the dark.
 *
 * People stay partial: a hand, a back, a glass halfway to a mouth. Faces turn
 * a photograph into a stock library.
 */
export function DiningExperience() {
  return (
    <section id="tavola" className="tratto-stretto" aria-labelledby="tavola-titolo">
      <Rivelazione come="lastra" elemento="figure" className="tavola-luce">
        <Image
          src={immagini.tavola.apparecchiato}
          alt="Un tavolo a fine pasto: piatti spostati, bicchieri a metà, tovaglioli lasciati cadere."
          fill
          sizes="100vw"
          className="dissolve"
          style={{ objectPosition: "center 55%" }}
        />
      </Rivelazione>

      <div className="sala tavola-corpo">
        <Rivelazione>
          <h2 id="tavola-titolo" className="titolo tavola-enunciato">
            La cena finisce molto dopo l&apos;ultimo piatto.
          </h2>
        </Rivelazione>

        <Rivelazione ritardo={80}>
          <p className="testo tavola-testo">
            Un turno solo a cena vuol dire che il tavolo è tuo fino alla fine.
            Nessuno viene a chiedere se hai finito, nessuno rifà il coperto
            mentre sei ancora seduto. È la ragione per cui i coperti sono
            ventotto e non quaranta.
          </p>
        </Rivelazione>
      </div>
    </section>
  );
}
