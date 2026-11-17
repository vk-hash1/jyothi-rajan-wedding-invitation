/**
 * Jyothi Kumari & Rajan Sharma – Enchanted Dream Wedding Website
 * Landing Atmosphere Animation Engine
 *
 * Implements subtle, high-performance, independent animations:
 * - Twinkling stars with cross-flares
 * - Periodic diagonal shooting stars with luminous stardust trails
 * - Floating magical stardust particles
 * - Gently falling and swaying pink lotus/rose petals
 *
 * 60fps GPU-friendly Canvas with automatic pausing when offscreen
 * and full respect for prefers-reduced-motion.
 */

export class LandingAtmosphere {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.animationFrameId = null;
    this.isRunning = false;

    this.reducedMotion = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.stars = [];
    this.shootingStars = [];
    this.stardust = [];
    this.petals = [];

    this.lastShootingStarTime = Date.now();
    this.shootingStarInterval = 4500; // ms between shooting stars

    this.init();
  }

  init() {
    this.resize();
    this.createElements();

    window.addEventListener('resize', () => {
      this.resize();
      this.createElements();
    });

    // Auto-pause when page/tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else if (this.isRunning) {
        this.start();
      }
    });

    if (this.reducedMotion) {
      this.renderStatic();
    } else {
      this.start();
    }
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || window.innerHeight;

    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  createElements() {
    const isMobile = this.width < 640;
    const starCount = isMobile ? 45 : 85;
    const stardustCount = isMobile ? 18 : 32;
    const petalCount = isMobile ? 10 : 18;

    // 1. Stars (in upper 75% celestial sky area)
    this.stars = [];
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * (this.height * 0.78),
        radius: Math.random() * 1.6 + 0.4,
        baseAlpha: Math.random() * 0.6 + 0.25,
        alpha: 0.5,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        isFlare: i < 5, // Top 5 stars get elegant diamond cross-flares
        flareSize: Math.random() * 6 + 6,
        color: this.getStarColor()
      });
    }

    // 2. Floating Stardust (magical floating light particles)
    this.stardust = [];
    for (let i = 0; i < stardustCount; i++) {
      this.stardust.push({
        x: Math.random() * this.width,
        y: Math.random() * (this.height * 0.8),
        radius: Math.random() * 1.2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        vy: -(Math.random() * 0.25 + 0.1), // gentle upward float
        vx: (Math.random() - 0.5) * 0.2,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.4 ? 'rgba(255, 235, 190,' : 'rgba(225, 190, 255,'
      });
    }

    // 3. Falling Flower Petals (gentle swaying lotus & rose petals)
    this.petals = [];
    for (let i = 0; i < petalCount; i++) {
      this.petals.push(this.createPetal(true));
    }
  }

  createPetal(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -25 - Math.random() * 40,
      width: Math.random() * 6 + 9,
      height: Math.random() * 10 + 13,
      vy: Math.random() * 0.6 + 0.5, // gentle drift
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.025 + 0.015,
      swayAmp: Math.random() * 1.5 + 1.0,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      flipPhase: Math.random() * Math.PI * 2,
      flipSpeed: Math.random() * 0.03 + 0.02,
      opacity: Math.random() * 0.4 + 0.55
    };
  }

  getStarColor() {
    const palette = [
      'rgba(255, 255, 255,',     // Moonlight White
      'rgba(255, 245, 225,',     // Champagne Gold
      'rgba(235, 215, 255,',     // Soft Lavender
      'rgba(215, 235, 255,'      // Starlight Blue
    ];
    return palette[Math.floor(Math.random() * palette.length)];
  }

  spawnShootingStar() {
    // Starts from upper sky, streaks diagonally down-right
    const startX = Math.random() * (this.width * 0.7);
    const startY = Math.random() * (this.height * 0.35);
    const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // ~40-50 degrees
    const speed = Math.random() * 6 + 8;
    const length = Math.random() * 80 + 100;

    this.shootingStars.push({
      x: startX,
      y: startY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      length: length,
      alpha: 1.0,
      decay: Math.random() * 0.018 + 0.012
    });
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    const loop = () => {
      if (!this.isRunning) return;
      this.update();
      this.draw();
      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  pause() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  update() {
    const now = Date.now();

    // 1. Check for shooting star spawn
    if (now - this.lastShootingStarTime > this.shootingStarInterval) {
      this.spawnShootingStar();
      this.lastShootingStarTime = now;
      this.shootingStarInterval = Math.random() * 3500 + 4000; // 4-7.5s interval
    }

    // 2. Update Stars Twinkling
    for (let star of this.stars) {
      star.phase += star.twinkleSpeed;
      star.alpha = star.baseAlpha + Math.sin(star.phase) * 0.35;
      if (star.alpha < 0.15) star.alpha = 0.15;
      if (star.alpha > 1) star.alpha = 1;
    }

    // 3. Update Shooting Stars
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.x += s.dx;
      s.y += s.dy;
      s.alpha -= s.decay;

      if (s.alpha <= 0 || s.x > this.width || s.y > this.height * 0.8) {
        this.shootingStars.splice(i, 1);
      }
    }

    // 4. Update Floating Stardust
    for (let p of this.stardust) {
      p.wobblePhase += p.wobbleSpeed;
      p.x += p.vx + Math.sin(p.wobblePhase) * 0.25;
      p.y += p.vy;

      if (p.y < 0) {
        p.y = this.height * 0.78;
        p.x = Math.random() * this.width;
      }
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
    }

    // 5. Update Falling Petals
    const waterHorizon = this.height * 0.82;
    for (let petal of this.petals) {
      petal.swayPhase += petal.swaySpeed;
      petal.x += Math.sin(petal.swayPhase) * petal.swayAmp;
      petal.y += petal.vy;
      petal.rotation += petal.rotationSpeed;
      petal.flipPhase += petal.flipSpeed;

      // Recycle when reaching water horizon
      if (petal.y > waterHorizon) {
        Object.assign(petal, this.createPetal(false));
      }
    }
  }

  draw() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Twinkling Stars & Cross-Flares
    for (let star of this.stars) {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${star.color}${star.alpha})`;
      this.ctx.fill();

      // Diamond cross-flare for key stars
      if (star.isFlare && star.alpha > 0.6) {
        const fSize = star.flareSize * (star.alpha * 0.9);
        this.ctx.save();
        this.ctx.strokeStyle = `rgba(255, 245, 230, ${star.alpha * 0.65})`;
        this.ctx.lineWidth = 0.75;

        // Horizontal beam
        this.ctx.beginPath();
        this.ctx.moveTo(star.x - fSize, star.y);
        this.ctx.lineTo(star.x + fSize, star.y);
        this.ctx.stroke();

        // Vertical beam
        this.ctx.beginPath();
        this.ctx.moveTo(star.x, star.y - fSize);
        this.ctx.lineTo(star.x, star.y + fSize);
        this.ctx.stroke();

        // Subtle circular core glow
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 230, 180, ${star.alpha * 0.3})`;
        this.ctx.fill();

        this.ctx.restore();
      }
    }

    // 2. Draw Shooting Stars with Luminous Gradient Trail
    for (let s of this.shootingStars) {
      const tailX = s.x - (s.dx / Math.hypot(s.dx, s.dy)) * s.length;
      const tailY = s.y - (s.dy / Math.hypot(s.dx, s.dy)) * s.length;

      const grad = this.ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, 'rgba(215, 180, 255, 0)');
      grad.addColorStop(0.7, `rgba(245, 220, 255, ${s.alpha * 0.5})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${s.alpha})`);

      this.ctx.save();
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.8;
      this.ctx.beginPath();
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(s.x, s.y);
      this.ctx.stroke();

      // Glowing head
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      this.ctx.fill();
      this.ctx.restore();
    }

    // 3. Draw Floating Stardust Particles
    for (let p of this.stardust) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color}${p.alpha})`;
      this.ctx.fill();
    }

    // 4. Draw Falling Flower Petals (Lotus & Rose Petal Curves)
    for (let petal of this.petals) {
      this.drawPetal(petal);
    }
  }

  drawPetal(petal) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(petal.x, petal.y);
    ctx.rotate(petal.rotation);

    // 3D perspective flip scale
    const flipScale = Math.sin(petal.flipPhase);
    ctx.scale(1, Math.max(0.15, Math.abs(flipScale)));

    ctx.beginPath();
    // Beautiful curved organic lotus petal shape
    ctx.moveTo(0, -petal.height / 2);
    ctx.bezierCurveTo(
      petal.width * 0.75, -petal.height * 0.25,
      petal.width * 0.65, petal.height * 0.35,
      0, petal.height / 2
    );
    ctx.bezierCurveTo(
      -petal.width * 0.65, petal.height * 0.35,
      -petal.width * 0.75, -petal.height * 0.25,
      0, -petal.height / 2
    );

    // Soft pink & lilac gradient fill with subtle darker petal edge
    const grad = ctx.createLinearGradient(0, -petal.height / 2, 0, petal.height / 2);
    grad.addColorStop(0, `rgba(255, 220, 240, ${petal.opacity * 0.9})`);
    grad.addColorStop(0.5, `rgba(240, 140, 190, ${petal.opacity * 0.85})`);
    grad.addColorStop(1, `rgba(210, 80, 150, ${petal.opacity * 0.7})`);

    ctx.fillStyle = grad;
    ctx.fill();

    // Subtle petal vein highlight
    ctx.beginPath();
    ctx.moveTo(0, -petal.height * 0.35);
    ctx.lineTo(0, petal.height * 0.25);
    ctx.strokeStyle = `rgba(255, 255, 255, ${petal.opacity * 0.3})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.restore();
  }

  renderStatic() {
    this.update();
    this.draw();
  }

  destroy() {
    this.pause();
    this.stars = [];
    this.shootingStars = [];
    this.stardust = [];
    this.petals = [];
  }
}
