# Kontekst — David Lazić

## Ko sam

Frontend developer u učenju. Radio godinu dana sa plaćenim mentorom, prekinuo saradnju i nastavio samostalno. Cilj: zaposlenje kao frontend developer.

Preferiram učenje kroz projekte, ne kroz video lekcije. Samostalan, kritičan prema sebi.

---

## Šta znam dobro

- **HTML i CSS** — veoma dobro, uključujući funkcionalnosti
- **JavaScript** — solidne osnove:
  - Single-responsibility princip (jedna funkcija, jedna operacija)
  - DOM objekat na vrhu fajla (`const DOM = {}`)
  - State objekat kao jedini izvor podataka
  - get(value) pattern
  - Podaci u posebnim fajlovima, exportuju se po potrebi
  - Array metode: `map`, `includes`, `closest` i slično
  - Event delegation, factory funkcije, manager objekti

## Gde imam prazninu

- Ne mogu samostalno da napišem JS funkcije bez pomoći — ali razumem teorijski šta kod radi
- Nisam radio async JavaScript (`fetch`, `async/await`, `Promise`)
- Nisam radio sa REST API-jevima
- Nisam učio React ni bilo koji framework

## Projekti koje sam radio

expense-tracker, X-Shoppers-Dream, memory game, our-tours — manji/srednji projekti sa mentorom, fokus na primeni JS obrazaca.

---

## Moj JavaScript stil (uvek prati ovo kada pišeš kod za mene)

**DOM objekat na vrhu:**
```js
const DOM = {
  someEl: document.getElementById("someEl"),
  otherEl: document.querySelector(".other"),
};
```

**State objekat:**
```js
const state = {
  items: [],
  filter: "all",
  getTotalIncome() { ... },
};
```

**Manager objekti za biznis logiku:**
```js
const cardManager = {
  cards: [],
  clickCard(id) { ... },
  shuffleCards() { ... },
};
```

**Factory funkcije:**
```js
const createCard = (id, src) => ({
  id, src,
  isClicked: false,
  getId() { return this.id; },
});
```

**Single-purpose funkcije** — jedna funkcija radi jednu stvar.

**Event delegation** — jedan listener na parent elementu.

**Ostalo:**
- `const` za sve što se ne reassignuje
- Arrow funkcije za callback-ove
- `forEach` umesto `for` petlji
- Spread operator za kopije nizova: `[...niz]`
- camelCase za sve
- Vanilla JS — bez frameworka
- State je jedini izvor podataka

---

## Plan učenja (dogovoreno)

1. `async/await` + `fetch` ← trenutno ovde
2. REST API konzumacija
3. React
4. Next.js

OOP sa formalnim klasama — preskočiti, već koristim OOP koncepte funkcionalno.

---

## Komunikacija

Uvek pisati na srpskom jeziku, ekavica. ("lepo", "belo" — ne "lijepo", "bijelo")
