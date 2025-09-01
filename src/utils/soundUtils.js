const soundInstances = new Map();

export const playSound = (soundName, options = {}) => {
  try {
    stopSound(soundName);

    const audio = new Audio(`${process.env.PUBLIC_URL}/sounds/${soundName}`);

    // Set volume (0.0 to 1.0)
    audio.volume = options.volume !== undefined ? options.volume : 0.5;

    if (options.startTime !== undefined) {
      audio.currentTime = options.startTime;
    }

    soundInstances.set(soundName, audio);

    audio.onended = () => {
      soundInstances.delete(soundName);
    };

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Audio play failed:", error);
        soundInstances.delete(soundName);
      });
    }

    return audio;
  } catch (error) {
    console.error("Error playing sound:", error);
    return null;
  }
};

export const stopSound = (soundName) => {
  const audio = soundInstances.get(soundName);
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
    soundInstances.delete(soundName);
  }
};

export const stopAllSounds = () => {
  soundInstances.forEach((audio, name) => {
    audio.pause();
    audio.currentTime = 0;
    soundInstances.delete(name);
  });
};

export const Sounds = {
  BUTTON_CLICK: "button-click.mp3",
  WHEEL_SPIN: "wheel-spin.mp3",
};

// Initialize audio context (required for some browsers)
const initAudioContext = () => {
  if (typeof window !== "undefined") {
    // Create a single audio context for the app
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!window.audioContext) {
      window.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const resumeAudio = () => {
      if (window.audioContext.state === "suspended") {
        window.audioContext.resume();
      }
      document.removeEventListener("click", resumeAudio);
      document.removeEventListener("touchstart", resumeAudio);
    };

    document.addEventListener("click", resumeAudio, { once: true });
    document.addEventListener("touchstart", resumeAudio, { once: true });
  }
};

const soundUtils = {
  playSound,
  stopSound,
  stopAllSounds,
  Sounds,
  initAudioContext,
};

// Initialize audio context when the module is loaded
if (typeof window !== "undefined") {
  soundUtils.initAudioContext();
}

export default soundUtils;
