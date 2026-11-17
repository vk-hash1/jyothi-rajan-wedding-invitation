# ✨ Jyothi Weds Rajan — Enchanted Celestial Wedding Invitation

[![Live Site](https://img.shields.io/badge/Live_Site-Vercel-success?style=for-the-badge&logo=vercel)](https://jyothi-rajan-wedding-invitation.vercel.app/)

An interactive, royal celestial wedding invitation web experience designed for **Jyothi Kumari Weds Rajan Sharma** (हिन्दी: **ज्योति कुमारी संग राजन शर्मा**) celebrating their auspicious union on **Wednesday, 9 December 2026** at **Bardahia, Marhaura, Chhapra, Bihar**.

🔗 **Live Website:** [https://jyothi-rajan-wedding-invitation.vercel.app](https://jyothi-rajan-wedding-invitation.vercel.app)

---

## 🌟 Key Features

- **Royal Celestial Aesthetic:** Immersive midnight purple and starlight gold visual theme with glowing lanterns, floating diyas, lotus blossoms, and celestial dust particles.
- **Interactive Invitation Experience:** Cinematic opening sequence with an interactive "Unfold the Celebration" entrance transition.
- **Authentic Bilingual Localization:** Full dynamic language switching between **हिन्दी (Devanagari)** and **English** with zero character distortion or matra clipping.
- **Ornate Floral Monogram:** Features the handcrafted `JR` golden floral crest centered with royal prominence.
- **Auspicious Timeline & Ceremonies:** Detailed multi-day celebration schedule (Matkor, Mehendi, Haldi, Tilak, and Shubh Vivah).
- **Venue & Google Maps Integration:** Direct one-tap navigation to the verified coordinates `25.922985, 84.846042` at Bardahia, Marhaura, Chhapra, Bihar.
- **High-Resolution Keepsake Posters:** Dual printable invitation posters (separate English and Hindi versions) with client-side direct downloads.
- **Background Melodies:** Ambient royal wedding instrumental audio player with pause/play controls.
- **Responsive & Accessible:** Fully responsive across mobile, tablet, and desktop viewports, meeting WCAG 2.1 accessibility standards.

---

## 🚀 Local Development

This is a modern vanilla web application requiring no build steps or heavy dependencies:

```bash
# Clone the repository
git clone https://github.com/vk-hash1/jyothi-rajan-wedding-invitation.git
cd jyothi-rajan-wedding-invitation

# Start any local HTTP server, for example:
python -m http.server 3000
# or
npx serve .
```

Open `http://localhost:3000` in your web browser.

---

## 📁 Project Architecture

```
├── assets/
│   ├── audio/           # Background wedding melody (wedding-song.mp3)
│   ├── fonts/           # Local Noto Serif Devanagari TTF fonts
│   ├── images/          # Ornate monograms, celestial sprites, and invitation posters
│   └── vectors/         # SVGs for Ganesha, mandalas, moon, and event motifs
├── config/
│   ├── i18n.js          # Bilingual translations (English & Hindi)
│   └── weddingConfig.js # Wedding schedule, venue details, and coordinates
├── css/
│   ├── base.css         # Global resets, typography, and container rules
│   ├── hero.css         # Celestial hero banner styling
│   ├── opening.css      # Invitation entrance and date cartouche styling
│   ├── poster.css       # Printable keepsake poster card and download area
│   ├── variables.css    # Royal color tokens, spacing, and transitions
│   └── venue.css        # Venue map cards and location details
├── js/
│   ├── celestialHero.js # Canvas starlight and particle animations
│   ├── countdown.js     # Auspicious day countdown calculation
│   ├── main.js          # Application bootstrap, DOM binding, and language toggle
│   └── musicPlayer.js   # Background audio playback logic
└── index.html           # Main semantic HTML5 document
```

---

## 💍 Auspicious Details

- **Bride:** Jyothi Kumari *(Granddaughter of Late Shri Lakhi Narayan Sharma | D/o Smt. Umrawati Devi & Shri Umesh Sharma)*
- **Groom:** Rajan Sharma *(S/o Smt. Vimala Devi & Shri Chandreshwar Sharma | Gram – Akhtiyarpur, Thana – Garkha, District – Saran, Bihar)*
- **Date:** Wednesday, 9 December 2026
- **Venue:** Bardahia, Marhaura, Chhapra, Bihar – 841419, India
