import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// URL del modelo GLTF
const modelurl = new URL('./models/cubo.gltf', import.meta.url);

// Crear la escena y la cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 720 / 480, 0.1, 1000);
camera.position.set(0, 1, 4); // Establecer la posición de la cámara

// Crear el renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "default" });
renderer.setSize(720, 480); // Ajustar el tamaño del renderer
renderer.setClearColor(0xffffff); // Establecer el color de fondo a blanco
const canvas = renderer.domElement;

// Estilo del canvas
canvas.style.maxWidth = '100%';
canvas.style.width = '720px';
canvas.style.maxHeight = '100%';
canvas.style.height = '480px';
canvas.style.padding = '20px 10px';

// Crear y agregar luces manualmente
const createLights = () => {
    // Luz direccional desde el frente
    const directionalLightFront = new THREE.DirectionalLight(0xffffff, 1);
    directionalLightFront.position.set(0, 0, 10);
    scene.add(directionalLightFront);

    // Luz direccional desde la derecha
    const directionalLightRight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLightRight.position.set(10, 0, 0);
    scene.add(directionalLightRight);

    // Luz direccional desde arriba
    const directionalLightTop = new THREE.DirectionalLight(0xffffff, 1);
    directionalLightTop.position.set(0, 10, 0);
    scene.add(directionalLightTop);

    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0x404040); // Luz suave para la escena
    scene.add(ambientLight);
};

// Llamar a la función para crear y agregar las luces
createLights();

const assetLoader = new GLTFLoader();
let model; // Variable para almacenar el modelo GLTF
let mixer; // Variable para el AnimationMixer

assetLoader.load(modelurl.href, function (gltf) {
    model = gltf.scene; // Almacena el modelo GLTF
    scene.add(model);

    // Crear el AnimationMixer
    mixer = new THREE.AnimationMixer(model);

    // Buscar la animación por su nombre y reproducirla
    const clip = THREE.AnimationClip.findByName(gltf.animations, 'animacionCubo');
    if (clip) {
        const action = mixer.clipAction(clip);
        action.play();
    } else {
        console.warn('No se encontró una animación con el nombre especificado en el modelo GLTF.');
    }

}, undefined, function (error) {
    console.error(error);
});

const imgMaster = document.querySelector('.img-master');

// Función para renderizar el canvas
const renderToCanvas = () => {
    imgMaster.innerHTML = '';
    imgMaster.appendChild(canvas);
    animate();
};

// Función de animación
const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta(); // Obtener el tiempo transcurrido
    if (mixer) {
        mixer.update(delta); // Actualizar la animación
    }
    renderer.render(scene, camera);
};

const clock = new THREE.Clock(); // Crear un reloj para el delta time

// Renderizar al iniciar
renderToCanvas();
