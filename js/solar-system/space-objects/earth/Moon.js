import * as THREE from "../../../three.module.js";
import {SpaceSphereObject} from "../../SpaceSphereObject.js";

const {TextureLoader} = THREE;

export class Moon extends SpaceSphereObject {

    constructor() {
        super(10, 36, 36);
    }

    getMeshPhongMaterial(color, emissive) {
        const material = super.getMeshPhongMaterial();
        const loader = new TextureLoader();
        material.map = loader.load("images/solar-system/moon_map.jpg");
        material.bumpMap = loader.load("images/solar-system/moon_bump.jpg");
        material.bumpScale = 0.1;

        return material;
    }
}