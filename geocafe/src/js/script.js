import 'vite/modulepreload-polyfill'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Definir la URL del modelo GLTF
const modelurl = new URL('media/models/ilumination.gltf', import.meta.url);

// Crear la escena, la cámara y el renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "default" });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Configurar OrbitControls
const orbit = new OrbitControls(camera, renderer.domElement);

// Configurar la cámara
camera.position.set(0, 3, 10);

// Cargar el modelo GLTF
const assetLoader = new GLTFLoader();
let mixer;
assetLoader.load(modelurl.href, function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'TazaMove');
    const action = mixer.clipAction(clip);
    action.play();

    // Encuentra el objeto "Plane" dentro del modelo por su nombre
    const nombreObjeto = 'Plane'; // Nombre del objeto que deseas modificar
    let objeto;
    model.traverse((child) => {
        if (child.isMesh && child.name === nombreObjeto) {
            objeto = child;
            // Verifica si se encontró el objeto en el modelo
            if (objeto) {
                // Accede al material del objeto
                const material = objeto.material;
                // Cambia el color del material a rojo
                material.color.set(0xff0000); // Rojo
            } else {
                console.warn('No se encontró un objeto con el nombre especificado en el modelo GLTF.');
            }
        }
    });

    // Encuentra la luz "Sun" dentro del modelo por su nombre
    const nombreSun = 'Sun'; // Nombre de la luz que deseas modificar
    let sun;
    model.traverse((child) => {
        if (child.isLight && child.name === nombreSun) {
            sun = child;
            // Verifica si se encontró la luz en el modelo
            if (sun) {
                // Accede a la intensidad de la luz
                const intensidad = sun.intensity;
                // Modifica la intensidad de la luz según sea necesario
                sun.intensity = 0.5; // Por ejemplo, establece la intensidad en 0.5
            } else {
                console.warn('No se encontró una luz con el nombre especificado en el modelo GLTF.');
            }
        }
    });

}, undefined, function (error) {
    console.error(error);
});


// Definir la función de animación
const clock = new THREE.Clock();
function animate() {
    if (mixer)
        mixer.update(clock.getDelta());
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

// Iniciar la animación
animate();

// Manejar el redimensionamiento de la ventana
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
