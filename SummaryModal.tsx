import React, { useState } from 'react';
import { ROSCO_QUESTIONS } from './questions';
import { LetterState } from './types';
import { Trophy, CheckCircle2, XCircle, Eye, RotateCcw, Volume2, X } from 'lucide-react';
import { speakSpanish } from './audio';

interface SummaryModalProps {
  letterStates: Record<number, LetterState>;
  timeRemaining: number;
  onRestart: () => void;
  onClose: () => void;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({
  letterStates,
  timeRemaining,
  onRestart,
  onClose
}) => {
  const [filter, setFilter] = useState<'ALL' | 'CORRECT' | 'INCORRECT' | 'REVEALED'>('ALL');

  const timeUsed = 1800 - timeRemaining;
  const minsUsed = Math.floor(timeUsed / 60);
  const secsUsed = timeUsed % 60;

  const stats = Object.values(letterStates).reduce(
    (acc, cur) => {
      if (cur.status === 'CORRECT') acc.correct++;
      else if (cur.status === 'INCORRECT') acc.incorrect++;
      else if (cur.status === 'REVEALED') acc.revealed++;
      else acc.pending++;
      return acc;
    },
    { correct: 0, incorrect: 0, revealed: 0, pending: 0 }
  );

  const filteredQuestions = ROSCO_QUESTIONS.filter((_, idx) => {
    const state = letterStates[idx] || { status: 'PENDING' };
    if (filter === 'ALL') return true;
    if (filter === 'CORRECT') return state.status === 'CORRECT';
    if (filter === 'INCORRECT') return state.status === 'INCORRECT';
    if (filter === 'REVEALED') return state.status === 'REVEALED';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl text-slate-100 max-h-[92vh] flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/30 shrink-0">
            <Trophy className="w-9 h-9 text-slate-950" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Pasapalabra — Resumen del Rosco
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Խաղի արդյունքներ · Նոր հարցեր (15 տարեկան) · A2–B1
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Aciertos (Ճիշտ)</div>
            <div className="text-3xl font-black text-emerald-300 mt-1 tabular-nums">{stats.correct}</div>
            <div className="text-[11px] text-emerald-400/80 mt-0.5">{Math.round((stats.correct / 27) * 100)}% de aciertos</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-center">
            <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Fallos (Սխալ)</div>
            <div className="text-3xl font-black text-rose-300 mt-1 tabular-nums">{stats.incorrect}</div>
            <div className="text-[11px] text-rose-400/80 mt-0.5">խաղը չի դադարել</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-center">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Vistos (Տեսած)</div>
            <div className="text-3xl font-black text-amber-300 mt-1 tabular-nums">{stats.revealed}</div>
            <div className="text-[11px] text-amber-400/80 mt-0.5">սխալ չի համարվել</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-center">
            <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Tiempo Usado</div>
            <div className="text-3xl font-black text-sky-300 mt-1 font-mono tabular-nums">
              {minsUsed}:{secsUsed.toString().padStart(2, '0')}
            </div>
            <div className="text-[11px] text-sky-400/80 mt-0.5">30 րոպեից</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Palabras ({filteredQuestions.length} / 27)
          </div>
          <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-xl">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'ALL' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todas (27)
            </button>
            <button
              onClick={() => setFilter('CORRECT')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'CORRECT' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-emerald-300'
              }`}
            >
              Aciertos ({stats.correct})
            </button>
            <button
              onClick={() => setFilter('INCORRECT')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'INCORRECT' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-rose-300'
              }`}
            >
              Fallos ({stats.incorrect})
            </button>
            <button
              onClick={() => setFilter('REVEALED')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'REVEALED' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-amber-300'
              }`}
            >
              Vistas ({stats.revealed})
            </button>
          </div>
        </div>

        {/* Scrollable Questions list */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 divide-y divide-slate-800/60">
          {filteredQuestions.map((q) => {
            const state = letterStates[q.id - 1] || { status: 'PENDING' };
            return (
              <div key={q.letter} className="pt-2.5 first:pt-0 flex items-start gap-3">
                {/* Letter avatar */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 mt-1 shadow ${
                  state.status === 'CORRECT'
                    ? 'bg-emerald-500 text-white'
                    : state.status === 'INCORRECT'
                    ? 'bg-rose-500 text-white'
                    : state.status === 'REVEALED'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-blue-600 text-white'
                }`}>
                  {q.letter}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="text-xs font-bold text-sky-400">
                      {q.prefixRuleEs} <span className="text-slate-500 font-normal">· {q.topic}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakSpanish(q.answerEs)}
                        className="p-1 text-slate-400 hover:text-amber-400 transition-colors"
                        title="Pronunciar"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        state.status === 'CORRECT'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : state.status === 'INCORRECT'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : state.status === 'REVEALED'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {state.status === 'CORRECT' && 'Acierto'}
                        {state.status === 'INCORRECT' && 'Fallo'}
                        {state.status === 'REVEALED' && 'Vista (sin penalización)'}
                        {state.status === 'PENDING' && 'Pendiente'}
                        {state.status === 'PASSED' && 'Pasapalabra'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-1">
                    {q.questionEs}
                  </p>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    {q.questionHy}
                  </p>

                  <div className="mt-1.5 flex items-center gap-2 text-xs font-bold text-white">
                    <span className="text-amber-400">Respuesta:</span>
                    <span className="underline decoration-amber-500/50">{q.answerEs}</span>
                    <span className="text-slate-500 font-normal">({q.answerHy})</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Continuar viendo el rosco
          </button>

          <button
            onClick={onRestart}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar de nuevo (30 min)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
