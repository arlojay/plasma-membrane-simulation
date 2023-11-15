import { InstancedMesh, Mesh, MeshPhongMaterial } from "three";
import ModelFactory from "./modelFactory.js";

const material = new MeshPhongMaterial({ color: 0xffffaa });

class Phospholipid {
    constructor() {
        const geometry = ModelFactory.getPhospholipid();
        this.model = new Mesh(geometry, material);
    }
}

export default Phospholipid;