import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';

export default function SkillOrb() {
  const groupRef = useRef();
  const sphereRef = useRef();

  const skills = [
    "Python", "FastAPI", "Flask", "React.js", "Node.js",
    "MongoDB", "Docker", "Git", "Linux", "scikit-learn",
    "FAISS", "Sentence-BERT", "RAG", "LLMs", "NLP", "C++"
  ];

  // Distribute skills evenly on a sphere using Fibonacci sphere algorithm
  const skillPositions = useMemo(() => {
    const list = [];
    const count = skills.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radius * 1.5;
      const z = Math.sin(theta) * radius * 1.5;
      const yPos = y * 1.5;

      list.push({
        name: skills[i],
        pos: [x, yPos, z],
      });
    }
    return list;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.15;
      groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.y = -time * 0.25;
      sphereRef.current.rotation.z = Math.cos(time * 0.15) * 0.25;
    }
  });

  return (
    <group position={[0, -4, 0]}>
      {/* Inner glowing wireframe icosahedron */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial
          color="#7f00ff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Dynamic glow sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color="#00f2fe"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Orbiting text labels */}
      <group ref={groupRef}>
        {skillPositions.map((skill, index) => (
          <Billboard
            key={index}
            position={skill.pos}
            follow
            lockX={false}
            lockY={false}
            lockZ={false}
          >
            <Text
              fontSize={0.18}
              color={index % 2 === 0 ? "#00f2fe" : "#7f00ff"}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.015}
              outlineColor="#060913"
            >
              {skill.name}
            </Text>
          </Billboard>
        ))}
      </group>
    </group>
  );
}
