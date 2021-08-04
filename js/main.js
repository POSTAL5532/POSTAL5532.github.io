const main = () => {
    const objects = [];
    const spread = 15;

    const canvas = document.querySelector("#canvas");
    const renderer = new THREE.WebGLRenderer({canvas});

    const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
    camera.position.z = 120;

    const scene = new THREE.Scene();

    const addObject = (x, y, obj) => {
        obj.position.x = x * spread;
        obj.position.y = y * spread;

        scene.add(obj);
        objects.push(obj);
    }

    const createMaterial = () => {
        const material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
        });

        const hue = Math.random();
        const saturation = 1;
        const luminance = .5;
        material.color.setHSL(hue, saturation, luminance);

        return material;
    }

    const cubes = [
        getMeshGeometry(new THREE.CylinderGeometry(0.5, 0.5, 1.5, 20), 0x44aa88, 0),
        getMeshGeometry(new THREE.CircleGeometry(0.5, 20), 0x8844aa, -2),
        getMeshGeometry(new THREE.ConeGeometry(0.5, 1, 20), 0xaa8844, 2),
    ];

    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(-1, 2, 4);

    cubes.forEach(cube => scene.add(cube));

    scene.add(light);

    const render = (time) => {
        const secTime = time / 1000;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        cubes.forEach((cube, ndx) => {
            const speed = 1 + ndx * .1;
            const rot = secTime * speed;
            cube.rotation.x = rot;
            cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

const getMeshGeometry = (geometry, color, x, y = 0) => {
    const geometryMaterial = new THREE.MeshPhongMaterial({color});
    const cube = new THREE.Mesh(geometry, geometryMaterial);
    cube.position.x = x;
    cube.position.y = y;

    return cube;
}

const resizeRendererToDisplaySize = (renderer) => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;

    if (needResize) {
        renderer.setSize(width, height, false);
    }

    return needResize;
}

main();
