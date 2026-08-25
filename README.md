# sanavera.cz

Web zubní ordinace **Sanavera, s.r.o.** ve Veselí nad Moravou. Statická
jednostránka postavená na [Astro](https://astro.build) a
[Lumos](https://lumosframework.com), postavená podle návrhu `sanavera_web.xd`.

## Spuštění

```bash
npm install
npm run dev
```

| příkaz | co dělá |
| --- | --- |
| `npm run dev` | vývojový server |
| `npm run check` | typová kontrola (`astro check`) |
| `npm run build` | build do `dist/` |
| `npm run preview` | náhled buildu |
| `npm run format` | Prettier |

## Formulář (EmailJS)

Registrační formulář odesílá z prohlížeče přes
[EmailJS](https://dashboard.emailjs.com) do schránky ordinace — web je
statický, takže tu není nic, co by přijalo POST.

```bash
cp .env.example .env
```

Do `.env` patří tři `PUBLIC_EMAILJS_*` hodnoty z dashboardu. **Jsou veřejné
záměrně** — EmailJS je browser SDK, takže se objeví ve zdroji stránky. Účet
chrání nastavení v dashboardu, ne utajení klíče:

1. Account → Security → `sanavera.cz` na allowlist
2. Account → Security → „Block headless browsers"
3. Email Services → Gmail → zapnutá reCAPTCHA

Bez vyplněného `.env` formulář neodesílá, ukáže telefon jako náhradu a build
vypíše varování s názvem chybějícího klíče.

Šablony e-mailů a mapování polí: [`docs/emailjs-templates.md`](docs/emailjs-templates.md).

## Nasazení

`wrangler.jsonc` je připravený pro Cloudflare Workers (assets-only, nic neběží
per request):

```bash
npx wrangler deploy
```

Na Vercelu stačí naimportovat repozitář — Astro se detekuje samo, výstup je
`dist/`. `PUBLIC_EMAILJS_*` je potřeba nastavit v proměnných prostředí projektu,
jinak formulář na nasazené verzi neodešle.

## Struktura

```
src/
  components/     komponenty (Nav, Modal, Slider, BookingForm, …)
                  *Controller.astro jsou skriptové – Astro zahazuje <script>
                  z komponent, které zároveň renderují markup
  content/sluzby/ texty služeb, generované z .xd
  data/site.ts    kontakty, navigace, recenze, texty
  layouts/        BaseLayout (nav + footer), LegalLayout
  pages/          index.astro je one-pager; detaily jsou modály, ne routy
  scripts/        motion.ts – GSAP + IntersectionObserver
  styles/         base (tokeny) · patterns · site · utilities
docs/             podklady k provozu
design/           referenční obrázky z návrhu
```

Kaskáda je Lumosí: `@layer base, patterns, components, utilities` — utility
vyhrávají vždycky, takže bespoke hodnota, která má přebít utilitu, nesmí
utilitu vůbec nechat vygenerovat.

Zdrojový `.xd` (~294 MB) v repozitáři **není** — je nad limitem GitHubu a vše
potřebné z něj už je vytažené.

## Co ještě není hotové

- **Právní texty.** `/ochrana-osobnich-udaju` a `/provozni-rad` jsou kostry.
  GDPR informaci a provozní řád musí dodat a schválit provozovatel.
- **Font Youth** není licencovaný. Je první ve stacku, takže se aktivuje sám,
  jakmile bude nainstalovaný; zatím zastupuje self-hostovaný Outfit.
- **Přepínač EN** je záměrně neaktivní — anglická verze neexistuje.
- **Google Maps** se načítá hned při otevření stránky, tedy před jakýmkoliv
  souhlasem. U zdravotnického webu stojí za zvážení „kliknutím načíst mapu".
- **Telefonní číslo** je v návrhu rozporné: nav uvádí 745 765 908, patička
  746 765 948. Web používá to z patičky.

## Licence

`LICENSE` je MIT ze startovací šablony Lumos (© Timothy Ricks) a vztahuje se na
kód šablony. **Obsah webu, fotografie a značka Sanavera pod MIT nespadají.**
Před zveřejněním repozitáře je vhodné licenci upravit tak, aby to odpovídalo.
