import * as THREE from "../three.module.js";
import {SceneEnvironment} from "./SceneEnvironment.js";
import {Sun} from "./Sun.js";
import {ObjectOrbit} from "./ObjectOrbit.js";
import {Earth} from "./Earth.js";
import {Moon} from "./Moon.js";

const {Scene, SphereGeometry, MeshPhongMaterial, Mesh, Vector3, WebGLRenderer, PerspectiveCamera, Object3D, PointLight} = THREE;

export class SolarSystem {

    sceneEnvironment;

    camera;

    renderer;

    objectsToRotation = [];

    init = () => {
        this.sceneEnvironment = new SceneEnvironment(this.rotateObjects);
        this.prepareSystemObjects();
        this.sceneEnvironment.animate();
    }

    prepareSystemObjects = () => {
        this.addSun();
        this.addEarth();

    }

    addSun = () => {
        this.addToSceneAndObjects(new Sun());
        this.sceneEnvironment.addNativeToScene(new PointLight("#FFFFFF", 3));
    }

    addEarth = () => {
        const earth = new Earth();
        const earthOrbit = new ObjectOrbit();
        earthOrbit.addObject(earth, 14);
        earthOrbit.rotationSpeed = 0.006;

        this.addToSceneAndObjects(earthOrbit);
        this.objectsToRotation.push(earth);

        this.addMoon(earth);
    }

    addMoon = (earth) => {
        const moon = new Moon();
        const moonOrbit = new ObjectOrbit();
        moonOrbit.addObject(moon, 4);

        earth.add(moonOrbit);

        this.objectsToRotation.push(moon);
        this.objectsToRotation.push(moonOrbit);
    }

    addToSceneAndObjects = (object) => {
        this.sceneEnvironment.addToScene(object);
        this.objectsToRotation.push(object);
    }

    rotateObjects = () => {
        this.objectsToRotation.forEach(object => {
            object.rotateObjectY();
        })
    }
}