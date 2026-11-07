// Web Audio API and Speech Synthesis with Master Mute for Pasapalabra

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isGloballyMuted: boolean = false;

function getAudioContext(): { ctx: AudioContext; masterGain: GainNode } | null {
  if (typeof window === 'undefined') return null;
  
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(isGloballyMuted ? 0 : 1, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }

  if (!audioCtx || !masterGain) return null;
  return { ctx: audioCtx, masterGain };
}

export function setMasterMute(muted: boolean) {
  isGloballyMuted = muted;
  if (audioCtx && masterGain) {
    try {
      masterGain.gain.setValueAtTime(muted ? 0 : 1, audioCtx.currentTime);
    } catch {}
  }
  if (muted && typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function isMasterMuted(): boolean {
  return isGloballyMuted;
}

export const playSound = {
  correct: () => {
    if (isGloballyMuted) return;
    try {
      const audio = getAudioContext();
      if (!audio) return;
      const { ctx, masterGain } = audio;
      const now = ctx.currentTime;

      // Sparkling ascending major triad C5 - E5 - G5
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    } catch {}
  },

  error: () => {
    if (isGloballyMuted) return;
    try {
      const audio = getAudioContext();
      if (!audio) return;
      const { ctx, masterGain } = audio;
      const now = ctx.currentTime;

      // Soft buzzer (two muted low tones)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(196, now); // G3
      osc.frequency.linearRampToValueAtTime(146.83, now + 0.25); // D3

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      // Low pass filter to make it pleasant, not harsh
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {}
  },

  pass: () => {
    if (isGloballyMuted) return;
    try {
      const audio = getAudioContext();
      if (!audio) return;
      const { ctx, masterGain } = audio;
      const now = ctx.currentTime;

      // Pasapalabra whoosh / glide tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(500, now + 0.22);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  },

  reveal: () => {
    if (isGloballyMuted) return;
    try {
      const audio = getAudioContext();
      if (!audio) return;
      const { ctx, masterGain } = audio;
      const now = ctx.currentTime;

      // Gentle informational double bell (A4 -> E5)
      [440, 659.25].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0.15, now + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 0.3);
      });
    } catch {}
  },

  victory: () => {
    if (isGloballyMuted) return;
    try {
      const audio = getAudioContext();
      if (!audio) return;
      const { ctx, masterGain } = audio;
      const now = ctx.currentTime;
      // Joyful TV fanfare: C4, E4, G4, C5, E5, G5 sustained
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);

        gain.gain.setValueAtTime(0.15, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.6);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.6);
      });
    } catch {}
  }
};

/**
 * Native Web Speech API to read Spanish text out loud
 */
export function speakSpanish(text: string, onEnd?: () => void) {
  if (isGloballyMuted) {
    if (onEnd) onEnd();
    return;
  }
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  
  try {
    window.speechSynthesis.cancel(); // Stop any pending speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.95; // slightly slower for language learning
    utterance.pitch = 1.0;

    // Pick a natural Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Monica') || v.name.includes('Jorge')))
      || voices.find(v => v.lang.startsWith('es'));
    if (esVoice) {
      utterance.voice = esVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  } catch {
    if (onEnd) onEnd();
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
