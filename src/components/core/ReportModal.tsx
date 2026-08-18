'use client';

import React, { useState } from 'react';
import { Flag, X, ShieldAlert, CheckCircle2, UserX, MessageSquareWarning, Flame } from 'lucide-react';
import { ReportReason } from '@/types';

interface ReportModalProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
  onReportSubmitted: (postId: string, reason: ReportReason, details?: string) => void;
}

const REPORT_REASONS: { key: ReportReason; label: string; description: string; icon: any }[] = [
  {
    key: 'MINORS_RISK',
    label: '👶 Menor de edad en riesgo',
    description: 'Menores sin consentimiento o en situaciones peligrosas.',
    icon: ShieldAlert,
  },
  {
    key: 'BULLYING_HARASSMENT',
    label: '🛑 Ciberacoso / Humillación',
    description: 'Acoso directo o grabación a terceros para ridiculizarlos.',
    icon: UserX,
  },
  {
    key: 'HATE_SPEECH_POLITICS',
    label: '🗣️ Discurso de odio / Política',
    description: 'Propaganda política, racismo, discriminación o agresiones.',
    icon: MessageSquareWarning,
  },
  {
    key: 'NSFW_EXPLICIT',
    label: '🔞 Contenido Explícito / Violencia',
    description: 'Desnudez, actos explícitos o violencia gráfica.',
    icon: Flame,
  },
];

export const ReportModal: React.FC<ReportModalProps> = ({
  postId,
  isOpen,
  onClose,
  onReportSubmitted,
}) => {
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(null);
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;

    onReportSubmitted(postId, selectedReason, details);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedReason(null);
      setDetails('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-900 border border-zinc-800"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="flex items-center gap-2 text-rose-400 font-extrabold text-base">
              <Flag className="w-5 h-5" />
              <span>Reportar Clip Inapropiado</span>
            </div>
            <p className="text-xs text-zinc-400">
              Ayúdanos a mantener Aura Farm seguro. Tus reportes son 100% anónimos.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar pr-1">
                {REPORT_REASONS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedReason === item.key;
                  return (
                    <div
                      key={item.key}
                      onClick={() => setSelectedReason(item.key)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-950/40 text-white shadow-md'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs flex items-center gap-2">
                          <Icon className="w-4 h-4 text-rose-400" />
                          {item.label}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-400" />}
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1">{item.description}</p>
                    </div>
                  );
                })}
              </div>

              {selectedReason && (
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Detalles adicionales opcionales..."
                  rows={2}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 resize-none"
                />
              )}

              <button
                type="submit"
                disabled={!selectedReason}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                  selectedReason
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg active:scale-95'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                Enviar Denuncia Anónima
              </button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-extrabold text-white text-sm">Reporte Recibido</h4>
            <p className="text-xs text-zinc-400">
              Nuestro equipo de moderación revisará este contenido de inmediato.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
