import { useRef,  } from "react";
import { Color } from "three";
import { AudioAnalyzer } from "lib/audio";
import { MeshLine } from "three.meshline";
import { useFrame } from "@react-three/fiber";
import { extendMeshLine } from "lib/meshline";
import { MeshLineGeometry } from "@react-three/drei";
import { normalizeBetween, radians } from "@/lib/math";

extendMeshLine()

type Props = {
  analyzer: AudioAnalyzer;
  lineWidth?: number;
  segments?: number;
  radius?: number;
  height?: number;
  color?: number;
}

export default function Visualizer({
  analyzer,
  lineWidth = 0.02,
  segments = 100,
  radius = 2,
  height = 1,
}: Props) {
  const lineRef = useRef<MeshLine>(null!);

  useFrame(() => {
    if (!analyzer) return;
    const fft = analyzer.getFFT();
    const points: number[] = [];
    for (let i = 0; i <= segments; i++) {
      const val = normalizeBetween(fft[i < segments ? i : 0], 0, 255) * height;
      const angle = i * (360 / segments);
      const theta = radians(angle);
      const x = (radius + val) * Math.cos(theta);
      const y = -(radius + val) * Math.sin(theta);
      points.push(x, y, 0);
    }
    lineRef.current?.setPoints(points);
  });

  return (
    <mesh>
      <meshLine ref={lineRef} attach="geometry" />
      <meshLineMaterial
        attach="material"
        lineWidth={lineWidth}
        color={new Color("#C36DFF")}
      />
    </mesh>
  );
}