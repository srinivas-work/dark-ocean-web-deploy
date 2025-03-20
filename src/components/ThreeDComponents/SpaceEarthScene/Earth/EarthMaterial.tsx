import { useTexture } from "@react-three/drei";
import React, { useMemo } from "react";
import * as THREE from "three";

const defaultSunDirection = new THREE.Vector3(-2, 0.5, 1.5).normalize();

interface EarthMaterialProps {
  sunDirection?: THREE.Vector3;
}

function getEarthMat(
  sunDirection: THREE.Vector3 = defaultSunDirection,
  earthTextures: THREE.Texture[]
): THREE.ShaderMaterial {
  // const dayMap = useLoader(
  //   THREE.TextureLoader,
  //   "/textures/space/earth_daymap.jpg"
  // );
  // const nightMap = useLoader(
  //   THREE.TextureLoader,
  //   "/textures/space/earth_nightmap.jpg"
  // );
  // const cloudsMap = useLoader(
  //   THREE.TextureLoader,
  //   "/textures/space/earth_clouds.jpg"
  // );

  const uniforms = {
    dayTexture: { value: earthTextures[0] },
    nightTexture: { value: earthTextures[1] },
    cloudsTexture: { value: earthTextures[2] },
    sunDirection: { value: sunDirection },
  };

  const vs = /*glsl*/ `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      // Position
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * viewMatrix * modelPosition;

      // Model normal
      vec3 modelNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

      // Varyings
      vUv = uv;
      vNormal = modelNormal;
      vPosition = modelPosition.xyz;
    }
  `;

  // const fs = /*glsl*/ `
  //   uniform sampler2D dayTexture;
  //   uniform sampler2D nightTexture;
  //   uniform sampler2D cloudsTexture;
  //   uniform vec3 sunDirection;

  //   varying vec2 vUv;
  //   varying vec3 vNormal;
  //   varying vec3 vPosition;

  //   void main() {

  //     vec2 flippedUv = vec2(vUv.x, 1.0 - vUv.y);

  //     vec3 viewDirection = normalize(vPosition - cameraPosition);
  //     vec3 normal = normalize(vNormal);
  //     vec3 color = vec3(0.0);

  //     // Sun orientation
  //     float sunOrientation = dot(sunDirection, normal);

  //     // Day / night color
  //     float dayMix = smoothstep(- 0.25, 0.5, sunOrientation); //default 0.5
  //     vec3 dayColor = texture(dayTexture, flippedUv).rgb;
  //     vec3 nightColor = texture(nightTexture, flippedUv).rgb * vec3(0.2,0.2,0.2);
  //     color = mix(nightColor, dayColor, dayMix);

  //     // Specular cloud color
  //     vec2 specularCloudsColor = texture(cloudsTexture, flippedUv).rg;

  //     // Clouds
  //     float cloudsMix = smoothstep(0.0, 1.0, specularCloudsColor.g);
  //     cloudsMix *= dayMix;
  //     color = mix(color, vec3(1.0), cloudsMix);

  //     // Specular
  //     vec3 reflection = reflect(- sunDirection, normal);
  //     float specular = - dot(reflection, viewDirection);

  //     color.rgb = pow(color.rgb, vec3(1.35)); //Fixing the color conversion default 0.5

  //     // Final color
  //     gl_FragColor = vec4(color, 1.0);
  //   }
  // `;

  const fsSimple = /*glsl*/ `
    uniform sampler2D dayTexture;
    uniform sampler2D nightTexture;
    uniform sampler2D cloudsTexture;
    uniform vec3 sunDirection;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec3 viewDirection = normalize(vPosition - cameraPosition);
      vec3 normal = normalize(vNormal);
      vec3 color = vec3(0.0);

      // Sun orientation
      float sunOrientation = dot(sunDirection, normal);

      // Day / night color
      float dayMix = smoothstep(- 0.25, 0.5, sunOrientation);
      vec3 dayColor = texture(dayTexture, vUv).rgb;
      vec3 nightColor = texture(nightTexture, vUv).rgb;
      color = mix(nightColor, dayColor, dayMix);

      // Specular cloud color
      vec2 specularCloudsColor = texture(cloudsTexture, vUv).rg;

      // Clouds
      float cloudsMix = smoothstep(0.0, 1.0, specularCloudsColor.g);
      cloudsMix *= dayMix;
      color = mix(color, vec3(0.9), cloudsMix);

      // Specular
      vec3 reflection = reflect(- sunDirection, normal);
      float specular = - dot(reflection, viewDirection);

      // Final color
      gl_FragColor = vec4(color-vec3(0.12), 1.0);
    }
  `;

  //   const fs = /*glsl*/ `
  //   uniform sampler2D dayTexture;
  //   uniform sampler2D nightTexture;
  //   uniform sampler2D cloudsTexture;
  //   uniform vec3 sunDirection;

  //   varying vec2 vUv;
  //   varying vec3 vNormal;
  //   varying vec3 vPosition;

  //   void main() {

  //     vec2 flippedUv = vec2(vUv.x, 1.0 - vUv.y);

  //     vec3 viewDirection = normalize(vPosition - cameraPosition);
  //     vec3 normal = normalize(vNormal);
  //     vec3 color = vec3(0.0);

  //     // Sun orientation
  //     float sunOrientation = dot(sunDirection, normal);

  //     // Day / night color
  //     float dayMix = smoothstep(- 0.25, 0.5, sunOrientation); //default 0.5
  //     vec3 dayColor = texture(dayTexture, flippedUv).rgb;
  //     vec3 nightColor = texture(nightTexture, flippedUv).rgb * vec3(0.2,0.2,0.2);
  //     color = mix(nightColor, dayColor, dayMix);

  //     // Specular cloud color
  //     vec2 specularCloudsColor = texture(cloudsTexture, flippedUv).rg;

  //     // Clouds
  //     float cloudsMix = smoothstep(0.0, 1.0, specularCloudsColor.g);
  //     cloudsMix *= dayMix;
  //     color = mix(color, vec3(1.0), cloudsMix);

  //     // Specular
  //     vec3 reflection = reflect(- sunDirection, normal);
  //     float specular = - dot(reflection, viewDirection);

  //     color.rgb = pow(color.rgb, vec3(0.65)); //Fixing the color conversion default 0.5

  //     // Final color
  //     gl_FragColor = vec4(color, 1.0);
  //   }
  // `;

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: vs,
    fragmentShader: fsSimple,
  });

  return material;
}

