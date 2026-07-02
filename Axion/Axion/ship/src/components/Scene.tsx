"use client";

import { Canvas } from "@react-three/fiber";
import { Sky, Stars, OrbitControls, Environment, PerspectiveCamera, Float, Text, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function Ocean() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[100, 100]} />
      <MeshDistortMaterial
        color="#0a192f"
        speed={2}
        distort={0.4}
        radius={1}
      />
    </mesh>
  );
}

function ShipModel() {
  return (
    <group position={[0, -1, 0]}>
      {/* Hull */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1.5, 10]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Deck House */}
      <mesh position={[0, 1.5, -2]}>
        <boxGeometry args={[3.5, 2, 3]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      {/* Bridge */}
      <mesh position={[0, 2.5, -2]}>
        <boxGeometry args={[4, 0.8, 2]} />
        <meshStandardMaterial color="#475569" transparent opacity={0.5} />
      </mesh>
      {/* Lights */}
      <pointLight position={[2, 2, -2]} color="red" intensity={2} />
      <pointLight position={[-2, 2, -2]} color="green" intensity={2} />
    </group>
  );
}

export default function Scene({ stormIntensity }: { stormIntensity: number }) {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[10, 10, 20]} />
      <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.1} />
      
      <color attach="background" args={["#020617"]} />
      
      <Suspense fallback={null}>
        <Sky 
          sunPosition={[0, -1, -1]} 
          turbidity={10} 
          rayleigh={0.5} 
          mieCoefficient={0.005} 
          mieDirectionalG={0.8} 
        />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={stormIntensity > 0.5 ? 2 : 0.5} 
          color={stormIntensity > 0.8 ? "#cbd5e1" : "#ffffff"}
        />

        <Float speed={2 + stormIntensity * 5} rotationIntensity={0.5 + stormIntensity} floatIntensity={1}>
          <ShipModel />
        </Float>

        <Ocean />
        
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
