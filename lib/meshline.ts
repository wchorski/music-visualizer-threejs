import { Line } from "three";
import {extend, Object3DNode} from '@react-three/fiber'
// import { MeshLineGeometry, MeshLineMaterial } from "meshline";
// import * as THREE from 'three';
// import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import { MeshLine, MeshLineMaterial } from "three.meshline";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLine: Object3DNode<MeshLine, typeof MeshLine>;
      meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>
    }
  }
}

export function extendMeshLine(){
  extend({ MeshLine, MeshLineMaterial})
}