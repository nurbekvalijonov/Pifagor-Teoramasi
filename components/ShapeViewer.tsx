import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid, Float, Stars, RoundedBox, Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';

interface ShapeProps {
  type: string;
}

const DetailedShape: React.FC<ShapeProps> = ({ type }) => {
  const meshRef = useRef<THREE.Group>(null);

  // Common Materials
  const metalMat = new THREE.MeshStandardMaterial({ color: "#94a3b8", roughness: 0.2, metalness: 0.8 });
  const woodMat = new THREE.MeshStandardMaterial({ color: "#78350f", roughness: 0.9, metalness: 0.0 });
  const screenMat = new THREE.MeshStandardMaterial({ color: "#0f172a", roughness: 0.2, metalness: 0.8, emissive: "#1e293b", emissiveIntensity: 0.5 });
  const glowMat = new THREE.MeshStandardMaterial({ color: "#38bdf8", emissive: "#38bdf8", emissiveIntensity: 2, toneMapped: false });
  const plasticMat = new THREE.MeshStandardMaterial({ color: "#e2e8f0", roughness: 0.5 });
  const glassMat = new THREE.MeshPhysicalMaterial({ color: "#ffffff", transmission: 0.9, opacity: 0.5, transparent: true, roughness: 0 });

  const renderShape = () => {
    switch (type) {
      case 'ladder':
        return (
          <group position={[0, -2, 0]}>
             {/* Wall Segment */}
             <mesh position={[-1.5, 2.5, 0]}>
                <boxGeometry args={[0.2, 5, 4]} />
                <meshStandardMaterial color="#475569" />
             </mesh>
             {/* Floor Segment */}
             <mesh position={[1, 0, 0]}>
                <boxGeometry args={[5, 0.2, 4]} />
                <meshStandardMaterial color="#334155" />
             </mesh>
             
             {/* Detailed Ladder */}
             <group position={[0.5, 2, 0]} rotation={[0, 0, -0.45]}>
                {/* Rails */}
                <mesh position={[-0.3, 0, 0.4]}>
                    <boxGeometry args={[0.1, 4.5, 0.1]} />
                    <primitive object={metalMat} />
                </mesh>
                <mesh position={[-0.3, 0, -0.4]}>
                    <boxGeometry args={[0.1, 4.5, 0.1]} />
                    <primitive object={metalMat} />
                </mesh>
                {/* Rungs */}
                {[-1.8, -1.2, -0.6, 0, 0.6, 1.2, 1.8].map((y, i) => (
                    <group key={i} position={[-0.3, y, 0]}>
                        <mesh rotation={[0, 0, Math.PI/2]}>
                            <cylinderGeometry args={[0.04, 0.04, 0.8]} />
                            <primitive object={metalMat} />
                        </mesh>
                    </group>
                ))}
                {/* Rubber Feet */}
                <mesh position={[-0.3, -2.25, 0.4]}>
                   <boxGeometry args={[0.15, 0.2, 0.15]} />
                   <meshStandardMaterial color="black" />
                </mesh>
                <mesh position={[-0.3, -2.25, -0.4]}>
                   <boxGeometry args={[0.15, 0.2, 0.15]} />
                   <meshStandardMaterial color="black" />
                </mesh>
             </group>
             
             {/* Measurement Triangle Visual */}
             <group position={[0,0,1.5]}>
                <mesh position={[0.4, 0.1, 0]}>
                   <boxGeometry args={[3, 0.05, 0.05]} />
                   <primitive object={glowMat} />
                </mesh>
                <mesh position={[-1.4, 1.8, 0]}>
                   <boxGeometry args={[0.05, 3.5, 0.05]} />
                   <primitive object={glowMat} />
                </mesh>
                <mesh position={[-0.5, 1.8, 0]} rotation={[0,0,-0.45]}>
                    <boxGeometry args={[0.05, 4.5, 0.05]} />
                    <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1} />
                </mesh>
             </group>
          </group>
        );

      case 'phone':
        return (
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group>
               {/* Body */}
               <RoundedBox args={[2, 3.5, 0.2]} radius={0.15} smoothness={4}>
                  <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
               </RoundedBox>
               {/* Screen */}
               <mesh position={[0, 0, 0.11]}>
                  <planeGeometry args={[1.8, 3.3]} />
                  <primitive object={screenMat} />
               </mesh>
               {/* Camera Notch/Island */}
               <mesh position={[0, 1.5, 0.12]} rotation={[0, 0, Math.PI/2]}>
                  <capsuleGeometry args={[0.08, 0.4, 4, 8]} />
                  <meshStandardMaterial color="black" />
               </mesh>
               {/* Diagonal Line Overlay */}
               <mesh position={[0, 0, 0.13]} rotation={[0, 0, 0.52]}>
                  <boxGeometry args={[0.05, 3.8, 0.02]} />
                  <primitive object={glowMat} />
               </mesh>
               {/* UI Mockup elements */}
               <mesh position={[-0.5, 0.5, 0.12]}>
                  <planeGeometry args={[0.5, 0.5]} />
                  <meshStandardMaterial color="#3b82f6" />
               </mesh>
               <mesh position={[0.5, -0.5, 0.12]}>
                  <planeGeometry args={[0.5, 0.5]} />
                  <meshStandardMaterial color="#ef4444" />
               </mesh>
            </group>
          </Float>
        );

      case 'carpet':
        return (
          <group position={[0, -1, 0]}>
            <mesh position={[0, -0.1, 0]} rotation={[-Math.PI/2, 0, 0]}>
                 <planeGeometry args={[5, 5]} />
                 <meshStandardMaterial color="#f1f5f9" /> {/* Light floor */}
            </mesh>
            {/* Walls */}
             <mesh position={[-2.5, 1, 0]} rotation={[0, 0, 0]}>
                 <boxGeometry args={[0.1, 2.5, 5]} />
                 <meshStandardMaterial color="#cbd5e1" />
            </mesh>
             <mesh position={[0, 1, -2.5]} rotation={[0, 0, 0]}>
                 <boxGeometry args={[5, 2.5, 0.1]} />
                 <meshStandardMaterial color="#cbd5e1" />
            </mesh>

            {/* Detailed Carpet */}
            <mesh position={[-0.5, 0.01, -0.5]} rotation={[-Math.PI/2, 0, 0]}>
                <planeGeometry args={[3, 4]} />
                <meshStandardMaterial 
                  color="#4f46e5" 
                  roughness={1}
                />
            </mesh>
             {/* Pattern on carpet */}
            <mesh position={[-0.5, 0.02, -0.5]} rotation={[-Math.PI/2, 0, 0]}>
                 <ringGeometry args={[0.5, 1, 32]} />
                 <meshStandardMaterial color="#818cf8" />
            </mesh>

             {/* Tape Measure */}
             <group position={[-0.5, 0.05, -0.5]} rotation={[0, Math.PI/3.5, 0]}>
                 <mesh>
                    <boxGeometry args={[5, 0.1, 0.02]} />
                    <meshStandardMaterial color="#facc15" />
                 </mesh>
                 {/* Markings */}
                 {[...Array(10)].map((_, i) => (
                    <mesh key={i} position={[(i-4.5)*0.5, 0.06, 0]}>
                        <boxGeometry args={[0.02, 0.02, 0.03]} />
                        <meshStandardMaterial color="black" />
                    </mesh>
                 ))}
             </group>
          </group>
        );

      case 'map':
        return (
            <group position={[0, -1, 0]} rotation={[0.4, 0, 0]}>
                {/* Map Surface */}
                <RoundedBox args={[4, 0.2, 4]} radius={0.1}>
                    <meshStandardMaterial color="#d1fae5" />
                </RoundedBox>
                {/* Grid Lines */}
                <Grid position={[0, 0.11, 0]} args={[4, 4]} sectionColor="#10b981" cellColor="#6ee7b7" />
                
                {/* Buildings / Landmarks */}
                <mesh position={[-1.5, 0.5, 1.5]}>
                    <boxGeometry args={[0.4, 0.8, 0.4]} />
                    <meshStandardMaterial color="#3b82f6" />
                </mesh>
                <mesh position={[1.5, 0.5, -1.5]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.8]} />
                    <meshStandardMaterial color="#ef4444" />
                </mesh>

                {/* Path A to B */}
                <group position={[-1.5, 0.2, 1.5]}>
                     {/* North */}
                    <mesh position={[0, 0, -1.5]}>
                        <boxGeometry args={[0.1, 0.05, 3]} />
                        <meshStandardMaterial color="#64748b" />
                    </mesh>
                    {/* East */}
                    <mesh position={[1.5, 0, -3]}>
                        <boxGeometry args={[3, 0.05, 0.1]} />
                        <meshStandardMaterial color="#64748b" />
                    </mesh>
                    {/* Diagonal (Hypotenuse) */}
                    <mesh position={[1.5, 0.1, -1.5]} rotation={[0, -Math.PI/4, 0]}>
                         <boxGeometry args={[4.2, 0.05, 0.05]} />
                         <primitive object={glowMat} />
                    </mesh>
                </group>
            </group>
        );

      case 'cosmos':
          return (
              <group>
                  <Stars radius={50} count={2000} factor={4} fade />
                  {/* Earth */}
                  <mesh position={[-2, -1, 0]}>
                      <sphereGeometry args={[1, 32, 32]} />
                      <meshStandardMaterial color="#2563eb" roughness={0.6} metalness={0.1} />
                  </mesh>
                   {/* Atmosphere */}
                  <mesh position={[-2, -1, 0]}>
                      <sphereGeometry args={[1.1, 32, 32]} />
                      <meshStandardMaterial color="#60a5fa" transparent opacity={0.3} side={THREE.BackSide} />
                  </mesh>

                  {/* Satellite */}
                  <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <group position={[2, 2, 0]}>
                        <boxGeometry args={[0.4, 0.4, 0.4]} />
                        <meshStandardMaterial color="gold" metalness={1} roughness={0.2} />
                        {/* Panels */}
                        <mesh position={[0.6, 0, 0]}>
                            <boxGeometry args={[0.8, 0.4, 0.05]} />
                            <meshStandardMaterial color="#1e3a8a" />
                        </mesh>
                         <mesh position={[-0.6, 0, 0]}>
                            <boxGeometry args={[0.8, 0.4, 0.05]} />
                            <meshStandardMaterial color="#1e3a8a" />
                        </mesh>
                    </group>
                  </Float>

                  {/* Laser Measurement */}
                  <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0.65]}>
                       <cylinderGeometry args={[0.01, 0.01, 5]} />
                       <primitive object={glowMat} />
                  </mesh>
                  {/* Dashed lines for triangle */}
                  <group position={[-2, -1, 0]}>
                      <mesh position={[4, 0, 0]} rotation={[0,0,Math.PI/2]}>
                         <cylinderGeometry args={[0.02, 0.02, 4]} />
                         <meshStandardMaterial color="#475569" transparent opacity={0.5} />
                      </mesh>
                      <mesh position={[4, 1.5, 0]}>
                         <cylinderGeometry args={[0.02, 0.02, 3]} />
                         <meshStandardMaterial color="#475569" transparent opacity={0.5} />
                      </mesh>
                  </group>
              </group>
          );
      
      case 'grid':
          return (
              <group position={[-1, -1, 0]}>
                   {/* Pixel Matrix */}
                   <group>
                       {[0,1,2,3,4].map(x => 
                           [0,1,2,3,4].map(y => (
                               <mesh key={`${x}-${y}`} position={[x*0.6, y*0.6, 0]}>
                                   <boxGeometry args={[0.5, 0.5, 0.1]} />
                                   <meshStandardMaterial color={(x===0 && y===0) || (x===4 && y===4) ? "#3b82f6" : "#1e293b"} />
                               </mesh>
                           ))
                       )}
                   </group>
                   
                   {/* Connection Line */}
                   <mesh position={[1.2, 1.2, 0.2]} rotation={[0,0, Math.PI/4]}>
                        <boxGeometry args={[0.1, 3.8, 0.1]} />
                        <primitive object={glowMat} />
                   </mesh>
                   
                   {/* Coordinates Text Bubbles (Simulated) */}
                   <mesh position={[0, -0.5, 0]}>
                        <sphereGeometry args={[0.2]} />
                        <meshStandardMaterial color="white" />
                   </mesh>
                   <mesh position={[2.4, 2.9, 0]}>
                        <sphereGeometry args={[0.2]} />
                        <meshStandardMaterial color="white" />
                   </mesh>
              </group>
          );

      case 'field':
          return (
              <group position={[0, -1, 0]} rotation={[0.4, -0.2, 0]}>
                  {/* Field Terrain */}
                  <mesh position={[0, 0, 0]}>
                      <boxGeometry args={[5, 0.3, 4]} />
                      <meshStandardMaterial color="#14532d" />
                  </mesh>
                  {/* Furrows */}
                  {[...Array(8)].map((_, i) => (
                      <mesh key={i} position={[(i-3.5)*0.6, 0.16, 0]}>
                          <boxGeometry args={[0.1, 0.1, 3.8]} />
                          <meshStandardMaterial color="#3f6212" />
                      </mesh>
                  ))}
                  
                  {/* Pipe (Diagonal) */}
                  <group position={[0, 0.3, 0]} rotation={[0, 0.67, 0]}>
                      <mesh rotation={[0, 0, Math.PI/2]}>
                        <cylinderGeometry args={[0.1, 0.1, 5.5]} />
                        <primitive object={plasticMat} />
                      </mesh>
                  </group>
                  
                  {/* Sprinklers */}
                  <mesh position={[0, 0.4, 0]}>
                      <sphereGeometry args={[0.2]} />
                       <meshStandardMaterial color="#0ea5e9" />
                  </mesh>
              </group>
          );
      
      case 'lighthouse':
          return (
              <group position={[0, -2, 0]}>
                  {/* Ocean Base */}
                  <mesh position={[0, 0, 0]}>
                       <cylinderGeometry args={[3, 3, 0.5, 32]} />
                       <meshStandardMaterial color="#0c4a6e" roughness={0.1} />
                  </mesh>
                  
                  {/* Lighthouse Body */}
                  <group position={[0, 1.5, 0]}>
                       <mesh position={[0, -1, 0]}>
                           <cylinderGeometry args={[0.6, 0.8, 2]} />
                           <meshStandardMaterial color="#f8fafc" />
                       </mesh>
                       {/* Red Stripes */}
                       <mesh position={[0, -1, 0]} scale={[1.01, 1, 1.01]} rotation={[Math.PI/2, 0, 0]}>
                           <torusGeometry args={[0.7, 0.1, 16, 32]} />
                           <meshStandardMaterial color="#ef4444" />
                       </mesh>
                       <mesh position={[0, 0, 0]} scale={[1.01, 1, 1.01]} rotation={[Math.PI/2, 0, 0]}>
                           <torusGeometry args={[0.65, 0.1, 16, 32]} />
                           <meshStandardMaterial color="#ef4444" />
                       </mesh>

                       {/* Light Room */}
                       <mesh position={[0, 0.2, 0]}>
                           <cylinderGeometry args={[0.5, 0.6, 0.5]} />
                           <primitive object={glassMat} />
                       </mesh>
                       <mesh position={[0, 0.5, 0]}>
                           <coneGeometry args={[0.7, 0.5, 32]} />
                           <meshStandardMaterial color="#1e293b" />
                       </mesh>
                       
                       {/* Light Beam */}
                       <mesh position={[1.5, 0.2, 0]} rotation={[0, 0, -Math.PI/2]}>
                           <coneGeometry args={[0.2, 3, 32, 1, true]} />
                           <meshStandardMaterial color="#fef08a" transparent opacity={0.3} side={THREE.DoubleSide} />
                       </mesh>
                  </group>
                  
                  {/* Boat Distance */}
                  <group position={[2, 0.3, 0]}>
                       <mesh>
                           <boxGeometry args={[0.5, 0.2, 0.3]} />
                           <meshStandardMaterial color="white" />
                       </mesh>
                  </group>

                  {/* Line of Sight */}
                  <mesh position={[1, 1.2, 0]} rotation={[0,0,-0.6]}>
                       <cylinderGeometry args={[0.02, 0.02, 2.5]} />
                       <primitive object={glowMat} />
                  </mesh>
              </group>
          );

      case 'catapult':
          return (
              <group position={[0, -1, 0]}>
                   {/* Wheeled Base */}
                   <mesh position={[0, 0.2, 0]}>
                       <boxGeometry args={[3, 0.2, 1.5]} />
                       <primitive object={woodMat} />
                   </mesh>
                   {/* Wheels */}
                   {[[-1, 1], [-1, -1], [1, 1], [1, -1]].map((pos, i) => (
                       <mesh key={i} position={[pos[0], 0, pos[1]*0.75]} rotation={[Math.PI/2, 0, 0]}>
                           <cylinderGeometry args={[0.4, 0.4, 0.2, 16]} />
                           <primitive object={metalMat} />
                       </mesh>
                   ))}
                   
                   {/* Launch Mechanism */}
                   <group position={[-1, 0.5, 0]}>
                        <mesh position={[0, 0.5, 0.5]} rotation={[0.2, 0, 0]}>
                            <boxGeometry args={[0.2, 1.5, 0.2]} />
                            <primitive object={woodMat} />
                        </mesh>
                        <mesh position={[0, 0.5, -0.5]} rotation={[-0.2, 0, 0]}>
                            <boxGeometry args={[0.2, 1.5, 0.2]} />
                            <primitive object={woodMat} />
                        </mesh>
                        
                        {/* Throwing Arm */}
                        <group position={[0, 1, 0]} rotation={[0, 0, -0.5]}>
                             <mesh position={[1.5, 0, 0]}>
                                 <boxGeometry args={[3, 0.1, 0.2]} />
                                 <primitive object={woodMat} />
                             </mesh>
                             {/* Bucket */}
                             <mesh position={[2.8, 0.2, 0]}>
                                 <cylinderGeometry args={[0.3, 0.2, 0.3]} />
                                 <primitive object={metalMat} />
                             </mesh>
                             {/* Projectile */}
                             <mesh position={[2.8, 0.5, 0]}>
                                 <sphereGeometry args={[0.2]} />
                                 <meshStandardMaterial color="#1e293b" />
                             </mesh>
                        </group>
                   </group>

                   {/* Trajectory Parabola Hints */}
                   <group position={[1.5, 2, 0]}>
                       {[...Array(6)].map((_, i) => (
                           <mesh key={i} position={[i*0.5, Math.sin(i*0.5)*0.5, 0]}>
                               <sphereGeometry args={[0.05]} />
                               <primitive object={glowMat} />
                           </mesh>
                       ))}
                   </group>
              </group>
          );
        
      case 'printer':
          return (
              <group position={[0, -1.5, 0]}>
                  {/* Printer Frame */}
                  <group>
                      <mesh position={[-1.5, 1.5, -1.5]}><boxGeometry args={[0.2, 3, 0.2]} /><primitive object={metalMat}/></mesh>
                      <mesh position={[1.5, 1.5, -1.5]}><boxGeometry args={[0.2, 3, 0.2]} /><primitive object={metalMat}/></mesh>
                      <mesh position={[-1.5, 1.5, 1.5]}><boxGeometry args={[0.2, 3, 0.2]} /><primitive object={metalMat}/></mesh>
                      <mesh position={[1.5, 1.5, 1.5]}><boxGeometry args={[0.2, 3, 0.2]} /><primitive object={metalMat}/></mesh>
                      
                      <mesh position={[0, 0.2, 0]}><boxGeometry args={[3.2, 0.4, 3.2]} /><primitive object={plasticMat}/></mesh>
                      <mesh position={[0, 3, 0]}><boxGeometry args={[3.2, 0.2, 3.2]} /><primitive object={plasticMat}/></mesh>
                  </group>
                  
                  {/* Print Bed */}
                  <mesh position={[0, 0.5, 0]}>
                      <boxGeometry args={[2.5, 0.1, 2.5]} />
                      <meshStandardMaterial color="#1e293b" roughness={0.1} />
                  </mesh>

                  {/* Gantry & Extruder */}
                  <group position={[0, 2, 0]}>
                      <mesh><boxGeometry args={[3.2, 0.1, 0.1]} /><primitive object={metalMat}/></mesh>
                      <group position={[0.5, 0, 0]}>
                           <mesh><boxGeometry args={[0.4, 0.4, 0.4]} /><primitive object={screenMat}/></mesh>
                           <mesh position={[0, -0.3, 0]} rotation={[Math.PI, 0, 0]}>
                               <coneGeometry args={[0.05, 0.2]} />
                               <meshStandardMaterial color="gold"/>
                           </mesh>
                      </group>
                  </group>

                  {/* Printed Object being created */}
                  <mesh position={[0, 0.8, 0]} rotation={[0, Math.PI/4, 0]}>
                      <coneGeometry args={[0.6, 0.6, 4]} />
                      <primitive object={glowMat} />
                  </mesh>
                  
                  {/* Movement Vectors X, Y, Z */}
                  <arrowHelper args={[new THREE.Vector3(1,0,0), new THREE.Vector3(0,1,0), 1, 0xff0000]} />
                  <arrowHelper args={[new THREE.Vector3(0,1,0), new THREE.Vector3(0,1,0), 1, 0x00ff00]} />
                  <arrowHelper args={[new THREE.Vector3(0,0,1), new THREE.Vector3(0,1,0), 1, 0x0000ff]} />
              </group>
          );

      default:
        return <Box args={[1,1,1]} />;
    }
  };

  return (
    <group ref={meshRef}>
      {renderShape()}
    </group>
  );
};

const ShapeViewer: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-inner relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[4, 3, 5]} fov={50} />
        
        {/* Cinematic Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        <spotLight position={[-5, 5, 0]} intensity={0.8} angle={0.5} penumbra={1} color="#6366f1" />
        <spotLight position={[5, -5, 0]} intensity={0.5} angle={0.5} penumbra={1} color="#ec4899" />
        
        <DetailedShape type={type} />
        
        <Environment preset="city" blur={0.8} />
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={1} minPolarAngle={0} maxPolarAngle={Math.PI / 1.5} />
      </Canvas>
    </div>
  );
};

export default ShapeViewer;