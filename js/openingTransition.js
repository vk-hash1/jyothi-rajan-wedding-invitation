/**
 * Jyothi Kumari & Rajan Sharma – Enchanted Dream Wedding Website
 * Cinematic Opening Transition Controller
 */

import { LandingAtmosphere } from './landingAtmosphere.js';

export class OpeningTransition {
  constructor(options = {}) {
    this.musicPlayer = options.musicPlayer || null;
    this.openingContainer = document.getElementById('cinematic-opening');
    this.stage = document.getElementById('landing-stage');
    this.unfoldBtn = document.getElementById('btn-unfold-invitation');
    this.canvas = document.getElementById('celestial-stars-canvas');
    this.atmosphereEngine = null;
    this.isUnfolded = false;

    this.init();
  }

  init() {
    if (!this.openingContainer || !this.unfoldBtn) return;

    // Initialize Enchanted Atmosphere Engine (Stars, Shooting Stars, Stardust & Petals)
    if (this.canvas) {
      this.atmosphereEngine = new LandingAtmosphere(this.canvas);
    }

    // Bind Unfold Trigger
    this.unfoldBtn.addEventListener('click', () => {
      this.unfold();
    });

    this.unfoldBtn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.unfold();
      }
    });
  }

  unfold() {
    if (this.isUnfolded) return;
    this.isUnfolded = true;

    // 1. Trigger Stage Unfold Reveal Animation
    if (this.stage) {
      this.stage.classList.add('is-unfolding');
    }

    // 2. Explicit User Gesture: Try starting music if player exists
    if (this.musicPlayer) {
      this.musicPlayer.play().catch(() => {
        // Handled gracefully inside MusicPlayer
      });
    }

    // 3. Smooth Dismissal of Fullscreen Overlay
    setTimeout(() => {
      if (this.openingContainer) {
        this.openingContainer.classList.add('is-dismissed');
        this.openingContainer.setAttribute('aria-hidden', 'true');
      }

      // 4. Focus Transfer for Accessibility
      const mainHeading = document.getElementById('couple-title');
      if (mainHeading) {
        mainHeading.setAttribute('tabindex', '-1');
        mainHeading.focus({ preventScroll: true });
      }
    }, 650);

    // 5. Clean up Stars Animation Loop to free GPU/CPU
    setTimeout(() => {
      if (this.atmosphereEngine) {
        this.atmosphereEngine.pause();
      }
    }, 1200);
  }
}
