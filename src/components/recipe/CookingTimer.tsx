'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, BellRing, Timer as TimerIcon } from 'lucide-react';
import { formatSeconds } from '@/lib/utils';
import { playChimeSound } from '@/lib/timerAudio';
import { useLanguage } from '@/context/LanguageContext';

interface CookingTimerProps {
  durationSeconds: number; // e.g. 300 for 5 minutes
  timerLabel?: string;
  autoStart?: boolean;
}

export const CookingTimer: React.FC<CookingTimerProps> = ({
  durationSeconds,
  timerLabel = 'Step Timer',
  autoStart = false,
}) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);

  // Drift-proof reference: target end timestamp (Date.now() + milliseconds left)
  const targetTimeRef = useRef<number | null>(null);
  const chimeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Sync if duration changes between steps
  useEffect(() => {
    setTimeLeft(durationSeconds);
    setIsRunning(false);
    setIsFinished(false);
    targetTimeRef.current = null;
    if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current);
  }, [durationSeconds]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      if (!targetTimeRef.current) {
        targetTimeRef.current = Date.now() + timeLeft * 1000;
      }

      interval = setInterval(() => {
        if (!targetTimeRef.current) return;
        const remaining = Math.round((targetTimeRef.current - Date.now()) / 1000);

        if (remaining <= 0) {
          setTimeLeft(0);
          setIsRunning(false);
          setIsFinished(true);
          targetTimeRef.current = null;

          // Sound alarm chime
          if (!muted) {
            playChimeSound();
            // Repeat chime twice
            chimeIntervalRef.current = setInterval(() => {
              playChimeSound();
            }, 1400);
            setTimeout(() => {
              if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current);
            }, 4500);
          }
        } else {
          setTimeLeft(remaining);
        }
      }, 250);
    } else {
      targetTimeRef.current = null;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, muted]);

  const handleStart = () => {
    if (isFinished) {
      handleReset();
    }
    targetTimeRef.current = Date.now() + timeLeft * 1000;
    setIsRunning(true);
    setIsFinished(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    targetTimeRef.current = null;
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(durationSeconds);
    targetTimeRef.current = null;
    if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current);
  };

  // Progress percentage
  const progressPercent = Math.max(0, Math.min(100, ((durationSeconds - timeLeft) / durationSeconds) * 100));

  return (
    <div className={`p-4 sm:p-5 rounded-3xl border transition-all ${
      isFinished
        ? 'bg-amber-50 border-amber-300 ring-4 ring-amber-100 animate-pulse'
        : isRunning
        ? 'bg-white border-primary shadow-lifted'
        : 'bg-[#FAF8F2] border-[#EAE7DF]'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
            isFinished
              ? 'bg-amber-500 text-white animate-bounce'
              : isRunning
              ? 'bg-primary text-white'
              : 'bg-sage-100 text-deep-green'
          }`}>
            {isFinished ? <BellRing className="w-4 h-4" /> : <TimerIcon className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
              {timerLabel}
            </h4>
            <span className="text-[11px] text-charcoal-muted">
              {isFinished ? t('timerFinished') : isRunning ? t('timerRunning') : 'Target duration'}
            </span>
          </div>
        </div>

        {/* Mute button */}
        <button
          onClick={() => setMuted(!muted)}
          aria-label={muted ? 'Unmute' : 'Mute sound'}
          className="p-1.5 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-white transition-colors"
          title={muted ? 'Unmute timer sound' : 'Mute timer sound'}
        >
          {muted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Countdown Display */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
        <div className="text-center sm:text-left">
          <div className={`font-mono text-4xl sm:text-5xl font-black tracking-tight ${
            isFinished
              ? 'text-amber-600'
              : isRunning
              ? 'text-deep-green'
              : 'text-charcoal'
          }`}>
            {formatSeconds(timeLeft)}
          </div>
          <p className="text-[11px] text-charcoal-muted mt-0.5">
            Initial: {formatSeconds(durationSeconds)}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {isRunning ? (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-peach hover:bg-peach-dark text-deep-green font-bold text-xs shadow-xs transition-all"
            >
              <Pause className="w-4 h-4" />
              <span>{t('pauseTimer')}</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-deep-green hover:bg-deep-hover text-white font-bold text-xs shadow-xs transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{timeLeft < durationSeconds ? t('resumeTimer') : t('startTimer')}</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-2.5 rounded-full bg-white hover:bg-sage-100 border border-[#E0DCCE] text-charcoal-muted hover:text-charcoal transition-colors"
            title={t('resetTimer')}
            aria-label="Reset timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#EAE7DF] h-2 rounded-full overflow-hidden mt-3">
        <div
          className={`h-full transition-all duration-300 ${
            isFinished ? 'bg-amber-500' : 'bg-primary'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
