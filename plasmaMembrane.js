import { Group } from "three";
import PhospholipidBilayer from "./phospholipidBilayer.js";
import PlasmaMembraneFacilitators from "./plasmaMembraneFacilitators.js";

class PlasmaMembrane {
    constructor(size) {
        const obj = this.mesh = new Group();

        this.phospholipidBilayer = new PhospholipidBilayer(size);
        obj.add(this.phospholipidBilayer.mesh);

        this.plasmaMembraneFacilitators = new PlasmaMembraneFacilitators(size);
        obj.add(this.plasmaMembraneFacilitators.mesh);
        console.log(this.plasmaMembraneFacilitators);
    }
}

export default PlasmaMembrane;