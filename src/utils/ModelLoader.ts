import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Group, Mesh } from 'three';

export class ModelLoader {
    public static loadFBX = async (path: string): Promise<Group> => {
        return new Promise((resolve, reject) => {
            const loader = new FBXLoader();
            loader.load(
                path,
                (object) => {
                    object.traverse((child) => {
                        if (child instanceof Mesh) {
                            child.geometry.computeVertexNormals();
                        }
                    });
                    resolve(object);
                },
                undefined,
                (error) => {
                    reject(error);
                }
            );
        });
    };
}
