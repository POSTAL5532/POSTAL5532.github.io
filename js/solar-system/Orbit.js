import * as THREE from "../three.module.js";
import {RotatableObject} from "./RotatableObject.js";

const {Object3D, BufferGeometry, LineBasicMaterial, Line, Path, GridHelper} = THREE;

export class Orbit extends RotatableObject {

    orbit = new Object3D();

    rotationSpeed = 0.01;

    addObject = (object, offset, showOrbit) => {
        const nativeObject = object.getObject();
        this.orbit.add(nativeObject);

        if (showOrbit) {
            this.orbit.add(this.getOrbitCircle(offset));
        }

        nativeObject.position.x = offset;
    }

    getObject = () => {
        return this.orbit;
    }

    getOrbitCircle = (radius) => {
        const path = new Path();
        path.absarc(0, 0, radius, 0, 6.28, false);

        const geometry = new BufferGeometry().setFromPoints(path.getPoints(48));
        const material = new LineBasicMaterial({color: "#6f6f6f"});
        const line = new Line(geometry, material);
        line.rotateX(1.57)

        return line;
    }

    animate = () => {
        this.getObject().rotation.y += this.rotationSpeed;
    }
}

/*const grid = new THREE.GridHelper(200, 10);
grid.material.depthTest = false;
grid.visible = true;
this.orbit.add(grid);*/
