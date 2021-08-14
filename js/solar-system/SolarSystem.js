import * as THREE from "../three.module.js";
import {SceneEnvironment} from "./SceneEnvironment.js";
import {Sun} from "./space-objects/Sun.js";
import {Orbit} from "./Orbit.js";
import {Earth} from "./space-objects/earth/Earth.js";
import {Venus} from "./space-objects/Venus.js";
import {Mercury} from "./space-objects/Mercury.js";
import {Mars} from "./space-objects/mars/Mars.js";

const {PointLight} = THREE;

export class SolarSystem {

    sceneEnvironment;

    objectsToRotation = [];

    init = () => {
        this.sceneEnvironment = new SceneEnvironment(this.rotateObjects);
        this.prepareSystemObjects();
        this.sceneEnvironment.animate();
    }

    prepareSystemObjects = () => {
        this.addSun();
        this.addEarth();
        this.addVenus();
        this.addMercury();
        this.addMars();
    }

    addSun = () => {
        this.addToSceneAndObjects(new Sun());
        this.sceneEnvironment.addNativeToScene(new PointLight("#FFFFFF", 3));
    }

    addMercury = () => {
        const mercury = new Mercury();
        const orbit = this.addPlanet(mercury, 200, 0.01, 35);

        this.addToSceneAndObjects(orbit);
        this.objectsToRotation.push(mercury);
    }

    addVenus = () => {
        const venus = new Venus();
        const orbit = this.addPlanet(venus, 400, 0.007, 60);

        this.addToSceneAndObjects(orbit);
        this.objectsToRotation.push(venus);
    }

    addEarth = () => {
        const earth = new Earth();
        const moonSatellite = earth.getMoonSatellite();
        const orbit = this.addPlanet(earth, 600, 0.005);

        this.addToSceneAndObjects(orbit);
        this.objectsToRotation.push(earth, moonSatellite.satelliteOrbit, moonSatellite.satellite);
    }

    addMars = () => {
        const mars = new Mars();
        const deimosSatellite = mars.getDeimosSatellite();
        const phobosSatellite = mars.getPhobosSatellite()
        const orbit = this.addPlanet(mars, 800, 0.005, 90);

        this.addToSceneAndObjects(orbit);
        this.objectsToRotation.push(
            mars,
            deimosSatellite.satelliteOrbit,
            deimosSatellite.satellite,
            phobosSatellite.satelliteOrbit,
            phobosSatellite.satellite
        );
    }

    addPlanet = (planet, offset, rotationSpeed, radialOffset) => {
        const orbit = new Orbit();
        orbit.addObject(planet, offset, true);
        orbit.rotationSpeed = rotationSpeed;

        if (radialOffset) {
            orbit.getObject().rotation.y = radialOffset;
        }

        return orbit;
    }

    addToSceneAndObjects = (...objects) => {
        objects.forEach(object => {
            this.sceneEnvironment.addToScene(object);
            this.objectsToRotation.push(object);
        })
    }

    rotateObjects = () => {
        this.objectsToRotation.forEach(object => {
            object.rotateObjectY();
        })
    }
}