/**
 * Jyothi Kumari & Rajan Sharma – Enchanted Dream Wedding Website
 * Celestial Stars & Constellation Canvas Engine
 *
 * Lightweight, 60fps, GPU-friendly ambient night sky with automatic pausing.
 */

export class CelestialStars {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.animationFrameId = null;
    this.isRunning = false;
    this.maxStars = 65; // High performance budget
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    this.createStars();

    window.addEventListener('resize', () => this.resize());

    // Auto-pause when tab is inactive; resume safely when returning
    const onVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        this.pause();
      } else if (!this.reducedMotion) {
        this.start();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pageshow', () => {
      if (!this.reducedMotion) this.start();
    });
    window.addEventListener('pagehide', () => this.pause());

    if (this.reducedMotion) {
      this.renderStatic();
    } else {
      this.start();
    }
  }

  resize() {
    if (!this.canvas) return;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio || this.width;
    this.canvas.height = this.height * window.devicePixelRatio || this.height;
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  createStars() {
    this.stars = [];
    const count = Math.min(this.maxStars, Math.floor((this.width * this.height) / 16000));

    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.15,
        color: this.getStarColor()
      });
    }
  }

  getStarColor() {
    const colors = [
      'rgba(255, 255, 255,',     // Moonlight White
      'rgba(245, 232, 208,',     // Champagne Stardust
      'rgba(226, 232, 240,',     // Moonlight Silver
      'rgba(221, 214, 254,'      // Soft Lilac
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  render() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw Constellation Connection Lines between close pairs
    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        const dx = this.stars[i].x - this.stars[j].x;
        const dy = this.stars[i].y - this.stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 90) {
          const lineAlpha = (1 - dist / 90) * 0.12;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(197, 168, 105, ${lineAlpha})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
          this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Draw Stars
    for (const star of this.stars) {
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 0.95 || star.alpha < 0.2) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }

      star.x += star.speedX;
      star.y += star.speedY;

      // Wrap around bounds
      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${star.color} ${star.alpha})`;
      this.ctx.fill();

      // Soft glow for larger stars
      if (star.radius > 1.2) {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(155, 126, 217, ${star.alpha * 0.25})`;
        this.ctx.fill();
      }
    }

    if (this.isRunning) {
      this.animationFrameId = requestAnimationFrame(() => this.render());
    }
  }

  renderStatic() {
    this.isRunning = false;
    this.render();
  }

  start() {
    if (this.reducedMotion) {
      this.renderStatic();
      return;
    }
    this.isRunning = true;
    if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(() => this.render());
    }
  }

  pause() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  destroy() {
    this.pause();
    this.stars = [];
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }
}
