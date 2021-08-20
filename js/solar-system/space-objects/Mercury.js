import {Planet} from "./Planet.js";

export class Mercury extends Planet {

    constructor() {
        super(20, 12, 12, "#261806", "#110a01");
    }

    animate = () => {
        this.getObject().rotation.y += 0.002;
    }
}
