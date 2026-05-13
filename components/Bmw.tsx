import * as THREE from 'three'
import React, { useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function Bmw({ carColor, ...props }: { carColor: string; [key: string]: any }) {
  // Update this path to your actual BMW file
  const { scene, nodes } = useGLTF('/models/bmw.glb', '/draco/')

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh
        const mat = mesh.material as THREE.MeshStandardMaterial
        
        // IMPORTANT: Change 'Material_Name' to the actual car paint material name from Blender
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

useGLTF.preload('/models/bmw.glb', '/draco/')