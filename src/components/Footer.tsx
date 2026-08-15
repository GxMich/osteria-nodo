import { navigazione, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="piede">
      <div className="sala piede-corpo">
        <div className="piede-marchio">
          <p className="insegna">
            <span className="insegna-riga">{site.nomeRighe[0]}</span>
            <span className="insegna-riga">
              {site.nomeRighe[1]}
            </span>
          </p>
          <p className="marca">{site.insegna}</p>
        </div>

        <nav className="piede-nav" aria-label="Piè di pagina">
          <ul>
            {navigazione.map((voce) => (
              <li key={voce.href}>
                <a href={voce.href}>{voce.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tertiary. The footer is where a reader arrives having decided not
            to book yet; a fifth filled button would not change that. */}
        <a href="#prenota" className="rimando">
          Prenota
        </a>
      </div>

      <div className="sala piede-riga">
        {/*
         * The disclosure sits in the footer of every page it could ever have,
         * not in a corner of the about section. It is the one thing a reader
         * must be able to find without looking for it.
         */}
        <p className="nota">
          Progetto autoprodotto — Osteria Nodo è un ristorante di fantasia.
          Nessun dato, recapito, recensione o riconoscimento in questa pagina
          si riferisce a un&apos;attività reale.
        </p>
        <p className="dato">
          Concept e sviluppo: Michele Modica · Fotografie: Unsplash
        </p>
      </div>
    </footer>
  );
}
