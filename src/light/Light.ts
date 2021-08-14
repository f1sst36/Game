import { PointLight } from 'three';

export class Light {
    public static initCommonLight = (): void => {
        const light = new PointLight(0xffffff, 1, 1000);
        light.position.set(0, 10, 10);
        window.game.getScene().add(light);
    };
}
