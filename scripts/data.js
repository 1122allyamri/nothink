/* =========================================================================
   SITE DATA — single source of truth for repeated homepage content.
   Everything marked [TEMP] is placeholder content/artwork to be replaced
   with real projects, posts, people, and photography. Keep the shapes;
   swap the values.
   ========================================================================= */

const SITE = {
  brand: {
    name: "Amri",
    legal: "Amri®",
    email: "allyamri2026@gmail.com",
    phone: "+44 20 0000 0000", // [TEMP] replace with real phone
    city: "London", // [TEMP] replace with real city
    timezone: "Europe/London", // [TEMP] used for the footer local-time readout
  },

  /* ---------------------------------------------------------- posts rail */
  posts: [
    {
      category: "Studio",
      date: "About Amri",
      title: "An independent design practice",
      excerpt:
        "Amri is a design studio for brand identity, websites and digital products. Small team, senior hands, no handovers.",
      image: "assets/img/post-1.svg", // [TEMP]
      href: "#studio",
      pinned: true,
    },
    {
      category: "Insight",
      date: "June 12, 2026",
      title: "Design systems that survive the second year", // [TEMP]
      excerpt:
        "Most identities decay after launch. What we build into a system so it still holds once the agency leaves the room.",
      image: "assets/img/post-2.svg", // [TEMP]
      href: "#journal",
    },
    {
      category: "Insight",
      date: "April 3, 2026",
      title: "Why we prototype in the browser, not in decks", // [TEMP]
      excerpt:
        "Static pages hide the decisions that matter. Moving to working prototypes earlier changes what clients approve.",
      image: "assets/img/post-3.svg", // [TEMP]
      href: "#journal",
    },
    {
      category: "Notes",
      date: "February 19, 2026",
      title: "A smaller studio is a feature, not a constraint", // [TEMP]
      excerpt:
        "On keeping the team deliberately small, and what that buys the people who hire us.",
      image: "assets/img/post-4.svg", // [TEMP]
      href: "#journal",
    },
  ],

  /* ------------------------------------------------------ selected work
     `statement` + `scope` + `url` power the Work page detail view.
     All clients are [TEMP] fictional placeholders. */
  projects: [
    {
      name: "Aurel", // [TEMP] fictional client
      slug: "aurel",
      industry: "Fintech",
      url: "#", // [TEMP] replace with live site URL
      description:
        "A calm, credible brand and product site that positions Aurel as the wealth platform private banks reach for first.",
      statement:
        "A calm, credible platform brand that makes complex wealth management feel effortless — and earns the trust of private banks.",
      scope: {
        Development: ["Design system build", "Component library", "CMS setup"],
        "Branding & Design": ["Brand identity", "Website design", "Art direction"],
        "Strategy & Process": ["Brand discovery", "Website architecture", "QA"],
      },
      icon: "assets/img/aurel-icon.svg",
      href: "work.html#aurel",
      media: [
        { src: "assets/img/aurel-1.svg", alt: "Aurel brand identity — gradient key visual with monogram" },
        { src: "assets/img/aurel-2.svg", alt: "Aurel product dashboard interface" },
        { src: "assets/img/aurel-3.svg", alt: "Aurel identity applied to print poster" },
      ],
    },
    {
      name: "Kilowatt", // [TEMP] fictional client
      slug: "kilowatt",
      industry: "Energy",
      url: "#", // [TEMP]
      description:
        "Identity and reporting tools that make a renewable energy operator's data legible to regulators and the public.",
      statement:
        "A future-facing identity and reporting suite that turns a renewable operator's raw data into a public argument for clean energy.",
      scope: {
        Development: ["Data visualisation", "Reporting templates", "Front-end build"],
        "Branding & Design": ["Corporate identity", "Logo / brandmark", "Annual report"],
        Integrations: ["Analytics", "CookieConsent"],
      },
      icon: "assets/img/kilowatt-icon.svg",
      href: "work.html#kilowatt",
      media: [
        { src: "assets/img/kilowatt-1.svg", alt: "Kilowatt key visual with monogram on warm gradient" },
        { src: "assets/img/kilowatt-2.svg", alt: "Kilowatt live grid monitoring interface" },
        { src: "assets/img/kilowatt-3.svg", alt: "Kilowatt outdoor poster application" },
      ],
    },
    {
      name: "Fieldnote", // [TEMP] fictional client
      slug: "fieldnote",
      industry: "AgTech",
      url: "#", // [TEMP]
      description:
        "A scalable component library and multi-language site for a fast-growing farm intelligence platform.",
      statement:
        "A component system and multi-language site that scales as fast as the farm intelligence platform it serves.",
      scope: {
        Development: ["Multi-language CMS", "20+ layout components", "Partner database"],
        "Branding & Design": ["Design system", "Interface design", "Iconography"],
        "Strategy & Process": ["Content modelling", "Marketeer onboarding"],
      },
      icon: "assets/img/fieldnote-icon.svg",
      href: "work.html#fieldnote",
      media: [
        { src: "assets/img/fieldnote-1.svg", alt: "Fieldnote brand gradient with monogram" },
        { src: "assets/img/fieldnote-2.svg", alt: "Fieldnote fields overview interface" },
        { src: "assets/img/fieldnote-3.svg", alt: "Fieldnote identity on printed matter" },
      ],
    },
    {
      name: "Marlow", // [TEMP] fictional client
      slug: "marlow",
      industry: "Hospitality",
      url: "#", // [TEMP]
      description:
        "Brand, art direction and booking experience for a family of small hotels that refuse to feel like a chain.",
      statement:
        "A warm, unhurried brand and booking experience for a family of small hotels that refuse to feel like a chain.",
      scope: {
        Development: ["Booking experience", "CMS setup"],
        "Branding & Design": ["Brand identity", "Photography direction", "Print matter"],
        "Strategy & Process": ["Positioning", "Naming"],
      },
      icon: "assets/img/marlow-icon.svg",
      href: "work.html#marlow",
      media: [
        { src: "assets/img/marlow-1.svg", alt: "Marlow warm key visual with monogram" },
        { src: "assets/img/marlow-2.svg", alt: "Marlow bookings interface" },
        { src: "assets/img/marlow-3.svg", alt: "Marlow poster in identity colours" },
      ],
    },
  ],

  /* ------------------------------------------------------- client voices */
  voices: [
    {
      quote:
        "They cared about the outcome as much as we did, and it shows in every screen.", // [TEMP]
      name: "J. Okafor", // [TEMP]
      role: "Head of Product, Aurel",
      image: "assets/img/voice-1.svg", // [TEMP] replace with 16:9 photo or video poster
    },
    {
      quote:
        "The rare studio that ships the brand, the site, and the reasoning behind both.", // [TEMP]
      name: "S. Lindqvist", // [TEMP]
      role: "Marketing Director, Fieldnote",
      image: "assets/img/voice-2.svg", // [TEMP]
    },
  ],

  /* --------------------------------------------------------------- lab */
  lab: [
    { src: "assets/img/lab-01.svg", w: 900, h: 1100, name: "Grotesk pairing", cat: "Type study" },
    { src: "assets/img/lab-02.svg", w: 800, h: 800, name: "Arc system", cat: "Pattern" },
    { src: "assets/img/lab-03.svg", w: 1200, h: 800, name: "Signals", cat: "Data sketch" },
    { src: "assets/img/lab-04.svg", w: 700, h: 1200, name: "Field colour", cat: "Exploration" },
    { src: "assets/img/lab-05.svg", w: 1200, h: 800, name: "Elevation 04", cat: "Drawing" },
    { src: "assets/img/lab-06.svg", w: 800, h: 800, name: "Ask", cat: "Internal tool" },
    { src: "assets/img/lab-07.svg", w: 800, h: 1000, name: "Mél.", cat: "Poster study" },
    { src: "assets/img/lab-08.svg", w: 1600, h: 700, name: "Dot grid", cat: "Pattern" },
    { src: "assets/img/lab-09.svg", w: 800, h: 800, name: "k mark", cat: "Logo study" },
    { src: "assets/img/lab-10.svg", w: 1200, h: 800, name: "Serif trial", cat: "Type study" },
    { src: "assets/img/lab-11.svg", w: 700, h: 1200, name: "Silhouette", cat: "Art direction" },
    { src: "assets/img/lab-12.svg", w: 800, h: 1000, name: "Uptrend", cat: "Data sketch" },
    { src: "assets/img/lab-13.svg", w: 1200, h: 800, name: "Index", cat: "Archive" },
    { src: "assets/img/lab-14.svg", w: 800, h: 1000, name: "Arc II", cat: "Pattern" },
  ],

  /* -------------------------------------------------------------- team */
  team: [
    {
      name: "Ally Amri",
      role: "Founder & Design Director",
      image: "assets/img/portrait-ally.svg", // [TEMP] replace with real portrait
    },
    {
      name: "TEMP — Team member", // [TEMP] replace or remove; layout adapts to one card
      role: "Role TBC",
      image: "assets/img/portrait-temp.svg", // [TEMP]
    },
  ],

  /* ------------------------------------------------------------ footer */
  footer: {
    Work: [
      { label: "Aurel", href: "work.html#aurel", icon: "assets/img/aurel-icon.svg" },
      { label: "Kilowatt", href: "work.html#kilowatt", icon: "assets/img/kilowatt-icon.svg" },
      { label: "Fieldnote", href: "work.html#fieldnote", icon: "assets/img/fieldnote-icon.svg" },
      { label: "Marlow", href: "work.html#marlow", icon: "assets/img/marlow-icon.svg" },
    ],
    Services: [
      { label: "Brand identity", href: "#contact" },
      { label: "Websites & product design", href: "#contact" },
      { label: "Design systems", href: "#contact" },
      { label: "Art direction & motion", href: "#contact" },
      { label: "Handover & training", href: "#contact" },
    ],
    Capabilities: [
      { label: "Strategy sprints", href: "#contact" },
      { label: "Prototyping in the browser", href: "#contact" },
      { label: "Accessibility reviews", href: "#contact" },
      { label: "Ongoing design support", href: "#contact" },
    ],
    Journal: [
      { label: "Design systems that survive the second year", href: "#journal" },
      { label: "Why we prototype in the browser", href: "#journal" },
      { label: "A smaller studio is a feature", href: "#journal" },
      { label: "About Amri", href: "#studio" },
    ],
  },
};
