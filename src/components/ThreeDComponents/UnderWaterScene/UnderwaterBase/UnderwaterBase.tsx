import { SpotLight, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import fShaderCausticsMod from "../../../utils/shaders/underwater_modified_caustics/fShaderCausticsMod.glsl";
import vShaderCausticsMod from "../../../utils/shaders/underwater_modified_caustics/vShaderCausticsMod.glsl";
import useIsPhoneScreen from "../../../utils/hooks/useIsPhoneScreen";

//useGLTF.preload("/models/underwater/underwater_pipe.glb");
//useGLTF.preload("/models/underwater/underwater_ground.glb");
useGLTF.preload("/models/underwater/rov.glb");
useGLTF.preload("/models/underwater/well_rig.glb");
useGLTF.preload("/models/underwater/well_rig_pipe.glb");

const UnderwaterBase = () => {
  const scroll = useScroll();
  const isPhoneScreen = useIsPhoneScreen();

  const pipe = useMemo(
    () => useGLTF("/models/underwater/underwater_pipe.glb").scene,
    []
  );
  const ground = useMemo(
    () => useGLTF("/models/underwater/underwater_ground.glb").scene,
    []
  );
  const rov = useMemo(() => useGLTF("/models/underwater/rov.glb").scene, []);
  const well_rig = useMemo(
    () => useGLTF("/models/underwater/well_rig.glb").scene,
    []
  );
  const well_rig_pipe = useMemo(
    () => useGLTF("/models/underwater/well_rig_pipe.glb").scene,
    []
  );

  const underwaterBaseRef = useRef<THREE.Group>(null);

  const targetVisibilityPoint = 0.52;

  const groundRef = useRef(null);
  const rovGroupRef = useRef<THREE.Group>(null);
  const rovFrontSpotLightRef = useRef<THREE.SpotLight>(null);
  const rovFrontSpotLightTargetRef = useRef<THREE.Mesh>(null);

  // Memoize uniforms to avoid recreating them on every render
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(
          window.innerWidth / 1.5,
          window.innerHeight / 1.5
        ), //By reducing the resolution caustics size is also reduced
      },
      uMixIntensity: { value: 0.15 },
    }),
    []
  );

  // Store references to materials for easy updates
  const materialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);

  useEffect(() => {
    const processScene = (scene: THREE.Object3D, mixIntensity: number) => {
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const material = mesh.material as THREE.MeshPhysicalMaterial;

          material.onBeforeCompile = (shader) => {
            shader.uniforms.uTime = uniforms.uTime;
            shader.uniforms.uResolution = uniforms.uResolution;
            shader.uniforms.uMixIntensity =
              mixIntensity === 0
                ? uniforms.uMixIntensity
                : { value: mixIntensity };

            shader.vertexShader = vShaderCausticsMod;
            shader.fragmentShader = fShaderCausticsMod;

            // Store the shader and uniforms in userData
            material.userData.shader = shader;
            material.userData.uniforms = shader.uniforms;
          };

          // Store the material for later updates
          materialsRef.current.push(material);
        }
      });
    };

    processScene(pipe, 0.15);
    processScene(rov, 0.32);
    processScene(well_rig, 0.05);
    processScene(ground, 0);

    // Cleanup function to reset materials if needed
    return () => {
      materialsRef.current.forEach((material) => {
        //material.onBeforeCompile = null;
        material.userData.shader = null;
        material.userData.uniforms = null;
      });
    };
  }, [pipe, rov, ground, uniforms]);

  //Setting RovSpotLight to the target
  useEffect(() => {
    if (rovFrontSpotLightRef.current && rovFrontSpotLightTargetRef.current) {
      rovFrontSpotLightRef.current.target = rovFrontSpotLightTargetRef.current;
    }
  }, []);

  useFrame((_, delta) => {
    const scrollOffset = scroll.offset;

    // Update uTime for all materials
    uniforms.uTime.value += delta;

    //Making ground caustics disappear conditionally
    //uniforms.uMixIntensity.value = scrollOffset > 0.89 ? 0 : 0.15;
    const targetCausticOpacity = scrollOffset >= 0.69 ? 0 : 0.15;

    uniforms.uMixIntensity.value = THREE.MathUtils.lerp(
      uniforms.uMixIntensity.value,
      targetCausticOpacity,
      0.05
    );

    if (!underwaterBaseRef.current || !rovGroupRef.current) {
      return;
    }

    //Snapping to the view
    const targetY = scrollOffset >= targetVisibilityPoint ? -0.9 : -30;
    easing.damp3(
      underwaterBaseRef.current.position,
      [
        underwaterBaseRef.current.position.x,
        targetY,
        underwaterBaseRef.current.position.z,
      ],
      0.3,
      delta
    );
    // gsap.to(underwaterBaseRef.current.position, {
    //   y: targetY,
    //   duration: 1, // Adjust as needed
    //   ease: "power2.out", // Similar to damping
    // });

    // //Moving ROV Group
    if (scrollOffset >= targetVisibilityPoint) {
      rovGroupRef.current.position.x -= 0.03;

      //Infinite loop effect
      if (rovGroupRef.current.position.x < -73) {
        rovGroupRef.current.position.x = 18; // Reset to the right
      }
    } else {
      // rovRef.current.position.x = 0;
      // rovRef.current.position.y = 0;

      easing.damp3(
        rovGroupRef.current.position,
        [3, rovGroupRef.current.position.y, rovGroupRef.current.position.z],
        0.3,
        delta
      );
    }
  });

  return (
    <group ref={underwaterBaseRef} position={[0, -30, 0]}>
      <group ref={rovGroupRef} position={[0, 1.5, -7]}>
        <primitive object={rov} scale={0.14} position={[3, 1.4, 0]} />

        <mesh ref={rovFrontSpotLightTargetRef} position={[-0.8, -0.8, -1.3]} />
        <SpotLight
          ref={rovFrontSpotLightRef}
          penumbra={1}
          distance={5}
          angle={0.5}
          attenuation={5}
          anglePower={5}
          intensity={2}
          radiusTop={0.2}
          color="#06D6F0"
          position={[1.5, 1.5, -0.4]}
        />
      </group>

      <primitive
        object={pipe}
        scale={0.2}
        position={[1, -0.65, -7]}
        //rotation={[-0.1, Math.PI / 2, 0]}
      />

      <primitive
        ref={groundRef}
        object={ground}
        scale={92}
        //rotation={[0, -Math.PI / 2, 0]}
        position={[1, -32.7, -12.3]}
      />
      <group position={isPhoneScreen ? [-8.5, 0, 0.5] : undefined}>
        <primitive
          object={well_rig}
          position={[11.76, 1.71, 23.33]}
          scale={0.92}
        />

        <primitive
          object={well_rig_pipe}
          position={[11.33, -21.24, 24]}
          scale={[0.92, 1.76, 0.92]}
        />
      </group>
      <ambientLight intensity={2} />
    </group>
  );
};

export default UnderwaterBase;
