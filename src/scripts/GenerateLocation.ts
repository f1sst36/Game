import { DataTexture } from 'three';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader';
import { ModelLoader } from '../utils/ModelLoader';
import { TextureSetter } from '../utils/TextureSetter';

export class GenerateLocation {
    private readonly texture: DataTexture;
    private readonly perimeter: number;

    constructor() {
        const loader = new TGALoader();
        this.texture = loader.load('assets/textures/tex_a.tga');
        this.perimeter = 70;
    }

    public init = async (): Promise<void> => {
        this.generateTrees();
        // this.generateGround();
        this.generateHills();
        this.generateProps();

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
        // const texture3 = loader.load('assets/textures/tex_a.tga');
        // await TextureSetter.setTexture(object3, texture3);

        // window.game.getScene().add(object3);
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

        const countOfTrees = 100;
        for (let i = 0; i < countOfTrees; i++) {
            const numberOfTree = Math.round(Math.random()) + 1;
            const tree = numberOfTree === 1 ? tree_01.clone() : tree_02.clone();

            window.game.getScene().add(tree);
            tree.scale.setX(tree.scale.x + Math.round(Math.random() * 10) / 20);
            tree.scale.setY(tree.scale.y + Math.round(Math.random() * 10) / 20);
            tree.scale.setZ(tree.scale.z + Math.round(Math.random() * 10) / 20);

            tree.rotateY(Math.PI * Math.random());

            tree.position.x =
                Math.round(Math.random() * this.perimeter * 4) - (this.perimeter * 4) / 2;
            tree.position.z =
                Math.round(Math.random() * this.perimeter * 4) - (this.perimeter * 4) / 2;
        }
    };

    private generateGround = async (): Promise<void> => {
        const grass = await ModelLoader.loadFBX(
            'assets/models/forest/rpgpp_lt_terrain_grass_02.fbx',
            {
                receiveShadow: true,
            }
        );
        await TextureSetter.setTexture(grass, this.texture);

        const spacing = 14;
        const from = -this.perimeter / 2;
        const to = this.perimeter / 2;
        for (let x = from; x <= to; x++) {
            for (let z = from; z <= to; z++) {
                const newGrass = grass.clone();
                newGrass.position.setX(x * spacing);
                newGrass.position.setZ(z * spacing);
                window.game.getScene().add(newGrass);
            }
        }
    };

    private generateHills = async (): Promise<void> => {
        const hill_1 = await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_hill_small_01.fbx');
        // const hill_2 = await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_hill_small_02.fbx');
        const hill_2 = await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_mountain_01.fbx');
        await TextureSetter.setTexture(hill_1, this.texture);
        await TextureSetter.setTexture(hill_2, this.texture);

        const spacing = 13;
        const from = -this.perimeter / 2;
        const to = this.perimeter / 2;
        for (let x = from; x <= to; x++) {
            for (let z = from; z <= to; z++) {
                if (
                    (x === from || x === to || z === from || z === to) &&
                    x % 5 === 0 &&
                    z % 5 === 0
                ) {
                    const newHill = Math.random() > 0.5 ? hill_1.clone() : hill_2.clone();
                    newHill.position.setX(x * spacing);
                    newHill.position.setZ(z * spacing);

                    newHill.scale.setX(0.9 + Math.random() * 0.3);
                    newHill.scale.setY(1.4 + Math.random());
                    newHill.scale.setZ(0.9 + Math.random() * 0.3);

                    newHill.rotateY(Math.PI * Math.random());

                    window.game.getScene().add(newHill);
                }
            }
        }
    };

    private generateProps = async (): Promise<void> => {
        const props = [
            await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_flower_01.fbx', {
                receiveShadow: true,
            }),
            await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_flower_02.fbx', {
                receiveShadow: true,
            }),
            await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_flower_03.fbx', {
                receiveShadow: true,
            }),
            await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_bush_01.fbx', {
                receiveShadow: true,
            }),
            await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_bush_02.fbx', {
                receiveShadow: true,
            }),
            await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_rock_01.fbx', {
                receiveShadow: true,
            }),
            await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_rock_02.fbx', {
                receiveShadow: true,
            }),
            await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_rock_03.fbx', {
                receiveShadow: true,
            }),
            await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_rock_small_01.fbx', {
                receiveShadow: true,
            }),
            await ModelLoader.loadFBX('assets/models/forest/rpgpp_lt_rock_small_02.fbx', {
                receiveShadow: true,
            }),
        ];

        props.forEach(async (prop) => {
            await TextureSetter.setTexture(prop, this.texture);
        })

        const spacing = 14;
        const from = -this.perimeter / 2;
        const to = this.perimeter / 2;
        for (let x = from; x <= to; x++) {
            for (let z = from; z <= to; z++) {
                if (!(x % 5 === 0 || z % 5 === 0)) continue;
                const newProp = props[Math.round(Math.random() * (props.length - 1))].clone();
                newProp.position.setX(x * spacing * Math.random());
                newProp.position.setZ(z * spacing * Math.random());
                window.game.getScene().add(newProp);
            }
        }
    };
}
