import { Mesh, MeshPhongMaterial, Vector3 } from "three";
import Ion from "./ion.js";
import ModelFactory from "./modelFactory.js";

const material = new MeshPhongMaterial({ color: 0xffaaaa });


const repelStrength = new Vector3(6, 6, 6);

class SodiumIon extends Ion {
    constructor(extracellularFluid) {
        super(extracellularFluid);

        this.mesh = new Mesh(ModelFactory.getIon(), material);
    }

    update(dt) {
        const facilitators = cell.plasmaMembrane.plasmaMembraneFacilitators;

        for(const pump of facilitators.sodiumPotassiumPumps) {
            if(this.position.distanceTo(pump.position) < 3) {
                this.velocity.copy(this.position).normalize().multiply(repelStrength);
            }
        }

        super.update(dt);
    }
}

export default SodiumIon;