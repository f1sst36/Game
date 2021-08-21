import { DirectionalLight, HemisphereLight } from 'three';
import { ShadowMapSize } from '../constants/shadow';

export class Light {
    public static initCommonLight = (): void => {
        const light = new DirectionalLight(0xffffff, 1);
        // const light = new HemisphereLight(0xB1E1FF, 0x241608, 1);
        light.position.set(0, 10, 5);

        light.castShadow = true;

        // Прямоугольник от излучаемого света в котором будут тени
        light.shadow.camera.right = 10;
        light.shadow.camera.left = -10;
        light.shadow.camera.top = 10;
        light.shadow.camera.bottom = -10;

        // Качество теней
        light.shadow.mapSize.width = ShadowMapSize.width;
        light.shadow.mapSize.height = ShadowMapSize.height;

        window.game.getScene().add(light);
    };
}
