import * as THREE from "../three.module.js";
import {RotatableObject} from "./RotatableObject.js";

const {Object3D, BufferGeometry, LineBasicMaterial, Line, Path, GridHelper} = THREE;

export class Orbit extends RotatableObject {

    orbit = new Object3D();

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
        path.absellipse(0, 0, radius, radius, 0, 6.28, false, 0);

        const geometry = new BufferGeometry().setFromPoints(path.getPoints());
        const material = new LineBasicMaterial({color: "#6f6f6f"});
        const line = new Line(geometry, material);
        line.rotateX(1.57)

        return line;
    }
}

/*const grid = new THREE.GridHelper(200, 10);
grid.material.depthTest = false;
grid.visible = true;
this.orbit.add(grid);*/
