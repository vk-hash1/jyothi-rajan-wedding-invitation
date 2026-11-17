/**
 * Jyothi Kumari & Rajan Sharma – Enchanted Dream Wedding Website
 * Centralized Internationalization (i18n) Configuration
 *
 * Languages: English ('en') and Hindi ('hi')
 * Natural, culturally respectful, authentic Devanagari Hindi translations.
 */

export const DEFAULT_LANGUAGE = 'hi';

export const translations = {
  en: {
    meta: {
      lang: "en",
      title: "Jyothi Kumari Weds Rajan Sharma | Enchanted Dream Wedding",
      description: "Wedding celebration of Jyothi Kumari and Rajan Sharma – 9 December 2026. Enchanted Dream wedding invitation."
    },
    languageSwitcher: {
      ariaLabel: "Switch language",
      enLabel: "English",
      hiLabel: "हिन्दी"
    },
    opening: {
      shlok: "॥ श्री गणेशाय नमः ॥",
      subtitle: "WEDDING INVITATION",
      emblemAlt: "Jyothi & Rajan Floral Gold JR Monogram Crest",
      brideName: "Jyothi",
      groomName: "Rajan",
      connector: "&",
      names: "Jyothi & Rajan",
      lead: "WEDDING INVITATION",
      dateBadge: "Wednesday, 9th December 2026",
      venueText: "BARDAHIYA, MARHAURA, CHHAPRA • BIHAR - 841419",
      unfoldBtn: "OPEN INVITATION",
      helperText: "Tap or press space to enter",
      tapInstruction: "TAP TO ENTER"
    },
    audio: {
      ariaPlay: "Play background music",
      ariaPause: "Pause background music",
      trackTitle: "Enchanted Wedding Soundtrack",
      statusPaused: "Paused",
      statusPlaying: "Playing"
    },
    hero: {
      eyebrow: "Shubh Vivah • Auspicious Union",
      brideFirstName: "Jyothi",
      groomFirstName: "Rajan",
      connector: "&",
      tagline: "Together with their families, joyfully invite you to celebrate the sacred union of their lives and love.",
      monogramAlt: "Jyothi Weds Rajan Floral Gold JR Monogram Emblem",
      dateDisplay: "Wednesday, 9 December 2026",
      subRite: "Subh Vivah",
      subLocation: "Bardahia, Chhapra, Bihar",
      venueDistrict: "Chhapra, Bihar",
      scrollPrompt: "Discover Our Celebration"
    },
    countdown: {
      eyebrow: "Auspicious Muhurat Countdown",
      title: "Counting Down to the Divine Union",
      subtitle: "Every passing moment brings us closer to the sacred Vedic pheras and a lifetime of togetherness.",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      badgeText: "Auspicious Wedding Day: 9 December 2026"
    },
    couple: {
      eyebrow: "The Blessed Union",
      title: "Jyothi Weds Rajan",
      subtitle: "Two souls united by destiny, blessed by families, beginning their sacred journey under the starry heavens.",
      bride: {
        title: "The Bride",
        fullName: "Jyothi Kumari",
        role: "Daughter of Auspicious Lineage",
        description: "An embodiment of grace, warmth, and timeless cultural values, embarking on this beautiful journey of love and togetherness."
      },
      groom: {
        title: "The Groom",
        fullName: "Rajan Sharma",
        role: "Son of Auspicious Lineage",
        description: "A man of integrity, dedication, and gentle strength, stepping forward with devotion to build a blissful future together."
      }
    },
    events: {
      eyebrow: "Sacred Ceremonies",
      title: "Wedding Timeline",
      subtitle: "Four auspicious rituals weaving tradition, family blessings, and timeless memories.",
      ceremonyCount: (index, total) => `Ceremony ${index + 1} of ${total}`,
      items: [
        {
          id: "tilak",
          name: "Tilak Ceremony",
          hindiName: "शुभ तिलक",
          date: "5 December 2026",
          day: "Saturday",
          description: "Auspicious welcome and sacred blessings with Chandan, Kumkum, and ceremonial gifts."
        },
        {
          id: "matkor",
          name: "Matkor Ceremony",
          hindiName: "कथा मटकोर",
          date: "7 December 2026",
          day: "Monday",
          description: "Sacred earthen ritual invoking ancestral blessings and harmony with Mother Earth."
        },
        {
          id: "mehendi",
          name: "Mehendi Ceremony",
          hindiName: "मेहंदी रस्म",
          date: "8 December 2026",
          day: "Tuesday",
          description: "Joyful celebration of love, music, and intricate auspicious henna artistry."
        },
        {
          id: "shadi",
          name: "Wedding Ceremony",
          hindiName: "शुभ विवाह",
          date: "9 December 2026",
          day: "Wednesday",
          description: "The divine union, sacred Vedic pheras around the holy fire, and eternal vows."
        }
      ]
    },
    venue: {
      eyebrow: "Sacred Destination",
      title: "Wedding Venue",
      subtitle: "We look forward to welcoming you and celebrating this celestial evening in your gracious presence.",
      label: "Venue Location",
      address: "Bardahia, Marhaura, Chhapra, Bihar – 841419, India",
      coordinatesLabel: "Verified Coordinates: 25.922985, 84.846042",
      btnViewMap: "View Location on Google Maps",
      btnGetDirections: "Get Directions on Google Maps",
      blessingShlok: "मङ्गलं भगवान् विष्णुः मङ्गलं गरुडध्वजः।\nमङ्गलं पुण्डरीकाक्षः मङ्गलायतनो हरिः॥",
      blessingNote: "“Your love, presence, and blessings are the greatest gifts we could cherish as we begin this sacred lifelong journey together.”",
      signature: "Jyothi Weds Rajan"
    },
    poster: {
      eyebrow: "Auspicious Wedding Card",
      title: "Official Wedding Invitation",
      subtitle: "A timeless keepsake of our celestial union. Save and keep this blessing with you.",
      imgSrc: "assets/images/wedding-invitation-poster.png",
      imgAlt: "Official Wedding Invitation Card of Jyothi Kumari Weds Rajan Sharma",
      downloadBtnText: "Download Invitation",
      downloadBadge: "PNG",
      downloadHint: "High-Resolution Printable Invitation • HD Original Quality",
      downloadFilename: "Jyothi-Kumari-Rajan-Sharma-Wedding-Invitation-EN.png"
    },
    footer: {
      names: "Jyothi Kumari Weds Rajan Sharma",
      tagline: "Enchanted Dream Wedding Website • 9 December 2026"
    }
  },

  hi: {
    meta: {
      lang: "hi",
      title: "ज्योति कुमारी संग राजन शर्मा | शुभ विवाह उत्सव",
      description: "ज्योति कुमारी संग राजन शर्मा का पावन वैवाहिक उत्सव – 9 दिसंबर 2026। सादर आमंत्रण।"
    },
    languageSwitcher: {
      ariaLabel: "भाषा बदलें",
      enLabel: "English",
      hiLabel: "हिन्दी"
    },
    opening: {
      shlok: "॥ श्री गणेशाय नमः ॥",
      subtitle: "शुभ विवाह आमंत्रण",
      emblemAlt: "ज्योति संग राजन मांगलिक पुष्प स्वर्ण प्रतीक चिह्न",
      brideName: "ज्योति",
      groomName: "राजन",
      connector: "संग",
      names: "ज्योति संग राजन",
      lead: "शुभ विवाह आमंत्रण",
      dateBadge: "बुधवार, 9 दिसंबर 2026",
      venueText: "बरदहियाँ, मढ़ौरा, छपरा • बिहार - 841419",
      unfoldBtn: "आमंत्रण खोलें",
      helperText: "प्रवेश करने के लिए टैप या स्पेस दबाएं",
      tapInstruction: "प्रवेश करने के लिए टैप करें"
    },
    audio: {
      ariaPlay: "पृष्ठभूमि संगीत बजाएं",
      ariaPause: "संगीत रोकें",
      trackTitle: "मांगलिक वैवाहिक धुन",
      statusPaused: "रुका हुआ",
      statusPlaying: "बज रहा है"
    },
    hero: {
      eyebrow: "॥ शुभ विवाह • मांगलिक मिलन ॥",
      brideFirstName: "ज्योति",
      groomFirstName: "राजन",
      connector: "संग",
      tagline: "परमपिता परमेश्वर की असीम अनुकम्पा से, दो परिवारों का स्नेहिल मिलन एवं दो आत्माओं का पावन वैवाहिक गठबंधन।",
      monogramAlt: "ज्योति संग राजन मांगलिक पुष्प स्वर्ण प्रतीक चिह्न",
      dateDisplay: "बुधवार, 9 दिसंबर 2026",
      subRite: "शुभ विवाह",
      subLocation: "बरदहिया, छपरा, बिहार",
      venueDistrict: "छपरा, बिहार",
      scrollPrompt: "मांगलिक उत्सव का क्रम देखें"
    },
    countdown: {
      eyebrow: "शुभ मुहूर्त की पावन प्रतीक्षा",
      title: "विवाह के शुभ लग्न की उल्टी गिनती",
      subtitle: "प्रत्येक बीता क्षण हमें वैदिक सात फेरों और जीवन भर के अटूट बंधन के और समीप ला रहा है।",
      days: "दिन",
      hours: "घंटे",
      minutes: "मिनट",
      seconds: "सेकंड",
      badgeText: "शुभ विवाह दिवस: 9 दिसंबर 2026"
    },
    couple: {
      eyebrow: "वर एवं वधू परिचय",
      title: "ज्योति संग राजन",
      subtitle: "भाग्य की डोर से बंधे, परिजनों के आशीष से सजे, नवजीवन की पावन बेला में आपका स्नेहिल स्वागत करते हैं।",
      bride: {
        title: "वधू",
        fullName: "ज्योति कुमारी",
        role: "सद्गुणों एवं संस्कारों से विभूषित सुपुत्री",
        description: "संस्कार, सौम्यता एवं स्नेह की प्रतिमूर्ति, जो अपने नए जीवन के आंगन में खुशियों और समृद्धि के दीप जलाने को प्रस्तुत हैं।"
      },
      groom: {
        title: "वर",
        fullName: "राजन शर्मा",
        role: "सदाचारी एवं निष्ठावान सुपुत्र",
        description: "सदाचार, कर्त्तव्यनिष्ठा एवं संकल्प के धनी, जो ज्योति के साथ जीवन पथ पर अर्धांगिनी के रूप में हाथ थामने को तत्पर हैं।"
      }
    },
    events: {
      eyebrow: "मांगलिक कार्यक्रम",
      title: "वैवाहिक उत्सव क्रम",
      subtitle: "विवाह के चारों पावन अनुष्ठानों में आपकी गरिमामयी उपस्थिति और शुभाशीर्वाद सादर प्रार्थनीय है।",
      ceremonyCount: (index, total) => `कार्यक्रम ${index + 1} / ${total}`,
      items: [
        {
          id: "tilak",
          name: "Tilak Ceremony",
          hindiName: "शुभ तिलक",
          date: "5 दिसंबर 2026",
          day: "शनिवार",
          description: "मांगलिक स्वागत, अक्षत-चन्दन तिलक एवं कुलदेवता के आशीष के साथ वर का सम्मान।"
        },
        {
          id: "matkor",
          name: "Matkor Ceremony",
          hindiName: "कथा मटकोर",
          date: "7 दिसंबर 2026",
          day: "सोमवार",
          description: "धरती माता का पावन पूजन, मातृ-शक्ति का आह्वान एवं परिवार के पूर्वजों का आशीर्वाद।"
        },
        {
          id: "mehendi",
          name: "Mehendi Ceremony",
          hindiName: "मेहंदी रस्म",
          date: "8 दिसंबर 2026",
          day: "मंगलवार",
          description: "सखियों के संग लोकगीतों की मधुर तान, उल्लास और हाथों में रचती शुभ सगुन की मेहंदी।"
        },
        {
          id: "shadi",
          name: "Wedding Ceremony",
          hindiName: "शुभ विवाह",
          date: "9 दिसंबर 2026",
          day: "बुधवार",
          description: "अग्नि को साक्षी मानकर वैदिक मंत्रोच्चार के मध्य पावन सात फेरे और जन्म-जन्मांतर का अटूट संकल्प।"
        }
      ]
    },
    venue: {
      eyebrow: "शुभ विवाह स्थल",
      title: "पधारें और आशीर्वाद दें",
      subtitle: "आपकी उपस्थिति ही हमारे इस उत्सव की सबसे बड़ी शोभा होगी। सपरिवार सादर आमंत्रित हैं।",
      label: "शुभ विवाह स्थल का पता",
      address: "बरदहिया, मढ़ौरा, छपरा, बिहार – 841419, भारत",
      coordinatesLabel: "सत्यापित निर्देशांक: 25.922985, 84.846042",
      btnViewMap: "गूगल मैप पर स्थान देखें",
      btnGetDirections: "रास्ता (दिशानिर्देश) प्राप्त करें",
      blessingShlok: "मङ्गलं भगवान् विष्णुः मङ्गलं गरुडध्वजः।\nमङ्गलं पुण्डरीकाक्षः मङ्गलायतनो हरिः॥",
      blessingNote: "“आपके स्नेह, उपस्थिति और पावन शुभाशीर्वाद ही हमारे इस नए जीवन के सबसे अनमोल उपहार हैं।”",
      signature: "ज्योति संग राजन"
    },
    poster: {
      eyebrow: "मांगलिक निमंत्रण पत्र",
      title: "शुभ विवाह आमंत्रण",
      subtitle: "हमारे इस पावन परिणयोत्सव का सप्रेम निमंत्रण पत्र। इसे सहेजें और अपने पास रखें।",
      imgSrc: "assets/images/wedding-invitation-poster-hi.png",
      imgAlt: "ज्योति कुमारी संग राजन शर्मा का शुभ विवाह निमंत्रण पत्र",
      downloadBtnText: "निमंत्रण पत्र डाउनलोड करें",
      downloadBadge: "PNG",
      downloadHint: "उच्च गुणवत्ता प्रिंट योग्य निमंत्रण पत्र • HD ओरिजिनल क्वालिटी",
      downloadFilename: "Jyothi-Kumari-Rajan-Sharma-Wedding-Invitation-HI.png"
    },
    footer: {
      names: "ज्योति कुमारी संग राजन शर्मा",
      tagline: "शुभ विवाह उत्सव • 9 दिसंबर 2026"
    }
  }
};
