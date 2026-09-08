export const SITE_NAME = "Sanavera";
/** The home page's full title tag, as the client specified it. */
export const SITE_TITLE =
  "Zubař Veselí nad Moravou | MDDr. Veronika Netopilík Kopečná – Sanavera";
/** What every other page's title ends with: `{page} | SITE_TITLE_SUFFIX`. */
export const SITE_TITLE_SUFFIX = "Sanavera – zubař Veselí nad Moravou";
export const SITE_DESCRIPTION =
  "Moderní zubní ordinace ve Veselí n. Moravou. Vedoucí lékařka MDDr. Veronika Netopilík Kopečná. Kompletní péče i prevence. Přijímáme nové pacienty.";
export const SITE_KEYWORDS =
  "zubař Veselí nad Moravou, zubní ordinace Veselí nad Moravou, MUDr. Veronika Netopilík Kopečná, stomatologie Veselí, Sanavera, zubní péče, prevence";
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
