import * as THREE from "../../../three.module.js";
import {Planet} from "../Planet.js";
import {Moon} from "./Moon.js";
import {createAtmosphereMaterial} from "../../utils.js";

const {TextureLoader, Color, SphereGeometry, DoubleSide, Mesh} = THREE;

export const MOON_SATELLITE_NAME = "moon";

export class Earth extends Planet {

    clouds;

    constructor() {
        super(40, 36, 36);
        this.initEarthSystem();
    }

    getMeshPhongMaterial(color, emissive) {
        const material = super.getMeshPhongMaterial();
        const loader = new TextureLoader();
        material.map = loader.load("images/solar-system/earth_texture.jpg");
        material.bumpMap = loader.load("images/solar-system/earth_texture_bump.jpg");
        material.bumpScale = 2;
        material.specularMap = loader.load("images/solar-system/earth_texture_specular.jpg")
        material.specular = new Color("grey")

        return material;
    }

    initEarthSystem = () => {
        this.addSatellite(new Moon(), 80, MOON_SATELLITE_NAME);
        this.addClouds();
        this.addGlow();
    }

    addClouds = () => {
        const loader = new TextureLoader();
        const cloudsGeometry = new SphereGeometry(41, 36, 36);

        const cloudsMaterial = super.getMeshPhongMaterial();
        cloudsMaterial.map = loader.load("images/solar-system/earth_atmosphere_texture.png");
        cloudsMaterial.side = DoubleSide;
        cloudsMaterial.opacity = 0.8;
        cloudsMaterial.transparent = true;
        cloudsMaterial.depthWrite = false;

        this.clouds = new Mesh(cloudsGeometry, cloudsMaterial);
        this.getPlanetObject().add(this.clouds);
    }

    addGlow = () => {
        let geometry = new SphereGeometry(41, 36, 36)
        let material = createAtmosphereMaterial()
        material.side	= THREE.BackSide
        material.uniforms.glowColor.value.set(0x00b3ff)
        material.uniforms.coeficient.value	= 0.5
        material.uniforms.power.value		= 4.0
        let mesh = new Mesh(geometry, material);
        mesh.scale.multiplyScalar(1.05);

        this.getObject().add(mesh);
    }

    getMoonSatellite = () => {
        return this.getSatellite(MOON_SATELLITE_NAME);
    }

    animate = () => {
        this.getPlanetObject().rotation.y += 0.002;
        this.clouds.rotation.y += 0.001;
        const moon = this.getMoonSatellite();
        moon.satelliteOrbit.getObject().rotation.y -= 0.002;
        moon.satellite.getObject().rotation.y += 0.007;
    }
}
