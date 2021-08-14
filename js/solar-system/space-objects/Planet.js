import * as THREE from "../../three.module.js";
import {SpaceSphereObject} from "../SpaceSphereObject.js";
import {Orbit} from "../Orbit.js";

const {Object3D} = THREE;

export class Planet extends SpaceSphereObject {

    planetSystem = new Object3D();

    satellites = new Map();

    constructor(radius, widthSegments, heightSegments, color, emissive, material) {
        super(radius, widthSegments, heightSegments, color, emissive, material);
        this.planetSystem.add(this.sphereGeometry);
    }

    addSatellite = (satellite, offset, satelliteName, radialOffset) => {
        const newOrbit = new Orbit();
        newOrbit.addObject(satellite, offset);

        if (radialOffset) {
            newOrbit.getObject().rotation.y = radialOffset;
        }

        this.planetSystem.add(newOrbit.getObject());
        const result = {satellite, satelliteOrbit: newOrbit};
        this.satellites.set(satelliteName, result);
        return result;
    }

    getObject = () => {
        return this.planetSystem;
    }

    getPlanetObject = () => {
        return this.sphereGeometry;
    }

    getSatellite = (name) => {
        return this.satellites.get(name);
    }
}
