import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

let phospholipid;
let sodiumPotassiumPump;
let waterMolecule;
let ion;
let aquaporin;

function loadModel(loader, src) {
    return new Promise((res, rej) => {
        loader.load(src, res, () => {}, rej);
    })
}

class ModelFactory {
    static async init() {
        const objLoader = new OBJLoader();

        phospholipid = await loadModel(objLoader, "./models/phospholipid-lowpoly.obj");
        phospholipid = phospholipid.children[0].geometry;
        phospholipid.scale(0.1, 0.1, 0.1);

        sodiumPotassiumPump = await loadModel(objLoader, "./models/NaK-pump.obj");
        sodiumPotassiumPump = sodiumPotassiumPump.children[0].geometry;
        
        waterMolecule = await loadModel(objLoader, "./models/water.obj");
        waterMolecule = waterMolecule.children[0].geometry;
        waterMolecule.scale(0.25, 0.25, 0.25);
        
        ion = await loadModel(objLoader, "./models/ion.obj");
        ion = ion.children[0].geometry;
        ion.scale(0.25, 0.25, 0.25);

        aquaporin = await loadModel(objLoader, "./models/aquaporin.obj");
        aquaporin = aquaporin.children[0].geometry;
        aquaporin.translate(0, -2, 0);
    }

    static getPhospholipid() {
        return phospholipid;
    }
    static getSodiumPotassiumPump() {
        return sodiumPotassiumPump;
    }
    static getWaterMolecule() {
        return waterMolecule;
    }
    static getIon() {
        return ion;
    }
    static getAquaporin() {
        return aquaporin;
    }
}

export default ModelFactory;