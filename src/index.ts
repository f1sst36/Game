import { Game } from './common/Game';
import { Light } from './light/Light';
import { Cube } from './entities/Cube';
import { StopRenderer } from './utils/StopRenderer';
import { Ground } from './entities/Ground';
import { GenerateLocation } from './scripts/GenerateLocation';

window.game = new Game();

Light.initCommonLight();

const ground = new Ground();

new Cube(ground);

(async () => {
    await new GenerateLocation().init();
})();

StopRenderer.stopWithKeyDown(' ');
