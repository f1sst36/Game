import {PerspectiveCamera, Scene, WebGLRenderer, XRAnimationLoopCallback} from 'three';
import {EntityStore} from './stores/EntityStore';
import {Entity} from './Entity';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export class Game {
    private readonly scene: Scene;
    private readonly camera: PerspectiveCamera;
    private readonly renderer: WebGLRenderer;
    private readonly controls: OrbitControls;

    public entityStore: EntityStore;

    constructor() {
        this.entityStore = new EntityStore();

        this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000);
        this.camera.position.x = -5;
        this.camera.position.y = 4;
        this.camera.position.z = 14;
        this.camera.rotateX(5);

        // this.camera.position.set(0, 1, 0);

        this.scene = new Scene();

        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setAnimationLoop(this.animationLoop);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    private animationLoop: XRAnimationLoopCallback = (time: number) => {
        const entities = this.entityStore.getEntities();

        for (let i = 0; i < entities.length; i++) {
            entities[i].executeUpdate(time);
        }

        // this.controls.update();
        this.renderer.render(this.scene, this.camera);
    };

    public initEntity = (entity: Entity) => {
        this.entityStore.addEntity(entity);
        this.scene.add(entity.getSelf());
    };

    public getScene = () => this.scene;

    public getCamera = () => this.camera;

    public stop = () => {
        console.log('The game is stopped');
        this.renderer.setAnimationLoop(null);
    };
}
