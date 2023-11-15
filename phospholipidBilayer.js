import { InstancedMesh, MeshPhongMaterial, Object3D, Vector3 } from "three";
import SphericalPointDistributor from "./sphericalPointDistributor.js";
import ModelFactory from "./modelFactory.js";

const phospholipidSeparation = 4;
const phospholipidOffset = phospholipidSeparation * -0.5;

class PhospholipidBilayer {
    constructor(size) {
        const pointDistributor = new SphericalPointDistributor(size);
        const pointCount = pointDistributor.getPointCount(4);


        const material = new MeshPhongMaterial({ color: 0xffffaa });
        this.mesh = new InstancedMesh(ModelFactory.getPhospholipid(), material, pointCount * 2);

        const points = pointDistributor.distribute(pointCount);
        let phospholipidCount = 0;

        let dummyObjectContainer = new Object3D();
        let dummyObject = new Object3D();
        dummyObjectContainer.add(dummyObject);

        for(const point of points) {
            dummyObjectContainer.position.copy(point);
            dummyObjectContainer.lookAt(new Vector3(0, 0, 0));
            dummyObjectContainer.updateMatrixWorld();
            
            dummyObject.rotation.set(Math.PI * 1.5, Math.PI, 0);
            dummyObject.position.set(0, 0, phospholipidOffset);
            dummyObject.updateMatrixWorld();
            this.mesh.setMatrixAt(phospholipidCount++, dummyObject.matrixWorld.clone());

            dummyObject.rotation.set(Math.PI * 0.5, 0, 0);
            dummyObject.position.set(0, 0, phospholipidSeparation + phospholipidOffset);
            dummyObject.updateMatrixWorld();
            this.mesh.setMatrixAt(phospholipidCount++, dummyObject.matrixWorld.clone());
        }
    }
}

export default PhospholipidBilayer;