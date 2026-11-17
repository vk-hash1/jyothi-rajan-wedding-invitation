/**
 * Jyothi Kumari & Rajan Sharma – Enchanted Dream Wedding Website
 * Main Bootstrap Script – Bilingual (English & Hindi) Architecture
 */

import { weddingConfig } from '../config/weddingConfig.js';
import { translations, DEFAULT_LANGUAGE } from '../config/i18n.js';
import { MusicPlayer } from './musicPlayer.js';
import { OpeningTransition } from './openingTransition.js';
import { CountdownClock } from './countdown.js';
import { CelestialHero } from './celestialHero.js';

// Expose globally for diagnostics in browser environments
if (typeof window !== 'undefined') {
  window.__weddingConfig = weddingConfig;
  window.__translations = translations;

  // Enforce fresh visit starts at scroll position 0
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const enforceTop = () => {
    const opening = document.getElementById('cinematic-opening');
    if (opening && !opening.classList.contains('is-dismissed')) {
      document.documentElement.classList.add('opening-active');
      if (document.body) document.body.classList.add('opening-active');
      window.scrollTo(0, 0);
    }
  };

  window.addEventListener('pageshow', enforceTop);
}

let activeMusicPlayer = null;

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initWeddingWebsite();
  });
}

/**
 * Initialize Wedding Website Components
 */
function initWeddingWebsite() {
  const logEntries = [];

  // Guarantee page starts at top (scroll 0)
  const openingEl = document.getElementById('cinematic-opening');
  if (openingEl && !openingEl.classList.contains('is-dismissed')) {
    document.documentElement.classList.add('opening-active');
    document.body.classList.add('opening-active');
    window.scrollTo(0, 0);
  }

  try {
    // 1. Initialize Floating Music Player (Zero Autoplay)
    activeMusicPlayer = new MusicPlayer({
      src: weddingConfig.music.src,
      title: weddingConfig.music.title
    });
    if (typeof window !== 'undefined') window.__musicPlayer = activeMusicPlayer;
    logEntries.push('✓ Music Player initialized (no autoplay, ready for user audio file).');

    // 2. Initialize Cinematic Opening Experience
    const openingTransition = new OpeningTransition({ musicPlayer: activeMusicPlayer });
    if (typeof window !== 'undefined') window.__openingTransition = openingTransition;
    logEntries.push('✓ Cinematic Opening Experience & Celestial Stars initialized.');

    // 3. Initialize Celestial Countdown Clock (Target: 9 December 2026 IST)
    const countdownClock = new CountdownClock(weddingConfig.weddingDate.iso);
    if (typeof window !== 'undefined') window.__countdownClock = countdownClock;
    logEntries.push('✓ Celestial Countdown Clock initialized targeting 9 December 2026.');

    // 3b. Initialize Animated Celestial Hero Atmosphere (Canvas Stars, Stardust & Shooting Stars)
    const heroCanvas = document.getElementById('hero-stars-canvas');
    if (heroCanvas) {
      const celestialHero = new CelestialHero(heroCanvas);
      if (typeof window !== 'undefined') window.__celestialHero = celestialHero;
      logEntries.push('✓ Animated Celestial Hero Atmosphere (Stars, Stardust & Shooting Stars) initialized.');
    }

    // 4. Bind Couple Photos (static assets)
    const bridePhotoEl = document.getElementById('spotlight-bride-photo');
    if (bridePhotoEl) {
      bridePhotoEl.src = weddingConfig.couple.bride.photo || weddingConfig.couple.bride.referencePhoto;
    }
    const groomPhotoEl = document.getElementById('spotlight-groom-photo');
    if (groomPhotoEl) {
      groomPhotoEl.src = weddingConfig.couple.groom.photo || weddingConfig.couple.groom.referencePhoto;
    }

    // 5. Initialize Direct Poster Download Handler
    initPosterDownload();
    logEntries.push('✓ Wedding invitation poster & direct client-side download initialized.');

    // 6. Initialize Internationalization (i18n) & Language Switcher
    // Default language is now Hindi ('hi')
    const hasUserChosen = localStorage.getItem('wedding_lang_user_selected') === 'true';
    const storedLang = localStorage.getItem('wedding_lang');
    const initialLang = (hasUserChosen && (storedLang === 'en' || storedLang === 'hi'))
      ? storedLang
      : (DEFAULT_LANGUAGE || 'hi');
    setupLanguageSwitcher();
    applyLanguage(initialLang);
    logEntries.push(`✓ Internationalization initialized (active language: ${initialLang}).`);

    // 7. Automated Diagnostics & Self-Verification (Dev / Testing)
    const verificationResults = runVerificationSuite(weddingConfig);
    if (typeof window !== 'undefined') {
      window.__verificationResults = verificationResults;
    }
    console.log('[System & Data Verification]', verificationResults);
  } catch (error) {
    console.error('[Initialization Error]', error);
  }
}

