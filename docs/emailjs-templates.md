# EmailJS — nastavení šablon

Formulář posílá tyto proměnné (jsou to `name` atributy polí):

| proměnná        | pole                                                                   |
| --------------- | ---------------------------------------------------------------------- |
| `{{jmeno}}`     | Jméno                                                                  |
| `{{prijmeni}}`  | Příjmení                                                               |
| `{{email}}`     | E-mail                                                                 |
| `{{telefon}}`   | Telefon                                                                |
| `{{pozadavek}}` | Máte konkrétní požadavek? (nepovinné)                                  |
| `{{souhlas}}`   | „Ano" — souhlas se zpracováním údajů                                   |
| `{{zdroj}}`     | `booking-objednani` nebo `booking-paticka` (který formulář na stránce) |

---

## Jak vypnout auto-reply

Auto-reply není přepínač uvnitř šablony — je to **odkaz z jedné šablony na
druhou**. Šablona „Auto-Reply", kterou máš teď otevřenou, je jen ukázka, kterou
EmailJS zakládá k novému účtu.

1. Otevři šablonu, na kterou míří `PUBLIC_EMAILJS_TEMPLATE_ID` (tedy tu, která
   chodí do ordinace — níže **Šablona A**).
2. Karta **Auto-Reply** → pokud je tam nějaká šablona propojená, odpoj ji.
   Prázdné pole = žádná automatická odpověď se neposílá.
3. Ukázkovou šablonu „Auto-Reply" můžeš buď smazat, nebo z ní udělat
   **Šablonu B** níže.

Auto-reply se počítá jako **další request** z měsíčního limitu (na free tarifu
200 e-mailů/měsíc), takže dvě šablony = jedna registrace spotřebuje dva.

---

## Šablona A — upozornění do ordinace

Tohle je ta hlavní. Její ID patří do `.env` jako `PUBLIC_EMAILJS_TEMPLATE_ID`.

**Settings → Name:** `Registrace pacienta`

| pole         | hodnota                                                 |
| ------------ | ------------------------------------------------------- |
| Subject      | `Nová registrace: {{jmeno}} {{prijmeni}}`               |
| To Email     | e‑mail ordinace (nebo nech „Use Default Email Address") |
| From Name    | `Web sanavera.cz`                                       |
| From Email   | nech „Use Default Email Address"                        |
| **Reply To** | `{{email}}`                                             |

`Reply To` je tam schválně: když v Gmailu dáš Odpovědět, odpověď jde rovnou
pacientovi, ne sobě.

**Content** (přepni na „Edit Content" → HTML):

```html
<div
  style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #2f375b; line-height: 1.6;"
>
  <h2 style="margin: 0 0 20px; font-size: 20px;">Nová žádost o termín</h2>

  <table cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
    <tr>
      <td style="padding: 6px 24px 6px 0; color: #6b7280;">Jméno</td>
      <td style="padding: 6px 0;"><strong>{{jmeno}} {{prijmeni}}</strong></td>
    </tr>
    <tr>
      <td style="padding: 6px 24px 6px 0; color: #6b7280;">E-mail</td>
      <td style="padding: 6px 0;">
        <a href="mailto:{{email}}" style="color: #2f375b;">{{email}}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 6px 24px 6px 0; color: #6b7280;">Telefon</td>
      <td style="padding: 6px 0;">
        <a href="tel:{{telefon}}" style="color: #2f375b;">{{telefon}}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 6px 24px 6px 0; color: #6b7280; vertical-align: top;">
        Požadavek
      </td>
      <td style="padding: 6px 0;">{{pozadavek}}</td>
    </tr>
  </table>

  <p style="margin: 24px 0 0; font-size: 13px; color: #6b7280;">
    Souhlas se zpracováním osobních údajů: {{souhlas}}<br />
    Odesláno z formuláře: {{zdroj}}
  </p>
</div>
```

Pokud pacient nechá „Požadavek" prázdný, řádek zůstane prázdný — to je v
pořádku.

---

## Šablona B — potvrzení pacientovi (nepovinné)

Jen pokud chceš, aby pacientovi přišlo potvrzení. Založ ji jako novou šablonu a
potom ji v **Šabloně A** na kartě **Auto-Reply** propoj.

**Settings → Name:** `Potvrzení pacientovi`

| pole         | hodnota                             |
| ------------ | ----------------------------------- |
| Subject      | `Přijali jsme vaši žádost o termín` |
| **To Email** | `{{email}}`                         |
| From Name    | `Sanavera`                          |
| From Email   | nech „Use Default Email Address"    |
| Reply To     | `ahoj@sanavera.cz`                  |

**Content:**

```html
<div
  style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: #2f375b; line-height: 1.6;"
>
  <p style="margin: 0 0 16px;">Dobrý den, {{jmeno}},</p>

  <p style="margin: 0 0 16px;">
    děkujeme za vaši žádost o termín. Ozveme se vám do 24 hodin s nabídkou
    termínu na telefon <strong>{{telefon}}</strong> nebo na e-mail.
  </p>

  <p style="margin: 0 0 16px;">
    Pokud budete cokoliv potřebovat dřív, zavolejte nám na
    <a href="tel:+420746765948" style="color: #2f375b;">(+420) 746 765 948</a>.
  </p>

  <p style="margin: 24px 0 0;">
    S pozdravem<br />
    <strong>Sanavera, s.r.o.</strong><br />
    Hněvkovského 238, 665 98 Veselí nad Moravou
  </p>
</div>
```

---

## Než to pustíš na veřejnou doménu

Tři ID v `.env` jsou v HTML stránky viditelná — u EmailJS je to tak schválně,
je to browser SDK. Účet ale chrání nastavení v dashboardu, ne utajení klíče:

1. **Account → Security** → přidej `sanavera.cz` do allowlistu, aby klíč
   fungoval jen z vaší domény.
2. **Account → Security** → zapni „Block headless browsers".
3. **Email Services → Gmail** → nech zapnutou reCAPTCHA.

**Private Key** do repozitáře nikdy nepatří — je jen pro serverová volání a
byl by vidět každému návštěvníkovi.
