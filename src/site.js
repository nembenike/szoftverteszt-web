const games = [
  {
    slug: 'game-1.html',
    title: 'Amőba',
    label: '1v1',
    description: 'Amőba játék két játékos részére.',
    summary: '',
    accent: 'bg-slate-300',
    features: [
      'Kétjátékos kör alapú mezőkezelés',
      'Egyszerű nyerési feltétel ellenőrzés',
      'Külön játéktér és állapotkezelés',
    ],
  },
  {
    slug: 'game-2.html',
    title: 'Snake',
    label: 'Egyjátékos',
    description: 'Mindenki ismeri.',
    summary: '',
    accent: 'bg-slate-300',
    features: [
      'Rácson mozgó kígyó és iránykezelés',
      'Pontszám és étel-generálás kezelése',
      'Játék vége feltételek elkülönítve',
    ],
  },
  {
    slug: 'game-3.html',
    title: 'Tron',
    label: '1v1/AI',
    description: 'Tron játék, ahol két játékos vagy egy játékos és az AI mérkőzhet meg egymással.',
    summary: '',
    accent: 'bg-slate-300',
    features: [
      'Kétjátékos vagy AI ellenfél támogatás',
      'Pályán maradó nyomvonalak kezelése',
      'Ütközésfigyelés és kör lezárás',
    ],
  },
];

function renderGameCard(game) {
  return `
    <a class="group game-button" href="/${game.slug}">
      <div>
        <span class="arrow-chip">${game.label}</span>
        <h2 class="game-button-title">${game.title}</h2>
        <p class="game-button-copy">${game.description}</p>
      </div>
        <span class="inline-flex w-fit items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-900 ${game.accent}">
        Játék
        <span aria-hidden="true">→</span>
      </span>
    </a>
  `;
}

function renderHomePage() {
  return `
    <main class="page-shell">
      <section class="hero-card">
        <div class="content-stack">
          <div class="flex flex-col gap-5">
            <div class="max-w-3xl space-y-4">
              <h1 class="display-title">Szoftverteszt Web</h1>
              <p class="lede">
                Ezen a webalkalmazáson 3 különböző játékkal játszhatsz, amik: Amőba, Snake, és egy 1v1/AI Tron.
              </p>
            </div>
          </div>

          <div class="button-grid">
            ${games.map((game) => renderGameCard(game)).join('')}
          </div>

          <div class="info-grid">
            <article class="info-card">
              <h2 class="info-card-title">Berényi Bence</h2>
              <p class="info-card-copy">
                Tron, és alap oldal.
              </p>
            </article>
            <article class="info-card">
              <h2 class="info-card-title">Bóta Milán</h2>
              <p class="info-card-copy">
                Snake játék
              </p>
            </article>
            <article class="info-card">
              <h2 class="info-card-title">Garay Ágoston</h2>
              <p class="info-card-copy">
                Amőba játék
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  `;
}

function renderGamePage(game) {
  const featureItems = game.features
    .map(
      (feature) => `
        <li class="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-300">
          <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${game.accent}"></span>
          <span>${feature}</span>
        </li>
      `,
    )
    .join('');

  return `
    <main class="page-shell">
      <section class="hero-card">
        <div class="content-stack">
          <div class="page-header">
            <div class="space-y-4">
              <span class="eyebrow">${game.label}</span>
              <div class="max-w-3xl space-y-3">
                <h1 class="display-title">${game.title}</h1>
                <p class="lede">${game.summary}</p>
              </div>
            </div>
            <a class="back-link" href="/index.html">← Back to home</a>
          </div>

          <div class="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
            <section class="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-inner shadow-black/20">
              <div class="flex flex-col gap-4">
                      <div class="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                        Game area
                      </div>
                      <div class="space-y-3">
                        <h2 class="font-display text-2xl font-bold text-white">Game area</h2>
                        <p class="max-w-2xl text-sm leading-6 text-slate-300">Implement the game here.</p>
                      </div>
              </div>
            </section>

            <aside class="info-card">
              <h2 class="info-card-title">What belongs here later</h2>
              <ul class="mt-4 space-y-3">
                ${featureItems}
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </main>
  `;
}

export { games, renderGamePage, renderHomePage };