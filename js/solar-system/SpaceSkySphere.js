import * as THREE from "../three.module.js";
import {SpaceSphereObject} from "./SpaceSphereObject.js";

const {TextureLoader, MeshBasicMaterial, BackSide} = THREE;

export class SpaceSkySphere extends SpaceSphereObject {

    constructor() {
        super(10000, 24, 24);
    }


    getMeshPhongMaterial(color, emissive) {
        const loader = new TextureLoader();
        const material = new MeshBasicMaterial({map: loader.load("images/solar-system/space_skysphere_3.jpg")});
        material.side = BackSide;
        return material;
    }
}