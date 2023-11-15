import { Mesh, MeshPhongMaterial, Vector3 } from "three";
import PolarMolecule from "./polarMolecule.js";
import ModelFactory from "./modelFactory.js";

const material = new MeshPhongMaterial({ color: 0xaaccff });

const repelStrength = new Vector3(10, 10, 10);
const inverse = new Vector3(-1, -1, -1);

class WaterMolecule extends PolarMolecule {
    constructor(extracellularFluid) {
        super(extracellularFluid);

        this.mesh = new Mesh(ModelFactory.getWaterMolecule(), material);
    }

    update(dt) {
        const distanceFromOrigin = this.position.length();

        let isNearAquaporin = false;
        for(const aquaporin of cell.plasmaMembrane.plasmaMembraneFacilitators.aquaporins) {
            if(this.position.distanceTo(aquaporin.position) < 12) {
                isNearAquaporin = true;
                break;
            }
        }

        
        if(Math.abs(distanceFromOrigin - cell.size) < 5 && !isNearAquaporin) {
            // console.log(distanceFromOrigin, cell.size);
            if(distanceFromOrigin > cell.size) {
                this.velocity.copy(this.position).normalize().multiply(repelStrength);
            } else {
                this.velocity.copy(this.position).normalize().multiply(inverse).multiply(repelStrength);
            }
        }

        super.update(dt);
    }
}

export default WaterMolecule;