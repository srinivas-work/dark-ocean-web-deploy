import { useGLTF } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Blades_WindTurbine_PBR_0: THREE.Mesh;
    Main_Unit_WindTurbine_PBR_0: THREE.Mesh;
  };
  materials: {
    WindTurbine_PBR: THREE.MeshStandardMaterial;
  };
};

type WindMillInstanceTestProps = GroupProps & {
  instanceCount: number; // Number of windmill instances
  instancePositions: THREE.Vector3[]; // Positions for each instance
  instanceRotations?: THREE.Euler[]; // Optional rotations for each instance
  instanceScales?: THREE.Vector3[]; // Optional scales for each instance
};

//useGLTF.preload("/models/ocean/wind_mill.glb");

export default function WindMillInstance({
  instanceCount,
  instancePositions,
  instanceRotations,
  instanceScales,
  ...props
}: WindMillInstanceTestProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    "/models/ocean/wind_mill.glb"
  ) as GLTFResult;

  // Create refs for the instanced meshes
  const bladesRef = useRef<THREE.InstancedMesh>(null);
  const mainUnitRef = useRef<THREE.InstancedMesh>(null);

  // Ref to store the rotation state for each instance
  const rotationsRef = useRef<number[]>(new Array(instanceCount).fill(0));

  useEffect(() => {
    // Set transformations for the blades instanced mesh
    if (bladesRef.current) {
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < instanceCount; i++) {
        const position = instancePositions[i];
        const rotation = instanceRotations?.[i] || new THREE.Euler(0, 0, 0);
        //const rotation = new THREE.Euler(Math.PI / 2, 0, 0);
        const scale = instanceScales?.[i] || new THREE.Vector3(1, 1, 1);

        matrix.compose(
          position,
          new THREE.Quaternion().setFromEuler(rotation),
          scale
        );
        bladesRef.current.setMatrixAt(i, matrix);
      }
      bladesRef.current.instanceMatrix.needsUpdate = true;
    }

    // Set transformations for the main unit instanced mesh
    if (mainUnitRef.current) {
      const matrix = new THREE.Matrix4();
      for (let i = 0; i < instanceCount; i++) {
        const position = instancePositions[i];
        const rotation = instanceRotations?.[i] || new THREE.Euler(0, 0, 0);
        const scale = instanceScales?.[i] || new THREE.Vector3(1, 1, 1);
        matrix.compose(
          position,
          new THREE.Quaternion().setFromEuler(rotation),
          scale
        );
        mainUnitRef.current.setMatrixAt(i, matrix);
      }
      mainUnitRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [instanceCount, instancePositions, instanceRotations, instanceScales]);

  // Animate the blades
  useFrame((_, delta) => {
    if (bladesRef.current) {
      const matrix = new THREE.Matrix4();
      const quaternion = new THREE.Quaternion();

      for (let i = 0; i < instanceCount; i++) {
        // Update the rotation for each instance
        rotationsRef.current[i] += delta * 1.5; // Adjust speed by changing the multiplier
        if (rotationsRef.current[i] > Math.PI * 2) {
          rotationsRef.current[i] -= Math.PI * 2; // Keep rotation within 0-360 degrees
        }

        // Get the original position and scale
        const position = instancePositions[i];
        const scale = instanceScales?.[i] || new THREE.Vector3(1, 1, 1);

        // Apply the new rotation (only to the blades)
        quaternion.setFromEuler(
          new THREE.Euler(
            instanceRotations?.[i].x || 0,
            rotationsRef.current[i],
            0
          )
        );
        matrix.compose(position, quaternion, scale);

        // Update the instance matrix for the blades
        bladesRef.current.setMatrixAt(i, matrix);
      }

      // Notify Three.js that the instance matrices need to be updated
      bladesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="wind_millglb">
          <group name="RootNode">
            {/* Blades instanced mesh */}
            <instancedMesh
              ref={bladesRef}
              args={[
                nodes.Blades_WindTurbine_PBR_0.geometry,
                materials.WindTurbine_PBR,
                instanceCount,
              ]}
              castShadow
              receiveShadow
            />
          </group>
          {/* Main Unit instanced mesh */}
          <instancedMesh
            ref={mainUnitRef}
            args={[
              nodes.Main_Unit_WindTurbine_PBR_0.geometry,
              materials.WindTurbine_PBR,
              instanceCount,
            ]}
            castShadow
            receiveShadow
          />
        </group>
      </group>
    </group>
  );
}
