import { useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SimplexNoise } from "three-stdlib";

const UnderWaterParticles = () => {
  const particlesRef = useRef<THREE.Group>(null);
  const simplex = useMemo(() => new SimplexNoise(), []);
  const rand = useMemo(() => Math.random(), []);

  const scroll = useScroll();

  const [sprite1, sprite2] = useTexture([
    "textures/sprites/line.png",
    "textures/sprites/line.png",
  ]);

  // const [sprite1, sprite2, sprite3, sprite4, sprite5] = useTexture([
  //   "textures/sprites/line.png",
  //   "textures/sprites/line.png",
  //   "textures/sprites/line.png",
  //   "textures/sprites/line.png",
  //   "textures/sprites/line.png",
  // ]);

  const boundary = 1000;

  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    const vertices: number[] = [];

    for (let i = 0; i < 10000; i++) {
      const x = Math.random() * 2000 - 1000;
      const y = Math.random() * 2000 - 1000;
      const z = Math.random() * 2000 - 1000;
      vertices.push(x, y, z);
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    const materials = [sprite1, sprite2].map((sprite, index) => {
      const material = new THREE.PointsMaterial({
        size: index === 0 ? 10 : 8,
        map: sprite,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        opacity: 0.35,
      });
      material.color.setHSL(0.3 - index * 0.05, 0.5, 0.5); //default value 0.9, now 0.3
      return material;
    });

    const particles = particlesRef.current;

    if (particles) {
      materials.forEach((material) => {
        const points = new THREE.Points(geometry, material);
        particles.add(points);
      });
    }
  }, [sprite1, sprite2]);

  useFrame(() => {
    if (particlesRef.current) {
      const scrollOffset = scroll.offset;

      particlesRef.current.visible =
        scrollOffset >= 0.33 && scrollOffset < 0.71; // Toggle visibility

      if (!particlesRef.current.visible) return;

      const time = (Date.now() * 0.00005) / 2;

      particlesRef.current.children.forEach((particle, i) => {
        const p = particle as THREE.Points;
        p.rotation.y = Math.sin(time * (i + 1));
        p.rotation.x = Math.sin(time * (i + 1));
        p.position.x -=
          1 -
          simplex.noise4d(
            rand * 50 * 0.1,
            rand * 30 * 0.3,
            rand * 10 * 0.5 + time,
            2
          );

        if (p.position.x < -boundary) {
          p.position.x = boundary;
        } else if (p.position.x > boundary) {
          p.position.x = -boundary;
        }
      });
    }
  });

  return <group ref={particlesRef} scale={2} />;
};

export default UnderWaterParticles;
