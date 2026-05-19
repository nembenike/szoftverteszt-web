import './style.css';
import { games, renderGamePage, renderHomePage } from './site.js';

const app = document.querySelector('#app');

if (!app) {
  throw new Error('App container not found');
}

const currentPath = window.location.pathname;
const activeGame = games.find((game) => currentPath.endsWith(`/${game.slug}`));

document.title = activeGame
  ? `${activeGame.title} | Szoftverteszt Web`
  : 'Szoftverteszt Web';

app.innerHTML = activeGame ? renderGamePage(activeGame) : renderHomePage();
