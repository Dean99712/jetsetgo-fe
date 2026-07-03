import React from 'react';
import {Canvas} from '@react-three/fiber';
import {Environment, Lightformer} from '@react-three/drei';
import Airplane from './Airplane';
import CloudField from './CloudField';
import CameraRig from './CameraRig';

/**
 * Cinematic sunrise scene: golden key light low on the right, cool navy
 * bounce, fog for depth. The Environment is built from local Lightformers
 * (rendered to a small cubemap on the GPU) so the metallic fuselage gets
 * sunrise reflections without fetching an HDR from a CDN.
 */
const HeroScene = ({active = true}) => (
    <Canvas
        dpr={[1, 1.75]}
        frameloop={active ? 'always' : 'never'}
        gl={{antialias: true, alpha: true, powerPreference: 'high-performance'}}
        camera={{position: [0, 0.6, 13], fov: 38}}
    >
        <fog attach="fog" args={['#0B1230', 12, 30]}/>

        <hemisphereLight args={['#F8EFE2', '#1B2438', 1.2]}/>
        <ambientLight intensity={0.3} color="#4A5680"/>
        <directionalLight position={[8, 1, 4]} intensity={2.2} color="#FFD9A8"/>
        <directionalLight position={[-6, 4, -2]} intensity={0.7} color="#8FB2FF"/>

        <Environment frames={1} resolution={64}>
            <Lightformer
                form="rect"
                intensity={1.5}
                color="#FFB55C"
                position={[7, -1.5, 4]}
                scale={[12, 5, 1]}
                target={[0, 0, 0]}
            />
            <Lightformer
                form="rect"
                intensity={1.2}
                color="#31408A"
                position={[-6, 5, -6]}
                scale={[14, 10, 1]}
                target={[0, 0, 0]}
            />
            <Lightformer
                form="ring"
                intensity={1.2}
                color="#FFDCA3"
                position={[10, 0.5, 8]}
                scale={4}
                target={[0, 0, 0]}
            />
        </Environment>

        <CameraRig/>
        <Airplane/>
        <CloudField/>
    </Canvas>
);

export default HeroScene;
