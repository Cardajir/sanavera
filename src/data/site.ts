/** Practice details, navigation and homepage content, transcribed from sanavera_web.xd. */

export const contact = {
  phone: "(+420) 746 765 948",
  phoneHref: "tel:+420746765948",
  email: "ahoj@sanavera.cz",
  emailHref: "mailto:ahoj@sanavera.cz",
  clinic: {
    name: "Sanavera, s.r.o.",
    street: "Hněvkovského 238",
    city: "665 98 Veselí nad Moravou",
  },
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=Hn%C4%9Bvkovsk%C3%A9ho+238%2C+Vesel%C3%AD+nad+Moravou",
  hours: [
    { days: "Po – Pá", time: "7:00 – 17:00" },
    { days: "So – Ne", time: "Zavřeno" },
  ],
  parking: ["Parkování autem je možné", "Přímo před ordinací"],
  social: {
    instagram: "https://www.instagram.com/sanavera.cz/",
    facebook: "https://www.facebook.com/sanavera.cz/",
    handle: "@sanavera.cz",
    znamylekar: "https://www.znamylekar.cz/",
  },
  operator: {
    name: "Sanavera s.r.o.",
    lines: ["Sídlem Sklářská 1012/5,", "696 18 Lužice"],
    ico: "IČ: 23237473",
    register: ["Spisová značka", "C 145001/KSBR Krajský soud v Brně"],
  },
} as const;

