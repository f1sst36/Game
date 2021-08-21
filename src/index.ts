import {Game} from './common/Game';
import {Light} from './light/Light';
import {Cube} from './entities/Cube';
import {StopRenderer} from './utils/StopRenderer';
import {Ground} from "./entities/Ground";
import {ModelLoader} from "./utils/ModelLoader";
import {TGALoader} from "three/examples/jsm/loaders/TGALoader";
import {Texture} from "./utils/Texture";
import { Mesh } from 'three';

window.game = new Game();

Light.initCommonLight();

const ground = new Ground();

new Cube(ground);

(async () => {
    const object = await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_tree_02.fbx');
    const loader = new TGALoader();
    const texture = loader.load('assets/textures/tex_a.tga');
    await Texture.setTexture(object, texture);

    const object2 = await ModelLoader.loadFBX('assets/models/buildings/rpgpp_lt_building_01.fbx');
    const texture2 = loader.load('assets/textures/tex_a.tga');
    await Texture.setTexture(object2, texture2);

    const object3 = await ModelLoader.loadFBX('assets/models/characters/Maskboy.FBX');
    // const texture3 = loader.load('assets/textures/tex_a.tga');
    // await Texture.setTexture(object2, texture2);

    window.game.getScene().add(object);
    window.game.getScene().add(object2);
    object.position.x = -7;
    object2.position.x = 10;
})()

StopRenderer.stopWithKeyDown(' ');
