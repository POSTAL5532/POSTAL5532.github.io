import {Planet} from "../Planet.js";
import {Deimos} from "./Deimos.js";
import {Phobos} from "./Phobos.js";

export const DEIMOS_SATELLITE_NAME = "deimos";
export const PHOBOS_SATELLITE_NAME = "phobos";

export class Mars extends Planet {

    constructor() {
        super(30, 12, 12, "#58482a", "#3d230c");
        this.initEarthSystem();
    }

    initEarthSystem = () => {
        const deimos = new Deimos();
        const deimosResult = this.addSatellite(deimos, 80, DEIMOS_SATELLITE_NAME, 30);
        deimosResult.satelliteOrbit.inverseRotation = false;
        deimosResult.satelliteOrbit.rotationSpeed = 0.01;

        const phobos = new Phobos();
        const phobosResult = this.addSatellite(phobos, 60, PHOBOS_SATELLITE_NAME, 60);
        phobosResult.satelliteOrbit.inverseRotation = true;
        phobosResult.satelliteOrbit.rotationSpeed = 0.02;
    }

    getDeimosSatellite = () => {
        return this.getSatellite(DEIMOS_SATELLITE_NAME);
    }

    getPhobosSatellite = () => {
        return this.getSatellite(PHOBOS_SATELLITE_NAME);
    }
}
