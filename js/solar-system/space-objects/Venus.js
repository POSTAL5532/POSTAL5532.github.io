import * as THREE from "../../three.module.js";
import {Planet} from "./Planet.js";

const {TextureLoader} = THREE;

export class Venus extends Planet {

    constructor() {
        super(30, 36, 36);
    }

    getMeshPhongMaterial(color, emissive) {
        const material = super.getMeshPhongMaterial();
        const loader = new TextureLoader();
        material.map = loader.load("images/solar-system/venus_map.jpg");
        material.bumpMap = loader.load("images/solar-system/venus_bump.jpg");
        material.bumpScale = 0.4;

        return material;
    }

    animate = () => {
        this.getObject().rotation.y += 0.002;
    }
}
