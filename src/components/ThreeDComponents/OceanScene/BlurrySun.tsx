import { useRef } from "react";
import * as THREE from "three";
import { ShaderMaterial } from "three";
import { blurrySunColor } from "../../utils/data/colorInfo";

// Fragment Shader to simulate blur

const vertexShader = `
varying vec2 vUv;

void main(){
vUv = uv;

gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`;

const fragmentShader = `
  uniform vec3 sunColor;

  varying vec2 vUv;

  void main() {
    float opacity = 0.8;
    float edge = 0.45;
    float maxValue = 0.9;
    float edgeMin = edge;
    float edgeMax = maxValue - edge;

    float xp = smoothstep( 0.03, edgeMin, vUv.x );
    float xn = smoothstep( maxValue, edgeMax, vUv.x );
    float yp = smoothstep( 0.05, edgeMin, vUv.y );
    float yn = smoothstep( maxValue, edgeMax, vUv.y );

    vec4 smoothSun = vec4(sunColor, (xp*xn*yp*yn) * opacity);
    
    gl_FragColor = smoothSun + smoothSun * 3.0;
  }
`;

const BlurrySun = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Shader material
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      sunColor: { value: new THREE.Color(blurrySunColor) }, // Sun color
    },
    transparent: true,
  });

  return (
    <mesh ref={meshRef} position={[0, -0.9, -4.5]}>
      <circleGeometry args={[1, 100]} /> {/* Create a circular shape */}
      <shaderMaterial {...material} />
    </mesh>
  );
};

export default BlurrySun;

{
  /* Sun */
}
{
  /* <mesh ref={sunRef} position={[0, -0.8, -4.5]} scale={0.4}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial
                color={"yellow"}
                emissive={"yellow"}
                emissiveIntensity={4}
              />
            </mesh> */
}

{
  /* <EffectComposer multisampling={0} enableNormalPass={false}>
            <LensFlareEffect {...lensFlareProps} />
            <GodRays
              //@ts-ignore
              sun={sunRef}
              blendFunction={BlendFunction.SCREEN} // The blend function of this effect.
              samples={60} // The number of samples per pixel.
              density={10.96} // The density of the light rays.
              decay={0.9} // An illumination decay factor.
              weight={0.11} // A light ray weight factor. default 0.4
              exposure={0.2} // A constant attenuation coefficient.
              clampMax={1} // An upper bound for the saturation of the overall effect.
              width={50} // Render width.
              height={50} // Render height.
              kernelSize={KernelSize.LARGE} // The blur kernel size. Has no effect if blur is disabled.
              blur={true} // Whether the god rays should be blurred to reduce artifacts.
            />
          </EffectComposer> */
}
