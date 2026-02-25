import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as MAX from 'three'; // using three directly is fine, but we'll use Float

function ParticleRing() {
    const ref = useRef();

    // Custom geometry for point clouds
    const count = 2000;
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const r = 2.5 + Math.random() * 1.5;

            const x = r * Math.cos(theta) + (Math.random() - 0.5) * 0.5;
            const y = (Math.random() - 0.5) * 1.5;
            const z = r * Math.sin(theta) + (Math.random() - 0.5) * 0.5;

            arr[i * 3] = x;
            arr[i * 3 + 1] = y;
            arr[i * 3 + 2] = z;
        }
        return arr;
    }, [count]);

    useFrame((state, delta) => {
        ref.current.rotation.y -= delta * 0.05;
        ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    });

    return (
        <group rotation={[Math.PI / 4, 0, 0]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#DDF000"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.4}
                />
            </Points>
        </group>
    );
}

function FloatingShapes() {
    const groupRef = useRef();

    useFrame((state, delta) => {
        groupRef.current.rotation.y += delta * 0.05;
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[-3, 1, -2]}>
                    <torusGeometry args={[0.5, 0.2, 16, 32]} />
                    <meshStandardMaterial color="#C4D600" wireframe transparent opacity={0.3} />
                </mesh>
            </Float>
            <Float speed={1} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[4, -1, -5]}>
                    <tetrahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#DDF000" wireframe transparent opacity={0.2} />
                </mesh>
            </Float>
        </group>
    );
}

export default function Canvas3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-70">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <fog attach="fog" args={['#0F1014', 5, 15]} />
                <ambientLight intensity={0.5} />
                <ParticleRing />
                <FloatingShapes />
            </Canvas>
        </div>
    );
}
