import * as THREE from 'three'
import React, { useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'

export function Urus({ carColor, ...props }: { carColor: string; [key: string]: any }) {
  const { scene, nodes } = useGLTF('/models/urus.glb', '/draco/')

  useLayoutEffect(() => {

    // 2. Traversal Backup: In case 'Material.027' is the name of the MATERIAL, not the MESH
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh
        const mat = mesh.material as THREE.MeshStandardMaterial
        
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

useGLTF.preload('/models/urus-transformed.glb', '/draco/')




