import {Planet} from "../Planet.js";
import {Moon} from "./Moon.js";

export const MOON_SATELLITE_NAME = "moon";

export class Earth extends Planet {

    constructor() {
        super(40, 12, 12, "#2233FF", "#112244");
        this.initEarthSystem();
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
