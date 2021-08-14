import * as THREE from "../../../three.module.js";
import {Planet} from "../Planet.js";
import {Moon} from "./Moon.js";

const {MeshBasicMaterial, TextureLoader} = THREE;

export const MOON_SATELLITE_NAME = "moon";

export class Earth extends Planet {

    constructor() {
        super(40, 24, 24, "#2233FF", "#112244");
        this.initEarthSystem();
    }

    getMeshPhongMaterial(color, emissive) {
        const loader = new TextureLoader();
        return new MeshBasicMaterial({map: loader.load("images/solar-system/earth_texture.jpg")});
    }

    initEarthSystem = () => {
        const moon = new Moon();
        const result = this.addSatellite(moon, 80, MOON_SATELLITE_NAME);
        result.satelliteOrbit.inverseRotation = true;
        result.satelliteOrbit.rotationSpeed = 0.03;
    }

    getMoonSatellite = () => {
        return this.getSatellite(MOON_SATELLITE_NAME);
    }
}
