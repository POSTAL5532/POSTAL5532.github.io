import * as THREE from "../three.module.js";
import {Native3DObject} from "./Native3DObject.js";

const {SphereGeometry, MeshPhongMaterial, Mesh} = THREE;

export class SolarSystemObject extends Native3DObject{

    rotationSpeed = 0.01;

    sphereGeometry;

    constructor(radius, widthSegments = 6, heightSegments = 6, color, emissive) {
        super();
        this.initSphereGeometry(radius, widthSegments, heightSegments, color, emissive);
    }

    initSphereGeometry = (radius, widthSegments, heightSegments, color, emissive) => {
        const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
        const material = new MeshPhongMaterial();

        if (color) {
            material.setValues({color});
        }

        if (emissive) {
            material.setValues({emissive});
        }

        this.sphereGeometry = new Mesh(geometry, material);
    }

    getObject = () => {
        return this.sphereGeometry;
    }

    rotateObjectY = () => {
        this.getObject().rotation.y += this.rotationSpeed;
    }
}