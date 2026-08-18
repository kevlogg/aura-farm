import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-200 p-6 max-w-2xl mx-auto space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold hover:underline">
        <ArrowLeft className="w-4 h-4" /> Volver a Aura Farm
      </Link>

      <div className="space-y-2 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <FileText className="w-6 h-6" />
          <h1 className="text-2xl font-black text-white">Términos y Condiciones de Uso</h1>
        </div>
        <p className="text-xs text-zinc-400">Última actualización: 18 de Agosto de 2026</p>
      </div>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" /> 1. Requisito de Edad Mínima (13+)
          </h2>
          <p className="text-xs text-zinc-400">
            Para registrarte y utilizar Aura Farm debes declarar y garantizar que tienes al menos **13 años de edad** (o la edad legal mínima aplicable en tu país). El uso de la plataforma por menores de 13 años sin supervisión previa está estrictamente prohibido.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Responsabilidad de Contenido Generado por Usuario (UGC)</h2>
          <p className="text-xs text-zinc-400">
            Aura Farm actúa como un prestador de servicios de intermediación. Cada usuario es el único y exclusivo responsable del material (videos, imágenes, audios, comentarios) que publique. Aura Farm no respalda ni se responsabiliza por las opiniones o contenidos cargados por los usuarios.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Reglas de Conducta y Protección contra el Ciberacoso</h2>
          <p className="text-xs text-zinc-400">
            Queda estrictamente prohibido publicar material que contenga:
          </p>
          <ul className="list-disc pl-5 text-xs text-zinc-400 space-y-1">
            <li>Menores de edad grabado sin consentimiento o expuestos a situaciones humillantes/peligrosas.</li>
            <li>Acoso directo, humillación maliciosa o ciberbullying intencional.</li>
            <li>Discurso de odio, discriminación por raza, género, religión u orientación sexual.</li>
            <li>Propaganda política violenta, difamación a terceros o noticias falsas (fake news).</li>
            <li>Contenido explícito (desnudez o violencia gráfica).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Economía de Aura Coins</h2>
          <p className="text-xs text-zinc-400">
            Las **Aura Coins** constituyen una moneda virtual ficticia de juego sin valor de reembolso ni conversión a dinero fiduciario real. Las compras de packs de coins o cosméticos son finales y no reembolsables.
          </p>
        </section>

        <section className="space-y-2 border-t border-zinc-800 pt-4">
          <h2 className="text-base font-bold text-white">5. Moderación y Suspensión de Cuentas</h2>
          <p className="text-xs text-zinc-400">
            Aura Farm se reserva el derecho incondicional de remover cualquier contenido o suspender cuentas que infrinjan los presentes Términos de Servicio sin previo aviso.
          </p>
        </section>
      </div>
    </div>
  );
}
