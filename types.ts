export type LetterStatus = 'PENDING' | 'CORRECT' | 'INCORRECT' | 'PASSED' | 'REVEALED';

export type GamePhase = 'WELCOME' | 'PLAYING' | 'PAUSED' | 'COMPLETED' | 'REVIEW';

export interface RoscoQuestion {
  id: number;
  letter: string;
  prefixType: 'starts_with' | 'contains';
  prefixRuleEs: string;
  prefixRuleHy: string;
  questionEs: string;
  questionHy: string;
  answerEs: string;
  answerHy: string;
  acceptableAnswers: string[];
  topic: string;
}

export interface LetterState {
  status: LetterStatus;
  userAnswer?: string;
  revealedAt?: number;
}
