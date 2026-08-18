'use client';

import React, { useState } from 'react';
import { Upload, Video, Zap, CheckCircle2, Sparkles } from 'lucide-react';

export default function UploadPage() {
  const [caption, setCaption] = useState('');
  const [isPromoted, setIsPromoted] = useState(false);
  const [fileSelected, setFileSelected] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileSelected(e.target.files[0].name);
    }
  };

  return (
    <div className="space-y-6 pt-2 pb-8">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-black text-white">Publicar Aura Move</h2>
        <p className="text-xs text-zinc-400">
          Sube un clip vertical de 5 a 10 segundos. Somete tu acción al juicio del Tribunal.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Upload Dropzone */}
        <div className="border-2 border-dashed border-cyan-500/40 bg-zinc-950/60 rounded-3xl p-8 text-center space-y-3 cursor-pointer hover:border-cyan-400 transition-all">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            id="video-upload-input"
          />
          <label htmlFor="video-upload-input" className="cursor-pointer block space-y-2">
            <div className="w-14 h-14 mx-auto rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              {fileSelected ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <Upload className="w-7 h-7" />}
            </div>
            <p className="text-sm font-bold text-white">
              {fileSelected ? fileSelected : 'Seleccionar Video (5-10s)'}
            </p>
            <p className="text-[10px] text-zinc-500">MP4, MOV o WebM - Máx 20MB</p>
          </label>
        </div>

        {/* Caption Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-zinc-300">Descripción del Move</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="¿Qué pasó en este clip? Poné una descripción canchera..."
            rows={3}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 resize-none"
          />
        </div>

        {/* Aura Spotlight Promotion Checkbox */}
        <div
          onClick={() => setIsPromoted(!isPromoted)}
          className={`border rounded-2xl p-3.5 flex items-center justify-between cursor-pointer transition-all ${
            isPromoted
              ? 'border-amber-500 bg-amber-950/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
              : 'border-zinc-800 bg-zinc-900/60'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Zap className={`w-5 h-5 ${isPromoted ? 'text-amber-400 fill-amber-400' : 'text-zinc-500'}`} />
            <div>
              <p className="text-xs font-bold text-white">Promocionar con Aura Spotlight</p>
              <p className="text-[10px] text-zinc-400">Aparece primero en el Tribunal por 24 hs (1,200 Coins)</p>
            </div>
          </div>
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center ${
              isPromoted ? 'bg-amber-500 border-amber-400' : 'border-zinc-700'
            }`}
          >
            {isPromoted && <CheckCircle2 className="w-3.5 h-3.5 text-black" />}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 active:scale-95 text-white font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 fill-white" /> Publicar Move al Tribunal
        </button>
      </form>
    </div>
  );
}
