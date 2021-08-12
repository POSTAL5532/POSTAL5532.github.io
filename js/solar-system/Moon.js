import {SolarSystemObject} from "./SolarSystemObject.js";

export class Moon extends SolarSystemObject {

    constructor() {
        super(1, 12, 12, "#888888", "#222222");
    }
}