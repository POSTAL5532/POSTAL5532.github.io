class Game {

    scene;

    camera;

    cubes = [];

    renderer;

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

    /**
     * Мапит обработчик на конкретную клавишу.
     */
    onKeyDown = (key, handler) => {
        this.keysEvents["keydown"].set(`Key${key.toUpperCase()}`, handler);
    }

    /**
     * Мапит обработчик на стрелки.
     */
    onArrowDown = (arrow, handler) => {
        this.keysEvents["keydown"].set(arrow, handler);
    }

    addCube = (config) => {
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshNormalMaterial({color: "#1fe290"});
        const cube = new THREE.Mesh(geometry, material);

        cube.position.copy(config.position);

        this.cubes.push(cube);

        this.scene.add(cube);
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
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
    }

    /**
     * Достаёт ключи нажатых клавиш, по этим ключам ищет наличие замапленых обработчиков и исполняет их.
     */
    handleKeysEvents = () => {
        Object.keys(this.pressedKeys).forEach(key => {
            const keyIsPressed = this.pressedKeys[key];
            const handler = this.keysEvents["keydown"].get(key);
            keyIsPressed && handler && handler(this.pressedKeys);
        });
    }

    animate = () => {
        this.handleKeysEvents();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    }
}