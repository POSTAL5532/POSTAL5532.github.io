import * as THREE from "../../three.module.js";
import {Planet} from "./Planet.js";

const {TextureLoader} = THREE;

export class Mercury extends Planet {

    constructor() {
        super(20, 36, 36);
    }

    getMeshPhongMaterial(color, emissive) {
        const material = super.getMeshPhongMaterial();
        const loader = new TextureLoader();
        material.map = loader.load("images/solar-system/mercury_map.jpg");
        material.bumpMap = loader.load("images/solar-system/mercury_bump.jpg");
        material.bumpScale = 0.1;

        return material;
    }

    animate = () => {
        this.getObject().rotation.y += 0.002;
    }
}
