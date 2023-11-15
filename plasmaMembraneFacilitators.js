import { Group, Object3D, Vector3 } from "three";
import SodiumPotassiumPump from "./sodiumPotassiumPump.js";
import SphericalPointDistributor from "./sphericalPointDistributor.js";
import Aquaporin from "./aquaporin.js";

class PlasmaMembraneFacilitators {
    constructor(size) {
        this.mesh = new Group();

        const pointDistributor = new SphericalPointDistributor(size);
        const pointCount = pointDistributor.getPointCount(256);
        
        const points = pointDistributor.distribute(pointCount);

        this.sodiumPotassiumPumps = new Array();
        this.aquaporins = new Array();

        for(const point of points) {
            const container = new Object3D();
            container.position.copy(point);
            container.lookAt(new Vector3(0, 0, 0));

            let facilitator = null;
            const type = Math.floor(Math.random() * 2);

            switch(type) {
                case 0:
                    facilitator = new SodiumPotassiumPump();
                    this.sodiumPotassiumPumps.push(facilitator);
                    break;
                case 1:
                    facilitator = new Aquaporin();
                    this.aquaporins.push(facilitator);
                    break;
            }
            facilitator.mesh.rotation.set(Math.PI * 0.5, 0, 0);
            container.add(facilitator.mesh);
            this.mesh.add(container);

            setTimeout(() => facilitator.updatePosition())
        }
    }
}

export default PlasmaMembraneFacilitators;