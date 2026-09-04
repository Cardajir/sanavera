export const SITE_NAME = "Sanavera";
export const SITE_DESCRIPTION =
  "Moderní stomatologie ve Veselí nad Moravou. Špičková péče o vaše zuby v maximálním pohodlí, bez bolesti a bez stresu.";
export const SITE_URL = "https://sanavera.cz";
export const SITE_LOCALE = "cs-CZ";
export const NOINDEX_ROUTES: string[] = ["/404"];

/**
 * The CZ / EN switch in the bar. Off until there is an English site; the
 * markup and styles stay in Nav.astro so turning it on is this one flag.
 */
export const LANGUAGE_SWITCH = false;

/** Google Tag Manager container. Empty string switches GTM off entirely. */
export const GTM_ID = "GTM-KSFL2DH6";
