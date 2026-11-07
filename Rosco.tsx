import React from 'react';
import { ROSCO_QUESTIONS } from './questions';
import { LetterStatus, LetterState } from './types';

interface RoscoProps {
  currentIndex: number;
  letterStates: Record<number, LetterState>;
  onSelectLetter: (index: number) => void;
  timeRemaining: number;
  isPaused: boolean;
  isGameStarted: boolean;
  onStartGame: () => void;
  totalLetters: number;
}

export const Rosco: React.FC<RoscoProps> = ({
  currentIndex,
  letterStates,
  onSelectLetter,
  timeRemaining,
  isPaused,
  isGameStarted,
  onStartGame,
  totalLetters
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Count statistics
  const stats = Object.values(letterStates).reduce(
    (acc, cur) => {
      if (cur.status === 'CORRECT') acc.correct++;
      else if (cur.status === 'INCORRECT') acc.incorrect++;
      else if (cur.status === 'REVEALED') acc.revealed++;
      return acc;
    },
    { correct: 0, incorrect: 0, revealed: 0 }
  );

  return (
    <div className="relative w-full max-w-[460px] aspect-square mx-auto flex items-center justify-center p-2 select-none">
      {/* Background radial glow */}
      <div className="absolute inset-4 rounded-full bg-blue-600/15 blur-2xl pointer-events-none" />

      {/* Decorative concentric track ring */}
      <div className="absolute inset-8 rounded-full border border-blue-500/20 pointer-events-none" />
      <div className="absolute inset-14 rounded-full border border-sky-400/10 pointer-events-none" />

      {/* Center TV-Show style Hub */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        {/* TV Show Orange Timer Bubble / Click to Start button */}
        {!isGameStarted ? (
          <button
            onClick={onStartGame}
            type="button"
            className="relative flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-emerald-500 via-green-600 to-emerald-700 shadow-emerald-500/40 ring-4 ring-emerald-300/60 hover:scale-105 active:scale-95 cursor-pointer animate-pulse group"
            title="Нажмите, чтобы начать игру и запустить 30-минутный таймер"
          >
            <div className="flex flex-col items-center justify-center text-white">
              <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase drop-shadow text-amber-200 group-hover:scale-110 transition-transform">
                ▶ НАЧАТЬ
              </span>
              <span className="text-xl sm:text-2xl font-black tracking-tight tabular-nums font-mono drop-shadow">
                30:00
              </span>
              <span className="text-[9px] font-semibold opacity-90">
                Սկսել
              </span>
            </div>

            {/* Badge showing letter index */}
            <div className="absolute -bottom-2 sm:-bottom-3 bg-slate-900 border border-emerald-500 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-300 shadow">
              Старт
            </div>
          </button>
        ) : (
          <div className={`relative flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 ${
            timeRemaining <= 120 
              ? 'w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-rose-500 via-red-600 to-rose-700 shadow-rose-500/40 ring-4 ring-rose-400/60 animate-pulse' 
              : 'w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 shadow-orange-500/30 ring-4 ring-amber-300/40'
          }`}>
            <div className="flex flex-col items-center justify-center text-white">
              <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase opacity-90">
                {isPaused ? 'Pausa' : 'Tiempo'}
              </span>
              <span className="text-xl sm:text-2xl font-black tracking-tight tabular-nums font-mono drop-shadow">
                {formatTime(timeRemaining)}
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium opacity-80 mt-0.5">
                30:00 max
              </span>
            </div>

            {/* Small badge showing active letter index */}
            <div className="absolute -bottom-2 sm:-bottom-3 bg-slate-900 border border-slate-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-sky-300 shadow">
              {currentIndex + 1} / {totalLetters}
            </div>
          </div>
        )}

        {/* Mini stats underneath timer */}
        <div className="mt-5 sm:mt-6 flex items-center gap-2.5 text-xs font-semibold">
          <div className="flex items-center gap-1 text-emerald-400" title="Aciertos (Correct)">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-400" />
            <span className="font-mono tabular-nums">{stats.correct}</span>
          </div>
          <span className="text-slate-600">·</span>
          <div className="flex items-center gap-1 text-rose-400" title="Fallos (Errors)">
            <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-400" />
            <span className="font-mono tabular-nums">{stats.incorrect}</span>
          </div>
          <span className="text-slate-600">·</span>
          <div className="flex items-center gap-1 text-amber-400" title="Respuestas vistas (Revealed)">
            <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-400" />
            <span className="font-mono tabular-nums">{stats.revealed}</span>
          </div>
        </div>
      </div>

      {/* 27 Circular Rosco Letter Nodes */}
      {ROSCO_QUESTIONS.map((q, idx) => {
        const total = ROSCO_QUESTIONS.length;
        // Start at -90 degrees (12 o'clock top center) and go clockwise
        const angle = -Math.PI / 2 + (idx * 2 * Math.PI) / total;
        // Radius in percentage: 41% puts letters comfortably near the outer rim
        const radius = 41.5;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);

        const state = letterStates[idx] || { status: 'PENDING' };
        const isActive = idx === currentIndex;

        // Styling according to TV show status
        let buttonStyle = 'bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-blue-500/40 border-blue-400/30';
        let indicatorGlow = '';

        if (state.status === 'CORRECT') {
          buttonStyle = 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white shadow-emerald-500/50 border-emerald-300';
        } else if (state.status === 'INCORRECT') {
          buttonStyle = 'bg-gradient-to-b from-rose-500 to-rose-700 text-white shadow-rose-500/50 border-rose-300';
        } else if (state.status === 'REVEALED') {
          buttonStyle = 'bg-gradient-to-b from-amber-400 to-amber-600 text-slate-950 shadow-amber-500/50 border-amber-200';
        } else if (state.status === 'PASSED') {
          buttonStyle = 'bg-gradient-to-b from-sky-500 to-blue-600 text-white shadow-sky-400/40 border-sky-300';
        }

        if (isActive) {
          indicatorGlow = 'ring-4 ring-amber-300 ring-offset-2 ring-offset-slate-950 scale-120 z-30 font-black animate-pulse';
        }

        return (
          <button
            key={q.letter}
            onClick={() => onSelectLetter(idx)}
            title={`${q.letter}: ${q.prefixRuleEs}`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm tracking-tight border shadow-md transition-all duration-200 cursor-pointer active:scale-95 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${buttonStyle} ${indicatorGlow}`}
            aria-label={`Letra ${q.letter}, estado: ${state.status}`}
          >
            <span className="relative z-10 leading-none">{q.letter}</span>
            {/* Top specular reflection glass highlight */}
            <span className="absolute top-0.5 inset-x-1 h-2 rounded-t-full bg-white/35 pointer-events-none" />
          </button>
        );
      })}
    </div>
  );
};
