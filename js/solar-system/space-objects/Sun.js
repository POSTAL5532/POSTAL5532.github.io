import {SpaceSphereObject} from "../SpaceSphereObject.js";

export class Sun extends SpaceSphereObject {

    constructor() {
        super(100, 12, 12, undefined, "#FFFF00");
        this.rotationSpeed = 0.003;
    }
}