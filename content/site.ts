/* ==========================================================================
   SITE DETAILS
   Phone number, address, hours, social links, service area.
   Change something here and it updates in the header, footer, contact page,
   quote form, and the search-engine data all at once.
   ========================================================================== */

export const site = {
  /** Legal name — used in the copyright line and search-engine data. */
  legalName: "Cross Services Group, Inc.",
  /** Short name used in headings and page titles. */
  name: "Cross Services Group",
  tagline: "Cross it off your list.",
  foundedYear: 1989,

  /** Live domain. Update this if the site ever moves. */
  url: "https://www.crossservicesgroup.com",

  phone: {
    /** Digits only — this is what the phone actually dials. */
    raw: "5086521910",
    /** How the number is shown on screen. */
    display: "508-652-1910",
    /** Ready-made link for tap-to-call. Do not edit. */
    href: "tel:+15086521910",
  },

  email: "CSG@CrossServicesGroup.com",

  address: {
    street: "19 Tech Circle",
    city: "Natick",
    state: "MA",
    zip: "01760",
    /** One-line version used in the footer. */
    full: "19 Tech Circle, Natick, MA 01760",
    /** Opens the address in the visitor's maps app. */
    mapsUrl: "https://maps.google.com/?q=19+Tech+Circle,+Natick,+MA+01760",
    /** Embedded map shown on the contact page. */
    mapEmbedUrl:
      "https://maps.google.com/maps?q=19%20Tech%20Circle%2C%20Natick%2C%20MA%2001760&t=&z=15&ie=UTF8&iwloc=&output=embed",
    /** Approximate coordinates, used by search engines. */
    latitude: 42.2951,
    longitude: -71.3618,
  },

  hoursArePlaceholder: false,
  hours: [
    { days: "Monday – Friday", opens: "08:30", closes: "17:00", display: "8:30am – 5:00pm" },
    { days: "Saturday", opens: null, closes: null, display: "Closed" },
    { days: "Sunday", opens: null, closes: null, display: "Closed" },
  ],

  clubHoursArePlaceholder: false,
  clubHours: [
    { days: "Monday – Sunday", opens: "06:00", closes: "22:00", display: "6:00am – 10:00pm" },
  ],

  social: {
    instagram: "https://www.instagram.com/crossservicesgroup/",
    linkedin: "https://www.linkedin.com/company/cross-services-group-inc/",
    facebook: "https://www.facebook.com/people/Cross-Services-Group/61572752550872/",
  },

  /** Cross Courts membership + court booking portal. */
  courtReserveUrl: "https://app.courtreserve.com/Online/Portal/Index/13265",

  /** Where the "read our reviews" link points. */
  googleReviewsUrl:
    "https://www.google.com/search?q=Cross+Services+Group+Natick+MA#lrd=0x0:0x0,1",

  /** Towns we serve. Shown as plain text on the site, which helps local search. */
  serviceAreaTowns: [
    "Natick",
    "Wellesley",
    "Weston",
    "Needham",
    "Newton",
    "Dover",
    "Sherborn",
  ],
  serviceAreaLabel: "MetroWest Boston",

  /* ------------------------------------------------------------------------
     The Cross Guarantee — copied word for word from the current site.
     Do not reword this.
     ------------------------------------------------------------------------ */
  guarantee: {
    quote:
      "If you are not completely satisfied with the service we provide, then we will do it again, free of charge. No Questions Asked.",
    attribution: "Warren Cross Jr.",
    attributionTitle: "President and CEO",
  },

  /* ------------------------------------------------------------------------
     Commercial credibility numbers.
     [NEEDS INPUT] Confirm the square footage and building count before this
     goes live. Taken from Warren's bio on the current site.
     ------------------------------------------------------------------------ */
  commercial: {
    squareFeet: "130,000",
    buildingCount: "6",
    parks: "Natick and Needham business parks",
    needsConfirmation: true,
  },
} as const;

export type Site = typeof site;
