import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ROSCO_QUESTIONS, isAnswerCorrect } from './questions';
import { LetterState, LetterStatus } from './types';
import { Rosco } from './Rosco';
import { QuestionCard } from './QuestionCard';
import { SummaryModal } from './SummaryModal';
import { Play, Pause, RotateCcw, ListFilter, HelpCircle, Trophy, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { playSound, stopSpeaking, setMasterMute } from './audio';
import { fireConfetti } from './confetti';

const INITIAL_TIME_SECONDS = 30 * 60; // 30 minutes = 1800s

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [letterStates, setLetterStates] = useState<Record<number, LetterState>>(() => {
    const initial: Record<number, LetterState> = {};
    for (let i = 0; i < ROSCO_QUESTIONS.length; i++) {
      initial[i] = { status: 'PENDING' };
    }
    return initial;
  });

  const [timeRemaining, setTimeRemaining] = useState<number>(INITIAL_TIME_SECONDS);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'revealed';
    text: string;
    details?: string;
  } | null>(null);

  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Master sound toggle: controls all chimes, speech, and sound effects
  const handleToggleSound = () => {
    setSoundEnabled((prev) => {
      const nextState = !prev;
      setMasterMute(!nextState);
      return nextState;
    });
  };

  // Start Game handler: initiates 30-minute timer
  const handleStartGame = () => {
    setIsGameStarted(true);
    setIsPaused(false);
    if (soundEnabled) playSound.pass();
  };

  // Helper to find the next active letter
  const findNextUnresolvedIndex = useCallback((fromIndex: number, currentStates: Record<number, LetterState>): number => {
    const total = ROSCO_QUESTIONS.length;
    // Search forward from next letter
    for (let i = 1; i <= total; i++) {
      const nextIdx = (fromIndex + i) % total;
      const status = currentStates[nextIdx]?.status;
      if (status !== 'CORRECT' && status !== 'REVEALED') {
        return nextIdx;
      }
    }
    // If all are resolved, return fromIndex
    return fromIndex;
  }, []);

  // Check if all letters are completed
  const checkCompletion = useCallback((currentStates: Record<number, LetterState>) => {
    const allResolved = ROSCO_QUESTIONS.every((_, idx) => {
      const s = currentStates[idx]?.status;
      return s === 'CORRECT' || s === 'REVEALED' || s === 'INCORRECT';
    });

    if (allResolved) {
      if (soundEnabled) playSound.victory();
      fireConfetti();
      setTimeout(() => {
        setShowSummary(true);
      }, 900);
    }
  }, [soundEnabled]);

  // 30-minute Timer Loop: ONLY counts down when isGameStarted is true!
  useEffect(() => {
    if (!isGameStarted || isPaused || showSummary || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (soundEnabled) playSound.victory();
          fireConfetti();
          setShowSummary(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isGameStarted, isPaused, showSummary, timeRemaining, soundEnabled]);

  // Handler: Submit Answer
  const handleSubmitAnswer = (userInput: string) => {
    const q = ROSCO_QUESTIONS[currentIndex];
    const correct = isAnswerCorrect(userInput, q);

    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);

    if (correct) {
      if (soundEnabled) playSound.correct();
      const updatedStates: Record<number, LetterState> = {
        ...letterStates,
        [currentIndex]: { status: 'CORRECT', userAnswer: userInput }
      };
      setLetterStates(updatedStates);

      setFeedback({
        type: 'success',
        text: `¡Correcto! ${q.answerEs}`,
        details: `Հայերեն՝ ${q.answerHy}`
      });

      checkCompletion(updatedStates);

      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
        setCurrentIndex((prev) => findNextUnresolvedIndex(prev, updatedStates));
      }, 900);
    } else {
      // USER REQUIREMENT: Even if answer is wrong, the game continues without terminating!
      if (soundEnabled) playSound.error();
      const updatedStates: Record<number, LetterState> = {
        ...letterStates,
        [currentIndex]: { status: 'INCORRECT', userAnswer: userInput }
      };
      setLetterStates(updatedStates);

      setFeedback({
        type: 'error',
        text: `"${userInput}" no es correcto. Era: ${q.answerEs}`,
        details: `Հայերեն՝ ${q.answerHy}. Խաղը շարունակվում է!`
      });

      checkCompletion(updatedStates);

      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
        setCurrentIndex((prev) => findNextUnresolvedIndex(prev, updatedStates));
      }, 1500);
    }
  };

  // Handler: Pasapalabra (Pass word to next round without error)
  const handlePassWord = () => {
    if (soundEnabled) playSound.pass();
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedback(null);

    // If letter wasn't answered yet, mark as passed
    if (letterStates[currentIndex]?.status === 'PENDING') {
      setLetterStates((prev) => ({
        ...prev,
        [currentIndex]: { status: 'PASSED' }
      }));
    }

    const nextIdx = findNextUnresolvedIndex(currentIndex, letterStates);
    setCurrentIndex(nextIdx);
  };

  // Handler: Reveal Answer (CRITICAL USER REQUIREMENT: Does NOT count as wrong/incorrect, and does NOT auto-switch to another question!)
  const handleRevealAnswer = () => {
    const q = ROSCO_QUESTIONS[currentIndex];
    if (soundEnabled) playSound.reveal();
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);

    const updatedStates: Record<number, LetterState> = {
      ...letterStates,
      [currentIndex]: {
        status: 'REVEALED',
        revealedAt: Date.now()
      }
    };
    setLetterStates(updatedStates);

    setFeedback({
      type: 'revealed',
      text: `${q.answerEs} — ${q.answerHy}`,
      details: 'Դուք դիտեցիք պատասխանը (չի համարվել սխալ)։ Կարող եք ուսումնասիրել այնքան, որքան ցանկանում եք, իսկ առաջ անցնելու համար սեղմեք «Следующий вопрос»։'
    });

    checkCompletion(updatedStates);
    // USER REQUIREMENT: Do NOT automatically jump to another question! Stay on the current question!
  };

  // Handler: Restart Game
  const handleRestart = () => {
    setTimeRemaining(INITIAL_TIME_SECONDS);
    setIsGameStarted(false);
    setIsPaused(false);
    setCurrentIndex(0);
    setFeedback(null);
    setShowSummary(false);
    const initial: Record<number, LetterState> = {};
    for (let i = 0; i < ROSCO_QUESTIONS.length; i++) {
      initial[i] = { status: 'PENDING' };
    }
    setLetterStates(initial);
  };

  const currentQuestion = ROSCO_QUESTIONS[currentIndex];
  const currentLetterState = letterStates[currentIndex] || { status: 'PENDING' };

  // Calculate score stats
  const stats = Object.values(letterStates).reduce(
    (acc, cur) => {
      if (cur.status === 'CORRECT') acc.correct++;
      else if (cur.status === 'INCORRECT') acc.incorrect++;
      else if (cur.status === 'REVEALED') acc.revealed++;
      else if (cur.status === 'PASSED') acc.passed++;
      else acc.pending++;
      return acc;
    },
    { correct: 0, incorrect: 0, revealed: 0, passed: 0, pending: 0 }
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Bar Contract: Brand Wordmark — Links/Controls — Primary Actions */}
      <header className="flex items-center justify-between gap-8 px-4 sm:px-8 py-3.5 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow">
            P
          </div>
          <div>
            <span className="text-base sm:text-lg font-black tracking-tight text-white">
              Pasapalabra · El Rosco
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs text-sky-400 font-medium">
              Español + Հայերեն (A2–B1)
            </span>
          </div>
        </div>

        {/* Center Zone: Clean Stats */}
        <div className="hidden md:flex items-center gap-4 text-xs font-semibold">
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Aciertos: <span className="font-mono tabular-nums">{stats.correct}</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-rose-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Fallos: <span className="font-mono tabular-nums">{stats.incorrect}</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-amber-400 flex items-center gap-1.5" title="Respuestas vistas (no penalizan)">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Vistas: <span className="font-mono tabular-nums">{stats.revealed}</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-sky-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            Pendientes: <span className="font-mono tabular-nums">{stats.pending + stats.passed}</span>
          </span>
        </div>

        {/* Primary Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Master Sound Button: Отключить весь звук */}
          <button
            onClick={handleToggleSound}
            className={`p-2 sm:px-3.5 sm:py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
              soundEnabled
                ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white'
                : 'border-rose-600 bg-rose-950 text-rose-200 hover:bg-rose-900 ring-2 ring-rose-500/50'
            }`}
            title={soundEnabled ? 'Отключить весь звук (эффекты и голос)' : 'Включить весь звук'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="hidden sm:inline">Отключить весь звук</span>
                <span className="sm:hidden">Звук: Вкл</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
                <span className="hidden sm:inline font-extrabold text-rose-200">Включить весь звук</span>
                <span className="sm:hidden font-bold text-rose-200">Звук: Выкл</span>
              </>
            )}
          </button>

          {!isGameStarted ? (
            <button
              onClick={handleStartGame}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-600/30 active:scale-95 animate-pulse"
              title="Нажмите, чтобы начать игру и запустить 30-минутный таймер"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Начать (30 мин)</span>
            </button>
          ) : (
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              title={isPaused ? 'Reanudar temporizador' : 'Pausar temporizador'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5 text-amber-400" />}
              <span className="hidden sm:inline">{isPaused ? 'Reanudar' : 'Pausa'}</span>
            </button>
          )}

          <button
            onClick={() => setShowSummary(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Ver resumen y lista de palabras"
          >
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Palabras (27)</span>
          </button>

          <button
            onClick={handleRestart}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reiniciar el rosco (30 minutos)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8 flex flex-col justify-center">
        {/* Banner with contextual instruction */}
        <div className="mb-4 sm:mb-6 text-center">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
            El Rosco — Parte 4 (27 nuevas preguntas)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl mx-auto">
            Իսպաներեն հարցերի վրա սեղմելիս բացվում է հայերեն թարգմանությունը։ Եթե սխալ պատասխանեք, խաղը շարունակվում է։ «Посмотреть ответ» կոճակով կարող եք տեսնել պատասխանը առանց սխալի։
          </p>
        </div>

        {/* 2-Column Desktop Grid / Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Authentic Circular Rosco Dial (5 cols on lg) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <Rosco
              currentIndex={currentIndex}
              letterStates={letterStates}
              onSelectLetter={(idx) => {
                if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
                setFeedback(null);
                setCurrentIndex(idx);
              }}
              timeRemaining={timeRemaining}
              isPaused={isPaused}
              isGameStarted={isGameStarted}
              onStartGame={handleStartGame}
              totalLetters={ROSCO_QUESTIONS.length}
            />

            {/* Quick Helper below Rosco */}
            <div className="flex items-center gap-4 text-[11px] text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                Սպասող
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                Ճիշտ
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                Սխալ (խաղը շարունակվում է)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                Տեսած
              </span>
            </div>
          </div>

          {/* Right Column: Question Panel & Interactive Controls (7 cols on lg) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <QuestionCard
              question={currentQuestion}
              letterState={currentLetterState}
              onSubmitAnswer={handleSubmitAnswer}
              onPassWord={handlePassWord}
              onRevealAnswer={handleRevealAnswer}
              onNextLetter={() => {
                const nextIdx = findNextUnresolvedIndex(currentIndex, letterStates);
                setCurrentIndex(nextIdx);
              }}
              feedbackMessage={feedback}
              isGameStarted={isGameStarted}
              onStartGame={handleStartGame}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
            />

            {/* Quick navigation pill bar for all letters */}
            <div className="mt-4 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
                <span>Արագ անցում տառերին (A–Z):</span>
                <span>Ընթացիկ՝ {currentQuestion.letter} ({currentIndex + 1}/27)</span>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin">
                {ROSCO_QUESTIONS.map((q, idx) => {
                  const state = letterStates[idx] || { status: 'PENDING' };
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.letter}
                      onClick={() => {
                        if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
                        setFeedback(null);
                        setCurrentIndex(idx);
                      }}
                      className={`w-7 h-7 shrink-0 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? 'ring-2 ring-amber-400 bg-blue-500 text-white font-black scale-105'
                          : state.status === 'CORRECT'
                          ? 'bg-emerald-600/80 text-white'
                          : state.status === 'INCORRECT'
                          ? 'bg-rose-600/80 text-white'
                          : state.status === 'REVEALED'
                          ? 'bg-amber-600/80 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                      title={`${q.letter}: ${q.prefixRuleEs}`}
                    >
                      {q.letter}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Summary / Review Modal */}
      {showSummary && (
        <SummaryModal
          letterStates={letterStates}
          timeRemaining={timeRemaining}
          onRestart={handleRestart}
          onClose={() => setShowSummary(false)}
        />
      )}

      {/* Footer */}
      <footer className="py-4 border-t border-slate-800/60 text-center text-xs text-slate-500">
        <span>Pasapalabra — El Rosco · A2–B1 Español & Հայերեն · 30 րոպեանոց խաղ-ուսուցում</span>
      </footer>
    </div>
  );
}
