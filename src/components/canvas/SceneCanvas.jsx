import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BrainMesh from './BrainMesh';
import SkillOrb from './SkillOrb';
import CameraRig from './CameraRig';

// Ambient particle background spanning vertically
function BackgroundParticles() {
  const pointsRef = useRef();
  const particleCount = 300;

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 12;
      const y = Math.random() * -30 + 5;
      const z = (Math.random() - 0.5) * 8 - 2;
      pos.push(x, y, z);
    }
    return new Float32Array(pos);
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const time = clock.getElapsedTime();
    const arr = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      arr[i3] += Math.sin(time * 0.2 + i) * 0.0005;
      arr[i3 + 2] += Math.cos(time * 0.1 + i) * 0.0005;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.02} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

// Interactive Project Showcase - rotating rings and orbs
function Projects3DNodes() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      groupRef.current.rotation.y = -t * 0.08;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -12, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 1.82, 64]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2 + 0.3, 0, 0]}>
        <ringGeometry args={[2.5, 2.52, 64]} />
        <meshBasicMaterial color="#7f00ff" transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[1.8, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#00f2fe" />
      </mesh>
      <mesh position={[-1.8, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#7f00ff" />
      </mesh>
      <mesh position={[0, 0, 1.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#4facfe" />
      </mesh>
      <mesh position={[0, 0, -1.8]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#00f2fe" />
      </mesh>
    </group>
  );
}

// 3D Experience Timeline Track (helix spiral) using primitive
function Experience3DHelix() {
  const groupRef = useRef();

  // Create THREE.Line object imperatively because <line> JSX is an SVG element
  const helixLine = useMemo(() => {
    const points = [];
    const count = 100;
    const height = 4;
    const turns = 2.5;
    const radius = 1.0;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * turns * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        -height / 2 + t * height,
        Math.sin(angle) * radius
      ));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#7f00ff', transparent: true, opacity: 0.3 });
    return new THREE.Line(geometry, material);
  }, []);

  const nodes = useMemo(() => [
    { pos: [Math.cos(0) * 1.0, -1.8, Math.sin(0) * 1.0], color: '#00f2fe' },
    { pos: [Math.cos(Math.PI) * 1.0, 0.2, Math.sin(Math.PI) * 1.0], color: '#7f00ff' },
    { pos: [Math.cos(Math.PI * 2) * 1.0, 1.8, Math.sin(Math.PI * 2) * 1.0], color: '#4facfe' }
  ], []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[0, -16, 0]}>
      <primitive object={helixLine} />
      {nodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <dodecahedronGeometry args={[0.12, 0]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}
    </group>
  );
}

// 3D Vortex for Certifications & Contact section
function Contact3DVortex() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  const count = 150;
  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 * 6;
      const r = (i / count) * 3.5 + 0.5;
      pos.push(Math.cos(angle) * r, Math.sin(angle) * r, (Math.random() - 0.5) * 0.5);
    }
    return new Float32Array(pos);
  }, []);

  return (
    <group ref={groupRef} position={[0, -20.5, 0]} rotation={[Math.PI / 3, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00f2fe" size={0.03} transparent opacity={0.5} />
      </points>
    </group>
  );
}

export default function SceneCanvas() {
  return (
    <div className="fixed inset-0 w-screen h-screen" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#060913');
        }}
      >
        <color attach="background" args={['#060913']} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2fe" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#7f00ff" />
        <directionalLight position={[0, 5, 5]} intensity={1.0} color="#ffffff" />

        <BackgroundParticles />
        <BrainMesh />
        <SkillOrb />
        <Projects3DNodes />
        <Experience3DHelix />
        <Contact3DVortex />
        <CameraRig />
      </Canvas>
    </div>
  );
}
