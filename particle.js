import { Euler, Vector3 } from "three";

const MOLECULE_JITTER_SPEED = 256;
const MAX_VELOCITY = 10;
const MAX_ROTATION_VELOCITY = Math.PI * 0.12;

class Particle {
    constructor(extracellularFluid) {
        this.extracellularFluid = extracellularFluid;

        this.mesh = null;
        this.velocity = new Vector3(0, 0, 0);
        this.position = new Vector3(0, 0, 0);
        this.rotationVelocity = new Euler(0, 0, 0);
    }
    update(dt) {
        this.velocity.x += (Math.random() - 0.5) * dt * MOLECULE_JITTER_SPEED;
        if(this.velocity.x > MAX_VELOCITY) this.velocity.x = MAX_VELOCITY;
        if(this.velocity.x < -MAX_VELOCITY) this.velocity.x = -MAX_VELOCITY;

        this.velocity.y += (Math.random() - 0.5) * dt * MOLECULE_JITTER_SPEED;
        if(this.velocity.y > MAX_VELOCITY) this.velocity.y = MAX_VELOCITY;
        if(this.velocity.y < -MAX_VELOCITY) this.velocity.y = -MAX_VELOCITY;

        this.velocity.z += (Math.random() - 0.5) * dt * MOLECULE_JITTER_SPEED;
        if(this.velocity.z > MAX_VELOCITY) this.velocity.z = MAX_VELOCITY;
        if(this.velocity.z < -MAX_VELOCITY) this.velocity.z = -MAX_VELOCITY;

        this.position.x += this.velocity.x * dt;
        this.position.y += this.velocity.y * dt;
        this.position.z += this.velocity.z * dt;

        if(this.position.x > this.extracellularFluid.width) {
            this.position.x = this.extracellularFluid.width;
            this.velocity.x = -this.velocity.x;
        }
        if(this.position.x < -this.extracellularFluid.width) {
            this.position.x = -this.extracellularFluid.width;
            this.velocity.x = -this.velocity.x;
        }
        if(this.position.y > this.extracellularFluid.height) {
            this.position.y = this.extracellularFluid.height;
            this.velocity.y = -this.velocity.y;
        }
        if(this.position.y < -this.extracellularFluid.height) {
            this.position.y = -this.extracellularFluid.height;
            this.velocity.y = -this.velocity.y;
        }
        if(this.position.z > this.extracellularFluid.depth) {
            this.position.z = this.extracellularFluid.depth;
            this.velocity.z = -this.velocity.z;
        }
        if(this.position.z < -this.extracellularFluid.depth) {
            this.position.z = -this.extracellularFluid.depth;
            this.velocity.z = -this.velocity.z;
        }

        this.mesh.position.copy(this.position);
        

        this.rotationVelocity.x += (Math.random() - 0.5) * dt;
        this.rotationVelocity.y += (Math.random() - 0.5) * dt;
        this.rotationVelocity.z += (Math.random() - 0.5) * dt;
        this.mesh.rotation.x += this.rotationVelocity.x;
        if(this.rotationVelocity.x > MAX_ROTATION_VELOCITY) this.rotationVelocity.x = MAX_ROTATION_VELOCITY;
        if(this.rotationVelocity.x < -MAX_ROTATION_VELOCITY) this.rotationVelocity.x = -MAX_ROTATION_VELOCITY;
        this.mesh.rotation.y += this.rotationVelocity.y;
        if(this.rotationVelocity.y > MAX_ROTATION_VELOCITY) this.rotationVelocity.y = MAX_ROTATION_VELOCITY;
        if(this.rotationVelocity.y < -MAX_ROTATION_VELOCITY) this.rotationVelocity.y = -MAX_ROTATION_VELOCITY;
        this.mesh.rotation.z += this.rotationVelocity.z;
        if(this.rotationVelocity.z > MAX_ROTATION_VELOCITY) this.rotationVelocity.z = MAX_ROTATION_VELOCITY;
        if(this.rotationVelocity.z < -MAX_ROTATION_VELOCITY) this.rotationVelocity.z = -MAX_ROTATION_VELOCITY;

        this.mesh.rotation.needsUpdate = true;
    }
}

export default Particle;