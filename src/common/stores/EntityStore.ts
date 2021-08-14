import { Entity } from '../Entity';
import { Exception } from '../exceptions/Exception';

export class EntityStore {
    private readonly entities: Entity[];

    constructor() {
        this.entities = [];
    }

    public addEntity = (entity: Entity): void => {
        if (this.entities.includes(entity))
            Exception.throwExceptionWithCrush('This entity already in the EntityStore');
        this.entities.push(entity);
    };

    public getEntities = (): Entity[] => {
        return this.entities;
    };
}
