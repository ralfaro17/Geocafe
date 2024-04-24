import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 720 / 480, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "default" });
renderer.setSize(480, 320);
renderer.setClearColor(0xffffff); // Establecer el color de fondo a blanco
let canvas = renderer.domElement;

canvas.style.maxWidth = '100% !important';
canvas.style.width = '720px !important';
canvas.style.maxHeight = '100% !important';
canvas.style.height = '480px !important';
canvas.style.padding = '20px 10px 20px 10px !important';

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x654321, wireframe: true, wireframeLinewidth: 2 }); 
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 2;

const renderToCanvas = () => {
    const imgMaster = document.querySelector('.img-master');
    imgMaster.innerHTML = '';
    imgMaster.appendChild(canvas);
    animate();
};

const renderToCanvasInline = () => {
    const imgMaster = document.querySelector('.img-master');
    const inlineCanvas = document.createElement('canvas');
    inlineCanvas.width = 720;
    inlineCanvas.height = 480;
    imgMaster.innerHTML = '';
    imgMaster.appendChild(inlineCanvas);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "default" });
    renderer.setSize(720, 480);
    renderer.setClearColor(0xffffff); // Establecer el color de fondo a blanco
    canvas = renderer.domElement;
    renderToCanvas();
};

const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};

renderToCanvas(); // Renderizar al iniciar


