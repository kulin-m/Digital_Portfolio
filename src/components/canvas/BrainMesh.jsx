import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BrainMesh() {
  const meshRef = useRef();
  const pointsRef = useRef();
  const linesRef = useRef();

  const particleCount = 120;
  const maxDistance = 0.95;
  const maxLines = 300;

  // Generate initial vertices for a brain-like shape (two lobes, slightly compressed)
  const [positions, initialPositions] = useMemo(() => {
    const pos = [];
    const initPos = [];

    for (let i = 0; i < particleCount; i++) {
      const isLeftLobe = Math.random() > 0.5;
      const xOffset = isLeftLobe ? -0.4 : 0.4;

      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 0.5 + 0.6 * Math.random();

      const x = xOffset + r * Math.sin(phi) * Math.cos(theta) * 0.95;
      const y = r * Math.cos(phi) * 1.1;
      const z = r * Math.sin(phi) * Math.sin(theta) * 0.7;

      pos.push(x, y, z);
      initPos.push({ x, y, z, phase: Math.random() * Math.PI * 2, speed: 0.8 + Math.random() * 1.2 });
    }

    return [new Float32Array(pos), initPos];
  }, []);

  // Pre-allocate line segment buffers
  const [linePositions, lineColors] = useMemo(() => {
    return [new Float32Array(maxLines * 6), new Float32Array(maxLines * 6)];
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (!meshRef.current || !pointsRef.current || !linesRef.current) return;

    // Slow rotation
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;

    // Pulse nodes
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array;

    for (let i = 0; i < particleCount; i++) {
      const init = initialPositions[i];
      const i3 = i * 3;
      const pulse = Math.sin(time * init.speed + init.phase) * 0.05;
      arr[i3] = init.x + pulse * 0.3;
      arr[i3 + 1] = init.y + pulse * 0.5;
      arr[i3 + 2] = init.z + pulse * 0.3;
    }
    posAttr.needsUpdate = true;

    // Recalculate line connections
    const linePosArr = linesRef.current.geometry.attributes.position.array;
    const lineColArr = linesRef.current.geometry.attributes.color.array;

    let lineIdx = 0;

    for (let i = 0; i < particleCount && lineIdx < maxLines; i++) {
      for (let j = i + 1; j < particleCount && lineIdx < maxLines; j++) {
        const i3 = i * 3;
        const j3 = j * 3;

        const dx = arr[i3] - arr[j3];
        const dy = arr[i3 + 1] - arr[j3 + 1];
        const dz = arr[i3 + 2] - arr[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          const l6 = lineIdx * 6;
          const alpha = 1.0 - (dist / maxDistance);

          // Start vertex
          linePosArr[l6]     = arr[i3];
          linePosArr[l6 + 1] = arr[i3 + 1];
          linePosArr[l6 + 2] = arr[i3 + 2];
          // End vertex
          linePosArr[l6 + 3] = arr[j3];
          linePosArr[l6 + 4] = arr[j3 + 1];
          linePosArr[l6 + 5] = arr[j3 + 2];

          // Colors: cyan for upper nodes, violet for lower
          const c1 = arr[i3 + 1] > 0 ? [0, 0.95, 1] : [0.5, 0, 1];
          const c2 = arr[j3 + 1] > 0 ? [0, 0.95, 1] : [0.5, 0, 1];

          lineColArr[l6]     = c1[0] * alpha;
          lineColArr[l6 + 1] = c1[1] * alpha;
          lineColArr[l6 + 2] = c1[2] * alpha;
          lineColArr[l6 + 3] = c2[0] * alpha;
          lineColArr[l6 + 4] = c2[1] * alpha;
          lineColArr[l6 + 5] = c2[2] * alpha;

          lineIdx++;
        }
      }
    }

    // Zero out unused line slots
    for (let k = lineIdx * 6; k < linePosArr.length; k++) {
      linePosArr[k] = 0;
      lineColArr[k] = 0;
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Node points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#00f2fe"
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
        />
      </lineSegments>
    </group>
  );
}
