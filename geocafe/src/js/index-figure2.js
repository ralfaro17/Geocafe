import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const modelurl = new URL('media/models/ilumination.gltf', import.meta.url);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 720 / 480, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "default" });
renderer.setSize(720, 480); // Ajustar el tamaño del renderer
renderer.setClearColor(0xffffff); // Establecer el color de fondo a blanco
let canvas = renderer.domElement;

canvas.style.maxWidth = '100%'; // Eliminar '!important'
canvas.style.width = '720px'; // Eliminar '!important'
canvas.style.maxHeight = '100%'; // Eliminar '!important'
canvas.style.height = '480px'; // Eliminar '!important'
canvas.style.padding = '20px 10px'; // Eliminar '!important'

const assetLoader = new GLTFLoader();
assetLoader.load(modelurl.href, function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    // Encuentra la luz "Sun" dentro del modelo por su nombre
    const nombreSun = 'Sun'; // Nombre de la luz que deseas modificar
    let sun;
    model.traverse((child) => {
        if (child.isLight && child.name === nombreSun) {
            sun = child;
        }
    });

    // Aplicar cambios a la luz si se encontró
    if (sun) {
        sun.intensity = 0.5; // Establecer la intensidad de la luz
    } else {
        console.warn('No se encontró una luz con el nombre especificado en el modelo GLTF.');
    }

}, undefined, function (error) {
    console.error(error);
});

const imgMaster = document.querySelector('.img-tain');

const renderToCanvas = () => {
    imgMaster.innerHTML = '';
    imgMaster.appendChild(canvas);
    animate();
};

const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

renderToCanvas(); // Renderizar al iniciar
