/**
 * Central photographic manifest.
 *
 * Every frame in the project is referenced from here, so the whole publication
 * can be re-shot by editing one file. Sources are Unsplash; replacing a value
 * with a local `/foto/...` path is enough to move to commissioned photography.
 *
 * ART DIRECTION — what belongs in here and what does not:
 * close detail over full plate, hands over faces, one light source over
 * studio lighting, imperfect over rendered. Nothing shot from directly
 * overhead, nothing with staff smiling at the camera.
 */

const UNSPLASH = "https://images.unsplash.com/photo-";

/** Builds a stable Unsplash URL. next/image appends its own sizing params. */
function u(id: string): string {
  return `${UNSPLASH}${id}?auto=format&fit=crop&q=72`;
}

export const immagini = {
  /**
   * The cover. Hands finishing a plate, cropped close enough that the dish is
   * never fully revealed — the opening frame has to raise a question, not
   * answer one.
   */
  copertina: u("1750943082637-aeceac4448e0"),

  /** The room. */
  luogo: {
    /** Tables along the window: the architectural plate the section opens on. */
    sala: u("1650520983384-95f43570edae"),
    /** The same room after dark, so the space reads at two hours of the day. */
    sera: u("1766957451060-9d44ef843e82"),
    /** Material detail — tile, bench, plaster. */
    materia: u("1689771326835-79f909402e50"),
    /** Cutlery on a dark surface. The closest frame in the sequence. */
    tavola: u("1445364502257-00c4ddb9b18d"),
  },

  /**
   * The dishes, keyed by dish id. One frame each: the menu shows exactly one
   * at a time, so these must hold up alone rather than as a grid.
   *
   * Chosen against dark or wooden grounds wherever the catalogue allowed it.
   * A run of white plates on white marble is what stock food photography
   * defaults to, and ten of them in a row would have made the card read as a
   * catalogue of somebody else's restaurant.
   *
   * Plausibility outranks tone, though. A frame is only worth having if a
   * reader could believe it is the dish named beside it — a darker, more
   * tactile photograph of the wrong food is a worse frame than a plain one of
   * the right food.
   */
  piatti: {
    carciofo: u("1777891257586-48c73950a1f2"),
    trota: u("1782821961510-aa2b6baed210"),
    cipolla: u("1606791422814-b32c705e3e2f"),
    tagliatelle: u("1597692493647-25bd4240a3f2"),
    risotto: u("1633964913295-ceb43826e7c9"),
    agnolotti: u("1571734410667-0bde8dfbebf0"),
    luccio: u("1777891257657-d142af8928da"),
    manzo: u("1719726760546-cd0c8a812a4d"),
    nocciola: u("1768326119181-5f3cfe0adb4c"),
    pera: u("1769434128977-d7619fd4d74e"),
  },

  /** Single ingredients, before anything is done to them. Portrait, still-life. */
  ingredienti: {
    pomodoro: u("1601725244940-489fb4734af5"),
    nocciola: u("1574174230054-0e45305df25f"),
    fungo: u("1636750416982-ae165e0d02d0"),
    trota: u("1600186321656-eaffd828d536"),
    carciofo: u("1742324015251-6cde15b7f8f0"),
    cipolla: u("1615368689255-9df55394ab96"),
  },

  /**
   * The four moments of the year. These must stay tonally related — the
   * calendar reads as one composition, and a bright frame among three dark
   * ones breaks the band. See DESIGN in components/Seasonality.tsx.
   */
  calendario: {
    primavera: u("1526678114169-b276d04ee180"),
    estate: u("1546470427-227e2f27f02c"),
    autunno: u("1539096567589-dbfe6d0beee2"),
    inverno: u("1729154555313-0dffbc7384ce"),
  },

  /** The kitchen. The one dark plate in the publication. */
  cucina: {
    passe: u("1761416376088-d6456fcd76fd"),
    taglio: u("1770903276820-9db2b2bf8bec"),
    vapore: u("1760537480386-f69d20aa4e84"),
    brigata: u("1776353744117-9e8595e8092c"),
  },

  /** The cellar. */
  cantina: {
    scaffale: u("1596575913279-7ee2c43b7c43"),
    corridoio: u("1724882207681-9e7e8c3dd45c"),
    servizio: u("1621341616519-ff40c652d43e"),
  },

  /** The room in use. People stay partial: hands, backs, a glass mid-air. */
  tavola: {
    apparecchiato: u("1663814651169-2898e0f151fa"),
    bicchiere: u("1650330340049-397c876c8066"),
    sala: u("1564368587612-f303d38c9063"),
  },

  /**
   * Outside. A street, not a landmark: the location stays conceptual.
   *
   * Deliberately a shaded alley rather than a sunlit painted façade — the
   * postcard version of an Italian street is the one cliché this palette
   * cannot absorb, and it would be the brightest thing on the page.
   */
  fuori: u("1635184502266-757908badc77"),
} as const;
