import {Planet} from "../Planet.js";
import {Deimos} from "./Deimos.js";
import {Phobos} from "./Phobos.js";

export const DEIMOS_SATELLITE_NAME = "deimos";
export const PHOBOS_SATELLITE_NAME = "phobos";

export class Mars extends Planet {

    constructor() {
        super(30, 12, 12, "#58482a", "#3d230c");
        this.initMarsSystem();
    }

    initMarsSystem = () => {
        const deimos = new Deimos();
        this.addSatellite(deimos, 80, DEIMOS_SATELLITE_NAME, 30);

        const phobos = new Phobos();
        this.addSatellite(phobos, 60, PHOBOS_SATELLITE_NAME, 60);
    }

    getDeimosSatellite = () => {
        return this.getSatellite(DEIMOS_SATELLITE_NAME);
    }

    getPhobosSatellite = () => {
        return this.getSatellite(PHOBOS_SATELLITE_NAME);
    }

    animate = () => {
        this.getObject().rotation.y += 0.01;

        const deimos = this.getDeimosSatellite();
        deimos.satelliteOrbit.getObject().rotation.y += 0.002;
        deimos.satellite.getObject().rotation.y += 0.002;

        const phobos = this.getPhobosSatellite();
        phobos.satelliteOrbit.getObject().rotation.y -= 0.002;
        phobos.satellite.getObject().rotation.y += 0.002;
    }
}
