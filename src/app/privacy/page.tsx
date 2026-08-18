import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-200 p-6 max-w-2xl mx-auto space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold hover:underline">
        <ArrowLeft className="w-4 h-4" /> Volver a Aura Farm
      </Link>

      <div className="space-y-2 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <Lock className="w-6 h-6" />
          <h1 className="text-2xl font-black text-white">Política de Privacidad</h1>
        </div>
        <p className="text-xs text-zinc-400">Última actualización: 18 de Agosto de 2026</p>
      </div>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Información que Recopilamos</h2>
          <p className="text-xs text-zinc-400">
            Recopilamos únicamente los datos necesarios para brindar el servicio: dirección de correo electrónico, nombre de usuario público, avatar seleccionado, registros de interacción (votos en el Tribunal) y videos cargados explícitamente por el usuario.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Privacidad y Protección de Menores</h2>
          <p className="text-xs text-zinc-400">
            No recopilamos ni solicitamos a sabiendas información de identificación personal ni datos de geolocalización precisa a menores de 13 años. Si un padre o tutor descubre que su hijo nos ha proporcionado información personal, puede contactarnos para solicitar la eliminación completa inmediatas.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Procesamiento de Pagos</h2>
          <p className="text-xs text-zinc-400">
            Las transacciones de recarga de Aura Coins son procesadas por pasarelas seguras (Mercado Pago y Stripe). Aura Farm no almacena ni tiene acceso a los números completos de tarjetas de crédito o credenciales bancarias.
          </p>
        </section>

        <section className="space-y-2 border-t border-zinc-800 pt-4">
          <h2 className="text-base font-bold text-white">4. Solicitud de Eliminación de Datos</h2>
          <p className="text-xs text-zinc-400">
            Puedes solicitar la eliminación total de tu cuenta y los videos asociados enviando un correo electrónico a <strong className="text-cyan-400">privacidad@aurafarm.app</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
