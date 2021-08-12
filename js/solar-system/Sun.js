import {SolarSystemObject} from "./SolarSystemObject.js";

export class Sun extends SolarSystemObject {

    constructor() {
        super(5, 12, 12, undefined, "#FFFF00");
        this.rotationSpeed = 0.005;
    }
}