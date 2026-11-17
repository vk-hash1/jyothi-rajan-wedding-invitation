/**
 * Jyothi Kumari & Rajan Sharma – Enchanted Dream Wedding Website
 * Celestial Countdown Clock Engine
 *
 * Target: 9 December 2026, 00:00:00+05:30 (IST)
 */

export class CountdownClock {
  constructor(targetIsoDate) {
    this.targetDate = new Date(targetIsoDate || '2026-12-09T00:00:00+05:30').getTime();
    this.daysEl = document.getElementById('countdown-days');
    this.hoursEl = document.getElementById('countdown-hours');
    this.minutesEl = document.getElementById('countdown-minutes');
    this.secondsEl = document.getElementById('countdown-seconds');
    this.gridEl = document.getElementById('countdown-grid');
    this.completedEl = document.getElementById('countdown-completed');

    this.intervalId = null;
    this.init();
  }

  init() {
    this.tick();
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  tick() {
    const now = new Date().getTime();
    const distance = this.targetDate - now;

    if (distance <= 0) {
      this.handleCompletion();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (this.daysEl) this.daysEl.textContent = days.toString();
    if (this.hoursEl) this.hoursEl.textContent = this.padZero(hours);
    if (this.minutesEl) this.minutesEl.textContent = this.padZero(minutes);
    if (this.secondsEl) this.secondsEl.textContent = this.padZero(seconds);
  }

  padZero(num) {
    return num < 10 ? `0${num}` : num.toString();
  }

  handleCompletion() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.daysEl) this.daysEl.textContent = '0';
    if (this.hoursEl) this.hoursEl.textContent = '00';
    if (this.minutesEl) this.minutesEl.textContent = '00';
    if (this.secondsEl) this.secondsEl.textContent = '00';

    if (this.completedEl) {
      this.completedEl.style.display = 'block';
    }
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
