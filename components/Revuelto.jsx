import * as THREE from 'three'
import React, { useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'

// Removed the TS type definitions from the props
export function Revuelto({ carColor, ...props }) {
  // Ensure this path correctly points to your public folder
  const { scene, nodes } = useGLTF('models/revuelto.glb', '/draco/')

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      // Removed 'as THREE.Mesh'
      if (obj.isMesh) {
        const mat = obj.material
        
        // Target the specific paint material
        if (mat.name === 'Lamborghini_RevueltoReward_2024Paint_Material') {
          mat.color.set(carColor)
          mat.metalness = 0.1
          mat.roughness = 0.1
        }
      }
    })
  }, [scene, nodes, carColor])

  return <primitive object={scene} {...props} />
}

// Preloading helps prevent the car from "popping" in late
useGLTF.preload('models/revuelto.glb', '/draco/')