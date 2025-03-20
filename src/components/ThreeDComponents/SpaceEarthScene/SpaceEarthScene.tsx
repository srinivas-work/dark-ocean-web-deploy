import { Hud, PerspectiveCamera, useFBO, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import useIsPhoneScreen from "../../utils/hooks/useIsPhoneScreen";
import fRenderTargetShader from "../../utils/shaders/renderTargetShader/fRenderTargetShader.glsl";
import vRenderTargetShader from "../../utils/shaders/renderTargetShader/vRenderTargetShader.glsl";
import Earth from "./Earth/Earth";
import Starfield from "./Earth/Starfield";

const SpaceEarthScene: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isPhoneScreen = useIsPhoneScreen();

  const { gl, viewport } = useThree();
  const scroll = useScroll();

  const targetSpaceSceneSlidingPoint = 0.25;

  // Refs
  const groupRef = useRef<THREE.Group>(null);
  const planeRef = useRef<THREE.Mesh>(null);
  const spaceShaderRef = useRef<THREE.ShaderMaterial>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const spaceRenderContainerRef = useRef<THREE.Group>(null);

  // Framebuffer Object (FBO)
  const fbo = useFBO();

  // Shader Uniforms
  const renderTargetUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTexture: { value: null },
      uOpacity: { value: 1 },
      uStarFade: { value: 0.9 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth / 4, window.innerHeight / 4),
      },
    }),
    []
  );

  //Storing Initial Camera State
  const initialCameraState = useRef({
    position: new THREE.Vector3(),
    rotation: new THREE.Euler(),
    zoom: 1,
  });

  // Camera Keyframes
  const keyframes = useMemo(() => {
    const initialZoom = isPhoneScreen ? 0.6 : 1;
    const zoomFactor = isPhoneScreen ? 1.5 : 4.5;
    const midZoomFactor = isPhoneScreen ? 3.5 : 4.5;
    return [
      {
        progress: 0,
        position: new THREE.Vector3(0, 0, 5),
        rotation: new THREE.Euler(0, 0, 0),
        zoom: initialZoom,
      },
      {
        progress: 0.3,
        position: new THREE.Vector3(isPhoneScreen ? -6 : -7, -2, 3),
        rotation: new THREE.Euler(Math.PI / 6, -Math.PI / 4, 0),
        zoom: midZoomFactor,
      },
      {
        progress: 0.53,
        position: new THREE.Vector3(-2.3, 0.6, 3),
        rotation: new THREE.Euler(Math.PI / 6, -Math.PI / 4, 0),
        zoom: zoomFactor,
      },
      {
        progress: 1,
        position: new THREE.Vector3(-2.3, 0.6, 3),
        rotation: new THREE.Euler(Math.PI / 6, -Math.PI / 4, 0),
        zoom: zoomFactor,
      },
      // {
      //   progress: 1, // Ensure the last keyframe covers the entire scroll range
      //   position: new THREE.Vector3(-2.3, 0.6, 3),
      //   rotation: new THREE.Euler(Math.PI / 6, -Math.PI / 4, 0),
      //   zoom: 4.5,
      // },
    ];
  }, [isPhoneScreen]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Save Initial Camera State on Mount
  useEffect(() => {
    if (!cameraRef.current) return;
    initialCameraState.current.position.copy(cameraRef.current.position);
    initialCameraState.current.rotation.copy(cameraRef.current.rotation);
    initialCameraState.current.zoom = cameraRef.current.zoom;
  }, [cameraRef]);

  // Camera Animation Handler
  const updateCameraPosition = useCallback(
    (optimizedScrollOffset: number) => {
      const camera = cameraRef.current;
      if (!camera) return;

      // Clamp the scroll offset to the valid range [0, 1]
      const clampedOffset = Math.min(Math.max(optimizedScrollOffset, 0), 1);

      let startKeyframe, endKeyframe;
      for (let i = 0; i < keyframes.length - 1; i++) {
        if (
          clampedOffset >= keyframes[i].progress &&
          clampedOffset <= keyframes[i + 1].progress
        ) {
          startKeyframe = keyframes[i];
          endKeyframe = keyframes[i + 1];
          break;
        }
      }

      if (startKeyframe && endKeyframe) {
        const segmentProgress =
          (clampedOffset - startKeyframe.progress) /
          (endKeyframe.progress - startKeyframe.progress);
        camera.position.lerpVectors(
          startKeyframe.position,
          endKeyframe.position,
          segmentProgress
        );
        camera.rotation.set(
          gsap.utils.interpolate(
            startKeyframe.rotation.x,
            endKeyframe.rotation.x,
            segmentProgress
          ),
          gsap.utils.interpolate(
            startKeyframe.rotation.y,
            endKeyframe.rotation.y,
            segmentProgress
          ),
          gsap.utils.interpolate(
            startKeyframe.rotation.z,
            endKeyframe.rotation.z,
            segmentProgress
          )
        );
        camera.zoom = gsap.utils.interpolate(
          startKeyframe.zoom,
          endKeyframe.zoom,
          segmentProgress
        );
        camera.updateProjectionMatrix();
      }
    },
    [keyframes, cameraRef]
  );

  // Scroll Animation Handler
  const updateSceneOnScroll = useCallback(
    (delta: number) => {
      const scrollOffset = scroll.offset;
      updateCameraPosition(scrollOffset * 2.8);

      if (spaceShaderRef.current) {
        spaceShaderRef.current.uniforms.uTime.value -= delta * 0.65;
        spaceShaderRef.current.uniforms.uOpacity.value = gsap.utils.interpolate(
          spaceShaderRef.current.uniforms.uOpacity.value,
          scrollOffset >= 0.39 ? 0 : 1,
          0.1
        );
        spaceShaderRef.current.uniforms.uStarFade.value =
          gsap.utils.interpolate(
            spaceShaderRef.current.uniforms.uStarFade.value,
            scrollOffset >= 0.31 ? 0 : 1.5,
            0.15
          );
      }

      //Sliding the scene up
      if (spaceRenderContainerRef.current) {
        spaceRenderContainerRef.current.visible =
          scrollOffset <= targetSpaceSceneSlidingPoint + 0.05;
        gsap.to(spaceRenderContainerRef.current.position, {
          y:
            scrollOffset >= targetSpaceSceneSlidingPoint
              ? viewport.height + 2.5
              : 0,
          duration: scrollOffset >= targetSpaceSceneSlidingPoint ? 2 : 0.25,
          ease: "power2.out",
        });
      }
    },
    [scroll, updateCameraPosition, viewport.height]
  );

  useFrame((_, delta) => {
    if (!groupRef.current || !spaceShaderRef.current || !cameraRef.current)
      return;

    // Hide group from main scene before rendering into FBO
    groupRef.current.visible = true;
    gl.setRenderTarget(fbo);
    gl.clear(); // Clear FBO before rendering
    gl.render(groupRef.current, cameraRef.current);
    groupRef.current.visible = false;
    gl.setRenderTarget(null);

    // Assign FBO texture to the shader
    spaceShaderRef.current.uniforms.uTexture.value = fbo.texture;

    updateSceneOnScroll(delta);
  });

  //Avoiding Rerenders
  if (!isMounted) return null;

  return (
    <Hud>
      <group ref={groupRef}>
        <Earth />
        <Starfield />

        {/* <Nebula /> */}
      </group>
      <group ref={spaceRenderContainerRef}>
        <mesh ref={planeRef}>
          <PerspectiveCamera
            ref={cameraRef}
            position={[0, 0, 5]}
            fov={75}
            aspect={1.513}
            far={75}
            up={[0, 2, 0]}
            frustumCulled={false}
          />

          <planeGeometry args={[viewport.width, viewport.height]} />
          <shaderMaterial
            ref={spaceShaderRef}
            uniforms={renderTargetUniforms}
            transparent
            vertexShader={vRenderTargetShader}
            fragmentShader={fRenderTargetShader}
            polygonOffset
            polygonOffsetFactor={1}
            polygonOffsetUnits={1}
          />
        </mesh>
      </group>
    </Hud>
  );
};

export default SpaceEarthScene;
