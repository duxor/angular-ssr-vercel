# Detaljan Audit Aplikacije — Lumina Digital Art Gallery

**Datum:** 2026-03-21
**Projekat:** angular-ssr-vercel (Lumina Digital Art Gallery)
**Angular verzija:** 19.2.x
**Tip aplikacije:** Angular SSR sa Vercel deployment-om

---

## 1. ARHITEKTURA I STRUKTURA PROJEKTA

### 1.1 Opšti pregled

Aplikacija je Angular 19 standalone-component aplikacija sa Server-Side Rendering (SSR) konfigurisanim za Vercel deployment. Koristi Express server kao backend za SSR, lazy-loaded rute i moderan Angular API.

### 1.2 Struktura fajlova

```
├── api/index.js              # Vercel serverless entry point
├── src/
│   ├── main.ts               # Browser bootstrap
│   ├── main.server.ts         # Server bootstrap
│   ├── server.ts              # Express SSR server
│   ├── indexFile.html          # HTML template
│   ├── styles.css             # Globalni stilovi
│   └── app/
│       ├── app.component.*     # Root komponenta
│       ├── app.config.ts       # Client config
│       ├── app.config.server.ts # Server config
│       ├── app.routes.ts       # Rute
│       ├── app.routes.server.ts # Server rute
│       ├── gallery/            # Gallery komponenta
│       ├── artists/            # Artists komponenta
│       └── not-implemented/    # Coming Soon komponenta
├── angular.json
├── vercel.json
├── package.json
└── tsconfig*.json
```

### 1.3 Ocena strukture: ⚠️ ZADOVOLJAVAJUĆE

**Pozitivno:**
- Čista separacija komponenti
- Lazy loading za sve rute
- Standalone komponente (moderan Angular pristup)

**Problemi:**
- Nema `environments/` foldera za environment konfiguraciju
- Nema nijednog servisa — sva logika (podaci) je hardkodirana u komponentama
- Nema modela/interfejsa za tipove podataka
- Nema shared/common modula za reusable elemente

---

## 2. KRITIČNI PROBLEMI (Severity: HIGH)

### 2.1 ❌ `api/index.js` — Mešanje CommonJS i ESM sintakse

```javascript
const path = require('path');  // CommonJS
export default import(serverDistPath).then(module => module.app);  // ESM
```

**Problem:** Fajl koristi `require()` (CommonJS) i `export default` (ESM) u istom fajlu. Ovo može uzrokovati runtime greške zavisno od Node.js verzije i Vercel runtime okruženja.

**Preporuka:** Koristiti konzistentno ESM ili CJS sintaksu. Preporučuje se dodavanje `"type": "module"` u package.json ili preimenovanje u `.mjs`.

### 2.2 ❌ Unit testovi ne prolaze

Fajl `app.component.spec.ts` sadrži zastarele testove koji ne odgovaraju aktuelnom kodu:

```typescript
// Test očekuje stari title
expect(app.title).toEqual('angular-ssr-vercel');
// Aktuelni title je 'Lumina - Digital Art Gallery'

// Test traži h1 element koji ne postoji u aktuelnom template-u
expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular-ssr-vercel');
```

**Problem:** Testovi će pasti jer:
1. `title` je promenjen u `'Lumina - Digital Art Gallery'`
2. Template nema `<h1>` sa tekstom `'Hello, angular-ssr-vercel'`
3. Test ne importuje `RouterModule` ili `RouterTestingModule` što će izazvati grešku jer `AppComponent` koristi `RouterOutlet`, `RouterLink`, `RouterLinkActive`

### 2.3 ❌ Nedostaje error handling u SSR serveru

`server.ts` nema:
- Globalni error handler za Express
- Health check endpoint
- Graceful shutdown logiku
- Request timeout konfiguraciju

```typescript
// Nedostaje:
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});
```

### 2.4 ❌ `indexFile.html` — Nekonvencionalno ime

Angular konvencija je `index.html`. Fajl je imenovan `indexFile.html` što može izazvati konfuziju i probleme sa alatima koji očekuju standardno ime.

---

## 3. SREDNJI PROBLEMI (Severity: MEDIUM)

### 3.1 ⚠️ Hardkodirani podaci u komponentama

Gallery i Artists komponente sadrže hardkodirane nizove podataka direktno u komponentama:

```typescript
// gallery.component.ts
artworks = [
  { id: 1, title: 'Digital Dreamscape', artist: 'Elena Bright', ... },
  // ...
];

// artists.component.ts
artists = [
  { id: 1, name: 'Elena Bright', specialty: 'Abstract Digital Landscapes', ... },
  // ...
];
```

**Preporuka:**
- Kreirati `ArtworkService` i `ArtistService` za podatke
- Definisati `Artwork` i `Artist` interfejse/modele
- Pripremiti za buduću integraciju sa API-jem

### 3.2 ⚠️ Nedostaju TypeScript interfejsi

Nema definisanih interfejsa za modele podataka. Sve su inline objektni literali.

