/**
 * Cook With Krushi - Voice Assistant Module
 * Text-to-Speech (TTS) & Speech Recognition (STT) for hands-free cooking.
 * Supports English & Telugu voices and voice commands with graceful fallbacks.
 * Powered by Damayanti Technologies
 */

const VoiceAssistant = (() => {
  // TTS State
  const synth = window.speechSynthesis || null;
  let currentUtterance = null;
  let isSpeaking = false;
  let isPaused = false;
  let autoReadEnabled = true;

  // STT State
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  let recognition = null;
  let isListening = false;
  let onCommandCallback = null;

  // Voice lookup cache
  let availableVoices = [];

  function loadVoices() {
    if (!synth) return;
    availableVoices = synth.getVoices() || [];
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = () => {
        availableVoices = synth.getVoices() || [];
      };
    }
  }
  loadVoices();

  function getBestVoice(lang = 'en') {
    if (!availableVoices.length) loadVoices();

    if (lang === 'te') {
      // Look for Telugu voice
      const teVoice = availableVoices.find(v => v.lang.startsWith('te') || v.name.toLowerCase().includes('telugu'));
      if (teVoice) return teVoice;
      // Fallback to Indian English for natural accent
      const inVoice = availableVoices.find(v => v.lang === 'en-IN' || v.name.toLowerCase().includes('india'));
      if (inVoice) return inVoice;
    }

    // English voice
    const inVoice = availableVoices.find(v => v.lang === 'en-IN' || v.name.toLowerCase().includes('india'));
    if (inVoice) return inVoice;

    const enVoice = availableVoices.find(v => v.lang.startsWith('en'));
    return enVoice || availableVoices[0] || null;
  }

  // --- TEXT-TO-SPEECH (TTS) METHODS ---

  function speak(text, onEnd = null) {
    if (!synth) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    stopSpeaking();

    const lang = (window.I18nManager && window.I18nManager.getLang()) || 'en';
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getBestVoice(lang);

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = lang === 'te' ? 'te-IN' : 'en-IN';
    }

    utterance.rate = 0.95; // slightly slower for clear kitchen guidance
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      isSpeaking = true;
      isPaused = false;
      dispatchVoiceStatus('speaking');
    };

    utterance.onend = () => {
      isSpeaking = false;
      isPaused = false;
      currentUtterance = null;
      dispatchVoiceStatus('idle');
      if (typeof onEnd === 'function') onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('TTS error:', e);
      isSpeaking = false;
      isPaused = false;
      currentUtterance = null;
      dispatchVoiceStatus('idle');
    };

    currentUtterance = utterance;
    synth.speak(utterance);
  }

  function pauseSpeaking() {
    if (synth && isSpeaking && !isPaused) {
      synth.pause();
      isPaused = true;
      dispatchVoiceStatus('paused');
    }
  }

  function resumeSpeaking() {
    if (synth && isPaused) {
      synth.resume();
      isPaused = false;
      dispatchVoiceStatus('speaking');
    }
  }

  function stopSpeaking() {
    if (synth) {
      synth.cancel();
      isSpeaking = false;
      isPaused = false;
      currentUtterance = null;
      dispatchVoiceStatus('idle');
    }
  }

  function dispatchVoiceStatus(status) {
    window.dispatchEvent(new CustomEvent('cwk-voice-status', { detail: { status } }));
  }

  // --- SPEECH RECOGNITION (STT) METHODS ---

  function isRecognitionSupported() {
    return !!SpeechRecognition;
  }

  function initRecognition(onCommand) {
    if (!SpeechRecognition) return false;
    onCommandCallback = onCommand;

    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    const lang = (window.I18nManager && window.I18nManager.getLang()) || 'en';
    recognition.lang = lang === 'te' ? 'te-IN' : 'en-IN';

    recognition.onstart = () => {
      isListening = true;
      dispatchRecognitionStatus('listening');
    };

    recognition.onresult = (event) => {
      const lastIndex = event.results.length - 1;
      const transcript = event.results[lastIndex][0].transcript.trim().toLowerCase();
      console.log('Heard voice command:', transcript);
      parseAndTriggerCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.warn('Speech recognition error:', event.error);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        isListening = false;
        dispatchRecognitionStatus('denied');
      }
    };

    recognition.onend = () => {
      // If user still wants listening, safely restart
      if (isListening) {
        try {
          recognition.start();
        } catch (e) {
          isListening = false;
          dispatchRecognitionStatus('idle');
        }
      } else {
        dispatchRecognitionStatus('idle');
      }
    };

    return true;
  }

  function startListening(onCommand) {
    if (!SpeechRecognition) return false;
    if (onCommand) onCommandCallback = onCommand;
    if (!recognition) initRecognition(onCommandCallback);

    try {
      isListening = true;
      recognition.start();
      return true;
    } catch (err) {
      console.warn('Could not start recognition:', err);
      return false;
    }
  }

  function stopListening() {
    isListening = false;
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {}
    }
    dispatchRecognitionStatus('idle');
  }

  function dispatchRecognitionStatus(status) {
    window.dispatchEvent(new CustomEvent('cwk-recognition-status', { detail: { status } }));
  }

  function parseAndTriggerCommand(text) {
    if (!onCommandCallback) return;

    // English & Telugu command dictionary
    const t = text.toLowerCase();

    // Next step
    if (t.includes('next step') || t.includes('next') || t.includes('forward') || t.includes('తరువాత') || t.includes('తరువాతి')) {
      onCommandCallback('NEXT_STEP', t);
    }
    // Previous step
    else if (t.includes('previous step') || t.includes('previous') || t.includes('back') || t.includes('మునుపటి') || t.includes('వెనక్కి')) {
      onCommandCallback('PREV_STEP', t);
    }
    // Repeat
    else if (t.includes('repeat') || t.includes('say again') || t.includes('read again') || t.includes('మళ్లీ చెప్పు') || t.includes('మళ్లీ')) {
      onCommandCallback('REPEAT', t);
    }
    // Start timer
    else if (t.includes('start timer') || t.includes('begin timer') || t.includes('టైమర్ ప్రారంభించు')) {
      onCommandCallback('START_TIMER', t);
    }
    // Pause timer
    else if (t.includes('pause timer') || t.includes('stop timer') || t.includes('టైమర్ ఆపు')) {
      onCommandCallback('PAUSE_TIMER', t);
    }
    // Resume timer
    else if (t.includes('resume timer') || t.includes('restart timer') || t.includes('టైమర్ కొనసాగించు')) {
      onCommandCallback('RESUME_TIMER', t);
    }
    // Time left
    else if (t.includes('time is left') || t.includes('time left') || t.includes('how much time') || t.includes('timer status') || t.includes('సమయం ఎంత')) {
      onCommandCallback('TIME_LEFT', t);
    }
    // Stop reading
    else if (t.includes('stop reading') || t.includes('quiet') || t.includes('shut up') || t.includes('ఆపు')) {
      onCommandCallback('STOP_READING', t);
    }
    // Finish
    else if (t.includes('finish cooking') || t.includes('complete') || t.includes('done') || t.includes('వంట పూర్తయింది')) {
      onCommandCallback('FINISH_COOKING', t);
    }
  }

  return {
    // TTS
    isTTSAvailable: () => !!synth,
    speak,
    pauseSpeaking,
    resumeSpeaking,
    stopSpeaking,
    isSpeaking: () => isSpeaking,
    isPaused: () => isPaused,
    isAutoRead: () => autoReadEnabled,
    setAutoRead: (enabled) => { autoReadEnabled = !!enabled; },

    // STT
    isRecognitionSupported,
    startListening,
    stopListening,
    isListening: () => isListening
  };
})();

window.VoiceAssistant = VoiceAssistant;
