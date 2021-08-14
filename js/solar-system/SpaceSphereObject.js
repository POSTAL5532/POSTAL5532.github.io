import * as THREE from "../three.module.js";
import {RotatableObject} from "./RotatableObject.js";

const {SphereGeometry, MeshPhongMaterial, Mesh} = THREE;

export class SpaceSphereObject extends RotatableObject {

    sphereGeometry;

    constructor(radius, widthSegments = 6, heightSegments = 6, color, emissive, material) {
        super();
        this.initSphereGeometry(radius, widthSegments, heightSegments, color, emissive, material);
    }

    initSphereGeometry = (radius, widthSegments, heightSegments, color, emissive, material) => {
        const geometry = new SphereGeometry(radius, widthSegments, heightSegments);
        const resultMaterial = material ? material : this.getMeshPhongMaterial(color, emissive);

        this.sphereGeometry = new Mesh(geometry, resultMaterial);
    }

    getMeshPhongMaterial(color, emissive) {
        const material = new MeshPhongMaterial();

        if (color) {
            material.setValues({color});
        }

        if (emissive) {
            material.setValues({emissive});
        }

        return material
    }

    getObject = () => {
        return this.sphereGeometry;
    }
}