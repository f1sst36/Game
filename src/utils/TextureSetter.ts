import {DataTexture, Group, Mesh} from "three";

export class TextureSetter {
    public static setTexture = (object: Group, texture: DataTexture) => {
        return new Promise((resolve, _) => {
            object.traverse((node) => {
                if (node instanceof Mesh) {
                    node.material.map = texture;
                    resolve('success');
                    // TODO node.material.shininess = 0 - наверное не лучшая идея
                    node.material.shininess = 0
                }
            });
        })
    }
}