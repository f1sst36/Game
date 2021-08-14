import { PerspectiveCamera, Scene, WebGLRenderer, XRAnimationLoopCallback } from 'three';
import { EntityStore } from './stores/EntityStore';
import { Entity } from './Entity';

export class Game {
    private readonly scene: Scene;
    private readonly camera: PerspectiveCamera;
    private readonly renderer: WebGLRenderer;

    public entityStore: EntityStore;

    constructor() {
        this.entityStore = new EntityStore();

        this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
        this.camera.position.z = 2;

        this.scene = new Scene();

        console.log('zxccvnbmbnm')

        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setAnimationLoop(this.animationLoop);
        document.body.appendChild(this.renderer.domElement);
    }

    private animationLoop: XRAnimationLoopCallback = (time: number) => {
        const entities = this.entityStore.getEntities();

        for (let i = 0; i < entities.length; i++) {
            entities[i].executeUpdate(time);
        }

        this.renderer.render(this.scene, this.camera);
    };

    public initEntity = (entity: Entity) => {
        this.entityStore.addEntity(entity);
        this.scene.add(entity.getSelf());
    };

    public getScene = () => this.scene;

    public getCamera = () => this.camera;

    public stop = () => {
        this.renderer.setAnimationLoop(null);
    };
}
