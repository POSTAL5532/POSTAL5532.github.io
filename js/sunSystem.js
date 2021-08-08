class SunSystem {

    scene;

    camera;

    renderer;

    solarSystem;

    sun;

    earth;

    earthOrbit;

    moon;

    moonOrbit;

    objectsToRotation = [];

    /**
     * Объект мапит обработчики на события, обработчики в свою очередь мапятся на конкретную клавишу.
     */
    keysEvents = {
        keydown: new Map(),
        keypress: new Map(),
        keyup: new Map()
    };

    /**
     * Содержит нажатые в данный момент клавиши.
     */
    pressedKeys = {};

    init = () => {
        this.scene = new THREE.Scene();
        this.initRenderer();
        this.initCamera();
        this.registerListeners();
        this.initSolarSystem();
        this.addLights();

        document.body.appendChild(this.renderer.domElement);

        this.animate();
    }

    registerListeners = () => {
        window.addEventListener("keydown", (event) => {
            this.pressedKeys[event.code] = true;
        });

        window.addEventListener("keyup", (event) => {
            this.pressedKeys[event.code] = false;
        });
    }

    onKeyDown = (key, handler) => {
        this.keysEvents["keydown"].set(`Key${key.toUpperCase()}`, handler);
    }

    onArrowDown = (arrow, handler) => {
        this.keysEvents["keydown"].set(arrow, handler);
    }

    getSphere = (radius, widthSegments, heightSegments, color, scale) => {
        const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
        const material = new THREE.MeshPhongMaterial({emissive: color});
        const sphere = new THREE.Mesh(geometry, material);

        if (scale) {
            sphere.scale.set(scale.x, scale.y, scale.z);
        }

        return sphere;
    }

    getVector = (x, y, z) => {
        return new THREE.Vector3(x, y, z);
    }

    initRenderer = () => {
        const canvas = document.querySelector("#canvas");
        this.renderer = new THREE.WebGLRenderer({canvas});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initCamera = () => {
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 50, 0);
        this.camera.up.set(0, 0, 1);
        this.camera.lookAt(0, 0, 0);
    }

    /**
     * Инициализирует корневой 3D-граф {@link SunSystem.solarSystem} и запускает инициализацию других объектов.
     */
    initSolarSystem = () => {
        this.solarSystem = new THREE.Object3D();
        this.scene.add(this.solarSystem);
        this.objectsToRotation.push(this.solarSystem);

        this.initSun();
        this.initEarth();
        this.initMoon();
    }

    /**
     * Инициализирует объект солнца и добавляет его в {@link SunSystem.solarSystem}.
     */
    initSun = () => {
        this.sun = this.getSphere(1, 8, 8, "#FFFF00", {x: 5, y: 5, z: 5});
        this.scene.add(this.sun);
        this.objectsToRotation.push(this.sun);
        this.solarSystem.add(this.sun);
    }

    /**
     * Инициализирует объект 3d-графа {@link SunSystem.earthOrbit} и добавляет его в {@link SunSystem.solarSystem},
     * инициализирует объект земли и добавляет её в {@link SunSystem.earthOrbit}.
     */
    initEarth = () => {
        this.earthOrbit = new THREE.Object3D();
        this.earthOrbit.position.x = 10;
        this.solarSystem.add(this.earthOrbit);
        this.objectsToRotation.push(this.earthOrbit);

        this.earth = this.getSphere(1, 8, 8, "#112244");
        this.earth.material.setValues({color: "#2233FF"});
        this.earthOrbit.add(this.earth);
        this.objectsToRotation.push(this.earth);

    }

    /**
     * Инициализирует объект 3d-графа {@link SunSystem.moonOrbit} и добавляет его в {@link SunSystem.earthOrbit},
     * инициализирует объект луны и добавляет её в {@link SunSystem.moonOrbit}.
     */
    initMoon = () => {
        this.moonOrbit = new THREE.Object3D();
        this.moonOrbit.position.x = 2;
        this.earthOrbit.add(this.moonOrbit);

        this.moon = this.getSphere(1, 8, 8, "#222222", {x: 0.5, y: 0.5, z: 0.5});
        this.moon.material.setValues({color: "#888888"});
        this.moonOrbit.add(this.moon);
        this.objectsToRotation.push(this.moon);
    }

    addLights = () => {
        this.scene.add(new THREE.PointLight("#FFFFFF", 3));
    }

    handleKeysEvents = () => {
        Object.keys(this.pressedKeys).forEach(key => {
            const keyIsPressed = this.pressedKeys[key];
            const handler = this.keysEvents["keydown"].get(key);
            keyIsPressed && handler && handler(this.pressedKeys);
        });
    }

    resizeRendererToDisplaySize = () => {
        const canvas = this.renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;

        if (needResize) {
            this.renderer.setSize(width, height, false);
        }
        return needResize;
    }

    animate = () => {
        this.handleKeysEvents();

        if (this.resizeRendererToDisplaySize()) {
            const canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        this.rotateSpheres();

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }

    rotateSpheres = () => {
        this.objectsToRotation.forEach(object => {
            object.rotation.y += 0.01;
        })
    }
}