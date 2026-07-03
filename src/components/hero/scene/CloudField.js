import React, {useMemo, useRef} from 'react';
import * as THREE from 'three';
import {useFrame} from '@react-three/fiber';
import {Clouds, Cloud} from '@react-three/drei';

/**
 * drei's default cloud sprite lives on a CDN (rawcdn.githack.com) and fetching
 * it at runtime both crashes offline and leaks a third-party request, so the
 * soft particle is generated locally as a radial-gradient data URL instead.
 */
const buildCloudSprite = () => {
    const size = 128;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.6)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.18)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    return canvas.toDataURL('image/png');
};

/**
 * Three depth layers: navy-lit far bank, gold mid bank, and a warm golden
 * "floor" drifting below the plane. Layer groups drift on offset phases and
 * counter-shift against the pointer so the scene reads as three parallax planes.
 */
const CloudField = () => {
    const cloudSprite = useMemo(buildCloudSprite, []);
    const far = useRef();
    const mid = useRef();
    const near = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        const px = state.pointer.x;

        far.current.position.x = Math.sin(t * 0.02) * 0.6 + px * 0.12;
        mid.current.position.x = Math.sin(t * 0.03 + 2) * 0.8 + px * 0.3;
        near.current.position.x = Math.sin(t * 0.025 + 4) * 1.0 + px * 0.55;
    });

    return (
        <Clouds material={THREE.MeshLambertMaterial} texture={cloudSprite} limit={220}>
            <group ref={far}>
                <Cloud seed={2} segments={16} bounds={[9, 1.6, 2]} volume={8} color="#8FA5DC"
                       opacity={0.22} speed={0.08} fade={30} position={[-7, 1.2, -9]}/>
                <Cloud seed={7} segments={14} bounds={[8, 1.4, 2]} volume={7} color="#8FA5DC"
                       opacity={0.2} speed={0.08} fade={30} position={[3, 2.6, -10]}/>
                <Cloud seed={11} segments={14} bounds={[8, 1.4, 2]} volume={7} color="#98AADC"
                       opacity={0.18} speed={0.08} fade={30} position={[9, 0.6, -9]}/>
                <Cloud seed={5} segments={12} bounds={[7, 1.2, 2]} volume={6} color="#8FA5DC"
                       opacity={0.16} speed={0.08} fade={30} position={[-2, -0.6, -11]}/>
            </group>

            <group ref={mid}>
                <Cloud seed={3} segments={16} bounds={[7, 1.3, 2]} volume={6.5} color="#E8C79A"
                       opacity={0.28} speed={0.1} fade={26} position={[-5, -1.6, -7]}/>
                <Cloud seed={9} segments={14} bounds={[6, 1.1, 2]} volume={5.5} color="#E8C79A"
                       opacity={0.24} speed={0.1} fade={26} position={[5.5, -1.2, -7.5]}/>
                <Cloud seed={13} segments={12} bounds={[6, 1.1, 2]} volume={5.5} color="#D9BC94"
                       opacity={0.2} speed={0.1} fade={26} position={[0.5, 3.8, -8]}/>
            </group>

            <group ref={near}>
                <Cloud seed={4} segments={18} bounds={[7, 0.9, 1.5]} volume={5.5} color="#F2D3A0"
                       opacity={0.32} speed={0.12} fade={24} position={[-3.5, -2.4, -6]}/>
                <Cloud seed={8} segments={16} bounds={[6, 0.9, 1.5]} volume={5} color="#F2D3A0"
                       opacity={0.28} speed={0.12} fade={24} position={[4.5, -2.7, -6.5]}/>
                <Cloud seed={15} segments={14} bounds={[5, 0.8, 1.5]} volume={4.5} color="#F5D9AC"
                       opacity={0.24} speed={0.12} fade={24} position={[0, -3, -5.5]}/>
            </group>
        </Clouds>
    );
};

export default CloudField;
