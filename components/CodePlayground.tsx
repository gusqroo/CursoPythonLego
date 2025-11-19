import React, { useState } from 'react';
import { Play, RefreshCw } from 'lucide-react';

interface CodePlaygroundProps {
  initialCode: string;
  expectedKeywords: string[];
  successMessage: string;
  onSuccess: () => void;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({ 
  initialCode, 
  expectedKeywords, 
  successMessage, 
  onSuccess 
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleRun = () => {
    setOutput("Ejecutando en Hub SPIKE Prime...");
    
    // Simulated Latency
    setTimeout(() => {
      // Naive validation logic for the demo
      const normalize = (str: string) => str.replace(/\s/g, '').toLowerCase();
      const normalizedCode = normalize(code);
      
      const missingKeywords = expectedKeywords.filter(kw => !normalizedCode.includes(normalize(kw)));

      if (missingKeywords.length === 0) {
        setOutput(`> Programa Iniciado\n${successMessage}\n> Programa Finalizado`);
        setStatus('success');
        onSuccess();
      } else {
        setOutput(`> Error:\nHmmm, algo falta. Asegúrate de haber usado: ${expectedKeywords.join(', ')}`);
        setStatus('error');
      }
    }, 800);
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput("");
    setStatus('idle');
  };

  return (
    <div className="mt-6 rounded-xl overflow-hidden border-2 border-slate-300 shadow-sm bg-[#1e1e1e] text-white font-mono">
      <div className="flex items-center justify-between bg-[#2d2d2d] px-4 py-2 border-b border-slate-600">
        <span className="text-sm text-slate-300 font-bold">main.py</span>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="p-1 hover:bg-slate-600 rounded text-slate-300 transition-colors"
            title="Reiniciar Código"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button 
            onClick={handleRun}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded font-bold transition-colors"
          >
            <Play className="w-3 h-3" /> EJECUTAR
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 h-64">
        <textarea
          className="bg-[#1e1e1e] p-4 resize-none outline-none border-r border-slate-700 text-sm w-full h-full font-mono text-blue-200"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
        />
        <div className="bg-[#1e1e1e] p-4 text-sm h-full overflow-y-auto border-t md:border-t-0">
          <div className="text-slate-500 uppercase text-xs font-bold mb-2 tracking-wider">Pantalla Virtual del Hub</div>
          <pre className={`whitespace-pre-wrap ${status === 'success' ? 'text-green-400' : status === 'error' ? 'text-red-400' : 'text-slate-400'}`}>
            {output || "Listo para ejecutar..."}
          </pre>
        </div>
      </div>
    </div>
  );
};