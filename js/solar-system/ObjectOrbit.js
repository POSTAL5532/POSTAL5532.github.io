import * as THREE from "../three.module.js";
import {Native3DObject} from "./Native3DObject.js";

const {Object3D} = THREE;

export class ObjectOrbit extends Native3DObject {

    rotationSpeed = 0.006;

    orbitObject = new Object3D();

    addObject = (object, offset) => {
        const nativeObject = object.getObject();
        this.orbitObject.add(nativeObject);
        nativeObject.position.x = offset;
    }

    getObject = () => {
        return this.orbitObject;
    }

    rotateObjectY = () => {
        this.getObject().rotation.y += this.rotationSpeed;
    }
}
