/**
 * Cook With Krushi - Cook With Me Assistant Controller
 * Orchestrates step-by-step guidance, voice playback, voice command listening,
 * multi-timers, ingredient checklist drawer, and session persistence.
 * Powered by Damayanti Technologies
 */

class CookWithMeAssistant {
  constructor(recipe, options = {}) {
    this.recipe = recipe;
    this.steps = recipe.steps || [];
    this.totalSteps = this.steps.length;
    this.currentStepIndex = options.initialStep || 0;
    this.servings = options.servings || recipe.servings || 4;

    this.activeTimer = null;
    this.bonusTimers = [];
    this.checkedIngredients = new Set(options.checkedIngredients || []);

    this.isListeningActive = false;
    this.isAutoReadActive = true;

    // Callbacks
    this.onStepChange = options.onStepChange || (() => {});
    this.onTimerTick = options.onTimerTick || (() => {});
    this.onTimerComplete = options.onTimerComplete || (() => {});
    this.onComplete = options.onComplete || (() => {});
  }

  init() {
    // Setup Voice Command Listener
    if (window.VoiceAssistant && window.VoiceAssistant.isRecognitionSupported()) {
      window.VoiceAssistant.initRecognition((cmd, text) => {
        this.handleVoiceCommand(cmd, text);
      });
    }

    // Load any saved checkpoint
    this.loadCheckpoint();
  }

  async loadCheckpoint() {
    if (!window.DBManager) return;
    const saved = await window.DBManager.getInProgress(this.recipe.id);
    if (saved && typeof saved.currentStep === 'number' && saved.currentStep < this.totalSteps) {
      this.currentStepIndex = saved.currentStep;
      if (saved.completedChecklist) {
        this.checkedIngredients = new Set(saved.completedChecklist);
      }
    }
  }

  getCurrentStep() {
    return this.steps[this.currentStepIndex] || null;
  }

  getCurrentStepNumber() {
    return this.currentStepIndex + 1;
  }

  getProgressPercentage() {
    if (this.totalSteps <= 0) return 100;
    return Math.round(((this.currentStepIndex + 1) / this.totalSteps) * 100);
  }

  goToNextStep() {
    if (this.currentStepIndex < this.totalSteps - 1) {
      this.currentStepIndex++;
      this.onStepUpdated();
      return true;
    } else {
      this.completeCooking();
      return false;
    }
  }

  goToPreviousStep() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.onStepUpdated();
      return true;
    }
    return false;
  }

  repeatStepInstruction() {
    const step = this.getCurrentStep();
    if (!step) return;

    const lang = (window.I18nManager && window.I18nManager.getLang()) || 'en';
    const title = lang === 'te' && step.titleTe ? step.titleTe : step.title;
    const instruction = lang === 'te' && step.instructionTe ? step.instructionTe : step.instruction;

    const speechText = `${title}. ${instruction}`;
    if (window.VoiceAssistant) {
      window.VoiceAssistant.speak(speechText);
    }
  }

  onStepUpdated() {
    if (this.activeTimer) {
      this.activeTimer.stop();
      this.activeTimer = null;
    }

    const step = this.getCurrentStep();
    if (step && step.timerSeconds && step.timerSeconds > 0) {
      this.setupTimer(Math.ceil(step.timerSeconds / 60));
    }

    this.saveCheckpoint();
    this.onStepChange(this.getCurrentStep(), this.getCurrentStepNumber(), this.totalSteps);

    // Auto-read instruction if enabled
    if (this.isAutoReadActive) {
      setTimeout(() => {
        this.repeatStepInstruction();
      }, 300);
    }
  }

  setupTimer(minutes) {
    if (this.activeTimer) this.activeTimer.stop();

    this.activeTimer = new CookingTimer(
      minutes,
      (timeStr, pct) => {
        this.onTimerTick(timeStr, pct);
      },
      () => {
        this.onTimerComplete();
        if (window.VoiceAssistant) {
          window.VoiceAssistant.speak('Step timer has finished! Please check your dish now.');
        }
      }
    );
  }

  startStepTimer() {
    if (this.activeTimer) {
      this.activeTimer.start();
      return true;
    }
    return false;
  }

  pauseStepTimer() {
    if (this.activeTimer) {
      this.activeTimer.pause();
      return true;
    }
    return false;
  }

  resetStepTimer() {
    if (this.activeTimer) {
      this.activeTimer.reset();
      return true;
    }
    return false;
  }

  getTimeRemainingString() {
    if (!this.activeTimer) return 'No active timer';
    return this.activeTimer.getFormattedTime();
  }

  speakTimeRemaining() {
    if (!this.activeTimer || !this.activeTimer.isRunning) {
      if (window.VoiceAssistant) {
        window.VoiceAssistant.speak('There is currently no running timer.');
      }
      return;
    }
    const remaining = this.activeTimer.remainingSeconds;
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    let msg = '';
    if (mins > 0 && secs > 0) {
      msg = `${mins} minutes and ${secs} seconds remaining.`;
    } else if (mins > 0) {
      msg = `${mins} minutes remaining.`;
    } else {
      msg = `${secs} seconds remaining.`;
    }

    if (window.VoiceAssistant) {
      window.VoiceAssistant.speak(msg);
    }
  }

  handleVoiceCommand(cmd, rawText) {
    console.log('CookWithMe executing command:', cmd);

    switch (cmd) {
      case 'NEXT_STEP':
        window.Utils.showToast('Voice command: Next step', 'success');
        this.goToNextStep();
        break;

      case 'PREV_STEP':
        window.Utils.showToast('Voice command: Previous step', 'warning');
        this.goToPreviousStep();
        break;

      case 'REPEAT':
        window.Utils.showToast('Voice command: Repeating instruction', 'success');
        this.repeatStepInstruction();
        break;

      case 'START_TIMER':
        window.Utils.showToast('Voice command: Timer started', 'success');
        this.startStepTimer();
        break;

      case 'PAUSE_TIMER':
        window.Utils.showToast('Voice command: Timer paused', 'warning');
        this.pauseStepTimer();
        break;

      case 'RESUME_TIMER':
        window.Utils.showToast('Voice command: Timer resumed', 'success');
        this.startStepTimer();
        break;

      case 'TIME_LEFT':
        this.speakTimeRemaining();
        break;

      case 'STOP_READING':
        if (window.VoiceAssistant) window.VoiceAssistant.stopSpeaking();
        break;

      case 'FINISH_COOKING':
        this.completeCooking();
        break;

      default:
        console.log('Unrecognized command:', rawText);
    }
  }

  completeCooking() {
    if (this.activeTimer) this.activeTimer.stop();
    if (window.VoiceAssistant) {
      window.VoiceAssistant.stopSpeaking();
      window.VoiceAssistant.stopListening();
    }
    this.onComplete();
  }

  async saveCheckpoint() {
    if (!window.DBManager || !this.recipe) return;
    await window.DBManager.saveInProgress({
      recipeId: this.recipe.id,
      slug: this.recipe.slug,
      title: this.recipe.title,
      image: this.recipe.image,
      currentStep: this.currentStepIndex,
      totalSteps: this.totalSteps,
      completedChecklist: Array.from(this.checkedIngredients)
    });
  }
}

window.CookWithMeAssistant = CookWithMeAssistant;
