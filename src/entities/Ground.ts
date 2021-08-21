import { Entity } from '../common/Entity';
import {
    BufferAttribute,
    BufferGeometry,
    DoubleSide,
    Mesh,
    MeshBasicMaterial,
    MeshLambertMaterial,
    MeshPhongMaterial,
    PlaneGeometry,
    RepeatWrapping,
    sRGBEncoding,
    TextureLoader,
} from 'three';

export class Ground extends Entity {
    protected self: any;

    constructor() {
        super();
        // const loader = new TextureLoader();

        // const groundTexture = loader.load('assets/images/ground/grass-texture.jpg');
        // groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
        // groundTexture.repeat.set(25, 25);
        // groundTexture.anisotropy = 16;
        // groundTexture.encoding = sRGBEncoding;

        // const groundMaterial = new MeshPhongMaterial({ color: '#5f9130' });
        // const groundGeometry = new PlaneGeometry(2000, 2000);
        // groundGeometry.computeFlatVertexNormals();

        const geometry = new BufferGeometry();
        // create a simple square shape. We duplicate the top left and bottom right
        // vertices because each vertex needs to appear once per triangle.
        const vertices = new Float32Array( [
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,

            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0,
        ] );

        // itemSize = 3 because there are 3 values (components) per vertex
        geometry.setAttribute( 'position', new BufferAttribute( vertices, 3 ) );
        const material = new MeshBasicMaterial( { color: 0xff0000, side: DoubleSide } );
        // const mesh = new Mesh( geometry, material );

        this.self = new Mesh(geometry, material);
       
        this.self.name = 'ground';

        this.self.rotation.x = +(-Math.PI / 2);

        this.self.position.x = 0;
        this.self.position.y = 0;
        this.self.position.z = 0;

        this.self.receiveShadow = true;

        window.game.initEntity(this);
    }

    protected update = () => {
        //
    };
}
