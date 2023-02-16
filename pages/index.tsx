import {Suspense, useState, useRef, ChangeEvent} from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Canvas } from "@react-three/fiber";
import { Floor } from "components/objs/Floor";
// import { Box } from "components/objs/Box";
import { Box, OrbitControls } from "@react-three/drei";
import { LightBulb } from "components/objs/LightBulb";
// import OrbitControls from "components/controls/OrbitControls";
import Draggable from "components/controls/Draggable";
import Visualizer from "components/objs/Visualizer";
import { AudioTrack } from "@/components/AudioTrack";
import { VizMax } from "@/components/objs/VizMax";
import { AudioAnalyzer } from "@/lib/audio";

export default function Home() {

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioElmRef = useRef<HTMLAudioElement>(null!);

  const [analyzer, setAnalyzer] = useState<AudioAnalyzer | null>(null)

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log('YOOOO, ');
    if (!file) return;
    console.log('file, ', URL.createObjectURL(file));
    
    setAudioUrl(URL.createObjectURL(file));
    setAnalyzer(new AudioAnalyzer(audioElmRef.current))
  };

  return (
    <>
      <Head>
        <title>Music Visualizer ThreeJS</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <h1>Music Visualizer with Three.js</h1>
        <div className={styles.scene}>

        <div
          style={{
            height: 80,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <input type="file" accept="audio/*" onChange={onFileChange} />
          <audio src={audioUrl ?? "/audio/audio.mp3"} controls ref={audioElmRef} />
        </div>

        <div>
        <Canvas
          style={{
            width: "100vw",
            height: "calc(100vh - 80px)",
            backgroundColor: "darkslategrey",
          }}
        >
          <OrbitControls />
          <ambientLight color={"white"} intensity={0.3} />
          <LightBulb position={[-2, 3, 0]} />

          {<Visualizer analyzer={analyzer} lineWidth={0.08} />}

          <Box>

            <meshBasicMaterial color="#C36DFF"/>

          </Box>
        </Canvas>

      </div>

        </div>
      </main>
    </>
  )
}

