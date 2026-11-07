import React, { useState, useEffect, useRef } from 'react';
import { RoscoQuestion, LetterState } from './types';
import { Volume2, VolumeX, ChevronRight, Eye, CornerDownLeft, Sparkles, HelpCircle, Languages } from 'lucide-react';
import { speakSpanish } from './audio';

interface QuestionCardProps {
  question: RoscoQuestion;
  letterState: LetterState;
  onSubmitAnswer: (answer: string) => void;
  onPassWord: () => void;
  onRevealAnswer: () => void;
  onNextLetter: () => void;
  feedbackMessage: { type: 'success' | 'error' | 'revealed'; text: string; details?: string } | null;
  isGameStarted: boolean;
  onStartGame: () => void;
  soundEnabled: boolean;
  onToggleSound?: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  letterState,
  onSubmitAnswer,
  onPassWord,
  onRevealAnswer,
  onNextLetter,
  feedbackMessage,
  isGameStarted,
  onStartGame,
  soundEnabled,
  onToggleSound
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showArmenian, setShowArmenian] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset local state when moving to a new question
  useEffect(() => {
    setInputValue('');
    // Auto-focus input if not resolved
    if (letterState.status !== 'CORRECT' && letterState.status !== 'REVEALED') {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [question.id, letterState.status]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;
    if (!isGameStarted) {
      onStartGame();
    }
    onSubmitAnswer(inputValue.trim());
  };

  const handlePass = () => {
    if (!isGameStarted) {
      onStartGame();
    }
    onPassWord();
  };

  const handleReveal = () => {
    if (!isGameStarted) {
      onStartGame();
    }
    onRevealAnswer();
  };

  const handleInsertChar = (char: string) => {
    setInputValue(prev => prev + char);
    inputRef.current?.focus();
  };

  const handleSpeak = (textToSpeak?: string) => {
    if (!soundEnabled || isSpeaking) return;
    setIsSpeaking(true);
    const targetText = textToSpeak || `${question.prefixRuleEs}. ${question.questionEs}`;
    speakSpanish(targetText, () => {
      setIsSpeaking(false);
    });
  };

  const isCurrentResolved = letterState.status === 'CORRECT' || letterState.status === 'REVEALED';
  const isRevealed = letterState.status === 'REVEALED';

  return (
    <div className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col justify-between">
      {/* Top Banner: Letter badge & Rule */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-blue-600/30">
            {question.letter}
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>{question.prefixRuleEs}</span>
              <span className="text-xs font-normal text-slate-400">· {question.prefixRuleHy}</span>
            </div>
            <div className="text-xs text-sky-400/90 font-medium">
              {question.topic}
            </div>
          </div>
        </div>

        {/* Audio Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {onToggleSound && (
            <button
              onClick={onToggleSound}
              type="button"
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                soundEnabled
                  ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
                  : 'border-rose-600 bg-rose-950/80 text-rose-300 hover:bg-rose-900/60 ring-2 ring-rose-500/40'
              }`}
              title={soundEnabled ? 'Отключить весь звук (эффекты и голос)' : 'Включить весь звук'}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Звук: Вкл</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span className="hidden sm:inline font-bold">Звук: Выкл</span>
                </>
              )}
            </button>
          )}

          {/* Listen Audio Button */}
          <button
            onClick={() => handleSpeak()}
            type="button"
            disabled={isSpeaking || !soundEnabled}
            title={soundEnabled ? "Escuchar en español / Լսել իսպաներենով" : "Звук отключен (включите звук чтобы слушать)"}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer disabled:opacity-40"
          >
            <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-400 animate-bounce' : 'text-sky-400'}`} />
            <span className="hidden sm:inline">Escuchar</span>
          </button>
        </div>
      </div>

      {/* Main Question Box */}
      <div className="my-4 sm:my-5 space-y-3">
        {/* Spanish Question (CLICKABLE to reveal Armenian translation!) */}
        <div
          onClick={() => setShowArmenian(prev => !prev)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setShowArmenian(prev => !prev);
            }
          }}
          className="group relative p-4 sm:p-5 rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700 hover:border-sky-500/60 transition-all duration-200 cursor-pointer shadow-inner text-left"
          title="Սեղմեք այստեղ՝ հայերեն թարգմանությունը տեսնելու համար"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Español
            </span>
            <span className="text-[11px] text-sky-400 font-medium group-hover:underline flex items-center gap-1">
              <Languages className="w-3.5 h-3.5" />
              {showArmenian ? 'Թաքցնել հայերենը' : 'Տեսնել հայերեն (Սեղմեք)'}
            </span>
          </div>

          <p className="mt-2 text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
            {question.questionEs}
          </p>

          <div className="mt-2 text-[11px] text-slate-400 italic">
            💡 Սեղմեք այս տեքստի վրա՝ հայերեն թարգմանությունը բացելու համար
          </div>
        </div>

        {/* Armenian Translation Box (Toggled by clicking the Spanish box) */}
        {showArmenian ? (
          <div className="p-4 sm:p-4.5 rounded-xl bg-sky-950/40 border border-sky-800/50 text-left transition-all duration-300 animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center justify-between text-xs font-semibold text-sky-300 mb-1">
              <span className="flex items-center gap-1">
                🇦🇲 Հայերեն թարգմանություն
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowArmenian(false);
                }}
                className="text-slate-400 hover:text-white text-[11px] underline"
              >
                Փակել
              </button>
            </div>
            <p className="text-sm sm:text-base font-normal text-sky-100 leading-relaxed font-sans">
              {question.questionHy}
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowArmenian(true)}
            className="w-full py-2 px-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-sky-300 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-sky-400" />
            <span>Դիտել հարցի հայերեն թարգմանությունը (Armenio)</span>
          </button>
        )}
      </div>

      {/* Feedback banner (if just answered or revealed) */}
      {feedbackMessage && (
        <div className={`mb-4 p-3.5 rounded-xl text-sm flex items-start gap-2.5 transition-all ${
          feedbackMessage.type === 'success'
            ? 'bg-emerald-950/60 border border-emerald-500/50 text-emerald-200'
            : feedbackMessage.type === 'revealed'
            ? 'bg-amber-950/60 border border-amber-500/50 text-amber-200'
            : 'bg-rose-950/60 border border-rose-500/50 text-rose-200'
        }`}>
          <div className="font-bold shrink-0">
            {feedbackMessage.type === 'success' && '✅ ¡Correcto!'}
            {feedbackMessage.type === 'revealed' && '📖 Respuesta aprendida:'}
            {feedbackMessage.type === 'error' && '❌ Incorrecto:'}
          </div>
          <div className="flex-1">
            <div>{feedbackMessage.text}</div>
            {feedbackMessage.details && (
              <div className="text-xs opacity-90 mt-1 font-medium">
                {feedbackMessage.details}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Form & Action Controls */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Input bar */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isCurrentResolved}
            placeholder={isCurrentResolved ? 'Ya resuelta / Արդեն լուծված է' : 'Escribe tu respuesta aquí en español...'}
            className="w-full bg-slate-950 border border-slate-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 text-white rounded-xl py-3 pl-4 pr-12 text-base font-medium outline-none transition-all placeholder:text-slate-500 disabled:opacity-60 disabled:cursor-not-allowed"
          />

          <button
            type="submit"
            disabled={!inputValue.trim() || isCurrentResolved}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-30 disabled:hover:bg-blue-600 transition-colors cursor-pointer"
            title="Enviar respuesta (Enter)"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Spanish special characters keyboard helper */}
        <div className="flex items-center justify-between flex-wrap gap-1 pt-1 text-xs text-slate-400">
          <span className="text-[11px] text-slate-500 hidden sm:inline">Teclado rápido:</span>
          <div className="flex items-center gap-1">
            {['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü'].map((char) => (
              <button
                key={char}
                type="button"
                onClick={() => handleInsertChar(char)}
                className="w-7 h-7 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs flex items-center justify-center transition-colors cursor-pointer border border-slate-700/60"
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* Revealed Answer Box: player stays on this question and reviews at their own pace */}
        {isRevealed && (
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/50 via-slate-900 to-amber-950/30 border border-amber-500/50 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-semibold text-amber-300">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-400" />
                Ответ открыт (не засчитан как ошибка):
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-200 border border-amber-700/60 font-sans">
                Չի համարվել սխալ
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg bg-slate-950/70 border border-amber-500/30">
              <div>
                <div className="text-xl font-black text-white flex items-center gap-2">
                  <span className="text-amber-300">{question.answerEs}</span>
                  <button
                    type="button"
                    onClick={() => handleSpeak(question.answerEs)}
                    disabled={!soundEnabled}
                    className="p-1 text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                    title="Прослушать произношение"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Հայերեն՝ <span className="font-bold text-sky-300">{question.answerHy}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onNextLetter}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
              >
                <span>Следующий вопрос</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-[11px] text-slate-400 italic">
              💡 Вы можете изучить ответ сколько нужно. Чтобы перейти к следующему вопросу, нажмите синюю кнопку «Следующий вопрос» или кликните по любой букве в круге.
            </div>
          </div>
        )}

        {/* Start Game Notice Banner if not started */}
        {!isGameStarted && (
          <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <div className="text-xs font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Время еще не идет!
              </div>
              <div className="text-[11px] text-emerald-200/90 mt-0.5">
                Таймер на 30 минут запустится после клика на «Начать игру»
              </div>
            </div>
            <button
              type="button"
              onClick={onStartGame}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <span>▶ Начать игру (30 мин)</span>
            </button>
          </div>
        )}

        {/* Main Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
          {/* Button 1: Enviar / Submit */}
          <button
            type="submit"
            disabled={!inputValue.trim() || isCurrentResolved}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white shadow-lg shadow-emerald-700/30 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Comprobar</span>
            <span className="text-xs opacity-75 font-normal">(Enter)</span>
          </button>

          {/* Button 2: Pasapalabra (Pass word, no penalty) */}
          <button
            type="button"
            onClick={handlePass}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-700/30 transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-1.5"
            title="Pasa palabra a la siguiente ronda sin penalización"
          >
            <span>Pasapalabra</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Button 3: Ver respuesta (CRITICAL USER REQUIREMENT: DOES NOT COUNT AS WRONG!) */}
          <button
            type="button"
            onClick={handleReveal}
            className="w-full py-3 px-3 rounded-xl font-bold text-xs sm:text-sm bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-1.5"
            title="Ver la respuesta correcta sin contar como error (ուսուցողական)"
          >
            <Eye className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="truncate">Посмотреть ответ</span>
          </button>
        </div>

        {/* Clarification hint about the "Ver respuesta" button */}
        <div className="text-[11px] text-center text-slate-400 pt-1 flex items-center justify-center gap-1">
          <HelpCircle className="w-3 h-3 text-amber-400 shrink-0" />
          <span>«Посмотреть ответ» բացում է պատասխանը և չի համարվում սխալ։</span>
        </div>
      </form>
    </div>
  );
};
