import { Vector3 } from "three";

class SphericalPointDistributor {
    constructor(radius) {
        this.radius = radius;
    }

    distribute(totalPoints) {
        const points = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

        for (let i = 0; i < totalPoints; i++) {
            const y = 1 - (i / (totalPoints - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // radius at y

            const theta = phi * i; // golden angle increment

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            points.push(new Vector3(this.radius * x, this.radius * y, this.radius * z));
        }

        return points;
    }

    getPointCount(distance) {
        const SA = 4 * Math.PI * this.radius ** 2;
        return SA / distance;
    }
}

export default SphericalPointDistributor;