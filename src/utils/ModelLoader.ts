import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Group, Mesh } from 'three';
import { Exception } from '../common/exceptions/Exception';

interface loadFBXOptions {
    castShadow?: boolean;
    receiveShadow?: boolean;
}

export class ModelLoader {
    public static loadFBX = async (
        path: string,
        options: loadFBXOptions = {
            castShadow: false,
            receiveShadow: false,
        }
    ): Promise<Group> => {
        return new Promise((resolve, reject) => {
            const loader = new FBXLoader();
            loader.load(
                path,
                (object) => {
                    object.traverse((child) => {
                        if (child instanceof Mesh) {
                            child.geometry.computeVertexNormals();
                            child.castShadow = !!options.castShadow;
                            child.receiveShadow = !!options.receiveShadow;
                        }
                    });
                    resolve(object);
                },
                undefined,
                (error) => {
                    Exception.throwExceptionWithCrush('Cannot load the model');
                    reject(error);
                }
            );
        });
    };
}
