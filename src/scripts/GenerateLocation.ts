import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import { ModelLoader } from '../utils/ModelLoader';
import { TextureSetter } from '../utils/TextureSetter';

export class GenerateLocation {
    public init = async (): Promise<void> => {
        const loader = new TGALoader();
        const texture = loader.load('assets/textures/tex_a.tga');

        for (let i = 0; i < 50; i++) {
            const numberOfTree = Math.round(Math.random()) + 1;
            const tree = await ModelLoader.loadFBX(
                `assets/models/forest/rpgpp_lt_tree_0${numberOfTree}.fbx`
            );
            await TextureSetter.setTexture(tree, texture);
            window.game.getScene().add(tree);
            tree.scale.setX(tree.scale.x + Math.round(Math.random() * 10) / 20);
            tree.scale.setY(tree.scale.y + Math.round(Math.random() * 10) / 20);
            tree.scale.setZ(tree.scale.z + Math.round(Math.random() * 10) / 20);

            tree.rotateY(Math.PI * Math.random());

            tree.position.x = Math.round(Math.random() * 100) - 50;
            if(Math.random() > .5) {
                tree.position.z = Math.round(Math.random() * 25) - 25;
            } else {
                tree.position.z = Math.round(Math.random() * 25) + 10;
            }
        }

        const object2 = await ModelLoader.loadFBX(
            'assets/models/buildings/rpgpp_lt_building_01.fbx'
        );
        const texture2 = loader.load('assets/textures/tex_a.tga');
        await TextureSetter.setTexture(object2, texture2);

        // const object3 = await ModelLoader.loadFBX('assets/models/characters/Maskboy.FBX');
        // // const texture3 = loader.load('assets/textures/tex_a.tga');
        // // await Texture.setTexture(object2, texture2);

        // // window.game.getScene().add(object);
        window.game.getScene().add(object2);
        // // object.position.x = -7;
        object2.position.y = 1;
    };
}
