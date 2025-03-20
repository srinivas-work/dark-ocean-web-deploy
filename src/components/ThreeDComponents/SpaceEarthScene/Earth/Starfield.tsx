import { useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

interface Star {
  pos: THREE.Vector3;
  update: (t: number) => number;
  minDist: number;
}

interface GetPointsOptions {
  numStars?: number;
}

function getPoints({ numStars = 500 }: GetPointsOptions = {}) {
  function randomSpherePoint(): Star {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    const rate = Math.random() * 2; // Increase the rate for faster brightness changes
    const prob = Math.random();
    const light = Math.random();

    function update(t: number) {
      const lightness = prob > 0.8 ? light + Math.sin(t * rate) * 1 : light;
      return lightness;
    }

    return {
      pos: new THREE.Vector3(x, y, z),
      update,
      minDist: radius,
    };
  }

  const verts: number[] = [];
  const colors: number[] = [];
  const positions: Star[] = [];
  let col: THREE.Color;

  for (let i = 0; i < numStars; i += 1) {
    const p = randomSpherePoint();
    const { pos } = p;
    positions.push(p);
    col = new THREE.Color().setHSL(Math.random(), 0.2, Math.random());
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const circleTexture = useLoader(THREE.TextureLoader, "/img/home/circle.png");

  const mat = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    map: circleTexture,
  });

  const points = new THREE.Points(geo, mat);

  function update(t: number) {
    points.rotation.y -= 0.001; // Increase rotation speed
    const updatedColors: number[] = [];
    for (let i = 0; i < numStars; i += 1) {
      const p = positions[i];
      const bright = p.update(t);
      col = new THREE.Color().setHSL(0.6, 0.2, bright);
      updatedColors.push(col.r, col.g, col.b);
    }
    geo.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(updatedColors, 3)
    );
    geo.attributes.color.needsUpdate = true;
  }

  points.userData = { update };
  return points;
}

const Starfield: React.FC = () => {
  const ref = React.useRef<THREE.Points | null>(null);

  const points = React.useMemo(() => getPoints({ numStars: 1500 }), []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.userData.update(state.clock.elapsedTime * 5);
    }
  });

  return <primitive object={points} ref={ref} />;
};

export default Starfield;
