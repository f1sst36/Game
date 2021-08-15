import {Entity} from "../common/Entity";
import {
    Mesh,
    MeshLambertMaterial,
    PlaneGeometry,
    RepeatWrapping,
    sRGBEncoding,
    TextureLoader
} from "three";

export class Ground extends Entity {
    protected self: any;

    constructor() {
        super();
        const loader = new TextureLoader();

        const groundTexture = loader.load('assets/images/ground/stone-ground.png');
        groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
        groundTexture.repeat.set(25, 25);
        groundTexture.anisotropy = 16;
        groundTexture.encoding = sRGBEncoding;

        const groundMaterial = new MeshLambertMaterial({map: groundTexture});

        this.self = new Mesh(new PlaneGeometry(20, 20), groundMaterial);
        this.self.name = 'ground';

        this.self.rotation.x = (Number((-Math.PI / 2)));

        this.self.position.x = 0;
        this.self.position.y = 0;
        this.self.position.z = 0;

        this.self.receiveShadow = true;

        window.game.initEntity(this);
    }

    protected update = () => {
        //
    }
}


