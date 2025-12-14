import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float, Grid, Stage, Center } from '@react-three/drei';
import * as THREE from 'three';
import type { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const Triangle3D: React.FC<{ a: number; b: number; c: number }> = ({ a, b, c }) => {
  // Memoize geometry to prevent flicker on re-render, update when inputs change
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(a, 0);
    s.lineTo(0, b);
    s.lineTo(0, 0);
    return s;
  }, [a, b]);

  const extrudeSettings = {
    steps: 1,
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 2
  };

  return (
    <group>
      <Center>
        <mesh position={[0, 0, 0]}>
          <extrudeGeometry args={[shape, extrudeSettings]} />
          <meshPhysicalMaterial 
            color="#4f46e5" 
            emissive="#312e81"
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
            transmission={0}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
        
        {/* Labels for sides */}
        <Text position={[a / 2, -0.5, 0.6]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
          a: {a}
        </Text>
        <Text position={[-0.8, b / 2, 0.6]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
          b: {b}
        </Text>
         <Text position={[a / 2.2, b / 2.2, 0.6]} rotation={[0, 0, -Math.atan(b/a)]} fontSize={0.5} color="#fbbf24" anchorX="center" anchorY="middle">
          c: {c}
        </Text>
      </Center>
    </group>
  );
};

const Calculator = () => {
  const [catA, setCatA] = useState<number>(3);
  const [catB, setCatB] = useState<number>(4);

  const hypotenuse = Math.sqrt(Math.pow(catA, 2) + Math.pow(catB, 2));
  const roundedHypotenuse = Math.round(hypotenuse * 100) / 100;

  const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0 && val <= 20) setCatA(val);
  };

  const handleChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val) && val > 0 && val <= 20) setCatB(val);
  };

  return (
    <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Input Panel */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(79,70,229,0.15)] relative overflow-hidden group">
                {/* Decorative neon line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                
                <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">⚡</span> Pifagor <span className="text-indigo-400">Giper-Kalkulyatori</span>
                </h2>
                
                <div className="space-y-8">
                    {/* Input A */}
                    <div className="relative">
                        <label className="block text-indigo-300 text-sm font-bold uppercase tracking-widest mb-2">Katet (a)</label>
                        <div className="flex items-center bg-slate-900/50 rounded-xl border border-slate-700 focus-within:border-cyan-400 transition-colors p-2">
                             <input 
                                type="number" 
                                value={catA} 
                                onChange={handleChangeA}
                                max={20}
                                className="w-full bg-transparent text-white text-2xl font-mono font-bold outline-none px-4"
                            />
                            <span className="text-slate-500 font-mono pr-4">sm</span>
                        </div>
                        <input 
                            type="range" 
                            min="1" 
                            max="20" 
                            step="0.5"
                            value={catA} 
                            onChange={(e) => setCatA(parseFloat(e.target.value))}
                            className="w-full mt-3 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                    </div>

                    {/* Input B */}
                    <div className="relative">
                        <label className="block text-pink-300 text-sm font-bold uppercase tracking-widest mb-2">Katet (b)</label>
                        <div className="flex items-center bg-slate-900/50 rounded-xl border border-slate-700 focus-within:border-pink-400 transition-colors p-2">
                             <input 
                                type="number" 
                                value={catB} 
                                onChange={handleChangeB}
                                max={20}
                                className="w-full bg-transparent text-white text-2xl font-mono font-bold outline-none px-4"
                            />
                            <span className="text-slate-500 font-mono pr-4">sm</span>
                        </div>
                        <input 
                            type="range" 
                            min="1" 
                            max="20" 
                            step="0.5"
                            value={catB} 
                            onChange={(e) => setCatB(parseFloat(e.target.value))}
                            className="w-full mt-3 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-400"
                        />
                    </div>

                    {/* Result Display */}
                    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 border border-slate-700 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg className="w-24 h-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Gipotenuza (c)</p>
                        <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mt-2 font-mono">
                            {roundedHypotenuse}<span className="text-2xl text-slate-500 ml-2">sm</span>
                        </div>
                        <p className="text-slate-500 text-xs mt-2 font-mono">c = √({catA}² + {catB}²)</p>
                    </div>
                </div>
            </div>

            {/* 3D Visualization */}
            <div className="h-[500px] w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl relative">
                <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
                    Real-time 3D Render
                </div>
                <Canvas shadows dpr={[1, 2]} camera={{ position: [5, 5, 10], fov: 45 }}>
                    <color attach="background" args={['#0f172a']} />
                    <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} />
                    
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                         <Triangle3D a={catA} b={catB} c={roundedHypotenuse} />
                    </Float>

                    <Grid infiniteGrid fadeDistance={30} fadeStrength={1.5} sectionColor="#4f46e5" cellColor="#1e293b" position={[0, -4, 0]} />
                    <Stage environment="city" intensity={0.5} shadows={false} />
                </Canvas>
            </div>
        </div>
    </section>
  );
};

export default Calculator;