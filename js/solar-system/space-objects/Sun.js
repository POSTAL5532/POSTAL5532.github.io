import * as THREE from "../../three.module.js";
import {SpaceSphereObject} from "../SpaceSphereObject.js";

const {MeshBasicMaterial, MeshPhongMaterial, TextureLoader} = THREE;

export class Sun extends SpaceSphereObject {

    constructor() {
        super(100, 24, 24, undefined, "#FFFF00");
    }

    getMeshPhongMaterial(color, emissive) {
        const loader = new TextureLoader();
        return new MeshBasicMaterial({map: loader.load("images/solar-system/sun_texture.jpg")});
    }

    animate = () => {
        this.getObject().rotation.y += 0.001;
    }
}