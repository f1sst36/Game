import { DataTexture } from 'three';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import { ModelLoader } from '../utils/ModelLoader';
import { TextureSetter } from '../utils/TextureSetter';

export class GenerateLocation {
    private readonly texture: DataTexture;

    constructor() {
        const loader = new TGALoader();
        this.texture = loader.load('assets/textures/tex_a.tga');
    }

    public init = async (): Promise<void> => {
        this.generateTrees();
        this.generateGround();

        const house = await ModelLoader.loadFBX(
            'assets/models/buildings/rpgpp_lt_building_01.fbx',
            {
                castShadow: true,
                receiveShadow: true,
            }
        );
        const loader = new TGALoader();
        const texture2 = loader.load('assets/textures/tex_a.tga');
        await TextureSetter.setTexture(house, texture2);

        // const object3 = await ModelLoader.loadFBX('assets/models/characters/Maskboy.FBX');
        // // const texture3 = loader.load('assets/textures/tex_a.tga');
        // // await Texture.setTexture(object2, texture2);

        // // window.game.getScene().add(object);
        window.game.getScene().add(house);
        // // object.position.x = -7;
        house.position.y = 0.7;
    };

    private generateTrees = async (): Promise<void> => {
        const tree_01 = await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_tree_01.fbx', {
            castShadow: true,
        });
        const tree_02 = await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_tree_02.fbx', {
            castShadow: true,
        });
        await TextureSetter.setTexture(tree_01, this.texture);
        await TextureSetter.setTexture(tree_02, this.texture);

        const countOfTrees = 50;
        for (let i = 0; i < countOfTrees; i++) {
            const numberOfTree = Math.round(Math.random()) + 1;
            const tree = numberOfTree === 1 ? tree_01.clone() : tree_02.clone();

            window.game.getScene().add(tree);
            tree.scale.setX(tree.scale.x + Math.round(Math.random() * 10) / 20);
            tree.scale.setY(tree.scale.y + Math.round(Math.random() * 10) / 20);
            tree.scale.setZ(tree.scale.z + Math.round(Math.random() * 10) / 20);

            tree.rotateY(Math.PI * Math.random());

            tree.position.x = Math.round(Math.random() * 100) - 50;
            if (Math.random() > 0.5) {
                tree.position.z = Math.round(Math.random() * 25) - 25;
            } else {
                tree.position.z = Math.round(Math.random() * 25) + 10;
            }
        }
    };

    private generateGround = async (): Promise<void> => {
        const oneAreaSize = 13;
        const grass = await ModelLoader.loadFBX(
            `assets/models/forest/rpgpp_lt_terrain_grass_02.fbx`,
            {
                receiveShadow: true,
            }
        );
        await TextureSetter.setTexture(grass, this.texture);

        for (let i = -10; i <= 10; i++) {
            for (let j = -10; j <= 10; j++) {
                const newGrass = grass.clone();
                // newGrass.scale.setY(Math.random() + 0.1);
                newGrass.position.setX(i * oneAreaSize);
                newGrass.position.setZ(j * oneAreaSize);
                window.game.getScene().add(newGrass);
            }
        }
    };
}
