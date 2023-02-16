import React from 'react'
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const img_url = '/imgs/slime.jpg'
// const img_url = '/imgs/texture.png'

export const Box = (props) => {

  const texture = useLoader(TextureLoader, img_url)

  return (
    <mesh {...props} recieveShadow={true} castShadow={true}>
      <boxBufferGeometry />
      <meshPhysicalMaterial map={texture} color={"white"} />
    </mesh>
  );
}
