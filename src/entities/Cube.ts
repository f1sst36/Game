import { BoxGeometry, Mesh, MeshLambertMaterial } from 'three';
import { Entity } from '../common/Entity';
import { Movement } from '../common/Movement';
import { Ground } from './Ground';

export class Cube extends Entity {
    protected self: Mesh;
    private movement: Movement;

    constructor(ground: Ground) {
        super();

        const geometry = new BoxGeometry(2, 2, 2);
        const material = new MeshLambertMaterial();

        this.self = new Mesh(geometry, material);

        this.self.castShadow = true;
        this.self.receiveShadow = true;

        this.self.position.x = 0;
        this.self.position.y = 0.3;
        window.game.initEntity(this);

        this.movement = new Movement(this, ground, 0.2);

        console.log('start');
    }

    protected update = () => {
        this.movement.movementUpdate();
        // window.game.getCamera().position.set(this.self.position.x, 20, this.self.position.z + 20);
        // window.game.getCamera().rotation.x = 5.5;
    };
}
