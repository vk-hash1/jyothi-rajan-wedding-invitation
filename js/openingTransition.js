/**
 * Jyothi Kumari & Rajan Sharma – Enchanted Dream Wedding Website
 * Cinematic Opening Transition Controller
 *
 * Implements the approved opening animation sequence:
 * 1. Visitor clicks "आमंत्रण खोलें" button -> JR floral monogram glows with soft golden light rays.
 * 2. Monogram smoothly zooms toward the viewer.
 * 3. ONE diagonal screen split: two sections slide apart smoothly, revealing warm golden light.
 * 4. Elegant floating flower petals and golden stardust particles burst along the rift.
 * 5. Smoothly reveals the underlying wedding website.
 */

import { LandingAtmosphere } from './landingAtmosphere.js';

/**
 * High-performance 60fps Transition Canvas for Floating Flower Petals & Golden Particles
 */
class TransitionFX {
  constructor(canvas) {
    this.canvas = canvas;
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.petals = [];
    this.isRunning = false;
    this.animId = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  startBurst() {
    this.resize();
    this.particles = [];
    this.petals = [];
    this.isRunning = true;

    // 1. Spawn a few subtle golden sparkles along the diagonal cut
    const sparkleCount = this.width < 640 ? 18 : 28;
    for (let i = 0; i < sparkleCount; i++) {
      const t = Math.random();
      const originX = (1.1 - t * 1.2) * this.width + (Math.random() - 0.5) * 40;
      const originY = (0.08 + t * 0.74) * this.height + (Math.random() - 0.5) * 40;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.0 + 1.0;

      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.4,
        radius: Math.random() * 1.8 + 1.0,
        alpha: 0.9,
        decay: Math.random() * 0.01 + 0.006,
        color: Math.random() > 0.4 ? '255, 230, 130' : '255, 255, 255',
        sparkleSpeed: Math.random() * 0.2 + 0.1,
        sparklePhase: Math.random() * Math.PI * 2
      });
    }