/**
 * Setup Language Switcher Listeners (Both Floating & Landing Bar)
 */
function setupLanguageSwitcher() {
  const switchEn = (e) => {
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    try {
      localStorage.setItem('wedding_lang_user_selected', 'true');
    } catch (err) {}
    applyLanguage('en');
  };

  const switchHi = (e) => {
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
    try {
      localStorage.setItem('wedding_lang_user_selected', 'true');
    } catch (err) {}
    applyLanguage('hi');
  };

  const btnEn = document.getElementById('lang-btn-en');
  const btnHi = document.getElementById('lang-btn-hi');
  if (btnEn) btnEn.addEventListener('click', switchEn);
  if (btnHi) btnHi.addEventListener('click', switchHi);

  const landingBtnEn = document.getElementById('landing-lang-btn-en');
  const landingBtnHi = document.getElementById('landing-lang-btn-hi');
  if (landingBtnEn) landingBtnEn.addEventListener('click', switchEn);
  if (landingBtnHi) landingBtnHi.addEventListener('click', switchHi);

  // Floating Tap Instruction Click Binding
  const landingTapInstruction = document.getElementById('landing-tap-instruction');
  const unfoldBtn = document.getElementById('btn-unfold-invitation');
  if (landingTapInstruction && unfoldBtn) {
    landingTapInstruction.addEventListener('click', () => unfoldBtn.click());
    landingTapInstruction.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        unfoldBtn.click();
      }
    });
  }
}

/**
 * Apply Language Across the Whole Website Instantly Without Reloading
 */