const EarthMaterial: React.FC<EarthMaterialProps> = ({
  sunDirection = defaultSunDirection,
}) => {
  // const dayMap = useKTX2("/textures/space/earth_daymap.ktx2");
  // const nightMap = useKTX2("/textures/space/earth_nightmap.ktx2");
  // const cloudsMap = useKTX2("/textures/space/earth_clouds.ktx2");

  const dayMap = useTexture("/textures/space/earth_daymap.jpg");
  const nightMap = useTexture("/textures/space/earth_nightmap.jpg");
  const cloudsMap = useTexture("/textures/space/earth_clouds.jpg");

  // dayMap.generateMipmaps = true;
  // nightMap.generateMipmaps = true;
  // cloudsMap.generateMipmaps = true;

  // dayMap.generateMipmaps = false; // Disable mipmaps to prevent flickering
  // dayMap.minFilter = THREE.LinearFilter; // Use linear filtering
  // dayMap.magFilter = THREE.LinearFilter;

  // nightMap.generateMipmaps = false; // Disable mipmaps to prevent flickering
  // nightMap.minFilter = THREE.LinearFilter; // Use linear filtering
  // nightMap.magFilter = THREE.LinearFilter;

  // cloudsMap.generateMipmaps = false; // Disable mipmaps to prevent flickering
  // cloudsMap.minFilter = THREE.LinearFilter; // Use linear filtering
  // cloudsMap.magFilter = THREE.LinearFilter;

  // dayMap.anisotropy = 16;
  // nightMap.anisotropy = 16;
  // cloudsMap.anisotropy = 16;

  // const dayMap = useLoader(
  //   THREE.TextureLoader,
  //   "/textures/space/earth_daymap.jpg"
  // );
  // const nightMap = useLoader(
  //   THREE.TextureLoader,
  //   "/textures/space/earth_nightmap.jpg"
  // );
  // const cloudsMap = useLoader(
  //   THREE.TextureLoader,
  //   "/textures/space/earth_clouds.jpg"
  // );

  const material = useMemo(
    () => getEarthMat(sunDirection, [dayMap, nightMap, cloudsMap]),
    [sunDirection]
  );
  return <primitive object={material} />;
};

export default EarthMaterial;
