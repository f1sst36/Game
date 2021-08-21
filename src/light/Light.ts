import { DirectionalLight, HemisphereLight } from 'three';
import { ShadowMapSize } from '../constants/shadow';

export class Light {
    public static initCommonLight = (): void => {
        const light = new DirectionalLight(0xffffff, 1);
        // const light = new HemisphereLight(0xB1E1FF, 0x241608, 1);
        light.position.set(0, 10, 5);

        light.castShadow = true;

        // Прямоугольник от излучаемого света в котором будут тени
        light.shadow.camera.right = 20;
        light.shadow.camera.left = -20;
        light.shadow.camera.top = 20;
        light.shadow.camera.bottom = -20;

        // Качество теней
        light.shadow.mapSize.width = ShadowMapSize.width;
        light.shadow.mapSize.height = ShadowMapSize.height;

        const shadowIntensity = 0.5;
        const light2 = light.clone();
        light2.castShadow = false;
        light.intensity = shadowIntensity;
        light2.intensity = 1 - shadowIntensity;

        // Два источника света - костыль для уменьшения интенсивности теней
        window.game.getScene().add(light);
        window.game.getScene().add(light2);
    };
}
