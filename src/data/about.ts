/** Panels of the "Kdo jsme" modal, in sidebar order. */
export const aboutNav = [
  { key: "vedouci-lekar", label: "Vedoucí lékař" },
  {
    key: "nejsme-smluvnim-poskytovatelem",
    label: "Nejsme smluvním poskytovatelem zdravotních pojišťoven",
  },
] as const;

export const insurance = {
  title: "Nejsme smluvním poskytovatelem zdravotních pojišťoven",
  lead: "Léčebný postup volíme podle toho, co považujeme za nejlepší pro konkrétního pacienta – nikoliv podle toho, co a za jakých podmínek hradí zdravotní pojišťovna. A jaké jsou konkrétní výhody pro naše pacienty?",
  reasons: [
    {
      heading: "Dostatek času na každé ošetření",
      text: "Některé úhrady zdravotních pojišťoven neodpovídají časové a technologické náročnosti péče, kterou chceme poskytovat. Nechceme proto délku ošetření přizpůsobovat výši úhrady. Naším cílem je vyhradit na zákrok tolik času, kolik je skutečně potřeba.",
    },
    {
      heading:
        "Možnost zvolit nejlepší léčebný postup pro konkrétního pacienta",
      text: "O způsobu léčby chceme rozhodovat podle klinické situace, prognózy zubu a současných odborných poznatků, nikoliv podle toho, který výkon je či není hrazen zdravotní pojišťovnou.",
    },
    {
      heading: "Svobodná volba materiálů",
      text: "Chceme používat materiály a technologie, které považujeme za nejvhodnější z hlediska kvality, funkce, estetiky a dlouhodobé prognózy. Rozsah veřejného zdravotního pojištění je naproti tomu zákonem a úhradovými pravidly přesně vymezen.",
    },
    {
      heading: "Bez kompromisů kvůli nemožnosti doplatit hrazený výkon",
      text: "U výkonu hrazeného z veřejného zdravotního pojištění obecně nelze jednoduše říct: „pojišťovna zaplatí část a pacient si doplatí rozdíl“, pokud právní předpisy takovou spoluúčast neumožňují. To může vytvářet paradoxní situace, kdy by pacient byl ochoten zaplatit za nákladnější variantu či postup, ale systém takové řešení neumožňuje.",
    },
    {
      heading: "Adekvátní znecitlivění a komfort během zákroku",
      text: "Léčbu nechceme přizpůsobovat tomu, kolik konkrétních výkonů lze vykázat pojišťovně. Pokud je pro bezbolestné ošetření potřeba další anestezie, chceme mít možnost ji použít podle klinické potřeby.",
    },
  ],
} as const;
