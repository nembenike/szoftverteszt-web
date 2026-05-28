const games = [
  {
    slug: 'game-1.html',
    title: 'Game One',
    label: '1v1 Duel 01',
    description: 'Use this page for the first two-player game mode.',
    summary: 'A clean placeholder route for the first game.',
    accent: 'from-cyan-400 to-blue-500',
    features: [
      'Shared structure for turn tracking later',
      'Room for score keeping and round logic',
      'Simple entry point for implementation work',
    ],
  },
  {
    slug: 'game-2.html',
    title: 'Snake game',
    label: 'Snake game',
    description: 'This is a simple snake copy game',
    summary: 'Yeah you can play snake',
    accent: 'from-emerald-400 to-teal-500',
    features: [
      'Independent place for its own rules',
      'Easy to wire into future navigation',
      'Keeps each game isolated and understandable',
    ],
  },
  {
    slug: 'game-3.html',
    title: 'Game Three',
    label: '1v1 Duel 03',
    description: 'Use this page for the third two-player game mode.',
    summary: 'A third dedicated page for another game shell.',
    accent: 'from-rose-400 to-orange-500',
    features: [
      'Third isolated route for its own logic',
      'Matches the same shared layout system',
      'Ready for a later scoreboard or match flow',
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
      <span class="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r ${game.accent} px-3 py-2 text-sm font-semibold text-slate-950">
        Open page
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
            <span class="eyebrow">Szoftverteszt Web</span>
            <div class="max-w-3xl space-y-4">
              <h1 class="display-title">Choose a 1v1 game and keep the logic on its own page.</h1>
              <p class="lede">
                This is a small, extendable website with three separate subpages for three two-player games.
                The layout is already set up, so the game logic can be added later without reworking navigation.
              </p>
            </div>
          </div>

          <div class="button-grid">
            ${games.map((game) => renderGameCard(game)).join('')}
          </div>

          <div class="info-grid">
            <article class="info-card">
              <h2 class="info-card-title">Easy to extend</h2>
              <p class="info-card-copy">
                Add another game by copying one entry in the data list and creating a matching HTML page.
              </p>
            </article>
            <article class="info-card">
              <h2 class="info-card-title">Separate routes</h2>
              <p class="info-card-copy">
                Each game has its own page, which keeps the project organized as the logic grows.
              </p>
            </article>
            <article class="info-card">
              <h2 class="info-card-title">No game logic yet</h2>
              <p class="info-card-copy">
                The pages are intentionally empty shells for now, ready for future implementation.
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
          <span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-r ${game.accent}"></span>
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
                  Placeholder shell
                </div>
                <div class="space-y-3">
                  <h2 class="font-display text-2xl font-bold text-white">No game logic is implemented yet</h2>
                  <p class="max-w-2xl text-sm leading-6 text-slate-300">
                    This page exists so the game can later get its own component tree, scoreboard, turn flow,
                    or input handling without changing the overall site structure.
                  </p>
                </div>
                <div class="status-banner">
                  The only responsibility of this page right now is to provide a clear place for one specific 1v1 game.
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