**Preporuka:** Kreirati `models/` folder sa:
```typescript
export interface Artwork {
  id: number;
  title: string;
  artist: string;
  gradientColors: [string, string];
  gradientDirection: string;
  description: string;
}

export interface Artist {
  id: number;
  name: string;
  specialty: string;
  gradientColors: [string, string];
  gradientDirection: string;
  bio: string;
  featured: boolean;
}
```

### 3.3 ⚠️ Open Graph slike ne postoje

`indexFile.html` referencirava:
```html
<meta property="og:image" content="https://lumina-gallery.vercel.app/assets/og-image.jpg">
```

Fajl `assets/og-image.jpg` ne postoji u `public/` folderu. Social media deljenje će prikazivati broken slike.

### 3.4 ⚠️ Footer linkovi ne rade

```html
<a href="#" class="footer-link">About</a>
<a href="#" class="footer-link">Contact</a>
<a href="#" class="footer-link">Privacy</a>
<a href="#" class="footer-link">Terms</a>
```

Koriste `href="#"` umesto `routerLink`. Ovo uzrokuje:
1. Page reload pri kliku (kontra SSR/SPA logici)
2. Linkovi ne vode nikuda korisnog

### 3.5 ⚠️ Wildcard ruta preusmjerava na `/not-implemented`

```typescript
{ path: '**', redirectTo: '/not-implemented' }
```

Standardna praksa je imati dedicirani 404 Not Found stranicu, ne generičku "Coming Soon" stranicu.

### 3.6 ⚠️ Copyright godina hardkodirana

```html
<p class="footer-copyright">© 2025 Lumina Digital Art Gallery</p>
```

Trebalo bi koristiti dinamički generisanu godinu.

### 3.7 ⚠️ Nema `HttpClientModule` / `provideHttpClient()`

Aplikacija nema konfigurisanu HTTP komunikaciju. Za buduće API pozive, `provideHttpClient()` treba dodati u `appConfig`.

### 3.8 ⚠️ `not-implemented.component.ts` — Deprecated pattern

```typescript
constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  if (isPlatformBrowser(this.platformId)) {
    this.referrer = document.referrer;
  }
}
```

U Angular 19, preporučuje se korišćenje `inject()` funkcije umesto constructor injection-a za nove standalone komponente. Takođe, `Object` tip za `PLATFORM_ID` nije precizan — trebalo bi koristiti `string`.

---

## 4. NISKI PROBLEMI (Severity: LOW)

### 4.1 💡 CommonModule import je nepotreban

`CommonModule` se importuje u `GalleryComponent`, `ArtistsComponent`, i `NotImplementedComponent`. U Angular 19 sa standalone komponentama, `@for` i `@if` su built-in control flow i ne zahtevaju `CommonModule`. Jedini razlog za import je `date` pipe u `not-implemented.component.html`.

**Preporuka:** Ukloniti `CommonModule` iz Gallery i Artists komponenti. U NotImplemented komponenti, importovati samo `DatePipe`.

### 4.2 💡 `RouterModule` umesto pojedinačnih importa

`GalleryComponent` i `ArtistsComponent` importuju ceo `RouterModule` umesto samo `RouterLink`:

```typescript
imports: [CommonModule, RouterModule]  // importuje ceo modul
// Bolje:
imports: [RouterLink]  // samo ono što je potrebno
```

### 4.3 💡 Nedostaje `karma.conf.js`

Projekat koristi Karma za testove ali nema eksplicitnu Karma konfiguraciju. Oslanja se na Angular CLI defaults.

### 4.4 💡 Express verzija 4.x

```json
"express": "^4.18.2"
```

Express 5.x je dostupan. Razmotriti upgrade za bolje performanse i sigurnosne zakrpe.

### 4.5 💡 Nema lint konfiguracije

Projekat nema ESLint/Angular ESLint konfiguraciju. Nedostaje `ng lint` skripta u `package.json`.

### 4.6 💡 Nedostaje `angular.json` test browser konfiguracija

Nema konfiguracije za headless browser testiranje, što je bitno za CI/CD pipeline.

---

## 5. SIGURNOSNI AUDIT

### 5.1 Pozitivno

- ✅ TypeScript strict mode je uključen
- ✅ Nema direktnog DOM pristupa (osim `document.referrer` sa platform check-om)
- ✅ Nema `innerHTML` bindinga
- ✅ Angular automatski sanitizuje template izraze
- ✅ `.gitignore` ispravno ignoriše `node_modules`, `dist`, `.angular/cache`

### 5.2 Brige

- ⚠️ `vercel.json` ima `"public": true` — verifikovati da je to željeno ponašanje
- ⚠️ Nema Content Security Policy (CSP) header-a
- ⚠️ Nema CORS konfiguracije na Express serveru
- ⚠️ Express server ne koristi `helmet` middleware za security headers
- ⚠️ Statički fajlovi se serveriaju sa `maxAge: '1y'` — proveriti da li je cache invalidation pokriven sa hashing-om (jeste, `outputHashing: "all"` je konfigurisan u production build-u)
- ⚠️ Nema rate limiting-a na serveru

---

## 6. PERFORMANSNI AUDIT

### 6.1 Pozitivno

