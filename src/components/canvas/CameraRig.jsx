import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraRig() {
  const { camera } = useThree();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollRef.current = window.scrollY / scrollHeight;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Targets for camera position and lookAt points
  // 6 key scroll phases corresponding to: Hero, About, Skills, Projects, Experience, Certs/Contact
  const keyframes = [
    { pos: [0, 0, 5.5], look: [0, 0, 0] },          // Hero (Brain at 0)
    { pos: [1.8, -4, 4.5], look: [-0.5, -4, 0] },    // About (SkillOrb at -4)
    { pos: [-1.8, -8, 5.0], look: [0.5, -8, 0] },    // Skills (Bar chart at -8)
    { pos: [0, -12, 6.2], look: [0, -12, 0] },      // Projects (Carousel at -12)
    { pos: [1.5, -16, 5.0], look: [-0.5, -16, 0] },  // Experience (Timeline at -16)
    { pos: [0, -20.5, 6.0], look: [0, -20.5, 0] }    // Certs/Contact (Vortex at -20.5)
  ];

  const currentPos = useRef(new THREE.Vector3(...keyframes[0].pos));
  const currentLook = useRef(new THREE.Vector3(...keyframes[0].look));
  const targetPos = new THREE.Vector3();
  const targetLook = new THREE.Vector3();

  useFrame((state, delta) => {
    // Determine interpolation segment based on scrollRef.current (0.0 to 1.0)
    const segmentCount = keyframes.length - 1;
    const progress = scrollRef.current * segmentCount;
    const index = Math.min(Math.floor(progress), segmentCount - 1);
    const subProgress = progress - index;

    const startFrame = keyframes[index];
    const endFrame = keyframes[index + 1];

    // Position interpolation target
    targetPos.set(
      THREE.MathUtils.lerp(startFrame.pos[0], endFrame.pos[0], subProgress),
      THREE.MathUtils.lerp(startFrame.pos[1], endFrame.pos[1], subProgress),
      THREE.MathUtils.lerp(startFrame.pos[2], endFrame.pos[2], subProgress)
    );

    // LookAt interpolation target
    targetLook.set(
      THREE.MathUtils.lerp(startFrame.look[0], endFrame.look[0], subProgress),
      THREE.MathUtils.lerp(startFrame.look[1], endFrame.look[1], subProgress),
      THREE.MathUtils.lerp(startFrame.look[2], endFrame.look[2], subProgress)
    );

    // Smoothly interpolate the camera using lerp with dampening
    // Adjust factor based on delta for frame-rate independence
    const speed = 4 * delta;
    currentPos.current.lerp(targetPos, Math.min(speed, 1));
    currentLook.current.lerp(targetLook, Math.min(speed, 1));

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLook.current);
  });

  return null;
}
