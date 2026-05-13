import * as THREE from 'three'
import React, { useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'

// 1. Remove the TS interface { carColor: string; ... }
export function Urus({ carColor, ...props }) {
  // Ensure the path matches your actual file in /public/models/
  const { scene, nodes } = useGLTF('/models/urus.glb', '/draco/')

  useLayoutEffect(() => {
    // 2. Traversal: Removed 'as THREE.Mesh' type assertions
    scene.traverse((obj) => {
      if (obj.isMesh) {
        const mat = obj.material
        
        // Match the specific material name from your 3D model
        if (mat.name === 'LLamborghini_UrusPHEVRewardRecycled_2024Paint_Material1') {
          mat.color.set(carColor)
          mat.metalness = 0.1
          mat.roughness = 0.1
        }
      }
    })
  }, [scene, nodes, carColor])

  return <primitive object={scene} {...props} />
}

// Ensure preloading uses the same path as the component
useGLTF.preload('/models/urus.glb', '/draco/')