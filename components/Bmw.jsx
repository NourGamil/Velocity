import * as THREE from 'three'
import React, { useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'

// Removed the TypeScript interface for props
export function Bmw({ carColor, ...props }) {
  // Path to your actual BMW file in the public folder
  const { scene, nodes } = useGLTF('models/bmw.glb', '/draco/')

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      // Removed 'as THREE.Mesh'
      if (obj.isMesh) {
        const mat = obj.material
        
        // Target the specific BMW paint material
        if (mat.name === 'CSR2_CarPaint.002') {
          mat.color.set(carColor)
          mat.metalness = 0.1
          mat.roughness = 0.1
        }
      }
    })
  }, [scene, nodes, carColor])

  return <primitive object={scene} {...props} />
}

// Preloading ensures the model is cached for smoother transitions
useGLTF.preload('models/bmw.glb', '/draco/')