import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const modelurl = new URL('./models/cubo.gltf', import.meta.url);
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
let model; // Variable para almacenar el modelo GLTF

assetLoader.load(modelurl.href, function (gltf) {
    model = gltf.scene; // Almacena el modelo GLTF
    scene.add(model);

    camera.position.z = 2;
    camera.position.y = 0;
    camera.position.x = 0;

    // Encuentra la luz "Sun" dentro del modelo por su nombre
    const nombreSun = 'Luzfrontal'; // Nombre de la luz que deseas modificar
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

    const nombreluz = 'Luzfrontal'; // Nombre de la luz que deseas modificar
    let luz;
    model.traverse((child) => {
        if (child.isLight && child.name === nombreluz) {
            luz = child;
        }
    });

    if (luz) {
        luz.intensity = 0.5; // Establecer la intensidad de la luz
    } else {
        console.warn('No se encontró una luz con el nombre especificado en el modelo GLTF.');
    }

}, undefined, function (error) {
    console.error(error);
});

const imgMaster = document.querySelector('.img-master');

const renderToCanvas = () => {
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
    if (model) {
        // Rotar el modelo en su propio eje
        model.rotation.y += 0.01; // Rotación en el eje x
    }
    renderer.render(scene, camera);
};

renderToCanvas(); // Renderizar al iniciar