- ✅ Lazy loading za sve rute (`loadComponent`)
- ✅ Production budgets su definisani (500kB warning, 1MB error)
- ✅ CSS animacije koriste `transform` i `opacity` (GPU-akcelerisane)
- ✅ `provideClientHydration(withEventReplay())` je konfigurisano — moderno SSR hidriranje
- ✅ `provideZoneChangeDetection({ eventCoalescing: true })` — optimizovano change detection
- ✅ Static assets imaju `maxAge: '1y'` cache
- ✅ `outputHashing: "all"` omogućava agresivno keširanje sa cache busting-om
- ✅ Google Fonts koristi `preconnect` za brže učitavanje

### 6.2 Problemi

- ⚠️ Google Fonts se učitava sinhrono — može blokirati renderovanje. Koristiti `font-display: swap` (već je uključen preko `display=swap` parametra u URL-u — OK)
- ⚠️ Nema `loading="lazy"` za slike (aplikacija trenutno nema slike, ali treba imati na umu)
- ⚠️ `not-implemented.component.css` ima `min-height: 100vh` — može izazvati layout shift
- ⚠️ Sve server rute koriste `RenderMode.Server` — razmotriti `RenderMode.Prerender` za statičke stranice (gallery, artists) za bolje performanse

---

## 7. PRISTUPAČNOST (ACCESSIBILITY) AUDIT

### 7.1 Pozitivno

- ✅ Globalni fokus stilovi su definisani (`:focus-visible`)
- ✅ `.sr-only` klasa je dostupna za screen reader-only sadržaj
- ✅ `lang="en"` atribut na `<html>` elementu
- ✅ Semantički HTML elementi (`<header>`, `<main>`, `<footer>`, `<nav>`)

### 7.2 Problemi

- ❌ Navigacija nema `aria-label` atribut
- ❌ Artwork kartice nemaju `alt` tekst (koriste gradient div-ove umesto slika)
- ❌ Timeline u not-implemented komponenti nema `aria-label` niti `role` atribute
- ❌ Footer linkovi (`href="#"`) nemaju `aria-label` i ne komuniciraju svoj status
- ⚠️ Gradient overlay tekstovi koriste belu boju na svetlim gradientima — mogući kontrast problemi
- ⚠️ Nedostaje skip-to-content link

---

## 8. SSR I VERCEL DEPLOYMENT AUDIT

### 8.1 Konfiguracija

**vercel.json:**
```json
{
  "version": 2,
  "public": true,
  "rewrites": [{ "source": "/(.*)", "destination": "/api" }],
  "functions": {
    "api/index.js": { "includeFiles": "dist/angular-ssr-vercel/**" }
  }
}
```

### 8.2 Problemi

- ❌ **`api/index.js` CJS/ESM konflikt** (detaljno opisano u sekciji 2.1)
- ⚠️ Svi zahtevi se rutiraju kroz serverless funkciju — statički assets bi trebalo da se serviraju direktno sa Vercel CDN-a za bolje performanse
- ⚠️ Nedostaje Vercel headers konfiguracija za cache control
- ⚠️ Nedostaje `build` komanda u vercel.json (oslanja se na auto-detection)
- ⚠️ `server.ts` exportuje i `app` i `reqHandler` — verifikovati koji se koristi u produkciji

### 8.3 Preporuka za vercel.json

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/angular-ssr-vercel",
  "rewrites": [{ "source": "/(.*)", "destination": "/api" }],
  "functions": {
    "api/index.js": { "includeFiles": "dist/angular-ssr-vercel/**" }
  },
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## 9. REZIME NALAZA

| Kategorija | Kritični | Srednji | Niski |
|---|---|---|---|
| Kod / Arhitektura | 1 | 4 | 3 |
| Testovi | 1 | 0 | 1 |
| Sigurnost | 0 | 4 | 0 |
| Performanse | 0 | 1 | 1 |
| Pristupačnost | 0 | 2 | 3 |
| SSR/Deployment | 2 | 3 | 0 |
| **Ukupno** | **4** | **14** | **8** |

---

## 10. PRIORITETNE PREPORUKE

### Odmah rešiti (P0):
1. Popraviti `api/index.js` CJS/ESM konflikt
2. Ažurirati ili ukloniti zastarele testove u `app.component.spec.ts`
3. Dodati error handling u `server.ts`

### Uskoro rešiti (P1):
4. Kreirati TypeScript interfejse za modele
5. Kreirati servise za podatke (odvojiti od komponenti)
6. Popraviti footer linkove (koristiti `routerLink` ili ukloniti)
7. Dodati 404 stranicu umesto generičkog "Coming Soon"
8. Dodati `helmet` middleware za security headers
9. Ukloniti nepotrebne `CommonModule` i `RouterModule` importa

### Planirati (P2):
10. Dodati ESLint konfiguraciju
11. Dodati `provideHttpClient()` u app config
12. Razmotriti `RenderMode.Prerender` za statičke stranice
13. Dodati aria atribute za pristupačnost
14. Dodati OG image u public folder
15. Dinamička copyright godina

---

*Audit generisan: 2026-03-21*
