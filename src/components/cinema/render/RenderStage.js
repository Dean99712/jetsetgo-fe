import React, {useEffect} from 'react';
import {Canvas, advance, useFrame, useThree} from '@react-three/fiber';
import {Environment, Lightformer} from '@react-three/drei';
import Airplane from '../../hero/scene/Airplane';
import CloudField from '../../hero/scene/CloudField';

/**
 * Offline render stage (dev-only route /__render) used by scripts/render-clips.js
 * to capture deterministic 1080p frame sequences from the three.js scenes.
 * The driver script calls window.__setRenderTime(t); we pin the R3F clock to t
 * and advance one frame. Not part of the shipped site.
 */

// Time windows / camera paths per clip. The hero window starts at t=26.5s so
// the airplane's 55s traverse puts it near frame-center, drifting slowly right.
const CLIPS = {
    hero: {
        t0: 26.5,
        background: '#0B1230',
        fog: ['#0B1230', 12, 30],
        camera: (local, camera) => {
            camera.position.set(-0.5 + local * 0.2, 0.9 - local * 0.03, 12.5 - local * 0.3);
            camera.lookAt(0.4, 2.1, -4.2);
        },
    },
    cabin: {
        t0: 4,
        background: '#170F08',
        fog: ['#241708', 6, 22],
        camera: (local, camera) => {
            camera.position.set(-1 + local * 0.35, -2.1, 2.5 - local * 0.55);
            camera.lookAt(1.5, -2.5, -6);
        },
    },
    destinations: {
        t0: 8,
        background: '#060B1F',
        fog: ['#0A1230', 10, 34],
        camera: (local, camera) => {
            camera.position.set(-1.5 + local * 0.6, 5.5, 6 - local * 0.4);
            camera.lookAt(-0.5 + local * 0.6, -1.5, -7);
        },
    },
};

/** Warm drifting "window light" row for the cabin pass. */
const CabinGlow = () => (
    <group position={[0.5, -1.6, -4]}>
        {Array.from({length: 9}, (_, i) => (
            <mesh key={i} position={[i * 1.1 - 4.4, Math.sin(i * 1.7) * 0.25, Math.sin(i) * 0.6]}>
                <sphereGeometry args={[0.09, 12, 8]}/>
                <meshBasicMaterial color="#FFDCA3" toneMapped={false}/>
            </mesh>
        ))}
        <pointLight position={[0, 0.5, 2]} intensity={1.6} color="#F5C36B" distance={14}/>
    </group>
);

/** Scattered shoreline lights glinting under the cloud sea. */
const CityLights = () => {
    const points = [];
    let seed = 7;
    const rand = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
    };
    for (let i = 0; i < 46; i++) {
        points.push([rand() * 28 - 14, -4.5 - rand() * 1.5, -6 - rand() * 12]);
    }
    return (
        <group>
            {points.map((p, i) => (
                <mesh key={i} position={p}>
                    <sphereGeometry args={[0.07 + (i % 3) * 0.03, 8, 6]}/>
                    <meshBasicMaterial color={i % 4 === 0 ? '#FFDCA3' : '#ECAA44'} toneMapped={false}/>
                </mesh>
            ))}
        </group>
    );
};

const ClipCamera = ({clip}) => {
    useFrame(({camera, clock}) => {
        const config = CLIPS[clip];
        const local = Math.max(0, clock.getElapsedTime() - config.t0);
        config.camera(local, camera);
    });
    return null;
};

const RenderController = () => {
    const state = useThree();
    useEffect(() => {
        window.__setRenderTime = (t) => {
            state.clock.getElapsedTime = () => t;
            state.clock.elapsedTime = t;
            advance(performance.now(), true);
            // Second advance lets frame-lagged updates (instanced clouds) settle.
            advance(performance.now() + 16, true);
            window.__frameReady = t;
        };
        window.__renderReady = true;
        return () => {
            delete window.__setRenderTime;
            delete window.__renderReady;
        };
    }, [state]);
    return null;
};

const RenderStage = () => {
    const clip = new URLSearchParams(window.location.search).get('clip') || 'hero';
    const config = CLIPS[clip] || CLIPS.hero;

    return (
        <div style={{position: 'fixed', inset: 0, width: '100vw', height: '100vh', background: config.background}}>
            <Canvas
                dpr={1}
                frameloop="never"
                gl={{antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance'}}
                camera={{position: [0, 0.6, 12.5], fov: 38}}
            >
                <color attach="background" args={[config.background]}/>
                <fog attach="fog" args={config.fog}/>

                <hemisphereLight args={['#F8EFE2', '#1B2438', 1.2]}/>
                <ambientLight intensity={0.3} color="#4A5680"/>
                <directionalLight position={[8, 1, 4]} intensity={2.2} color="#FFD9A8"/>
                <directionalLight position={[-6, 4, -2]} intensity={0.7} color="#8FB2FF"/>

                <Environment frames={Infinity} resolution={64}>
                    <Lightformer form="rect" intensity={1.5} color="#FFB55C" position={[7, -1.5, 4]}
                                  scale={[12, 5, 1]} target={[0, 0, 0]}/>
                    <Lightformer form="rect" intensity={1.2} color="#31408A" position={[-6, 5, -6]}
                                  scale={[14, 10, 1]} target={[0, 0, 0]}/>
                    <Lightformer form="ring" intensity={1.2} color="#FFDCA3" position={[10, 0.5, 8]}
                                  scale={4} target={[0, 0, 0]}/>
                </Environment>

                {clip === 'hero' && <Airplane/>}
                {clip === 'cabin' && <CabinGlow/>}
                {clip === 'destinations' && <CityLights/>}
                <CloudField/>

                <ClipCamera clip={clip}/>
                <RenderController/>
            </Canvas>
        </div>
    );
};

export default RenderStage;
