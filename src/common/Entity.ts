export abstract class Entity {
    protected abstract self: any;

    public executeUpdate = (time: number) => this.update(time);
    protected abstract update: (time: number) => void;

    public getSelf = () => this.self;
}