    // 2. Spawn a few gently floating flower petals
    const petalCount = this.width < 640 ? 12 : 18;
    for (let i = 0; i < petalCount; i++) {
      const t = Math.random();
      const originX = (1.1 - t * 1.2) * this.width + (Math.random() - 0.5) * 60;
      const originY = (0.08 + t * 0.74) * this.height + (Math.random() - 0.5) * 60;
      const angle = (Math.random() - 0.5) * Math.PI;
      const speed = Math.random() * 2.2 + 0.8;

      this.petals.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.random() * 1.8 + 1.0,
        size: Math.random() * 10 + 12,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.035,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.03 + 0.015,
        swayAmp: Math.random() * 1.4 + 0.6,
        flipPhase: Math.random() * Math.PI * 2,
        flipSpeed: Math.random() * 0.035 + 0.015,
        alpha: 0.95,
        decay: Math.random() * 0.0035 + 0.0025,
        isLavender: Math.random() > 0.5
      });
    }

    const loop = () => {
      if (!this.isRunning) return;
      this.update();
      this.draw();
      this.animId = requestAnimationFrame(loop);
    };

    if (this.animId) cancelAnimationFrame(this.animId);
    this.animId = requestAnimationFrame(loop);
  }

  update() {
    // Update sparkles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.97;
      p.vy *= 0.97;
      p.alpha -= p.decay;
      p.sparklePhase += p.sparkleSpeed;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update petals
    for (let i = this.petals.length - 1; i >= 0; i--) {
      const pt = this.petals[i];
      pt.swayPhase += pt.swaySpeed;
      pt.x += pt.vx * 0.98 + Math.sin(pt.swayPhase) * pt.swayAmp;
      pt.y += pt.vy;
      pt.rotation += pt.rotSpeed;
      pt.flipPhase += pt.flipSpeed;
      pt.alpha -= pt.decay;
      if (pt.alpha <= 0 || pt.y > this.height + 40) {
        this.petals.splice(i, 1);
      }
    }

    if (this.particles.length === 0 && this.petals.length === 0) {
      this.stop();
    }
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw Golden Sparkles with Starlight Flares
    for (let p of this.particles) {
      const currentAlpha = Math.max(0, p.alpha * (0.6 + 0.4 * Math.sin(p.sparklePhase)));
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
      this.ctx.fill();

      // Mini 4-point diamond cross flare for bright sparkles
      if (p.radius > 1.8) {
        const glint = p.radius * 2.8;
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${currentAlpha * 0.8})`;
        this.ctx.lineWidth = 0.8;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x - glint, p.y);
        this.ctx.lineTo(p.x + glint, p.y);
        this.ctx.moveTo(p.x, p.y - glint);
        this.ctx.lineTo(p.x, p.y + glint);
        this.ctx.stroke();
      }
    }

    // Draw Floating Flower Petals (Lotus & Rose Petal Curves)
    for (let pt of this.petals) {
      this.ctx.save();
      this.ctx.translate(pt.x, pt.y);
      this.ctx.rotate(pt.rotation);
      this.ctx.scale(1, Math.cos(pt.flipPhase));

      const half = pt.size * 0.5;
      const grad = this.ctx.createRadialGradient(0, -half * 0.3, 2, 0, 0, pt.size);
      if (pt.isLavender) {
        grad.addColorStop(0, `rgba(245, 225, 255, ${pt.alpha * 0.95})`);
        grad.addColorStop(0.5, `rgba(215, 170, 250, ${pt.alpha * 0.85})`);
        grad.addColorStop(1, `rgba(165, 100, 220, ${pt.alpha * 0.75})`);
      } else {
        grad.addColorStop(0, `rgba(255, 235, 245, ${pt.alpha * 0.95})`);
        grad.addColorStop(0.5, `rgba(245, 165, 200, ${pt.alpha * 0.85})`);
        grad.addColorStop(1, `rgba(215, 95, 155, ${pt.alpha * 0.75})`);
      }

      this.ctx.beginPath();
      this.ctx.moveTo(0, -half * 1.3);
      this.ctx.bezierCurveTo(half * 0.85, -half * 0.7, half * 0.95, half * 0.4, 0, half * 1.3);
      this.ctx.bezierCurveTo(-half * 0.95, half * 0.4, -half * 0.85, -half * 0.7, 0, -half * 1.3);
      this.ctx.closePath();
      this.ctx.fillStyle = grad;
      this.ctx.fill();

      this.ctx.restore();
    }
  }

  stop() {
    this.isRunning = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width || 0, this.height || 0);
    }
  }
}

export class OpeningTransition {
  constructor(options = {}) {
    this.musicPlayer = options.musicPlayer || null;
    this.openingContainer = document.getElementById('cinematic-opening');
    this.stage = document.getElementById('landing-stage');
    this.unfoldBtn = document.getElementById('btn-unfold-invitation');
    this.canvas = document.getElementById('celestial-stars-canvas');
    this.atmosphereEngine = null;
    this.transitionFX = null;
    this.isUnfolded = false;
    this.isAnimating = false;

    this.init();
  }

  init() {
    if (!this.openingContainer || !this.unfoldBtn) return;

    // Initialize Enchanted Atmosphere Engine (Stars, Shooting Stars, Stardust & Petals)
    if (this.canvas) {
      this.atmosphereEngine = new LandingAtmosphere(this.canvas);
    }

    // Bind Unfold Trigger on the action button
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

    // Also bind tap hint text if clicked
    const tapText = document.getElementById('landing-tap-text');
    if (tapText) {
      tapText.addEventListener('click', (e) => {
        e.stopPropagation();
        this.unfold();
      });
      tapText.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          this.unfold();
        }
      });
    }

    // Space/Enter anywhere when opening overlay is active
    document.addEventListener('keydown', (e) => {
      if (this.isUnfolded || this.isAnimating) return;
      if (document.activeElement && document.activeElement.closest('.landing-top-bar')) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.unfold();
      }
    });

    // Resume landing-page animations smoothly when returning from another tab or app
    const onVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        this.pauseLandingAnimations();
      } else {
        this.resumeLandingAnimations();
      }
    };

    const onPageShow = () => {
      this.resumeLandingAnimations();
    };

    const onPageHide = () => {
      this.pauseLandingAnimations();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('pagehide', onPageHide);
  }

  resumeLandingAnimations() {
    if (this.isUnfolded) return;

    // 1. Resume Canvas Atmosphere Engine
    if (this.atmosphereEngine) {
      this.atmosphereEngine.resume();
    }

    // 2. Resume CSS Animations for landing elements
    const stage = this.stage || document.getElementById('landing-stage');
    if (stage) {
      stage.style.animationPlayState = 'running';
      const animSelectors = [
        '.floating-diya',
        '.diya-glow',
        '.diya-water-reflection',
        '.landing-cloud',
        '.sparkle-star',
        '.landing-crest-wrap',
        '.ganesha-aura-glow',
        '.landing-unfold-btn',
        '.landing-tap-text',
        '.tap-pointer-icon'
      ];
      const animatedEls = stage.querySelectorAll(animSelectors.join(', '));
      animatedEls.forEach(el => {
        el.style.animationPlayState = 'running';
      });

      // Micro reflow to ensure WebKit/Blink animation restart if stalled
      void stage.offsetHeight;
    }
  }

  pauseLandingAnimations() {
    if (this.atmosphereEngine) {
      this.atmosphereEngine.pause();
    }
  }

  unfold() {
    // Strictly prevent duplicate triggers or repeating the animation
    if (this.isUnfolded || this.isAnimating) return;
    this.isUnfolded = true;
    this.isAnimating = true;

    // 1. User Gesture: Trigger background music playback immediately
    if (this.musicPlayer) {
      this.musicPlayer.play().catch(() => {
        // Handled gracefully inside MusicPlayer
      });
    }

    // 2. Button Ripple Feedback
    if (this.unfoldBtn) {
      this.unfoldBtn.classList.add('is-clicked');
    }

    // 3. Divide Landing Page into Two Diagonal Panels & Animate Both Sliding Away
    const splitContainer = document.getElementById('landing-split-container');
    const panelUR = document.getElementById('split-panel-ur');
    const panelLL = document.getElementById('split-panel-ll');
    const fxCanvas = document.getElementById('transition-fx-canvas');

    if (splitContainer && panelUR && panelLL && this.stage) {
      const clipUR = panelUR.querySelector('.split-panel-clip') || panelUR;
      const clipLL = panelLL.querySelector('.split-panel-clip') || panelLL;
      clipUR.innerHTML = '';
      clipLL.innerHTML = '';

      // Clone resting stage into both diagonal panels (100% original unzoomed position)
      const cloneUR = this.stage.cloneNode(true);
      const cloneLL = this.stage.cloneNode(true);
      cloneUR.removeAttribute('id');
      cloneLL.removeAttribute('id');

      // Copy star canvas pixels onto cloned canvases to preserve star field
      const origCanvas = this.stage.querySelector('#celestial-stars-canvas');
      if (origCanvas) {
        const cUR = cloneUR.querySelector('canvas');
        const cLL = cloneLL.querySelector('canvas');
        if (cUR) {
          cUR.width = origCanvas.width;
          cUR.height = origCanvas.height;
          try { cUR.getContext('2d').drawImage(origCanvas, 0, 0); } catch (_) {}
        }
        if (cLL) {
          cLL.width = origCanvas.width;
          cLL.height = origCanvas.height;
          try { cLL.getContext('2d').drawImage(origCanvas, 0, 0); } catch (_) {}
        }
      }

      clipUR.appendChild(cloneUR);
      clipLL.appendChild(cloneLL);

      // Immediately hide original landing stage so it does NOT stay behind the parting panels
      this.stage.style.display = 'none';
      this.stage.style.visibility = 'hidden';

      // Make container transparent so main website underneath is revealed through parting rift
      this.openingContainer.classList.add('is-splitting');

      // Activate split container
      splitContainer.classList.add('is-active');

      // Start floating flower petals on transparent canvas
      if (fxCanvas) {
        this.transitionFX = new TransitionFX(fxCanvas);
        this.transitionFX.startBurst();
      }

      // Force layout calculation so initial transform translate3d(0, 0, 0) is committed
      void panelUR.offsetWidth;

      // Start both diagonal sections moving simultaneously in opposite directions on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panelUR.classList.add('is-sliding');
          panelLL.classList.add('is-sliding');
        });
      });
    }

    // 4. Reveal homepage and restore normal interaction once sections have exited (1.6s)
    setTimeout(() => {
      // Restore normal page scrolling immediately
      document.documentElement.classList.remove('opening-active');
      document.body.classList.remove('opening-active');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      // Dismiss and completely remove overlay so NO leftover panels or overlapping content remain
      if (this.openingContainer) {
        this.openingContainer.classList.add('is-dismissed');
        this.openingContainer.setAttribute('aria-hidden', 'true');
        this.openingContainer.style.display = 'none';
        this.openingContainer.style.visibility = 'hidden';
        this.openingContainer.style.pointerEvents = 'none';
        this.openingContainer.innerHTML = '';
        try {
          this.openingContainer.remove();
        } catch (_) {}
      }

      if (this.transitionFX) {
        this.transitionFX.stop();
        this.transitionFX = null;
      }

      if (this.atmosphereEngine) {
        this.atmosphereEngine.pause();
      }

      this.isAnimating = false;

      // Focus Transfer for Accessibility
      const focusTarget = document.getElementById('couple-title') || document.getElementById('main-content');
      if (focusTarget) {
        focusTarget.setAttribute('tabindex', '-1');
        try {
          focusTarget.focus({ preventScroll: true });
        } catch (_) {
          focusTarget.focus();
        }
      }
    }, 1600);
  }
}
