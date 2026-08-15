/**
 * The canonical origin of the deployed site.
 *
 * No domain is invented: Osteria Nodo is a concept, and a concept has no
 * production host. Set NEXT_PUBLIC_SITE_URL at deploy time and the canonical
 * URL, the sitemap and the Open Graph metadata all follow. Until then
 * everything resolves against localhost, which is honest rather than
 * misleading.
 */
const configurato = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Whether a real origin was configured.
 *
 * The fallback is fine for resolving Open Graph image paths — those have to be
 * absolute and a wrong host in an OG tag simply fails to preview. A canonical
 * link is different: `<link rel="canonical" href="http://localhost:3000/">` on
 * a live site actively tells a crawler that the real page is somewhere it
 * cannot reach. Emitting nothing is strictly better than emitting that, so the
 * canonical only appears once there is a host worth pointing at.
 */
export const originConfigurato = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

/*
 * The trailing slash matters. `new URL("sitemap.xml", base)` resolves against
 * the base's *directory*, so without it the last path segment is replaced and
 * a site published under /osteria-nodo advertises its sitemap at the root.
 */
export const siteUrl = new URL(
  configurato.endsWith("/") ? configurato : `${configurato}/`,
);
