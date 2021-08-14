import {BoxGeometry, Mesh, MeshLambertMaterial, Vector3} from 'three';
import {Entity} from '../common/Entity';

export class Cube extends Entity {
    private isMovedForward = false;
    private direction = new Vector3(1, 0, 0);
    private readonly moveSpeed = 0.1;

    protected self: Mesh;

    constructor() {
        super();

        const geometry = new BoxGeometry(0.2, 0.2, 0.2);
        const material = new MeshLambertMaterial();

        this.self = new Mesh(geometry, material);

        this.self.position.x = 0;
        this.self.position.y = 1;
        window.game.initEntity(this);

        console.log('start');

        document.addEventListener('mousedown', () => {
            this.isMovedForward = true;
        });

        document.addEventListener('mouseup', () => {
            this.isMovedForward = false;
        });
    }

    protected update = () => {
        // this.self.rotation.x += 0.1;
        // this.self.rotation.y = time / 100;

        if (this.isMovedForward) {
            this.self.translateOnAxis(this.direction, this.moveSpeed);
            // this.self.position.x += this.moveSpeed;
        }

        // window.game.getCamera().position.set(this.self.position.x, 2, this.self.position.z);
    };
}
