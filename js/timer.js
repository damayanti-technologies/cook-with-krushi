/**
 * Cook With Krushi - Cooking Timer
 * Target-timestamp based to eliminate browser throttling drift.
 * Dispatches audio chimes and native browser notifications when time is up.
 */

class CookingTimer {
  constructor(durationMinutes, onTick, onComplete) {
    this.totalSeconds = Math.max(1, Math.round(durationMinutes * 60));
    this.remainingSeconds = this.totalSeconds;
    this.onTick = onTick || (() => {});
    this.onComplete = onComplete || (() => {});
    this.isRunning = false;
    this.timerId = null;
    this.targetEndTime = null;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.targetEndTime = Date.now() + this.remainingSeconds * 1000;

    this.timerId = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.round((this.targetEndTime - now) / 1000));
      this.remainingSeconds = diff;

      this.onTick(this.getFormattedTime(), this.getProgressPercent());

      if (this.remainingSeconds <= 0) {
        this.stop();
        this.triggerAlarm();
        this.onComplete();
      }
    }, 250);

    this.onTick(this.getFormattedTime(), this.getProgressPercent());
  }

  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  reset() {
    this.pause();
    this.remainingSeconds = this.totalSeconds;
    this.onTick(this.getFormattedTime(), 0);
  }

  stop() {
    this.pause();
    this.remainingSeconds = 0;
  }

  getFormattedTime() {
    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  getProgressPercent() {
    if (this.totalSeconds <= 0) return 100;
    return Math.min(100, Math.round(((this.totalSeconds - this.remainingSeconds) / this.totalSeconds) * 100));
  }

  triggerAlarm() {
    // 1. Web Audio Chime
    if (window.SoundPlayer) {
      window.SoundPlayer.playTimerAlert();
    }

    // 2. Native Browser Notification (if permission granted)
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('⏰ Timer Finished! - Cook With Krushi', {
          body: 'Your cooking step timer has completed. Check your food now!',
          icon: '/assets/icons/icon-192.png',
          tag: 'cwk-timer'
        });
      } catch (err) {
        console.warn('Notification error:', err);
      }
    }
  }

  static async requestNotificationPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }
}

window.CookingTimer = CookingTimer;
