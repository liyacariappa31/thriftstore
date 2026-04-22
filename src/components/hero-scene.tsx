"use client";

import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function PulseCore() {
  const groupRef = useRef<Group>(null);
  const shellRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !shellRef.current || !ringRef.current) {
      return;
    }

    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y += delta * 0.18;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.12;
    shellRef.current.rotation.y += delta * 0.42;
    shellRef.current.rotation.z = Math.sin(t * 0.5) * 0.18;
    ringRef.current.rotation.x += delta * 0.6;
    ringRef.current.rotation.z += delta * 0.24;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.7} rotationIntensity={1.1} floatIntensity={1.6}>
        <mesh ref={shellRef} scale={1.45}>
          <icosahedronGeometry args={[1, 20]} />
          <MeshDistortMaterial
            color="#f14b2d"
            speed={2.6}
            distort={0.45}
            roughness={0.05}
            metalness={0.85}
            emissive="#ffb14a"
            emissiveIntensity={0.45}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.05, 0.05, 32, 200]} />
        <meshStandardMaterial
          color="#f8e6cc"
          roughness={0.16}
          metalness={1}
          emissive="#ffffff"
          emissiveIntensity={0.15}
        />
      </mesh>

      <mesh rotation={[-0.7, 0.2, 1.05]} scale={1.24}>
        <torusKnotGeometry args={[1.62, 0.09, 220, 24, 2, 3]} />
        <meshStandardMaterial
          color="#7f68ff"
          roughness={0.22}
          metalness={0.9}
          transparent
          opacity={0.75}
        />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="scene-shell">
      <Canvas camera={{ position: [0, 0, 6], fov: 38 }} dpr={[1, 1.6]}>
        <color attach="background" args={["#050816"]} />
        <fog attach="fog" args={["#050816", 7, 18]} />
        <ambientLight intensity={1.3} />
        <directionalLight position={[4, 5, 6]} intensity={2.5} color="#fff2d9" />
        <pointLight position={[-3, -2, 3]} intensity={16} color="#ff5b2d" />
        <pointLight position={[4, 2, -2]} intensity={12} color="#618bff" />
        <Sparkles
          count={120}
          size={4}
          scale={[12, 8, 8]}
          speed={0.4}
          color="#f8ead8"
        />
        <PulseCore />
      </Canvas>
    </div>
  );
}
