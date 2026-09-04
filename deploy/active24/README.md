# Nasazení na Active24 (FTP)

Web je čistě statický (`astro build` → `dist/`), takže na hostingu Active24
stačí Apache s `.htaccess`. Nahrání dělá GitHub Actions workflow
[`deploy-active24.yml`](../../.github/workflows/deploy-active24.yml); ručně jde
totéž přes `npm run build:active24` a libovolného FTP klienta.

## 1. Údaje z administrace Active24

V administraci hostingu (Webhosting → FTP účty) zjistit:

| co               | kam v GitHubu                          | poznámka                                   |
| ---------------- | -------------------------------------- | ------------------------------------------ |
| FTP server       | secret `ACTIVE24_FTP_HOST`             | hostname bez `ftp://` (`sanavera.cz`)      |
| FTP uživatel     | secret `ACTIVE24_FTP_USER`             | `info.sanavera.cz`                         |
| FTP heslo        | secret `ACTIVE24_FTP_PASSWORD`         |                                            |
| kořen webu       | variable `ACTIVE24_FTP_DIR`            | `/sanavera.cz/web/` (strom účtu je `/<doména>/web/`) |
| SFTP port        | variable `ACTIVE24_FTP_PORT`           | výchozí `22`                               |

Nahrává se přes **SFTP** (`lftp mirror --reverse --delete`): kořen webu na
serveru pak přesně odpovídá `dist/`, tedy první nasazení smaže i placeholder
stránku hostingu.

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
přikopíruje `deploy/active24/.htaccess` do `dist/` a zrcadlí `dist/` do kořene
webu (přenáší jen změněné soubory, přebytečné na serveru maže).

Až doména `sanavera.cz` míří na Active24, odkomentovat v workflow `push` na
`main`, aby se každý merge nasadil sám.

## 3. Doména

`SITE_URL` v `src/consts.ts` je `https://sanavera.cz` — canonical, sitemap i
`.htaccess` (přesměrování na https bez `www`) s tím počítají. V DNS Active24
tedy `sanavera.cz` (A) i `www.sanavera.cz` (CNAME/A) na hosting; certifikát
Let's Encrypt zapnout v administraci hostingu.

## 4. Nasazení z vlastního počítače (aktuálně jediná funkční cesta)

FTP server hostingu zavírá spojení z GitHub Actions hned po `PASS` (z české
adresy vrátí na špatné heslo normální `530`, runner dostane zavřený socket) —
adresy GitHubu jsou zjevně blokované. Workflow zůstává pro případ, že se to
změní; do té doby se nasazuje odsud:

```powershell
powershell -ExecutionPolicy Bypass -File deploy/active24/deploy.ps1
```

Skript sestaví web (`npm run build:active24`), zeptá se na FTP heslo a nahraje
`dist/` přes FTPS jedním spojením. Heslo se nikam neukládá. Před buildem musí
být v `.env` vyplněné EmailJS proměnné, jinak se formuláře nasadí bez
odesílání (build to hlásí varováním).

Přepínače: `-ListOnly` vypíše kořen FTP účtu, `-RemoteDir /jina/cesta/` změní
cíl (výchozí `/sanavera.cz/web/`), `-SkipBuild` nahraje poslední build znovu.

Skript soubory přidává a přepisuje a smaže placeholder `index.php` hostingu;
soubory, které z buildu zmizely, na serveru zůstávají — občas stojí za to
kořen webu vyčistit ručně.