export function applyLanguage(lang) {
  const selectedLang = (lang === 'en') ? 'en' : 'hi';
  const data = translations[selectedLang];
  if (!data) return;

  // 1. Persist Preference & Set HTML Document Language
  try {
    localStorage.setItem('wedding_lang', selectedLang);
  } catch (e) {
    console.warn('localStorage access failed:', e);
  }
  document.documentElement.lang = selectedLang;

  // 2. Meta & Document Title
  document.title = data.meta.title;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', data.meta.description);
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', data.meta.title);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', data.meta.description);

  // 3. Switcher Buttons State (Both Floating & Landing Bar)
  const isEn = selectedLang === 'en';
  const isHi = selectedLang === 'hi';

  const btnEn = document.getElementById('lang-btn-en');
  const btnHi = document.getElementById('lang-btn-hi');
  if (btnEn) {
    btnEn.classList.toggle('is-active', isEn);
    btnEn.setAttribute('aria-checked', String(isEn));
  }
  if (btnHi) {
    btnHi.classList.toggle('is-active', isHi);
    btnHi.setAttribute('aria-checked', String(isHi));
  }

  const landingBtnEn = document.getElementById('landing-lang-btn-en');
  const landingBtnHi = document.getElementById('landing-lang-btn-hi');
  if (landingBtnEn) {
    landingBtnEn.classList.toggle('is-active', isEn);
    landingBtnEn.setAttribute('aria-checked', String(isEn));
  }
  if (landingBtnHi) {
    landingBtnHi.classList.toggle('is-active', isHi);
    landingBtnHi.setAttribute('aria-checked', String(isHi));
  }

  // 4. Milestone 2: Cinematic Opening Invitation
  // Responsive Master Landing Picture (Hindi vs English reference artwork)
  const deskSrc = document.getElementById('landing-src-desk');
  const bgImg = document.getElementById('landing-bg-img');
  if (isHi) {
    if (deskSrc) deskSrc.srcset = 'assets/images/landing/landing-celestial-royal-desktop-hi.jpg';
    if (bgImg) {
      bgImg.src = 'assets/images/landing/landing-celestial-royal-mobile-hi.jpg';
      bgImg.alt = 'ज्योति कुमारी संग राजन शर्मा | शुभ विवाह आमंत्रण';
    }
  } else {
    if (deskSrc) deskSrc.srcset = 'assets/images/landing/landing-celestial-royal-desktop.jpg';
    if (bgImg) {
      bgImg.src = 'assets/images/landing/landing-celestial-royal-mobile.jpg';
      bgImg.alt = 'Jyothi Kumari Weds Rajan Sharma | Wedding Invitation';
    }
  }

  const openingShlok = document.getElementById('opening-shlok');
  if (openingShlok) openingShlok.textContent = data.opening.shlok;

  const openingNames = document.getElementById('opening-couple-names');
  if (openingNames) openingNames.textContent = data.opening.names;

  const openingLead = document.getElementById('opening-lead');
  if (openingLead) openingLead.innerHTML = data.opening.lead;

  const openingDateText = document.getElementById('opening-date-text');
  if (openingDateText) openingDateText.textContent = data.opening.dateBadge;

  const unfoldBtnText = document.getElementById('unfold-btn-text');
  if (unfoldBtnText) unfoldBtnText.textContent = data.opening.unfoldBtn;

  const landingTapText = document.getElementById('landing-tap-text');
  if (landingTapText && data.opening.tapInstruction) {
    landingTapText.textContent = data.opening.tapInstruction;
  }
  const landingTapWrap = document.getElementById('landing-tap-instruction');
  if (landingTapWrap && data.opening.tapInstruction) {
    landingTapWrap.setAttribute('aria-label', data.opening.tapInstruction);
  }

  const openingHelper = document.getElementById('opening-helper-text');
  if (openingHelper) openingHelper.textContent = data.opening.helperText;

  const emblemImg = document.querySelector('.opening-emblem-img, .landing-emblem-img, .landing-monogram-img');
  if (emblemImg) emblemImg.alt = data.opening.emblemAlt;

  // 5. Floating Music Player Language Update
  if (activeMusicPlayer && typeof activeMusicPlayer.updateLanguage === 'function') {
    activeMusicPlayer.updateLanguage();
  }

  // 6. Enhanced Celestial Hero Section
  const coupleTitle = document.getElementById('couple-title');
  if (coupleTitle) {
    coupleTitle.textContent = selectedLang === 'hi'
      ? `${data.hero.brideFirstName} संग ${data.hero.groomFirstName} विवाह उत्सव`
      : `${data.hero.brideFirstName} Weds ${data.hero.groomFirstName} Wedding`;
  }

  const heroTagline = document.getElementById('hero-tagline');
  if (heroTagline) heroTagline.textContent = data.hero.eyebrow;

  const heroInvSubtext = document.getElementById('hero-invitation-subtext');
  if (heroInvSubtext) heroInvSubtext.textContent = data.hero.tagline;

  const heroMonogramImg = document.querySelector('.hero-monogram-img');
  if (heroMonogramImg && data.hero?.monogramAlt) {
    heroMonogramImg.alt = data.hero.monogramAlt;
  }

  const heroCoupleTitle = document.getElementById('hero-couple-title');
  if (heroCoupleTitle) {
    heroCoupleTitle.innerHTML = `
      <span>${data.hero.brideFirstName}</span>
      <span class="hero-connector-amp">${data.hero.connector}</span>
      <span>${data.hero.groomFirstName}</span>
    `;
  }

  const heroDate = document.getElementById('hero-date');
  if (heroDate) heroDate.textContent = data.hero.dateDisplay;

  const heroSubDay = document.getElementById('hero-sub-day');
  if (heroSubDay) heroSubDay.remove();

  const heroSubRite = document.getElementById('hero-sub-rite');
  if (heroSubRite) heroSubRite.textContent = data.hero.subRite || (selectedLang === 'hi' ? 'शुभ विवाह' : 'Subh Vivah');

  const heroLocation = document.getElementById('hero-location');
  if (heroLocation) heroLocation.textContent = data.hero.subLocation || (selectedLang === 'hi' ? 'बरदहिया, छपरा, बिहार' : 'Bardahia, Chhapra, Bihar');

  const heroScrollCueText = document.getElementById('hero-scroll-cue-text');
  if (heroScrollCueText) heroScrollCueText.textContent = data.hero.scrollPrompt;

  // 7. Celestial Countdown Clock Section
  const countdownEyebrow = document.getElementById('countdown-eyebrow-text');
  if (countdownEyebrow) countdownEyebrow.textContent = data.countdown.eyebrow;

  const countdownTitle = document.getElementById('countdown-title');
  if (countdownTitle) countdownTitle.textContent = data.countdown.title;

  const countdownSubtitle = document.getElementById('countdown-subtitle');
  if (countdownSubtitle) countdownSubtitle.textContent = data.countdown.subtitle;

  const lblDays = document.getElementById('countdown-label-days');
  if (lblDays) lblDays.textContent = data.countdown.days;

  const lblHours = document.getElementById('countdown-label-hours');
  if (lblHours) lblHours.textContent = data.countdown.hours;

  const lblMinutes = document.getElementById('countdown-label-minutes');
  if (lblMinutes) lblMinutes.textContent = data.countdown.minutes;

  const lblSeconds = document.getElementById('countdown-label-seconds');
  if (lblSeconds) lblSeconds.textContent = data.countdown.seconds;

  const countdownCompleted = document.getElementById('countdown-completed');
  if (countdownCompleted) {
    countdownCompleted.textContent = selectedLang === 'hi'
      ? '🌟 शुभ विवाह का पावन दिवस आ गया है! ज्योति संग राजन के विवाह उत्सव में आपका हार्दिक स्वागत है! 🌟'
      : '🌟 The Auspicious Wedding Day has arrived! Welcome to the celebration of Jyothi Weds Rajan! 🌟';
  }

  // 8. Couple Presentation Spotlight
  const coupleEyebrow = document.getElementById('couple-eyebrow-text');
  if (coupleEyebrow) coupleEyebrow.textContent = data.couple.eyebrow;

  const coupleSectionTitle = document.getElementById('couple-section-title');
  if (coupleSectionTitle) coupleSectionTitle.textContent = data.couple.title;

  const coupleSectionSubtitle = document.getElementById('couple-section-subtitle');
  if (coupleSectionSubtitle) coupleSectionSubtitle.textContent = data.couple.subtitle;

  const brideRole = document.getElementById('bride-role-tag');
  if (brideRole) brideRole.textContent = data.couple.bride.title;

  const brideName = document.getElementById('spotlight-bride-name');
  if (brideName) brideName.textContent = data.couple.bride.fullName;

  const brideHeritage = document.getElementById('bride-heritage-line');
  if (brideHeritage) brideHeritage.textContent = data.couple.bride.role;

  const brideBlessing = document.getElementById('bride-blessing-quote');
  if (brideBlessing) brideBlessing.textContent = data.couple.bride.description;

  const groomRole = document.getElementById('groom-role-tag');
  if (groomRole) groomRole.textContent = data.couple.groom.title;

  const groomName = document.getElementById('spotlight-groom-name');
  if (groomName) groomName.textContent = data.couple.groom.fullName;

  const groomHeritage = document.getElementById('groom-heritage-line');
  if (groomHeritage) groomHeritage.textContent = data.couple.groom.role;

  const groomBlessing = document.getElementById('groom-blessing-quote');
  if (groomBlessing) groomBlessing.textContent = data.couple.groom.description;

  // 9. Sacred Ceremonies Timeline (Four Auspicious Rites)
  const eventsEyebrow = document.getElementById('events-eyebrow-text');
  if (eventsEyebrow) eventsEyebrow.textContent = data.events.eyebrow;

  const eventsTitle = document.getElementById('events-title');
  if (eventsTitle) eventsTitle.textContent = data.events.title;

  const eventsSubtitle = document.getElementById('events-subtitle');
  if (eventsSubtitle) eventsSubtitle.textContent = data.events.subtitle;

  renderTimeline(selectedLang);

  // 10. Venue Section & Separate Direct Google Maps Buttons
  const venueEyebrow = document.getElementById('venue-eyebrow-text');
  if (venueEyebrow) venueEyebrow.textContent = data.venue.eyebrow;

  const venueTitle = document.getElementById('venue-title');
  if (venueTitle) venueTitle.textContent = data.venue.title;

  const venueSubtitle = document.getElementById('venue-subtitle');
  if (venueSubtitle) venueSubtitle.textContent = data.venue.subtitle;

  const venueName = document.getElementById('venue-name');
  if (venueName) venueName.textContent = data.venue.label;

  const venueAddress = document.getElementById('venue-address');
  if (venueAddress) venueAddress.textContent = data.venue.address;

  const venueCoordinates = document.getElementById('venue-coordinates');
  if (venueCoordinates) venueCoordinates.textContent = data.venue.coordinatesLabel;

  const btnViewMap = document.getElementById('btn-view-map');
  if (btnViewMap) {
    btnViewMap.href = weddingConfig.venue.mapLinks.viewLocation;
  }
  const btnViewMapText = document.getElementById('btn-view-map-text');
  if (btnViewMapText) btnViewMapText.textContent = data.venue.btnViewMap;

  const btnGetDirections = document.getElementById('btn-get-directions');
  if (btnGetDirections) {
    btnGetDirections.href = weddingConfig.venue.mapLinks.getDirections;
  }
  const btnGetDirectionsText = document.getElementById('btn-get-directions-text');
  if (btnGetDirectionsText) btnGetDirectionsText.textContent = data.venue.btnGetDirections;

  const finalNote = document.getElementById('final-note-text');
  if (finalNote) finalNote.textContent = data.venue.blessingNote;

  const finalSign = document.getElementById('final-monogram-sign');
  if (finalSign) finalSign.textContent = data.venue.signature;

  // 11. Official Wedding Invitation Poster Section
  const posterEyebrow = document.getElementById('poster-eyebrow-text');
  if (posterEyebrow) posterEyebrow.textContent = data.poster.eyebrow;

  const posterTitle = document.getElementById('poster-title');
  if (posterTitle) posterTitle.textContent = data.poster.title;

  const posterSubtitle = document.getElementById('poster-subtitle');
  if (posterSubtitle) posterSubtitle.textContent = data.poster.subtitle;

  const posterImg = document.getElementById('invitation-poster-img');
  if (posterImg) {
    posterImg.src = data.poster.imgSrc;
    posterImg.alt = data.poster.imgAlt;
  }

  const downloadBtn = document.getElementById('btn-download-invitation');
  if (downloadBtn) {
    downloadBtn.setAttribute('href', data.poster.imgSrc);
    downloadBtn.setAttribute('download', data.poster.downloadFilename);
  }

  const posterDownloadText = document.getElementById('poster-download-text');
  if (posterDownloadText) posterDownloadText.textContent = data.poster.downloadBtnText;

  const posterDownloadHint = document.getElementById('poster-download-hint');
  if (posterDownloadHint) posterDownloadHint.textContent = data.poster.downloadHint;

  // 12. Footer
  const footerNames = document.getElementById('footer-couple-names');
  if (footerNames) footerNames.textContent = data.footer.names;

  const footerTagline = document.getElementById('footer-tagline');
  if (footerTagline) footerTagline.textContent = data.footer.tagline;

  // Dispatch custom event for testing / external listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('wedding:languageChanged', { detail: { lang: selectedLang } }));
  }
}