/** In-page anchors — every detail view on this site is a modal, not a route. */
export const mainNav = [
  { label: "Kdo jsme", href: "#kdo-jsme" },
  { label: "Technologie", href: "#technologie" },
  { label: "Služby", href: "#sluzby" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const legalNav = [
  {
    label: "Informace o ochranně osobních údajů",
    href: "/ochrana-osobnich-udaju",
  },
  { label: "Provozní řád", href: "/provozni-rad" },
  { label: "Informace o Cookies", href: "/cookies" },
] as const;

export const hero = {
  eyebrow: "STOMATOLOGIE SANAVERA",
  heading:
    "Špičková péče o vaše zuby. V maximálním pohodlí, bez bolesti a bez stresu.",
  claim:
    "Osobní energie vložená do vašeho zdraví (Sana) a upřímnost mezi lékařem a pacientem (Vera) jsou základním kamenem naší praxe.",
} as const;

export interface ValueCard {
  heading: string;
  text: string;
  /** Set on the card that leads into a modal panel. */
  opens?: string;
}

/** The three sand cards that follow the practice claim. */
export const values: ValueCard[] = [
  {
    heading: "Nejsme smluvním poskytovatelem zdravotních pojišťoven",
    text: "Léčebný postup volíme podle toho, co považujeme za nejlepší pro konkrétního pacienta – nikoliv podle toho, co a za jakých podmínek hradí zdravotní pojišťovna.",
    opens: "pristup:vztah-k-pojistovnam",
  },
  {
    heading: "Plnohodnotná stomatologická péče o dospělé pacienty",
    text: "Naše ordinace se specializuje na komplexní stomatologickou péči o dospělé pacienty. Dětské pacienty do péče neregistrujeme, protože dětská stomatologie vyžaduje specifický přístup a považujeme za správné, aby byla péče o děti vedena pracovištěm, které se na ni cíleně zaměřuje.",
  },
  {
    heading: "Empatie, transparentní postupy a důvěra.",
    text: "Jsme přesvědčeni, že mezi lékařem a pacienty musí panovat naprostá důvěra. Snažíme se proto být ve všem maximálně transparentní. Na základě celostní diagnostiky vám proto vždy dopředu stanovíme léčebný plán, který s vámi diskutujeme a přizpůsobujeme vaší konkrétní situaci, časovým i finančním možnostem.",
  },
];

export const doctor = {
  name: "MDDr. Veronika Netopilík Kopečná",
  firstLine: "MDDr. Veronika",
  secondLine: "Netopilík Kopečná",
  role: "VEDOUCÍ LÉKAŘ",
  heading: "Moderní stomatologie bez kompromisů.",
  cta: "Poznejte nás blíž",
  /** Sits between the biography and the signature, at 26 design px. */
  insuranceLine:
    "Řekli jsme NE pojišťovnám, abychom mohli poskytnout maximální péči na míru",
  bio: [
    "Stomatologie pro mě není jen a pouze „opravování“ zubů. Jde mi o to pochopit příčinu každého problémů a navrhnout dlouhodobé řešení. Každého pacienta posuzuji komplexně a léčebný plán vytvářím tak, aby jednotlivé kroky dávaly smysl jako celek. Navrhuji více variant léčby, takže se můžete rozhodnout pro variantu, která je pro vás nejlepší - jak finančně, tak časově. Péče probíhá s velkým důrazem na bezbolestný průběh ošetření a váš maximální komfort.",
    "Pokud je pro dosažení nejlepšího výsledku potřeba péče, kterou sama neposkytuji (například chirurgické zákroky, ortodoncie nebo implantologie), doporučím vám vhodného specialistu a koordinuji léčbu tak, aby jednotlivé kroky správně navazovaly.",
  ],
} as const;

export const comfort = {
  eyebrow: "TECHNOLOGIE",
  heading:
    "Maximální komfort pro nás není jen prázdná fráze. Máme hned několik důvodů, proč se k nám klienti doopravdy těší.",
  microscopeLabel: "VYUŽÍVÁME ŠPIČKOVÝ CHIRURGICKÝ MIKROSKOP Flexion twin lite",
} as const;

/** The comfort-technology carousel on the homepage. */
export const comfortItems = [
  {
    heading: "VR brýle, Netflix & chill",
    product: "XREAL One Pro-M AR",
    text: "Podívejte se na svou oblíbenou show nebo film přímo na zubařském kresle. Popcorn u nás ale nečekejte :)",
    image: "xreal-glasses",
  },
  {
    heading: "Silent mode během zákroku",
    product: "Sony Noise Cancelling WH-1000XM6",
    text: "Díky bezdrátovým sluchátkům s aktivním potlačením hluku si místo vrtačky můžete užít svůj oblíbený film či playlist.",
    image: "sony-headphones",
  },
  {
    heading: "Pohodlné polohovací křeslo",
    product: "Dentsply Sirona INTEGO PRO",
    text: "Díky ergonomickému tvarování a prémiovému polstrování dopřeje maximální pohodlí i během delších zákroků.",
    image: "dental-chair",
  },
  {
    heading: "3D sken, o kterém ani nevíte",
    product: "Dentsply Sirona Primescan 2",
    text: "Zapomeňte na nepříjemné otiskovací hmoty v ústech. Digitální otisk vašich zubů získáme bezbolestně z křesla během necelé minuty.",
    image: "primescan",
  },
] as const;

export const services = {
  eyebrow: "POSKYTOVANÉ SLUŽBY",
  heading:
    "Pacient je u nás vždy na prvním místě. Díky rozhodnutí nespolupracovat s pojišťovnami vám můžeme poskytnout tolik času, kolik váš případ vyžaduje.",
} as const;

/** Patient reviews, transcribed from the pasteboard in sanavera_web.xd. */
export const reviews = [
  {
    author: "M.Ch.",
    text: "Paní doktorka Kopečná je skvělá lékařka. Jak po pracovní stránce, tak i přístupem k pacientovi . Vyléčila a opravila chrup i v případech, kdy to již vypadalo „beznadějně“ ! Vše srozumitelně vysvětlí a její ošetření je vždy naprosto bezbolestné. Celé naší rodině velmi pomohla a můžeme jí jen doporučit dalším pacientům.",
  },
  {
    author: "Mrek B.",
    text: "Paní doktorka Kopečná je úžasná profesionálka s laskavým přístupem k pacientům, používající nejmodernější postupy a techniku. Nikdy dříve jsem nezažil, aby byl stomatologický zákrok naprosto bezbolestný, což je MDDr. Kopečné naprostou samozřejmostí. Na jejím křesle nebudete mít starosti s bolestí, ale s tím, abyste si při případném delším zákroku nezdřímli. Moc mne mrzí změna jejího působiště a upřímně závidím jejím novým pacientům. Já ztrácím a oni získávají mimořádného profesionála i člověka.",
  },
  {
    author: "Eva",
    text: "Paní Veronika Kopečná je mojí nejoblíbenější zubařkou, kterou jsem za svůj život potkala. Dělá všechno šetrně a precizně. Na všechno se ptá a je velmi milá. Nikdy jsem při jakékoliv úpravě v puse nepociťovala žádnou bolest. Snaží se opravdu komunikovat a zachránit zuby s komunikací vedenou o péči, aby nemusely být vrtány. Vždy se k ní ráda vracím, protože takový pocit pohody u zubaře jsem nikdy nezažila.",
  },
  {
    author: "Christian",
    text: "Absolut perfekte Betreuung über 1,5 Jahre - Gesamtsanierung Gebiss mit äußerst schwierigen Extraktionen, neuen Brücken, Zahnersatz, zahlreichen Wurzelbehandlungen etc.. Medizinische und chirurgische Leistung absolut perfekt in einem sehr angenehmen Umfeld. Termine wurden immer pünktlich eingehalten, keine Wartezeiten, perfekte Infrastruktur. Koordination mit anderen Klinikabteilungen durch Dr. Kopecna war perfekt. Einfach unbeschreiblich qualifiziert und perfekte Betreuung.",
  },
  {
    author: "Monika Čechová",
    text: "S péčí paní doktorky jsem byla moc spokojena. Bohužel nyní odchází působit do jiné části republiky a nemohu k ní tedy chodit i nadále. Vždy byla velice vstřícná, ochotná, vše podrobně vysvětlila a hlavně mi dala do kupy všechny zuby, u kterých můj předchozí zubař kazy zanedbal.",
  },
  {
    author: "Jiránek",
    text: "Ona je fakt skvělá. Zná svůj obor perfektně, a kvalita je na vysokém úrovni. Škoda, že už nebude v Praze. Ale přeji ji hodně úspěchu, a trochu závidím těm, kdo bude chodit k ní do nové ordinaci. Držím Vám palce paní doktorko, ať se Vám daří.",
  },
  {
    author: "Katarina",
    text: "Paní doktorka je nejen výborná specialistka, ale má neuveriteľne lidský a chápavý přístup. Je trpělivá laskavá a vstřícná. Zachránila mi chrup, doslova. Každý den si na ni s láskou vzpomenu, že můžu kousat a smát a se. Díky jejímu přístupu jsem se. o chrupu mnohé naučila a nejen, že jsme se přestala „bát zubaře“, ale na návštěvu zubaře se těším.",
  },
  {
    author: "Marie Hoštická",
    text: "Pro mě zatím nejlepší zubní lékařka, u které jsem byla a u které jsem se nebála. Vše vysvětlí, je milá, přátelská a velmi jemná i citlivá. Nedopustí žádnou bolest pacienta, vše předem ukáže, popíše, nastíní varianty řešení problému a konzultuje s pacientem. To vše vždy s úsměvem na rtech a s dobrou náladou. Je rychlá a precizní, jinam bych už nešla. Nevídané vybavení ordinace, moderní přístroje a krásná hudba. Oceňuji brýle na oči nebo polštářek za krk pro pohodlí pacienta. Paní doktorce děkuji a budu ji všude doporučovat.",
  },
  {
    author: "Monika Š.",
    text: "Paní doktorka je velmi šikovná, profesionální a hlavně lidská. V mém případě se pustila do celkové rekonstrukce chrupu a s výsledkem jsem velmi spokojená. Všechno mi podrobně vysvětlila a naplánovala celý postup rekonstrukce, kterého se držela. Na jiné klinice se do rekonstrukce mého chrupu nechceli pustit, protože se báli případných komplikací. Paní doktorka se přes své mládí do rekonstrukce pustila a dopadlo to skvěle. Po svých zkušenostech mohu všem jedině doporučit.",
  },
  {
    author: "Milan",
    text: "Přišel jsem s mnoha z různých důvodů zanedbanými problémy. Po zevrubné prohlídce následoval rozbor problémů a nastíněn detailní postup léčby včetně rozpočtu. Během desítek návštěv oceňuji velmi citlivý přístup k odstranění mých problémů – během zákroků a ani po nich se nevyskytly žádné komplikace. Velmi jsem ocenil po složitějších zákrocích i následný telefonát, ve kterém se zajímala o můj stav. Za mě, z hlediska pacienta, maximální spokojenost.",
  },
] as const;

export const reviewSource = "Zdroj recenze: znamylekar.cz";

export const booking = {
  heading: "Přijímáme nové pacienty!",
  text: "Zaregistrujte se do péče moderní stomatologie ve Veselí nad Moravou. Vyplňte krátký formulář a do 24 hodin se vám ozveme s nabídkou termínu.",
  submit: "Odeslat žádost o termín",
  consentBefore: "Odesláním formuláře souhlasím se",
  consentLink: "Zpracováním osobních údajů",
  requestLabel:
    "Máte konkrétní požadavek? (např. preventivní prohlídka, bolest zubu,…)",
  /** Shown while the request is in flight, and after it settles. */
  sending: "Odesíláme…",
  sent: "Děkujeme, žádost dorazila. Ozveme se vám do 24 hodin.",
  failed: "Odeslání se nezdařilo. Zavolejte nám prosím na",
} as const;
