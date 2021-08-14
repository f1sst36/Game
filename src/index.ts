import {Game} from './common/Game';
import {Light} from './light/Light';
import {Cube} from './entities/Cube';
import {StopRenderer} from './utils/StopRenderer';
import {Ground} from "./entities/Ground";

window.game = new Game();

Light.initCommonLight();

new Cube();
// const cube_2 = new Cube();
// const cube_3 = new Cube();

new Ground();

// document.addEventListener('click', () => {
//     new Cube();
// });

StopRenderer.stopWithKeyDown(' ');
