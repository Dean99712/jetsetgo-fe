import * as THREE from 'three';
import {useFrame} from '@react-three/fiber';

/**
 * Premium dolly-in on load (z 13 → 11) plus damped mouse parallax.
 * The camera keeps looking at a fixed point so the plane, clouds and
 * DOM cards separate into distinct parallax planes.
 */
const CameraRig = () => {
    useFrame((state, delta) => {
        const {camera, pointer} = state;

        camera.position.z = THREE.MathUtils.damp(camera.position.z, 11, 0.8, delta);
        camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.35, 2, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.6 + pointer.y * 0.2, 2, delta);
        camera.lookAt(0, 0.3, 0);
    });

    return null;
};

export default CameraRig;
