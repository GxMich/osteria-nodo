"use client";

import { useEffect, useRef, useState } from "react";
import {
  GIORNO_CHIUSURA,
  fasce,
  servizi,
  site,
  type IdServizio,
} from "@/data/site";

type Campo = "data" | "ora";
type Errori = Partial<Record<Campo, string>>;
type Esito = { data: string; ora: string; ospiti: string };

const OSPITI = ["1", "2", "3", "4", "5", "6", "7+"] as const;

const oggi = () => new Date().toISOString().slice(0, 10);

/* Midday, so a timezone offset can never push the date onto the day before. */
const giornoDella = (data: string) => new Date(`${data}T12:00`).getDay();

const perEsteso = (data: string) =>
  new Intl.DateTimeFormat("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${data}T12:00`));

/**
 * The reservation.
 *
 * Three decisions — day, time, how many — and nothing else. No account, no
 * password, no name, no phone number, no email: a concept project has no
 * business collecting personal data, and a real restaurant does not need any
 * of it to answer the only question being asked here, which is whether there
 * is a table.
 *
 * What is real is the logic. The room is closed on Mondays and only serves
 * lunch from Friday to Sunday, so picking a date rewrites which slots exist —
 * the same rule the printed hours state, read from the same object. What is
 * not real is the answer: nothing is submitted anywhere, and the confirmation
 * says so in plain Italian instead of pretending a table was held.
 */
export function Reservation() {
  const [data, setData] = useState("");
  const [ora, setOra] = useState("");
  const [errori, setErrori] = useState<Errori>({});
  const [esito, setEsito] = useState<Esito | null>(null);
  const modulo = useRef<HTMLFormElement>(null);
  const conferma = useRef<HTMLDivElement>(null);

  /*
   * Focus follows the panel that replaced the other one — in both directions.
   *
   * Going forward it lands on the outcome. Coming back it lands on the date
   * field, because "Cambia la richiesta" destroys the button that was focused
   * and focus would otherwise fall to <body>: a keyboard user who asked to
   * edit their booking would be silently returned to the top of the document.
   * The ref guard keeps the form from stealing focus on first paint, when
   * there is no result and nobody has asked for anything.
   */
  const tornatoAlModulo = useRef(false);

  useEffect(() => {
    if (esito) {
      conferma.current?.focus();
      return;
    }
    if (!tornatoAlModulo.current) return;
    tornatoAlModulo.current = false;
    modulo.current?.querySelector<HTMLInputElement>("#data")?.focus();
  }, [esito]);

  const giorno = data ? giornoDella(data) : null;
  const chiuso = giorno === GIORNO_CHIUSURA;
  const disponibile = (servizio: IdServizio) =>
    giorno === null || (!chiuso && servizi[servizio].indici.includes(giorno));

  const cambiaData = (nuova: string) => {
    setData(nuova);
    setErrori({});

    /* A slot that no longer exists on the new date must not stay selected:
       the reader would submit a time the room is not open for. */
    if (!ora) return;
    const giornoNuovo = nuova ? giornoDella(nuova) : null;
    const ancoraValida =
      giornoNuovo !== null &&
      giornoNuovo !== GIORNO_CHIUSURA &&
      (Object.keys(fasce) as IdServizio[]).some(
        (servizio) =>
          fasce[servizio].some((f) => f === ora) &&
          servizi[servizio].indici.includes(giornoNuovo),
      );
    if (!ancoraValida) setOra("");
  };

  const allInvio = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const trovati: Errori = {};
    if (!data) trovati.data = "Scegli una data.";
    else if (data < oggi()) trovati.data = "Scegli una data da oggi in avanti.";
    else if (chiuso) trovati.data = "Il lunedì siamo chiusi. Prova un altro giorno.";
    if (!trovati.data && !ora) trovati.ora = "Scegli un orario.";

    setErrori(trovati);

    const primo = Object.keys(trovati)[0] as Campo | undefined;
    if (primo) {
      /* A fieldset is not focusable, so the time error lands on the first
         slot the reader can actually choose. */
      const bersaglio =
        primo === "ora"
          ? '[data-campo="ora"] input:not(:disabled)'
          : '[data-campo="data"]';
      modulo.current?.querySelector<HTMLElement>(bersaglio)?.focus();
      return;
    }

    const dati = new FormData(evento.currentTarget);
    setEsito({ data, ora, ospiti: String(dati.get("ospiti") ?? "2") });
  };

  return (
    <section
      id="prenota"
      className="sala tratto prenota"
      aria-labelledby="prenota-titolo"
    >
      <div className="prenota-corpo">
        <div>
          <p className="marca">Prenota</p>
          <h2
            id="prenota-titolo"
            className="titolo"
            style={{ marginTop: "0.75rem", maxWidth: "14ch" }}
          >
            Un tavolo, tre decisioni.
          </h2>
          <p className="nota" style={{ marginTop: "1.25rem" }}>
            Giorno, ora, quante persone. Il resto lo sistemiamo quando arrivi.
          </p>

          <dl className="prenota-orari">
            {(Object.keys(fasce) as IdServizio[]).map((servizio) => (
              <div key={servizio} className="prenota-orario">
                <dt className="marca">{servizio}</dt>
                <dd>
                  {servizi[servizio].giorni}
                  <span className="dato prenota-orario-fascia">
                    {servizi[servizio].orario}
                  </span>
                </dd>
              </div>
            ))}
            <div className="prenota-orario">
              <dt className="marca">Chiuso</dt>
              <dd>Lunedì tutto il giorno</dd>
            </div>
          </dl>
        </div>

        {esito ? (
          <div
            ref={conferma}
            className="lastra lastra-solida prenota-lastra prenota-esito"
            role="status"
            tabIndex={-1}
          >
            {/*
             * The confirmation is set in the display face at statement scale,
             * because it is the end of the page's argument and not a toast.
             * The disclaimer sits directly under it, at the same width, in
             * the accent — a reader cannot take the headline without also
             * taking the sentence that qualifies it.
             */}
            <p className="prenota-esito-titolo">Tutto pronto.</p>
            <p className="marca prenota-esito-avviso">
              Questa interazione è una demo del processo di prenotazione
            </p>

            <dl className="prenota-riepilogo">
              <div className="voce">
                <dt className="marca">Data</dt>
                <dd>{perEsteso(esito.data)}</dd>
              </div>
              <div className="voce">
                <dt className="marca">Ora</dt>
                <dd>{esito.ora}</dd>
              </div>
              <div className="voce">
                <dt className="marca">Ospiti</dt>
                <dd>
                  {esito.ospiti === "7+"
                    ? "Sette o più"
                    : `${esito.ospiti} ${esito.ospiti === "1" ? "ospite" : "ospiti"}`}
                </dd>
              </div>
            </dl>

            <p className="nota">
              Nessun tavolo è stato bloccato, nessun dato è stato inviato o
              salvato. In un sito reale, da qui il sistema verificherebbe la
              sala e chiederebbe un contatto per la conferma.
            </p>

            <button
              type="button"
              className="azione"
              onClick={() => {
                tornatoAlModulo.current = true;
                setEsito(null);
              }}
            >
              Cambia la richiesta
            </button>
          </div>
        ) : (
          <form ref={modulo} className="lastra lastra-solida prenota-lastra prenota-modulo" onSubmit={allInvio} noValidate>
            <div className="prenota-campo">
              {/*
               * Progress is shown with the identity's own tie rather than
               * with a stepper: a field that has been answered grows the same
               * short rule that hangs NODO off OSTERIA. Three decisions do
               * not need a wizard, but they do need to show which of them are
               * already made.
               */}
              <label
                htmlFor="data"
                className={`marca${data ? " prenota-fatto" : ""}`}
              >
                Data
              </label>
              <input
                id="data"
                name="data"
                type="date"
                data-campo="data"
                className="prenota-data"
                min={oggi()}
                value={data}
                onChange={(evento) => cambiaData(evento.target.value)}
                aria-invalid={errori.data ? true : undefined}
                aria-describedby={errori.data ? "errore-data" : undefined}
              />
              {errori.data && (
                <p id="errore-data" className="prenota-errore">
                  {errori.data}
                </p>
              )}
            </div>

            <fieldset
              className="prenota-campo"
              data-campo="ora"
              aria-describedby={errori.ora ? "errore-ora" : undefined}
            >
              <legend className={`marca${ora ? " prenota-fatto" : ""}`}>
                Ora
              </legend>

              {chiuso ? (
                <p className="prenota-avviso">
                  Il lunedì la sala è chiusa. Scegli un altro giorno.
                </p>
              ) : (
                (Object.keys(fasce) as IdServizio[]).map((servizio) => {
                  const aperto = disponibile(servizio);
                  return (
                    <div key={servizio} className="prenota-fascia">
                      <p className="dato prenota-fascia-nome">
                        {servizio}
                        {!aperto && (
                          <span className="prenota-fascia-nota">
                            solo {servizi[servizio].giorni.toLowerCase()}
                          </span>
                        )}
                      </p>
                      <div className="prenota-pastiglie">
                        {fasce[servizio].map((slot) => (
                          <label
                            key={slot}
                            className={`prenota-pastiglia${
                              aperto ? "" : " prenota-pastiglia-spenta"
                            }`}
                          >
                            <input
                              type="radio"
                              name="ora"
                              value={slot}
                              checked={ora === slot}
                              disabled={!aperto}
                              onChange={() => {
                                setOra(slot);
                                setErrori({});
                              }}
                            />
                            <span>{slot}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}

              {errori.ora && (
                <p id="errore-ora" className="prenota-errore">
                  {errori.ora}
                </p>
              )}
            </fieldset>

            <fieldset className="prenota-campo">
              <legend className="marca">Ospiti</legend>
              <div className="prenota-pastiglie">
                {OSPITI.map((numero) => (
                  <label key={numero} className="prenota-pastiglia">
                    <input
                      type="radio"
                      name="ospiti"
                      value={numero}
                      defaultChecked={numero === "2"}
                    />
                    <span>{numero}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="prenota-piede">
              <button type="submit" className="azione azione-piena">
                Verifica disponibilità
              </button>
              <p className="nota">
                Demo di progetto: non viene inviato né salvato nessun dato.
                Per un tavolo, in un sito reale, si scriverebbe a{" "}
                <span className="prenota-email">{site.email}</span>.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
