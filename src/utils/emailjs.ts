/**
 * The EmailJS ids the booking forms send with.
 *
 * Read through one helper so the build-time warning and the runtime check
 * agree on what "configured" means. An unreplaced value from .env.example
 * counts as missing: it is not empty, so a plain emptiness check waves it
 * through and the failure only shows up as a rejected request in the browser.
 */
export type EmailjsConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

const isPlaceholder = (value: string) => /x{3,}/i.test(value);

export const emailjsConfig: EmailjsConfig = {
  serviceId: import.meta.env.PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
};

/** Which of the three are missing or still the example value. */
export const missingEmailjsKeys = (config = emailjsConfig): string[] =>
  (
    [
      ["PUBLIC_EMAILJS_SERVICE_ID", config.serviceId],
      ["PUBLIC_EMAILJS_TEMPLATE_ID", config.templateId],
      ["PUBLIC_EMAILJS_PUBLIC_KEY", config.publicKey],
    ] as const
  )
    .filter(([, value]) => !value || isPlaceholder(value))
    .map(([name]) => name);

export const emailjsReady = (config = emailjsConfig): boolean =>
  missingEmailjsKeys(config).length === 0;
