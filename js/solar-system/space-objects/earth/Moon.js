import {SpaceSphereObject} from "../../SpaceSphereObject.js";

export class Moon extends SpaceSphereObject {

    constructor() {
        super(15, 12, 12, "#888888", "#222222");
        this.getObject().name = "moon";
    }
}