import { useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { waterColor } from "../../../utils/data/colorInfo.js";
import WaterSimple from "./WaterSimple.js";

const SimpleOcean = () => {
  const waterRef = useRef<THREE.Group>(null);
  //const timeline = useRef<gsap.core.Timeline | null>(null);
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "/textures/ocean/waternormals.jpg"
  );

  const scroll = useScroll();

  // const { position, rotationX, rotationY, rotationZ } = useControls(
  //   "Ocean Controls",

  //   {
  //     position: {
  //       value: [0, -2.2, -5], // Default position [x, y, z] [0,-3,-10.3] for more visibility
  //       step: 0.1, // Step for tweaking the values
  //     },
  //     rotationX: {
  //       value: -1.72, // Default rotation in radians
  //       step: 0.01, // Step for tweaking
  //     },
  //     rotationY: {
  //       value: 0, // Default rotation in radians
  //       step: 0.1,
  //     },
  //     rotationZ: {
  //       value: 0, // Default rotation in radians
  //       step: 0.1,
  //     },
  //   },
  //   { collapsed: true }
  // );

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  useEffect(() => {
    if (waterRef.current) {
      // Ensure the texture repeats for seamless water normals
      waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

      // Create Water object
      const water = new WaterSimple(new THREE.PlaneGeometry(2, 2, 25, 25), {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: waterNormals,
        sunDirection: new THREE.Vector3(20, 1, 1).normalize(),
        sunColor: 0xffffff,
        waterColor: waterColor,
        distortionScale: 0.7,
        side: 2,
      });

      // Add the water object to the group
      waterRef.current.add(water);

      return () => {
        waterRef.current?.remove(water);
      };
    }
  }, []);

  //Rotating the water once out of sight
  // useEffect(() => {
  //   if (waterRef.current) {
  //     const tl = gsap.timeline({
  //       defaults: { duration: 5, ease: "power2.inOut" },
  //     });

  //     // Position timeline
  //     tl.to(waterRef.current.rotation, {
  //       x: -Math.PI / 3,
  //     });

  //     timeline.current = tl;
  //   }
  // }, []);

  useFrame(() => {
    if (waterRef.current) {
      // Type assertion to tell TypeScript this is the Water object
      const waterObj = waterRef.current.children[0] as WaterSimple;
      //@ts-ignore
      waterObj.material.uniforms.time.value -= 0.11 / 60.0;

      // //
      // //Changing water color and rotating when getting out of the scene
      const scrollOffset = scroll.offset;

      //@ts-ignore
      waterObj.material.uniforms["underwaterBlueIntensity"].value = Math.min(
        0.75,
        scrollOffset / 4
      );

      // waterRef.current.rotation.x =
      //   -1.72 + scrollOffset * (1.72 - Math.PI / 3);
    }
  });

  return (
    <group
      ref={waterRef}
      position={[0, -2.2, -5]}
      rotation={[-1.72, 0, 0]}
      scale={[55, 15, 15]}
    />
  );
};
export default SimpleOcean;
