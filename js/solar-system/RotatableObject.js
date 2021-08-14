import {Native3DObject} from "./Native3DObject.js";

export class RotatableObject extends Native3DObject {

    rotationSpeed = 0.01;

    inverseRotation = false;

    rotateObjectY = () => {
        if (!this.inverseRotation) {
            this.getObject().rotation.y += this.rotationSpeed;
        } else {
            this.getObject().rotation.y -= this.rotationSpeed;
        }
    }

}