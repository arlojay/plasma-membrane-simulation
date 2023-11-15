import { Mesh, MeshPhongMaterial, Vector3 } from "three";
import ModelFactory from "./modelFactory.js";


const material = new MeshPhongMaterial({ color: 0x51F3FF });
class Aquaporin {
    constructor() {
        this.mesh = new Mesh(ModelFactory.getAquaporin(), material);
        this.position = new Vector3(0, 0, 0);
    }

    updatePosition() {
        this.position.setFromMatrixPosition(this.mesh.matrixWorld);
    }
}

export default Aquaporin;