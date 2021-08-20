import * as THREE from "../../../three.module.js";
import {Planet} from "../Planet.js";
import {Moon} from "./Moon.js";

const {MeshPhongMaterial, TextureLoader, Color} = THREE;

export const MOON_SATELLITE_NAME = "moon";

export class Earth extends Planet {

    constructor() {
        super(40, 24, 24, "#2233FF", "#112244");
        this.initEarthSystem();
    }

    getMeshPhongMaterial(color, emissive) {
        const loader = new TextureLoader();
        const material = new MeshPhongMaterial();
        material.map = loader.load("images/solar-system/earth_texture.jpg");
        material.bumpMap = loader.load("images/solar-system/earth_texture_bump.jpg");
        material.bumpScale = 2;
        material.specularMap = THREE.ImageUtils.loadTexture("images/solar-system/earth_texture_specular.jpg")
        material.specular = new Color("grey")

        return material;
    }

    initEarthSystem = () => {
        this.addSatellite(new Moon(), 80, MOON_SATELLITE_NAME);
    }

    getMoonSatellite = () => {
        return this.getSatellite(MOON_SATELLITE_NAME);
    }

    animate = () => {
        this.getObject().rotation.y += 0.002;
        const moon = this.getMoonSatellite();
        moon.satelliteOrbit.getObject().rotation.y -= 0.004;
        moon.satellite.getObject().rotation.y += 0.002;
    }
}
