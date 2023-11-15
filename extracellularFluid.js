import { Group, Vector3 } from "three";
import WaterMolecule from "./water.js";
import SodiumIon from "./sodiumIon.js";
import PotassiumIon from "./potassiumIon.js";

class ExtracellularFluid {
    constructor(particleCount) {
        this.width = 128;
        this.height = 128;
        this.depth = 128;

        this.particles = [];
        this.mesh = new Group();

        for(let i = 0; i < particleCount; i++) {
            this.spawnRandomParticle();
        }
    }

    createRandomPosition() {
        return new Vector3(
            Math.random() * this.width * 2 - this.width,
            Math.random() * this.height * 2 - this.height,
            Math.random() * this.depth * 2 - this.depth
        );
    }

    spawnRandomParticle() {
        const num = Math.floor(Math.random() * 3);

        let particle;
        switch(num) {
            case 0:
                particle = new WaterMolecule(this);
                break;
            case 1:
                particle = new SodiumIon(this);
                break;
            case 2:
                particle = new PotassiumIon(this);
                break;
        }


        particle.mesh.position.copy(this.createRandomPosition());
        this.mesh.add(particle.mesh);
        this.particles.push(particle);
    }

    update(dt) {
        for(const particle of this.particles) particle.update(dt);
    }
}

export default ExtracellularFluid;