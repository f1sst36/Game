import {BoxGeometry, Mesh, MeshLambertMaterial} from 'three';
import {Entity} from '../common/Entity';

export class Cube extends Entity {
    private name: string;
    protected self: Mesh;
    private readonly moveSpeed: number;

    constructor() {
        super();
        this.name = 'cube' + Math.random();
        this.moveSpeed = 0.1;

        const geometry = new BoxGeometry(0.2, 0.2, 0.2);
        const material = new MeshLambertMaterial();

        this.self = new Mesh(geometry, material);

        this.self.position.x = 1;
        this.self.position.y = 1;
        window.game.initEntity(this);

        console.log('start');

        document.addEventListener('keydown', (e: Event | any) => {
            switch (e.key) {
                case "w":
                    this.self.position.x += this.moveSpeed;
                    break;
                case "s":
                    this.self.position.x -= this.moveSpeed;
                    break;
                case "a":
                    this.self.position.z -= this.moveSpeed;
                    break;
                case "d":
                    this.self.position.z += this.moveSpeed;
                    break;
                default:
                    break;
            }
        })
    }

    protected update = (time: number) => {
        this.self.rotation.x = time / 2000;
        this.self.rotation.y = time / 1000;

        window.game.getCamera().position.set(this.self.position.x, 2, this.self.position.z);
    };
}
