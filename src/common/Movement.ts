import { Ground } from '../entities/Ground';
import { Intersection, Raycaster, Vector2, Vector3 } from 'three';
import { Entity } from './Entity';

export class Movement {
    private groundIntersect: Intersection | null = null;
    private ground: Ground;
    private movableEntity: Entity;
    private readonly moveSpeed: number;

    constructor(movableEntity: Entity, ground: Ground, moveSpeed: number) {
        this.movableEntity = movableEntity;
        this.ground = ground;
        this.moveSpeed = moveSpeed;

        this.setMovement();
    }

    private setMovement = () => {
        document.addEventListener('mouseup', (event: any) => {
            this.getIntersectWithGround(event);
        });
    };

    private getIntersectWithGround = (event: any): void => {
        const raycaster = new Raycaster();
        const click = new Vector2();

        click.x = (event.clientX / window.innerWidth) * 2 - 1;
        click.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(click, window.game.getCamera());

        this.groundIntersect = raycaster.intersectObjects([this.ground.getSelf()])[0];
    };

    public movementUpdate = () => {
        if (!this.groundIntersect) return;

        const position: Vector3 = this.movableEntity.getSelf().position;
        const point = this.groundIntersect.point;

        const positionX = position.x;
        const pointX = point.x;
        const positionZ = position.z;
        const pointZ = point.z;

        if (position.x === point.x && position.z === point.z) return;

        const isNearToCorrectXPosition =
            (pointX >= 0 && positionX > pointX && positionX - this.moveSpeed <= pointX) ||
            (positionX < pointX && positionX + this.moveSpeed >= pointX);

        const isNearToCorrectZPosition =
            (pointZ >= 0 && positionZ > pointZ && positionZ - this.moveSpeed <= pointZ) ||
            (positionZ < pointZ && positionZ + this.moveSpeed >= pointZ);

        if (isNearToCorrectXPosition) position.x = point.x;
        if (isNearToCorrectZPosition) position.z = point.z;

        if (position.x !== point.x)
            position.x > point.x ? (position.x -= this.moveSpeed) : (position.x += this.moveSpeed);
        if (position.z !== point.z)
            position.z > point.z ? (position.z -= this.moveSpeed) : (position.z += this.moveSpeed);
    };
}
