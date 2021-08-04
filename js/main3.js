const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial({color: "#1fe290"});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

let farDirection = true;

const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    cube.rotation.x += 0.01;

    if (camera.position.z > 10) {
        farDirection = false;
    } else if (camera.position.z < 2 ) {
        farDirection = true;
    }

    if (farDirection) {
        camera.position.z += 0.05;
    } else {
        camera.position.z -= 0.05;
    }

    renderer.render(scene, camera);
}

animate();