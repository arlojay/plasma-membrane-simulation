import { Group } from "three";
import PlasmaMembrane from "./plasmaMembrane.js";

class Cell {
    constructor(size) {
        this.size = size;

        this.plasmaMembrane = new PlasmaMembrane(size);
        
        const obj = this.mesh = new Group();

        obj.add(this.plasmaMembrane.mesh);
    }
}

export default Cell;