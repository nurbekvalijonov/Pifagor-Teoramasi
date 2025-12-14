import React, { useState } from 'react';
import { applications } from './data/applications';
import { ApplicationItem } from './types';
import Modal from './components/Modal';
import Calculator from './components/Calculator';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Sparkles, Octahedron, TorusKnot } from '@react-three/drei';
import type { ThreeElements } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

const FloatingHeroBackground = () => {
  return (
    <>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sparkles count={400} scale={12} size={3} speed={0.4} opacity={0.4} color="#818cf8" />
      </Float>
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Octahedron args={[1]} position={[-4, 2, -5]} scale={1.5}>
           <meshStandardMaterial color="#4f46e5" wireframe transparent opacity={0.15} />
        </Octahedron>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <TorusKnot args={[1, 0.3, 100, 16]} position={[4, -2, -6]} scale={0.8}>
           <meshStandardMaterial color="#c084fc" wireframe transparent opacity={0.1} />
        </TorusKnot>
      </Float>
      
      <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
         <Octahedron args={[0.5]} position={[0, 4, -8]}>
             <meshStandardMaterial color="#22d3ee" wireframe transparent opacity={0.2} />
         </Octahedron>
      </Float>
    </>
  );
};

function App() {
  const [selectedItem, setSelectedItem] = useState<ApplicationItem | null>(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white pb-20 font-inter">
      
      {/* Hero Section */}
      <section className="relative h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-indigo-500/10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950">
        
        {/* Background 3D Elements */}
        <div className="absolute inset-0 opacity-100 pointer-events-none">
           <Canvas camera={{ position: [0, 0, 5] }}>
             <ambientLight intensity={0.5} />
             <directionalLight position={[10, 10, 5]} intensity={1} color="#818cf8" />
             <FloatingHeroBackground />
             <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} enablePan={false} />
           </Canvas>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto space-y-8">
           <div className="inline-block mb-4 animate-fade-in-up">
             <span className="py-1.5 px-4 rounded-full bg-slate-800/50 border border-indigo-500/30 text-indigo-300 text-sm font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.2)]">
               8-"B" sinf loyihasi
             </span>
           </div>
           
           <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white animate-fade-in-up delay-100 drop-shadow-2xl">
             PYTHAGOR<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">.AI</span>
           </h1>
           
           <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto animate-fade-in-up delay-200">
             Geometriya qoidalari — zamonaviy dunyo asosida.
           </p>

           <div className="pt-8 flex flex-col md:flex-row gap-6 justify-center items-center animate-fade-in-up delay-300">
             <a 
               href="#applications" 
               className="group relative px-8 py-4 bg-indigo-600 text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_50px_rgba(79,70,229,0.6)]"
             >
               <span className="relative z-10 flex items-center gap-2">
                 Tatbiqlarni Ko'rish
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
               </span>
             </a>
             
             <div className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-md p-2 pr-6 rounded-full border border-slate-700/50 hover:bg-slate-800/80 transition-colors">
                 <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-lg z-20">VN</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-lg z-10">XA</div>
                 </div>
                 <div className="flex flex-col text-left">
                     <span className="text-slate-300 text-xs font-bold">Loyiha Mualliflari</span>
                     <span className="text-slate-500 text-[10px] uppercase tracking-wide">Valijonov N. & Xodjayev A.</span>
                 </div>
             </div>
           </div>
        </div>
      </section>

      {/* Hyper Calculator Section */}
      <Calculator />

      {/* Applications Grid */}
      <section id="applications" className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-16 space-y-4">
           <h2 className="text-4xl md:text-5xl font-black text-white">Hayotiy Tatbiqlar</h2>
           <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full"></div>
           <p className="text-slate-400 max-w-2xl mx-auto text-lg">Pifagor teoremasi shunchaki formula emas, u bizni o'rab turgan olamning asosi. Quyidagi 10 ta misol orqali buni kashf eting.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
           {applications.map((app, index) => (
             <div 
               key={app.id}
               onClick={() => setSelectedItem(app)}
               className={`group relative bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800 rounded-2xl p-8 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(99,102,241,0.25)] animate-fade-in-up`}
               style={{ animationDelay: `${index * 100}ms` }}
             >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:rotate-12 duration-500 scale-150">
                   <span className="text-6xl filter grayscale group-hover:grayscale-0">{app.icon}</span>
                </div>
                
                <div className="relative z-10">
                   <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:bg-indigo-600 transition-all duration-300 shadow-xl group-hover:scale-110 group-hover:rotate-3 ring-1 ring-slate-700 group-hover:ring-indigo-400">
                      <span className="transform transition-transform duration-300 group-hover:scale-110">{app.icon}</span>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{app.title}</h3>
                   <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{app.shortDesc}</p>
                   
                   <div className="mt-6 flex items-center text-indigo-400 text-sm font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 uppercase text-[10px]">
                      Batafsil
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Video Lessons Section */}
      <section className="py-24 bg-slate-900/50 border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Video Darslar</h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full"></div>
                <p className="mt-4 text-slate-400 text-lg">Pifagor teoremasini chuqurroq o'rganish uchun maxsus video darsliklar.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Video 1 */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800 group hover:-translate-y-2 transition-transform duration-300">
                    <div className="relative pb-[56.25%] h-0">
                        <iframe 
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/IlIsTHWN0pA" 
                            title="Pifagor Teoremasi 1" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">Pifagor Teoremasi: Tushuncha</h3>
                        <p className="text-slate-400 text-sm mt-2">Mavzuni boshlash uchun umumiy tushunchalar.</p>
                    </div>
                </div>

                {/* Video 2 */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800 group hover:-translate-y-2 transition-transform duration-300">
                     <div className="relative pb-[56.25%] h-0">
                        <iframe 
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/YompsDlEdtc" 
                            title="Pifagor Teoremasi 2" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">Isboti va Qo'llanilishi</h3>
                        <p className="text-slate-400 text-sm mt-2">Teoremaning isboti va masalalar yechish.</p>
                    </div>
                </div>

                {/* Video 3 */}
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800 group hover:-translate-y-2 transition-transform duration-300">
                     <div className="relative pb-[56.25%] h-0">
                        <iframe 
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/A1GQ1_lQTo0" 
                            title="Pifagor Teoremasi 3" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">Hayotiy Misollar</h3>
                        <p className="text-slate-400 text-sm mt-2">Kundalik hayotda uchrashadigan qiziqarli holatlar.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Authors and Team Section */}
      <section className="relative py-24 bg-gradient-to-b from-slate-950 to-indigo-950/20">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
           <div className="text-center mb-16">
              <span className="text-indigo-400 text-sm font-bold uppercase tracking-widest mb-2 block">Bizning Jamoa</span>
              <h2 className="text-4xl md:text-5xl font-black text-white">Loyiha Mualliflari</h2>
              <p className="mt-4 text-slate-300 max-w-2xl mx-auto">Bu loyiha Geometriya fanidan ilmiy ish sifatida ikki nafar 8-"B" sinf o'quvchisi tomonidan yaratildi. Loyihaning dastlabki g'oyasi (kontseptsiyasi) ikkala muallifdan birgalikda chiqqan.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Valijonov Nurbek */}
              <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 hover:border-indigo-500/50 transition-all hover:transform hover:-translate-y-1 group">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg border-2 border-slate-700 group-hover:border-indigo-400 transition-colors">VN</div>
                    <div>
                       <h3 className="text-2xl font-bold text-white">Valijonov Nurbek</h3>
                       <span className="inline-block px-3 py-1 mt-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">Asosiy Rol</span>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <h4 className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Hissasi</h4>
                    <p className="text-slate-300 leading-relaxed text-sm">Loyihaning texnik qismi (dasturlash), veb-sayt dizayni (Tailwind CSS) va asosiy funksionallikni yaratish.</p>
                 </div>
              </div>

              {/* Xodjayev Anzar */}
              <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 border border-slate-700/50 hover:border-pink-500/50 transition-all hover:transform hover:-translate-y-1 group">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-xl font-bold text-white shadow-lg border-2 border-slate-700 group-hover:border-pink-400 transition-colors">XA</div>
                    <div>
                       <h3 className="text-2xl font-bold text-white">Xodjayev Anzar</h3>
                       <span className="inline-block px-3 py-1 mt-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold">Yordamchi Rol</span>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <h4 className="text-slate-500 font-bold uppercase text-[10px] tracking-wider">Hissasi</h4>
                    <p className="text-slate-300 leading-relaxed text-sm">Dastlabki g'oyani shakllantirishda qatnashish, kontentni tayyorlash (10 ta tatbiq bo'yicha matnlar) va Gemini AI integratsiyasini sinovdan o'tkazish.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
           <div>
              <h4 className="text-2xl font-black text-white mb-2 tracking-tight">PYTHAGOR<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500">.AI</span></h4>
              <p className="text-slate-500 text-xs uppercase tracking-widest">Geometriya & Texnologiya</p>
           </div>
           
           <div className="text-right">
              <p className="text-slate-600 text-sm">&copy; {new Date().getFullYear()} 8-"B" Sinf.</p>
           </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default App;