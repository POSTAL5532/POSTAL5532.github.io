import * as THREE from "../three.module.js";
import {OrbitControls} from "../OrbitControls.js";

const {Scene, WebGLRenderer, PerspectiveCamera} = THREE;

export class SceneEnvironment {

    scene;

    camera;

    renderer;

    animateCallback;

    controls;

    doeCustomAnimation = true;

    constructor(animateCallback) {
        this.animateCallback = animateCallback;
        this.init();
    }

    init = () => {
        this.scene = new Scene();
        this.initRenderer();
        this.initCamera();
        document.body.appendChild(this.renderer.domElement);
        this.initControls();
        this.registerAnimationControlListener();

        this.animate();
    }

    initRenderer = () => {
        const canvas = document.querySelector("#canvas");
        this.renderer = new WebGLRenderer({canvas});
    }

    initCamera = () => {
        this.camera = new PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 120000);
        this.camera.position.set(0, 2500, 3000);
    }

    initControls = () => {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enablePan = true;
        this.controls.enableDamping = true;
        this.controls.maxDistance = 2500;
        this.controls.minDistance = 500;
        this.controls.update();
    }

    addToScene = (object) => {
        this.addNativeToScene(object.getObject());
    }

    addNativeToScene = (object) => {
        this.scene.add(object);
    }

    resizeRendererToDisplaySize = () => {
        const canvas = this.renderer.domElement;
        /*const width = canvas.clientWidth;
        const height = canvas.clientHeight;*/
        const width = window.innerWidth;
        const height = window.innerHeight;
        const needResize = canvas.width !== width || canvas.height !== height;

        if (needResize) {
            this.renderer.setSize(width, height, false);
        }

        return needResize;
    }

    updateCameraParams = () => {
        if (this.resizeRendererToDisplaySize()) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }
    }

    registerAnimationControlListener = () => {
        document.getElementById("animation-control").addEventListener("click", () => {
            this.doeCustomAnimation = !this.doeCustomAnimation;
            this.controls.minDistance = this.doeCustomAnimation ? 500 : 100;
        })
    }

    animate = () => {
        this.doeCustomAnimation && !!this.animateCallback && this.animateCallback();
        this.updateCameraParams();
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }
}
