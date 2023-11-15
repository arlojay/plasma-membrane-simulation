import { AmbientLight, HemisphereLight, PerspectiveCamera, PointLight, Scene, WebGLRenderer } from "three";
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import Cell from "./cell.js";
import ModelFactory from "./modelFactory.js";
import ExtracellularFluid from "./extracellularFluid.js";

const canvas = document.querySelector("canvas");

const camera = new PerspectiveCamera(90, 1, 0.1, 5000);
const renderer = new WebGLRenderer({ canvas });
renderer.setClearColor(0xFFFFA5);

const scene = new Scene();
const controls = new FlyControls(camera, canvas);
camera.position.set(0, 0, 128);
controls.dragToLook = true;

const light = new PointLight(0xffffff, 1, 256, 0.4);
scene.add(light);
scene.add(new AmbientLight(0xdddddd));

let extracellularFluid, cell;

function resize() {
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
}

let lastTime = 0;
function render(time) {
    const dt = Math.max(Math.min(time - lastTime, 50), 0.1) / 1000;
    lastTime = time;
    light.position.copy(camera.position);

    controls.update(dt * 100);
    renderer.render(scene, camera);
    extracellularFluid.update(dt);

    requestAnimationFrame(render);
}

async function main() {
    await ModelFactory.init();

    window.cell = cell = new Cell(64);

    extracellularFluid = new ExtracellularFluid(4096);
    scene.add(extracellularFluid.mesh);
    scene.add(cell.mesh);
    
    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(render);
}

main();