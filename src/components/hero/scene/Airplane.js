import React, {useEffect, useMemo, useRef} from 'react';
import * as THREE from 'three';
import {useFrame} from '@react-three/fiber';

const TRAVERSE_SECONDS = 55;
const TRAVERSE_HALF_WIDTH = 13;

/** Swept wing planform: shape-x runs chordwise (+x toward the nose), shape-y spanwise. */
const buildWingShape = () => {
    const shape = new THREE.Shape();
    shape.moveTo(0.55, 0);
    shape.lineTo(-1.7, 3.1);
    shape.lineTo(-2.25, 3.1);
    shape.lineTo(-1.05, 0);
    shape.closePath();
    return shape;
};

const buildFinShape = () => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-0.85, 1.25);
    shape.lineTo(-1.25, 1.25);
    shape.lineTo(-0.5, 0);
    shape.closePath();
    return shape;
};

const buildFinStripeShape = () => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.45, 0.08);
    shape.lineTo(-1.02, 0.95);
    shape.lineTo(-1.16, 0.95);
    shape.lineTo(-0.59, 0.08);
    shape.closePath();
    return shape;
};

/** Dotted cabin-window strip generated in code — no texture assets. */
const buildWindowTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 8;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#FFDCA3';
    for (let x = 4; x < canvas.width; x += 12) {
        ctx.fillRect(x, 2, 6, 4);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = 8;
    return texture;
};

const EXTRUDE = {depth: 0.07, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 1};
const THIN_EXTRUDE = {depth: 0.06, bevelEnabled: false};

const Airplane = () => {
    const flight = useRef();
    const attitude = useRef();

    const assets = useMemo(() => {
        const body = new THREE.MeshStandardMaterial({
            color: '#F4F6FB',
            metalness: 0.32,
            roughness: 0.4,
            envMapIntensity: 0.6,
        });
        const dark = new THREE.MeshStandardMaterial({
            color: '#1B2438',
            metalness: 0.4,
            roughness: 0.15,
        });
        const gold = new THREE.MeshStandardMaterial({
            color: '#ECAA44',
            metalness: 0.8,
            roughness: 0.3,
            envMapIntensity: 1.4,
        });
        const engineRim = new THREE.MeshStandardMaterial({
            color: '#2A2F45',
            emissive: '#F5C36B',
            emissiveIntensity: 0.35,
            metalness: 0.6,
            roughness: 0.4,
        });
        const windowTexture = buildWindowTexture();
        const windows = new THREE.MeshBasicMaterial({
            map: windowTexture,
            transparent: true,
            opacity: 0.9,
            toneMapped: false,
            depthWrite: false,
        });
        return {body, dark, gold, engineRim, windows, windowTexture};
    }, []);

    useEffect(() => () => {
        Object.values(assets).forEach((asset) => asset.dispose?.());
    }, [assets]);

    const wingShape = useMemo(buildWingShape, []);
    const finShape = useMemo(buildFinShape, []);
    const stripeShape = useMemo(buildFinStripeShape, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const progress = (t % TRAVERSE_SECONDS) / TRAVERSE_SECONDS;

        // Slow left-to-right glide; the wrap happens far outside the fogged frustum
        flight.current.position.x = -TRAVERSE_HALF_WIDTH + progress * TRAVERSE_HALF_WIDTH * 2;
        flight.current.position.y = 2.9 + Math.sin(t * 0.5) * 0.15;

        // Gentle coordinated banking
        attitude.current.rotation.z = Math.sin(t * 0.35) * 0.06;
        attitude.current.rotation.x = Math.sin(t * 0.5 + 1) * 0.02;
    });

    return (
        <group ref={flight} position={[0, 2.9, -4.2]}>
            <group ref={attitude} scale={0.46}>
                {/* fuselage */}
                <mesh material={assets.body} rotation={[0, 0, Math.PI / 2]}>
                    <capsuleGeometry args={[0.45, 5.2, 8, 24]}/>
                </mesh>

                {/* windshield band */}
                <mesh material={assets.dark} position={[2.15, 0.12, 0]} scale={[0.65, 0.4, 0.8]}>
                    <sphereGeometry args={[0.42, 24, 16]}/>
                </mesh>

                {/* cabin window strips */}
                <mesh material={assets.windows} position={[0.15, 0.08, 0.452]}>
                    <planeGeometry args={[3.9, 0.08]}/>
                </mesh>
                <mesh material={assets.windows} position={[0.15, 0.08, -0.452]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[3.9, 0.08]}/>
                </mesh>

                {/* wings (extruded planform, mirrored, slight dihedral) */}
                <group position={[0.3, -0.15, 0]} rotation={[0.06, 0, 0]}>
                    <mesh material={assets.body} rotation={[-Math.PI / 2, 0, 0]}>
                        <extrudeGeometry args={[wingShape, EXTRUDE]}/>
                    </mesh>
                </group>
                <group position={[0.3, -0.15, 0]} rotation={[-0.06, 0, 0]}>
                    <mesh material={assets.body} rotation={[Math.PI / 2, 0, 0]}>
                        <extrudeGeometry args={[wingShape, EXTRUDE]}/>
                    </mesh>
                </group>

                {/* tailplane */}
                <group position={[-2.35, 0.05, 0]} scale={0.42}>
                    <mesh material={assets.body} rotation={[-Math.PI / 2, 0, 0]}>
                        <extrudeGeometry args={[wingShape, EXTRUDE]}/>
                    </mesh>
                    <mesh material={assets.body} rotation={[Math.PI / 2, 0, 0]}>
                        <extrudeGeometry args={[wingShape, EXTRUDE]}/>
                    </mesh>
                </group>

                {/* vertical stabilizer with gold livery stripe */}
                <group position={[-2.15, 0.3, 0]}>
                    <mesh material={assets.body} position={[0, 0, -0.03]}>
                        <extrudeGeometry args={[finShape, THIN_EXTRUDE]}/>
                    </mesh>
                    <mesh material={assets.gold} position={[0, 0, -0.035]}>
                        <extrudeGeometry args={[stripeShape, {depth: 0.07, bevelEnabled: false}]}/>
                    </mesh>
                </group>

                {/* engines */}
                {[1.1, -1.1].map((z) => (
                    <group key={z} position={[0.55, -0.62, z]}>
                        <mesh material={assets.body} position={[0, 0.25, 0]}>
                            <boxGeometry args={[0.35, 0.2, 0.08]}/>
                        </mesh>
                        <mesh material={assets.body} rotation={[0, 0, Math.PI / 2]}>
                            <cylinderGeometry args={[0.24, 0.27, 0.62, 20]}/>
                        </mesh>
                        <mesh material={assets.dark} position={[0.32, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                            <circleGeometry args={[0.22, 24]}/>
                        </mesh>
                        <mesh material={assets.engineRim} position={[0.31, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                            <torusGeometry args={[0.24, 0.025, 8, 24]}/>
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
    );
};

export default Airplane;
