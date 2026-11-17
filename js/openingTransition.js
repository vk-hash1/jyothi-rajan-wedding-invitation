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

    // Bind Unfold Trigger ONLY on the action button
    this.unfoldBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.unfold();
    });

    this.unfoldBtn.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        this.unfold();
      }
    });

    // Space/Enter anywhere when opening overlay is active
    document.addEventListener('keydown', (e) => {
      if (this.isUnfolded) return;
      if (document.activeElement && document.activeElement.closest('.landing-top-bar')) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.unfold();
      }
    });
  }

  unfold() {
    if (this.isUnfolded) return;
    this.isUnfolded = true;

    // Remove document scroll lock and guarantee scroll is strictly at the top (0, 0)
    document.documentElement.classList.remove('opening-active');
    document.body.classList.remove('opening-active');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

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

      // 4. Focus Transfer for Accessibility (Top of main content at scroll 0)
      const focusTarget = document.getElementById('couple-title') || document.getElementById('main-content');
      if (focusTarget) {
        focusTarget.setAttribute('tabindex', '-1');
        try {
          focusTarget.focus({ preventScroll: true });
        } catch (_) {
          focusTarget.focus();
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 650);

    // 5. Clean up Stars Animation Loop to free GPU/CPU
    setTimeout(() => {
      if (this.atmosphereEngine) {
        this.atmosphereEngine.pause();
      }
    }, 1200);
  }
}
