/**
 * Jyothi Kumari & Rajan Sharma – Enchanted Dream Wedding Website
 * Unified Audio Player Controller
 *
 * Controls both the top circular music button on the landing stage
 * and the floating audio pill on the main celebration page.
 */

export class MusicPlayer {
  constructor(config = {}) {
    this.audioSrc = config.src || 'assets/audio/wedding-song.mp3';
    this.isPlaying = false;
    this.audio = null;

    this.playerBtn = document.getElementById('floating-audio-player');
    this.topMusicBtn = document.getElementById('btn-top-music');
    this.labelEl = document.getElementById('audio-label');
    this.playIcon = document.querySelector('.floating-audio-player .icon-play');
    this.pauseIcon = document.querySelector('.floating-audio-player .icon-pause');

    this.init();
  }

  init() {
    // Create HTML5 Audio instance strictly without autoplay
    this.audio = new Audio();
    this.audio.src = this.audioSrc;
    this.audio.preload = 'auto';
    this.audio.autoplay = false;
    this.audio.loop = true;
    this.audio.volume = 0.85;

    // Attach click and keyboard listeners to the main floating button
    if (this.playerBtn) {
      this.playerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.togglePlay();
      });

      this.playerBtn.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          this.togglePlay();
        }
      });
    }

    // Attach click listener to top bar music button
    if (this.topMusicBtn) {
      this.topMusicBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.togglePlay();
      });

      this.topMusicBtn.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          this.togglePlay();
        }
      });
    }

    // Audio State Event Listeners
    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updateUI(true);
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updateUI(false);
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.updateUI(false);
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('[Music Player] Audio notice:', e);
      this.isPlaying = false;
      this.updateUI(false);
    });
  }

  async togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      await this.play();
    }
  }

  async play() {
    if (!this.audio) return;

    try {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.isPlaying = true;
        this.updateUI(true);
      }
    } catch (error) {
      console.warn('[Music Player] Playback notice:', error.message);
      this.isPlaying = false;
      this.updateUI(false);
    }
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.updateUI(false);
  }

  updateUI(playing) {
    const isHindi = document.documentElement.lang === 'hi';

    // Update Floating Audio Player Button
    if (this.playerBtn) {
      if (playing) {
        this.playerBtn.classList.add('is-playing');
        this.playerBtn.setAttribute('aria-pressed', 'true');
        this.playerBtn.setAttribute('aria-label', isHindi ? 'संगीत रोकें' : 'Pause background music');
      } else {
        this.playerBtn.classList.remove('is-playing');
        this.playerBtn.setAttribute('aria-pressed', 'false');
        this.playerBtn.setAttribute('aria-label', isHindi ? 'पृष्ठभूमि संगीत बजाएं' : 'Play background music');
      }
    }

    // Update Top Landing Music Button
    if (this.topMusicBtn) {
      if (playing) {
        this.topMusicBtn.classList.add('is-playing');
        this.topMusicBtn.setAttribute('aria-pressed', 'true');
        this.topMusicBtn.setAttribute('aria-label', isHindi ? 'संगीत रोकें' : 'Pause background music');
      } else {
        this.topMusicBtn.classList.remove('is-playing');
        this.topMusicBtn.setAttribute('aria-pressed', 'false');
        this.topMusicBtn.setAttribute('aria-label', isHindi ? 'पृष्ठभूमि संगीत बजाएं' : 'Play background music');
      }
    }

    if (this.labelEl) {
      if (isHindi) {
        this.labelEl.textContent = playing ? 'संगीत रोकें' : 'संगीत बजाएं';
      } else {
        this.labelEl.textContent = playing ? 'Pause Music' : 'Play Music';
      }
    }

    if (this.playIcon && this.pauseIcon) {
      this.playIcon.style.display = playing ? 'none' : 'block';
      this.pauseIcon.style.display = playing ? 'block' : 'none';
    }
  }

  updateLanguage() {
    this.updateUI(this.isPlaying);
  }
}
