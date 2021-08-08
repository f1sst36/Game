import { Game } from './common/Game';
import { Light } from './light/Light';
import { Cube } from './entities/Cube';
import { StopRenderer } from './utils/StopRenderer';

window.game = new Game();

Light.initCommonLight();

const cube = new Cube();
const cube_2 = new Cube();
const cube_3 = new Cube();

document.addEventListener('click', () => {
    new Cube();
});

StopRenderer.stopWithKeyDown(' ');
