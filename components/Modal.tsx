import React, { useState } from 'react';
import { ApplicationItem } from '../types';
import ShapeViewer from './ShapeViewer';
import { askGemini } from '../services/geminiService';

interface ModalProps {
  item: ApplicationItem;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [sources, setSources] = useState<string[]>([]);

  const handleAskAI = async () => {
    setLoading(true);
    setAiResponse(null);
    setSources([]);
    
    const result = await askGemini(item.title, item.problem);
    
    setAiResponse(result.text);
    if (result.sources) {
        setSources(result.sources);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-indigo-500/30 rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]">
        
        {/* Left Side: 3D Visualization */}
        <div className="w-full md:w-1/2 h-64 md:h-auto bg-slate-950 relative border-b md:border-b-0 md:border-r border-slate-700">
          <ShapeViewer type={item.shapeType} />
          <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
            3D Vizualizatsiya
          </div>
        </div>

        {/* Right Side: Information */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto scrollbar-hide flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              {item.title}
            </h2>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <h3 className="text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-2">Muammo</h3>
              <p className="text-slate-300 leading-relaxed">{item.problem}</p>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <h3 className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-2">Yechim</h3>
              <p className="text-slate-300 leading-relaxed">{item.solution}</p>
            </div>

            <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
              <span className="text-slate-400 font-medium">Formula:</span>
              <span className="text-2xl font-serif text-white italic tracking-widest">
                 {/* Rendering pseudo-LaTeX */}
                 {item.formula}
              </span>
            </div>
          </div>

          {/* AI Section */}
          <div className="pt-4 mt-auto border-t border-slate-700">
             {!aiResponse && !loading && (
                <button 
                  onClick={handleAskAI}
                  className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-6 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-lg shadow-indigo-500/20"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 animate-pulse rounded-xl" style={{ animationDuration: '3s' }}></span>
                  <svg className="w-6 h-6 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="z-10">Gemini AI'dan so'rash</span>
                </button>
             )}

             {loading && (
                <div className="flex items-center justify-center gap-3 p-4 text-indigo-300 animate-pulse bg-slate-800/30 rounded-xl">
                   <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                   <span>AI o'ylamoqda va qidirmoqda...</span>
                </div>
             )}

             {aiResponse && (
               <div className="bg-indigo-950/30 border border-indigo-500/30 rounded-xl p-5 animate-fade-in">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded font-bold">Gemini 2.5</span>
                    <span className="text-indigo-200 text-xs">Google Search yordamida</span>
                  </div>
                  <p className="text-indigo-100 text-sm leading-relaxed mb-3">
                    {aiResponse}
                  </p>
                  {sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-indigo-500/20">
                          <p className="text-xs text-indigo-300 mb-1">Manbalar:</p>
                          <ul className="list-disc list-inside">
                              {sources.map((src, idx) => (
                                  <li key={idx} className="text-xs text-blue-400 truncate hover:text-blue-300 transition-colors">
                                      <a href={src} target="_blank" rel="noopener noreferrer">{src}</a>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;