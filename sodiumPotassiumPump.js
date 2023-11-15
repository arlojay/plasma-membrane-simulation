import { Mesh, MeshPhongMaterial, Vector3 } from "three";
import ModelFactory from "./modelFactory.js";


const material = new MeshPhongMaterial({ color: 0x9F51FF });
class SodiumPotassiumPump {
    constructor() {
        this.mesh = new Mesh(ModelFactory.getSodiumPotassiumPump(), material);
        this.position = new Vector3(0, 0, 0);
    }

    updatePosition() {
        this.position.setFromMatrixPosition(this.mesh.matrixWorld);
    }
}

export default SodiumPotassiumPump;