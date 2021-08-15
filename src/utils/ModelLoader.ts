import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader";
import {Group} from "three";

export class ModelLoader {
    public static loadFBX = async (path: string): Promise<Group> => {
        return new Promise((resolve, reject) => {
            const loader = new FBXLoader();
            loader.load(path, (object) => {
                resolve(object);
            }, undefined, (error) => {
                reject(error);
            });
        })
    }
}