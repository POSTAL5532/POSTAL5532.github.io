import * as THREE from "../three.module.js";

const {Scene, WebGLRenderer, PerspectiveCamera} = THREE;

export class SceneEnvironment {

    scene;

    camera;

    renderer;

    animateCallback;

    constructor(animateCallback) {
        this.animateCallback = animateCallback;
        this.init();
    }

    init = () => {
        this.scene = new Scene();
        this.initRenderer();
        this.initCamera();

        document.body.appendChild(this.renderer.domElement);
        this.animate();
    }

    initRenderer = () => {
        const canvas = document.querySelector("#canvas");
        this.renderer = new WebGLRenderer({canvas});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initCamera = () => {
        this.camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 100, 0);
        this.camera.up.set(0, 0, 1);
        this.camera.lookAt(0, 0, 0);
    }

    addToScene = (object) => {
        this.addNativeToScene(object.getObject());
    }

    addNativeToScene = (object) => {
        this.scene.add(object);
    }

    animate = () => {
        !!this.animateCallback && this.animateCallback();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }
}