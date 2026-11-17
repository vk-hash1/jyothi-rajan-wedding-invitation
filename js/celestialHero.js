/**
 * Jyothi Kumari & Rajan Sharma – Enchanted Dream Wedding Website
 * Celestial Hero Canvas Engine
 *
 * Powers the Hero section with:
 * - Twinkling stars & subtle constellations
 * - Upward drifting celestial stardust particles
 * - Occasional gentle shooting stars
 * - IntersectionObserver auto-pausing for 60fps performance
 */

export class CelestialHero {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.particles = [];
    this.shootingStars = [];
    this.animationFrameId = null;
    this.isRunning = false;
    this.nextShootingStarTime = Date.now() + 2500;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    this.createStars();
    this.createFloatingParticles();

    window.addEventListener('resize', () => {
      this.resize();
      this.createStars();
      this.createFloatingParticles();
    });

    // Auto-pause when tab is inactive; resume safely when returning
    const onVisibilityChange = () => {
      if (document.hidden || document.visibilityState === 'hidden') {
        this.pause();
      } else if (!this.reducedMotion) {
        this.nextShootingStarTime = Date.now() + 2500; // Reset timing to avoid burst
        this.start();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pageshow', () => {
      if (!this.reducedMotion) {
        this.nextShootingStarTime = Date.now() + 2500;
        this.start();
      }
    });
    window.addEventListener('pagehide', () => this.pause());

    // Auto-pause when hero is scrolled out of view
    const heroSection = document.getElementById('hero-section');
    if (heroSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.start();
          } else {
            this.pause();
          }
        });
      }, { threshold: 0.05 });

      observer.observe(heroSection);
    }

    if (this.reducedMotion) {
      this.renderStatic();
    } else {
      this.start();
    }
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width || window.innerWidth;
    this.height = rect.height || window.innerHeight;
    this.canvas.width = this.width * (window.devicePixelRatio || 1);
    this.canvas.height = this.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  createStars() {
    this.stars = [];
    const count = Math.min(80, Math.floor((this.width * this.height) / 14000));

    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.6 + 0.4,
        alpha: Math.random() * 0.7 + 0.25,
        twinkleSpeed: (Math.random() * 0.02 + 0.006) * (Math.random() > 0.5 ? 1 : -1),
        speedX: (Math.random() - 0.5) * 0.12,
        speedY: (Math.random() - 0.5) * 0.12,
        color: this.getStarColor()
      });
    }
  }

  createFloatingParticles() {
    this.particles = [];
    const count = Math.min(30, Math.floor(this.width / 40));

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.15,
        speedY: -(Math.random() * 0.35 + 0.15), // Drifts gently upward
        speedX: Math.sin(Math.random() * Math.PI) * 0.2,
        wobble: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? 'rgba(245, 232, 208,' : 'rgba(221, 214, 254,'
      });
    }
  }

  getStarColor() {
    const colors = [
      'rgba(255, 255, 255,',     // Moonlight White
      'rgba(245, 232, 208,',     // Starlight Champagne
      'rgba(226, 232, 240,',     // Soft Silver
      'rgba(221, 214, 254,'      // Ethereal Lilac
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  spawnShootingStar() {
    const startX = Math.random() * (this.width * 0.75);
    const startY = Math.random() * (this.height * 0.4);
    const length = Math.random() * 80 + 70;
    const speed = Math.random() * 8 + 9;

    this.shootingStars.push({
      x: startX,
      y: startY,
      length: length,
      speed: speed,
      angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.2, // ~45 deg
      opacity: 1,
      life: 0,
      maxLife: 45
    });

    // Schedule next shooting star between 4 to 8 seconds
    this.nextShootingStarTime = Date.now() + (Math.random() * 4000 + 4000);
  }

  render() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Constellation Lines between nearby stars
    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        const dx = this.stars[i].x - this.stars[j].x;
        const dy = this.stars[i].y - this.stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 85) {
          const lineAlpha = (1 - dist / 85) * 0.14;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(197, 168, 105, ${lineAlpha})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
          this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
          this.ctx.stroke();
        }
      }
    }

    // 2. Draw Twinkling Stars
    for (const star of this.stars) {
      star.alpha += star.twinkleSpeed;
      if (star.alpha > 0.95 || star.alpha < 0.2) {
        star.twinkleSpeed = -star.twinkleSpeed;
      }

      star.x += star.speedX;
      star.y += star.speedY;

      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${star.color} ${star.alpha})`;
      this.ctx.fill();

      // Soft starlight flare for brighter stars
      if (star.radius > 1.3) {
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius * 2.4, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(167, 139, 250, ${star.alpha * 0.28})`;
        this.ctx.fill();
      }
    }

    // 3. Draw Upward Floating Stardust Particles
    for (const p of this.particles) {
      p.y += p.speedY;
      p.wobble += 0.03;
      p.x += Math.sin(p.wobble) * 0.35;

      if (p.y < -10) {
        p.y = this.height + 10;
        p.x = Math.random() * this.width;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color} ${p.alpha})`;
      this.ctx.fill();

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(245, 232, 208, ${p.alpha * 0.2})`;
      this.ctx.fill();
    }

    // 4. Update & Draw Shooting Stars
    if (Date.now() > this.nextShootingStarTime && this.shootingStars.length === 0) {
      this.spawnShootingStar();
    }

    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];
      s.life++;
      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.opacity = 1 - (s.life / s.maxLife);

      if (s.life >= s.maxLife || s.x > this.width || s.y > this.height) {
        this.shootingStars.splice(i, 1);
        continue;
      }

      const tailX = s.x - Math.cos(s.angle) * s.length;
      const tailY = s.y - Math.sin(s.angle) * s.length;

      const grad = this.ctx.createLinearGradient(tailX, tailY, s.x, s.y);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.7, `rgba(245, 232, 208, ${s.opacity * 0.7})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${s.opacity})`);

      this.ctx.beginPath();
      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 1.8;
      this.ctx.moveTo(tailX, tailY);
      this.ctx.lineTo(s.x, s.y);
      this.ctx.stroke();

      // Glowing star head
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
      this.ctx.fill();
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
}
