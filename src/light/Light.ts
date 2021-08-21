import { DirectionalLight, HemisphereLight } from 'three';

export class Light {
    public static initCommonLight = (): void => {
        // const light = new DirectionalLight(0xffffff, 1);
        const light = new HemisphereLight(0xffffff, 0x241608, 1);
        light.position.set(0, 10, 10);
        window.game.getScene().add(light);
    };
}
