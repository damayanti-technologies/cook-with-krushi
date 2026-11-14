/**
 * Cook With Krushi - Procedural Web Audio Synthesizer
 * Zero external audio assets, works offline, instant response.
 * Uses native Web Audio API for harmonic kitchen timer chimes.
 */

const SoundPlayer = (() => {
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  return {
    /**
     * Play a gentle harmonic chime (C5 -> E5 -> G5)
     */
    playChime() {
      if (window.StorageManager && !window.StorageManager.isSoundEnabled()) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      const now = ctx.currentTime;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.45);
      });
    },

    /**
     * Play cooking timer finish alarm (rhythmic pleasant bell pulses)
     */
    playTimerAlert() {
      if (window.StorageManager && !window.StorageManager.isSoundEnabled()) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      // 3 pulses of bell tone
      [0, 0.4, 0.8].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now + offset); // A5

        gain.gain.setValueAtTime(0, now + offset);
        gain.gain.linearRampToValueAtTime(0.35, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + offset);
        osc.stop(now + offset + 0.38);
      });
    },

    /**
     * Play completion celebratory fanfare
     */
    playCelebration() {
      if (window.StorageManager && !window.StorageManager.isSoundEnabled()) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
      const now = ctx.currentTime;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);

        gain.gain.setValueAtTime(0, now + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.25, now + i * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.65);
      });
    }
  };
})();

window.SoundPlayer = SoundPlayer;
