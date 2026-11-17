/**
 * Jyothi Kumari & Rajan Sharma – Enchanted Dream Wedding Website
 * Centralized Wedding Configuration File
 *
 * All dates, names, venues, coordinates, and navigation links are defined here.
 * Do not invent timings, family details, or addresses.
 */

export const weddingConfig = {
  defaultLanguage: "hi",
  couple: {
    bride: {
      firstName: "Jyothi",
      fullName: "Jyothi Kumari",
      title: "The Bride",
      role: "Daughter of Auspicious Lineage",
      photo: "assets/images/references/bride-lehenga.jpg",
      referencePhoto: "assets/images/references/bride-lehenga.jpg"
    },
    groom: {
      firstName: "Rajan",
      fullName: "Rajan Sharma",
      title: "The Groom",
      role: "Son of Auspicious Lineage",
      photo: "assets/images/references/groom-sherwani.jpg",
      referencePhoto: "assets/images/references/groom-sherwani.jpg"
    },
    monogram: "J & R",
    floralMonogram: "assets/images/jr-floral-monogram.png",
    floralMonogramWebp: "assets/images/jr-floral-monogram.webp",
    emblemArtwork: "assets/images/emblem-monogram.png",
    emblemWebp: "assets/images/emblem-monogram.webp",
    tagline: "Together with their families, invite you to celebrate their wedding"
  },

  weddingDate: {
    iso: "2026-12-09T00:00:00+05:30",
    displayDate: "9 December 2026",
    day: "Wednesday",
    month: "December",
    year: 2026,
    auspiciousTitle: "Subh Vivah (Wedding Day)"
  },

  venue: {
    name: "Wedding Venue",
    address: "Bardahia, Marhaura, Chhapra, Bihar – 841419, India",
    district: "Chhapra, Bihar",
    country: "India",
    pincode: "841419",
    coordinates: {
      latitude: 25.922985,
      longitude: 84.846042
    },
    mapLinks: {
      // Kept as separate direct actions per project rules
      viewLocation: "https://www.google.com/maps/search/?api=1&query=25.922985%2C84.846042",
      getDirections: "https://www.google.com/maps/dir/?api=1&destination=25.922985%2C84.846042"
    }
  },

  events: [
    {
      id: "tilak",
      name: "Tilak Ceremony",
      hindiName: "शुभ तिलक",
      date: "5 December 2026",
      day: "Saturday",
      isoDate: "2026-12-05",
      icon: "assets/vectors/event-tilak.svg",
      themeAccent: "tilak",
      description: "Auspicious welcome and sacred blessings with Chandan, Kumkum, and ceremonial gifts."
    },
    {
      id: "matkor",
      name: "Matkor Ceremony",
      hindiName: "कथा मटकोर",
      date: "7 December 2026",
      day: "Monday",
      isoDate: "2026-12-07",
      icon: "assets/vectors/event-matkor.svg",
      themeAccent: "matkor",
      description: "Sacred earthen ritual invoking ancestral blessings and harmony with Mother Earth."
    },
    {
      id: "mehendi",
      name: "Mehendi Ceremony",
      hindiName: "मेहंदी रस्म",
      date: "8 December 2026",
      day: "Tuesday",
      isoDate: "2026-12-08",
      icon: "assets/vectors/event-mehendi.svg",
      themeAccent: "mehendi",
      description: "Joyful celebration of love, music, and intricate auspicious henna artistry."
    },
    {
      id: "shadi",
      name: "Wedding Ceremony",
      hindiName: "शुभ विवाह",
      date: "9 December 2026",
      day: "Wednesday",
      isoDate: "2026-12-09",
      icon: "assets/vectors/event-shadi.svg",
      themeAccent: "shadi",
      description: "The divine union, sacred Vedic pheras around the holy fire, and eternal vows."
    }
  ],

  music: {
    src: "assets/audio/wedding-song.mp3",
    title: "Enchanted Wedding Soundtrack",
    autoplay: false,
    initialMuted: false
  },

  theme: {
    name: "Enchanted Dream",
    palette: {
      midnight: "#0B0E21",
      lilacMist: "#F7F5FC",
      lavenderEthereal: "#EDE7F6",
      lavenderPrimary: "#9B7ED9",
      violetRich: "#6339A8",
      moonlightSilver: "#E2E8F0",
      champagneLight: "#F5E8D0",
      champagneGold: "#C5A869"
    }
  }
};
