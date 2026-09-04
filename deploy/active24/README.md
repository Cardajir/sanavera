# Nasazení na Active24 (FTP)

Web je čistě statický (`astro build` → `dist/`), takže na hostingu Active24
stačí Apache s `.htaccess`. Nahrání dělá GitHub Actions workflow
[`deploy-active24.yml`](../../.github/workflows/deploy-active24.yml); ručně jde
totéž přes `npm run build:active24` a libovolného FTP klienta.

## 1. Údaje z administrace Active24

V administraci hostingu (Webhosting → FTP účty) zjistit:

| co               | kam v GitHubu                          | poznámka                                   |
| ---------------- | -------------------------------------- | ------------------------------------------ |
| FTP server       | secret `ACTIVE24_FTP_HOST`             | hostname bez `ftp://`                      |
| FTP uživatel     | secret `ACTIVE24_FTP_USER`             |                                            |
| FTP heslo        | secret `ACTIVE24_FTP_PASSWORD`         |                                            |
| kořen webu       | variable `ACTIVE24_FTP_DIR`            | výchozí `/www/`; podle administrace        |
| protokol         | variable `ACTIVE24_FTP_PROTOCOL`       | výchozí `ftps`; `ftp` jen když FTPS nejede |
| port             | variable `ACTIVE24_FTP_PORT`           | výchozí `21`                               |

Secrets: repo → Settings → Secrets and variables → Actions → **Secrets**.
Variables (nejsou tajné): tamtéž, záložka **Variables**. Z příkazové řádky:

```bash
gh secret set ACTIVE24_FTP_HOST
gh secret set ACTIVE24_FTP_USER
gh secret set ACTIVE24_FTP_PASSWORD
gh variable set ACTIVE24_FTP_DIR --body "/www/"
```

EmailJS proměnné `PUBLIC_EMAILJS_SERVICE_ID`, `PUBLIC_EMAILJS_TEMPLATE_ID`,
`PUBLIC_EMAILJS_PUBLIC_KEY` už jako Variables nastavené jsou (jsou veřejné
záměrně, viz `.env.example`).

## 2. Spuštění

GitHub → Actions → **Deploy to Active24** → Run workflow. Workflow sestaví web,
přikopíruje `deploy/active24/.htaccess` do `dist/` a nahraje jen změněné
soubory (stav synchronizace drží soubor `.ftp-deploy-sync-state.json` na
serveru; `.htaccess` ho pro veřejnost zakazuje).

Až doména `sanavera.cz` míří na Active24, odkomentovat v workflow `push` na
`main`, aby se každý merge nasadil sám.

## 3. Doména

`SITE_URL` v `src/consts.ts` je `https://sanavera.cz` — canonical, sitemap i
`.htaccess` (přesměrování na https bez `www`) s tím počítají. V DNS Active24
tedy `sanavera.cz` (A) i `www.sanavera.cz` (CNAME/A) na hosting; certifikát
Let's Encrypt zapnout v administraci hostingu.

## 4. Ruční nasazení bez GitHubu

```bash
npm run build:active24
```

a obsah `dist/` (včetně skrytého `.htaccess`) nahrát do kořene webu. Před
buildem musí být v `.env` vyplněné EmailJS proměnné, jinak se formuláře
nasadí bez odesílání (build to hlásí varováním).