/**
 * Render Responsive Ceremonies Timeline with Bilingual Support
 */
function renderTimeline(lang) {
  const timelineContainer = document.getElementById('timeline-events-list');
  if (!timelineContainer) return;

  const eventItems = translations[lang].events.items;
  timelineContainer.innerHTML = '';

  eventItems.forEach((event, index) => {
    const isLeft = index % 2 === 0;
    const item = document.createElement('div');
    item.className = `timeline-item ${isLeft ? 'item-left' : 'item-right'}`;

    const orderText = lang === 'hi' ? `कार्यक्रम ${index + 1} / 4` : `Ceremony ${index + 1} of 4`;
    const iconPath = weddingConfig.events[index]?.icon || 'assets/vectors/mandala-celestial.svg';

    item.innerHTML = `
      <!-- Central Star Node -->
      <div class="timeline-node" aria-hidden="true">
        <span class="timeline-node-star"></span>
      </div>

      <!-- Ceremony Card -->
      <article class="timeline-card theme-${event.id}">
        <div class="ceremony-card-top">
          <div class="ceremony-icon-disc">
            <img src="${iconPath}" alt="${event.hindiName} emblem" width="48" height="48">
          </div>
          <div class="ceremony-meta">
            <span class="ceremony-order-pill">${orderText}</span>
          </div>
        </div>

        <div class="ceremony-title-group">
          <h3 class="ceremony-hindi-title" lang="hi">${event.hindiName}</h3>
          <div class="ceremony-name">${event.name}</div>
        </div>

        <div class="ceremony-date-badge">
          <span aria-hidden="true">📅</span>
          <span><strong>${event.date}</strong> (${event.day})</span>
        </div>

        <p class="ceremony-essence">${event.description}</p>
      </article>
    `;

    timelineContainer.appendChild(item);
  });
}

