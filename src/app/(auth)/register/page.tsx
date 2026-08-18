'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Flame, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgeConfirmed || !isTermsAccepted) return;
    alert('Registro simulado con éxito. ¡Bienvenido a Aura Farm!');
  };

  const isFormValid = username && email && password && isAgeConfirmed && isTermsAccepted;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            <Flame className="w-7 h-7 text-white fill-white" />
          </div>
          <h1 className="text-xl font-black text-white">Crear Cuenta en Aura Farm</h1>
          <p className="text-xs text-zinc-400">Únete al Tribunal y comienza a farmear Aura.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300">Nombre de Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ej. gigachad_99"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-300">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* AGE & LEGAL CONFIRMATION CHECKBOXES */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={isAgeConfirmed}
                onChange={(e) => setIsAgeConfirmed(e.target.checked)}
                className="mt-0.5 rounded border-zinc-700 text-cyan-500 focus:ring-cyan-500"
              />
              <span>
                <strong className="text-white font-bold">Tengo al menos 13 años de edad.</strong> (Protección de menores).
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded border-zinc-700 text-cyan-500 focus:ring-cyan-500"
              />
              <span>
                Acepto los{' '}
                <Link href="/terms" className="text-cyan-400 underline" target="_blank">
                  Términos de Servicio
                </Link>{' '}
                y la{' '}
                <Link href="/privacy" className="text-cyan-400 underline" target="_blank">
                  Política de Privacidad
                </Link>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-xl font-black text-xs transition-all shadow-lg ${
              isFormValid
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white active:scale-95'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
            }`}
          >
            Registrarme y Comenzar
          </button>
        </form>
      </div>
    </div>
  );
}
