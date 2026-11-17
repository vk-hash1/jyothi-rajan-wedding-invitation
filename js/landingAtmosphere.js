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
    this.sparklingStars = [];
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
        radius: Math.random() * 1.5 + 0.35,
        baseAlpha: Math.random() * 0.55 + 0.2,
        alpha: 0.5,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: this.getStarColor()
      });
    }

    // 1b. Realistic Living Sparkling Stars (Bursting diamond cross-flares with authentic sparkle glint)
    this.sparklingStars = [
      { xRatio: 0.15, yRatio: 0.18, maxFlare: 22, speed: 0.032, phase: 0.2 },
      { xRatio: 0.85, yRatio: 0.19, maxFlare: 24, speed: 0.026, phase: 1.9 },
      { xRatio: 0.24, yRatio: 0.32, maxFlare: 18, speed: 0.038, phase: 3.4 },
      { xRatio: 0.76, yRatio: 0.34, maxFlare: 20, speed: 0.029, phase: 4.8 },
      { xRatio: 0.10, yRatio: 0.52, maxFlare: 16, speed: 0.035, phase: 2.3 },
      { xRatio: 0.90, yRatio: 0.54, maxFlare: 18, speed: 0.027, phase: 5.6 },
      { xRatio: 0.50, yRatio: 0.12, maxFlare: 25, speed: 0.030, phase: 1.1 }
    ];

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

    // 2b. Update Sparkling Stars (Dynamic diamond glint & sparkle pulse)
    for (let s of this.sparklingStars) {
      s.phase += s.speed;
      const raw = Math.sin(s.phase);
      s.sparkleIntensity = Math.max(0, Math.pow(Math.max(0, raw), 3.5));
      s.baseTwinkle = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(s.phase * 1.8));
      s.rotation = s.phase * 0.35;
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

    // 1. Draw Twinkling Stars
    for (let star of this.stars) {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${star.color}${star.alpha})`;
      this.ctx.fill();
    }

    // 1b. Draw Realistic Living Sparkling Stars (Bursting diamond cross-flares & glints)
    for (let s of this.sparklingStars) {
      const sx = s.xRatio * this.width;
      const sy = s.yRatio * this.height;
      const intensity = s.sparkleIntensity; // 0 to 1 peak
      const currentAlpha = Math.min(1, s.baseTwinkle + intensity * 0.7);

      this.ctx.save();
      this.ctx.translate(sx, sy);
      this.ctx.rotate(s.rotation);

      // Central star core
      this.ctx.beginPath();
      this.ctx.arc(0, 0, 1.8 + intensity * 1.5, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
      this.ctx.fill();

      // Radial starlight aura glow
      const auraRad = 6 + intensity * 16;
      const auraGrad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, auraRad);
      auraGrad.addColorStop(0, `rgba(255, 245, 220, ${0.4 + intensity * 0.5})`);
      auraGrad.addColorStop(0.4, `rgba(255, 215, 130, ${0.15 + intensity * 0.3})`);
      auraGrad.addColorStop(1, 'rgba(255, 200, 100, 0)');
      this.ctx.beginPath();
      this.ctx.arc(0, 0, auraRad, 0, Math.PI * 2);
      this.ctx.fillStyle = auraGrad;
      this.ctx.fill();

      // Living Diamond Sparkle Beams
      if (intensity > 0.05) {
        const fLen = 8 + intensity * s.maxFlare;
        const fThick = Math.max(0.6, 1.8 * intensity);

        // Primary Vertical & Horizontal Diamond Beams
        this.ctx.fillStyle = `rgba(255, 255, 245, ${0.3 + intensity * 0.7})`;

        // Vertical diamond beam
        this.ctx.beginPath();
        this.ctx.moveTo(0, -fLen);
        this.ctx.lineTo(fThick, 0);
        this.ctx.lineTo(0, fLen);
        this.ctx.lineTo(-fThick, 0);
        this.ctx.closePath();
        this.ctx.fill();

        // Horizontal diamond beam
        this.ctx.beginPath();
        this.ctx.moveTo(-fLen, 0);
        this.ctx.lineTo(0, fThick);
        this.ctx.lineTo(fLen, 0);
        this.ctx.lineTo(0, -fThick);
        this.ctx.closePath();
        this.ctx.fill();

        // Secondary 45-degree diagonal rays (softer, shorter)
        const diagLen = fLen * 0.45;
        const diagThick = fThick * 0.65;
        this.ctx.save();
        this.ctx.rotate(Math.PI / 4);
        this.ctx.fillStyle = `rgba(255, 235, 180, ${0.2 + intensity * 0.55})`;

        this.ctx.beginPath();
        this.ctx.moveTo(0, -diagLen);
        this.ctx.lineTo(diagThick, 0);
        this.ctx.lineTo(0, diagLen);
        this.ctx.lineTo(-diagThick, 0);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(-diagLen, 0);
        this.ctx.lineTo(0, diagThick);
        this.ctx.lineTo(diagLen, 0);
        this.ctx.lineTo(0, -diagThick);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.restore();
      }

      this.ctx.restore();
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
    this.sparklingStars = [];
    this.shootingStars = [];
    this.stardust = [];
    this.petals = [];
  }
}