/**
 * Client-Side Direct Image Download Handler
 * Ensures reliable direct file download across Android, iOS, and Desktop
 * without opening in a new tab.
 */
function initPosterDownload() {
  const downloadBtn = document.getElementById('btn-download-invitation');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const posterUrl = downloadBtn.getAttribute('href') || 'assets/images/wedding-invitation-poster.png';
    const filename = downloadBtn.getAttribute('download') || 'Jyothi-Kumari-Rajan-Sharma-Wedding-Invitation.png';

    try {
      const response = await fetch(posterUrl);
      if (!response.ok) throw new Error('Fetch failed');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = filename;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 2500);
    } catch (err) {
      console.warn('Direct blob download fallback:', err);
      const fallbackLink = document.createElement('a');
      fallbackLink.href = posterUrl;
      fallbackLink.download = filename;
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);
    }
  });
}

/**
 * Automated Verification Suite
 */
function runVerificationSuite(config) {
  const logs = [];
  let allPassed = true;

  // Check 1: Couple Names
  const brideOk = config.couple?.bride?.fullName === "Jyothi Kumari";
  const groomOk = config.couple?.groom?.fullName === "Rajan Sharma";
  if (brideOk && groomOk) {
    logs.push('✓ Verification: Couple names verified (Jyothi Kumari & Rajan Sharma).');
  } else {
    logs.push('✗ Verification Failed: Couple names do not match requirements.');
    allPassed = false;
  }

  // Check 2: Wedding Date
  const dateOk = config.weddingDate?.displayDate === "9 December 2026" && config.weddingDate?.iso.startsWith("2026-12-09");
  if (dateOk) {
    logs.push('✓ Verification: Wedding date verified (9 December 2026).');
  } else {
    logs.push('✗ Verification Failed: Wedding date mismatch.');
    allPassed = false;
  }

  // Check 3: Events Integrity (All 4 exact dates)
  const expectedEvents = [
    { id: "tilak", date: "5 December 2026" },
    { id: "matkor", date: "7 December 2026" },
    { id: "mehendi", date: "8 December 2026" },
    { id: "shadi", date: "9 December 2026" }
  ];

  let eventsMatch = Array.isArray(config.events) && config.events.length === 4;
  if (eventsMatch) {
    expectedEvents.forEach(expected => {
      const found = config.events.find(e => e.id === expected.id && e.date === expected.date);
      if (!found) eventsMatch = false;
    });
  }

  if (eventsMatch) {
    logs.push('✓ Verification: All 4 sacred events verified (Tilak: 5 Dec, Matkor: 7 Dec, Mehendi: 8 Dec, Shadi: 9 Dec).');
  } else {
    logs.push('✗ Verification Failed: Events list or dates mismatch.');
    allPassed = false;
  }

  // Check 4: Venue & Exact Google Maps URLs (View Location & Get Directions distinct actions)
  const venueAddress = config.venue?.address || '';
  const venueOk = venueAddress.includes('Bardahia') && 
                  venueAddress.includes('Marhaura') && 
                  venueAddress.includes('Chhapra') && 
                  venueAddress.includes('841419');
  if (venueOk) {
    logs.push(`✓ Verification: Venue address verified (${venueAddress}).`);
  } else {
    logs.push('✗ Verification Failed: Venue address mismatch.');
    allPassed = false;
  }

  // Robust Google Maps URL Verification (accepts both %2C and literal comma encoding)
  function verifyMapUrl(urlString, paramName, expectedCoords) {
    if (!urlString || typeof urlString !== 'string') return false;
    try {
      const url = new URL(urlString);
      const paramVal = url.searchParams.get(paramName);
      if (!paramVal) return false;
      const normalized = decodeURIComponent(paramVal).replace(/\s+/g, '');
      return normalized === expectedCoords;
    } catch {
      return false;
    }
  }

  const targetCoords = "25.922985,84.846042";
  const viewUrlOk = verifyMapUrl(config.venue?.mapLinks?.viewLocation, 'query', targetCoords);
  const dirUrlOk = verifyMapUrl(config.venue?.mapLinks?.getDirections, 'destination', targetCoords);
  const distinctActions = config.venue?.mapLinks?.viewLocation !== config.venue?.mapLinks?.getDirections;

  if (viewUrlOk && dirUrlOk && distinctActions) {
    logs.push(`✓ Verification: Direct Google Maps action URLs verified (View & Directions distinct with verified coordinates ${targetCoords}).`);
  } else {
    logs.push('✗ Verification Failed: Google Maps URLs do not match required coordinates.');
    allPassed = false;
  }

  // Check 5: Audio Configuration
  const audioAutoplayOff = config.music?.autoplay === false;
  const audioSrcReady = config.music?.src === "assets/audio/wedding-song.mp3";
  if (audioAutoplayOff && audioSrcReady) {
    logs.push('✓ Verification: Audio configured strictly with no autoplay; soundtrack file integrated.');
  } else {
    logs.push('✗ Verification Failed: Audio configuration violates rules.');
    allPassed = false;
  }

  return { allPassed, logs };
}

// Expose setLanguage globally for console testing
if (typeof window !== 'undefined') {
  window.setLanguage = applyLanguage;
}
