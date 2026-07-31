/* ==========================================================================
   SERVICES — the single most important file on the site.

   This one file drives:
     • the services index page
     • all twelve service detail pages
     • the Services dropdown in the header
     • the mobile menu
     • the checkboxes in the quote form
     • the footer services list
     • the sitemap that Google reads

   TO ADD ANOTHER SERVICE: copy an existing block below, change the fields,
   drop the photos into /public/images/services/, and you are done. No other
   file needs touching.

   COPY STATUS:
     • `includes` lists are taken word for word from the current live site.
     • `intro` paragraphs are DRAFT — rewritten from the current site copy so
       they speak to homeowners and property managers in the same breath.
     • `faqs` are DRAFT. Nothing in them states a price, a timeframe or a
       certification. Review and correct before launch.
   ========================================================================== */

export type ServiceGroup =
  | "grounds" // Grounds & exterior
  | "cleaning" // Cleaning
  | "repairs" // Repairs & projects
  | "property" // Property management
  | "vehicles"; // Vehicles

export type Service = {
  slug: string;
  name: string;
  group: ServiceGroup;
  /** One sentence. Shown on cards and under the page heading. */
  tagline: string;
  /** Two or three sentences at the top of the detail page. */
  intro: string;
  /** The "What's included" checklist. */
  includes: string[];
  /** Which portfolio company does this work. `null` means Cross does it directly. */
  brandId: string | null;
  /** A second company, e.g. The Furies covering Cape Cod. */
  secondaryBrandId?: string;
  /** Two or three other service slugs customers usually book alongside this one. */
  related: string[];
  heroImage: string;
  gallery: string[];
  /** A matched pair for the before/after slider, where good photos exist. */
  beforeAfter?: { before: string; after: string; caption: string };
  faqs: { q: string; a: string }[];
  /** The old Squarespace address, if this service had one. Used to build the redirects in next.config.ts. */
  legacyPath?: string;
};

/** Display names and running order for the five groups. */
export const serviceGroups: { id: ServiceGroup; name: string }[] = [
  { id: "grounds", name: "Grounds & exterior" },
  { id: "cleaning", name: "Cleaning" },
  { id: "repairs", name: "Repairs & projects" },
  { id: "property", name: "Property management" },
  { id: "vehicles", name: "Vehicles" },
];

export const services: Service[] = [
  /* ---------------------------------------------------------------- GROUNDS */
  {
    slug: "landscaping",
    name: "Landscaping",
    group: "grounds",
    tagline: "Year-round grounds care, from spring clean-up to fall leaf removal.",
    intro:
      "The first thing anyone sees when they arrive at your home or your building is the grounds. Our landscape crews handle design, planting, weekly maintenance and seasonal clean-ups, whether it is a single property in Natick or a portfolio of commercial sites, all season long.",
    includes: [
      "Full landscape assessments",
      "Plant recommendations and design",
      "Existing lawn renovations or overseeding",
      "Landscape lighting and design",
      "Year-round maintenance plans: spring clean-ups, bark mulching, weekly lawn maintenance, shrub pruning, fertilization, fall clean-ups and leaf removal",
    ],
    brandId: null,
    related: ["irrigation", "power-washing", "gutter-cleaning"],
    heroImage: "/images/services/landscaping-hero.png",
    gallery: [
      "/images/services/landscaping-1.png",
      "/images/services/landscaping-2.jpg",
      "/images/services/landscaping-3.jpg",
    ],
    beforeAfter: {
      before: "/images/services/landscaping-before.jpg",
      after: "/images/services/landscaping-after.jpg",
      caption: "A front bed rebuilt and replanted.",
    },
    faqs: [
      {
        q: "Do you take on weekly maintenance as well as one-off projects?",
        a: "Both. Some clients have us on a year-round maintenance plan covering spring clean-up through leaf removal. Others bring us in for a single project such as a bed redesign or a lighting install. Tell us which you want and we will price it that way.",
      },
      {
        q: "Do you renovate an existing lawn or only plant new beds?",
        a: "Both. Lawn renovations and overseeding are a regular part of the work, alongside new plant beds and landscape lighting design.",
      },
      {
        q: "Do you work on commercial properties?",
        a: "We do. Cross maintains the grounds at many commercial buildings.",
      },
    ],
    legacyPath: "/landscaping-copy",
  },
  {
    slug: "irrigation",
    name: "Irrigation",
    group: "grounds",
    tagline: "Sprinkler systems designed, installed, repaired and winterized.",
    intro:
      "A lawn is only as good as the water it gets. Our irrigation technicians design, install, repair and winterize automated sprinkler systems for homes and commercial properties, and we regularly take over systems we did not originally install.",
    includes: [
      "Full design services for new automated sprinkler systems",
      "Installation of new irrigation systems",
      "Redesign or adjustments to existing systems",
      "Annual irrigation maintenance programs",
      "General repairs to existing systems",
    ],
    brandId: null,
    related: ["landscaping", "power-washing", "property-management"],
    heroImage: "/images/services/irrigation-hero.jpg",
    gallery: [
      "/images/services/irrigation-1.jpg",
      "/images/services/irrigation-2.jpg",
      "/images/services/irrigation-3.jpg",
    ],
    faqs: [
      {
        q: "Can you repair an irrigation system you did not install?",
        a: "Yes. We regularly take over existing systems, walk the zones with you, and either repair what is there or redesign the parts that are not doing their job.",
      },
      {
        q: "Do you handle spring start-up and fall winterizing?",
        a: "Yes, and most clients put it on an annual maintenance program so it happens without them having to remember to call.",
      },
      {
        q: "Do you install brand-new systems as well as repair old ones?",
        a: "Both. We design and install new automated sprinkler systems from scratch, and redesign or adjust existing ones that are not covering the yard properly.",
      },
      {
        q: "Do you work on commercial properties?",
        a: "We do. Cross maintains irrigation at commercial buildings across the Natick and Needham business parks alongside our residential accounts.",
      },
    ],
  },
  {
    slug: "power-washing",
    name: "Power Washing",
    group: "grounds",
    tagline: "Siding, decks, patios and walkways brought back without the damage.",
    intro:
      "New England weather is not just hard on us, it is hard on our buildings too. Our crews power wash siding, roofs, decks, patios, walkways and courts using environmentally safe products that are gentle on children, pets and planting beds. It is the fastest way to make a house or a commercial building look cared for again.",
    includes: [
      "House siding",
      "Bluestone patio and wood deck",
      "Roof shingles",
      "Walkways and pavement",
      "Outdoor furniture",
      "Tennis and basketball courts",
      "Stonewalls",
      "Awnings",
    ],
    brandId: "new-view",
    related: ["window-washing", "gutter-cleaning", "landscaping"],
    heroImage: "/images/services/power-washing-hero.jpg",
    gallery: [
      "/images/services/power-washing-1.jpg",
      "/images/services/power-washing-2.jpg",
      "/images/services/power-washing-3.jpg",
    ],
    beforeAfter: {
      before: "/images/services/power-washing-before.jpg",
      after: "/images/services/power-washing-after.jpg",
      caption: "Vinyl siding, one pass.",
    },
    faqs: [
      {
        q: "Will the pressure damage my siding or my plants?",
        a: "No. We match the pressure and the cleaning solution to the surface, and the products we use are environmentally safe around children, pets and landscaping.",
      },
      {
        q: "Can you clean moss and staining off a roof?",
        a: "Yes. Roof shingles are one of the surfaces we treat, using a low-pressure approach so the shingles are not stripped.",
      },
      {
        q: "Do I need to be home?",
        a: "Not usually. Exterior work only needs access to an outside water spigot, so most clients leave us to it and come home to a finished job.",
      },
      {
        q: "Can you do a whole commercial building or a parking area?",
        a: "Yes. Walkways, pavement, entryways and full building exteriors are all regular work for our New-View crews.",
      },
    ],
    legacyPath: "/power-washing",
  },
  {
    slug: "window-washing",
    name: "Window Washing",
    group: "grounds",
    tagline: "Spot and streak free glass, inside and out.",
    intro:
      "Glass breaks down over time as dirt builds up on the surface. Our service technicians clean interior and exterior glass, storm windows, screens and sills, and get the light back into a room. We do the same work for office buildings and retail storefronts, where clean glass is the first thing a customer sees.",
    includes: [
      "Interior and exterior washing",
      "Storm window washing",
      "Chandelier and outdoor light cleaning",
      "Screens and sills wiped down",
      "Office buildings and retail storefronts",
    ],
    brandId: "new-view",
    related: ["power-washing", "gutter-cleaning", "residential-cleaning"],
    heroImage: "/images/services/window-washing-hero.jpg",
    gallery: [
      "/images/services/window-washing-1.jpg",
      "/images/services/window-washing-2.jpg",
      "/images/services/window-washing-3.jpg",
    ],
    faqs: [
      {
        q: "Do you clean screens and sills too, or just the glass?",
        a: "Screens and sills are wiped down as part of the service. So are storm windows.",
      },
      {
        q: "How often should windows be washed?",
        a: "Most homeowners in MetroWest have us out once or twice a year. Storefronts and offices usually want a more frequent schedule because the glass is at the entrance.",
      },
      {
        q: "Can you reach high or awkward windows?",
        a: "Yes. Our technicians are set up for multi-storey homes and commercial glass, including outdoor light fixtures and chandeliers.",
      },
      {
        q: "Can window washing be booked with power washing on the same visit?",
        a: "Yes, and most people do. Both are handled by our New-View division, so it is one crew, one visit and one bill.",
      },
    ],
    legacyPath: "/window-washing",
  },
  {
    slug: "gutter-cleaning",
    name: "Gutter Cleaning",
    group: "grounds",
    tagline: "Clear gutters and downspouts, without you going up a ladder.",
    intro:
      "Keeping gutters and downspouts clear is the cheapest water damage insurance there is, and it is the job most likely to end with someone on a ladder they should not be on. We clear gutters and drains, flush the downspouts, and repair and caulk the runs that have started to leak, on houses and on commercial buildings.",
    includes: [
      "Annual or bi-annual gutter cleaning, spring and fall",
      "Downspout and drain clearing",
      "Gutter repair and caulking",
    ],
    brandId: "new-view",
    related: ["power-washing", "window-washing", "painting-handyman"],
    heroImage: "/images/services/gutter-cleaning-hero.jpg",
    gallery: [
      "/images/services/gutter-cleaning-1.jpg",
      "/images/services/gutter-cleaning-2.jpg",
    ],
    faqs: [
      {
        q: "How often do gutters need clearing?",
        a: "Twice a year suits most properties in this area, in spring and again in fall once the leaves are down. Properties under heavy tree cover often want the fall visit split into two.",
      },
      {
        q: "Do you fix gutters as well as clean them?",
        a: "Yes. Repair and caulking are part of the service, so if we find a leaking seam or a loose section while we are up there we can deal with it.",
      },
      {
        q: "Do you clear the downspouts and underground drains?",
        a: "Downspout and drain clearing is included. A clean gutter feeding a blocked downspout does not help anyone.",
      },
      {
        q: "Can you put this on a standing schedule?",
        a: "Yes. Most clients set it as an annual or bi-annual visit so it happens without a phone call.",
      },
    ],
    legacyPath: "/gutter-cleaning",
  },

  /* --------------------------------------------------------------- CLEANING */
  {
    slug: "residential-cleaning",
    name: "Residential Cleaning",
    group: "cleaning",
    tagline: "Regular house cleaning, plus spring, move-out and post-construction.",
    intro:
      "With the never ending list of daily tasks in our lives, it is hard to keep up with a clean home. We offer regular weekly or bi-weekly visits from our residential house cleaners, and one-time cleans for spring, a move, a special event or the end of a construction project. Our cleaners bring their own supplies, and the same team handles apartment turnovers for property managers.",
    includes: [
      "Flexible weekly or bi-weekly cleaning schedules",
      "One-time cleanings: spring cleaning, moving, post-construction or a special event",
      "Office and janitorial cleanings, nights or early mornings",
      "Cleaning supplies provided",
    ],
    brandId: null,
    secondaryBrandId: "the-furies",
    related: ["window-washing", "junk-removal", "janitorial-cleaning"],
    heroImage: "/images/services/residential-cleaning-hero.jpg",
    gallery: [
      "/images/services/residential-cleaning-1.jpg",
      "/images/services/residential-cleaning-2.jpg",
    ],
    faqs: [
      {
        q: "Do I need to supply cleaning products?",
        a: "No. Our cleaners bring their own supplies. If you would rather we used a specific product in your home, tell us and we will.",
      },
      {
        q: "Is it the same cleaner every visit?",
        a: "We keep clients with the same team wherever we can, because knowing a house makes the work better. Grace Silva heads up house cleaning and manages the schedules.",
      },
      {
        q: "Can you do a one-off clean rather than a schedule?",
        a: "Yes. Spring cleans, move-out cleans, post-construction cleans and cleans before or after an event are all regular work for us.",
      },
      {
        q: "Do you clean on Cape Cod?",
        a: "On the Cape, residential cleaning is handled by our sister company The Furies. Same standard, and we will introduce you.",
      },
    ],
    legacyPath: "/residential-cleaning",
  },
  {
    slug: "janitorial-cleaning",
    name: "Janitorial Cleaning",
    group: "cleaning",
    tagline: "Nightly commercial cleaning with one person to call.",
    intro:
      "With the never ending list of daily tasks, it is hard to keep up with a clean work space. Our commercial cleaning business offers convenient nightly visits from professionally trained cleaning staff, on a schedule built around your building rather than ours. Every account gets a named relationship manager, so when something needs changing you are not filing a ticket into the dark.",
    includes: [
      "Flexible cleaning schedules, nights or early mornings",
      "Consistent, timely and thorough service",
      "Responsive office staff and a relationship manager",
      "Customized cleaning proposals",
      "Cleaning supplies provided or on demand",
    ],
    brandId: null,
    related: ["property-management", "window-washing", "junk-removal"],
    heroImage: "/images/services/janitorial-cleaning-hero.jpg",
    gallery: [
      "/images/services/janitorial-cleaning-1.jpg",
      "/images/services/janitorial-cleaning-2.jpg",
    ],
    faqs: [
      {
        q: "Can you clean outside our business hours?",
        a: "Yes. Nights and early mornings are how most of our commercial accounts run, so the building is ready before anyone arrives.",
      },
      {
        q: "Who do we call if something is missed?",
        a: "Every account has a relationship manager and a responsive office behind them. You call one number and it gets sorted.",
      },
      {
        q: "Do you provide the supplies and consumables?",
        a: "We can provide supplies as part of the contract, or restock on demand if you would rather buy your own. We will set it up whichever way suits your budget.",
      },
      {
        q: "Can you cover more than the cleaning?",
        a: "Yes, and most of our commercial clients do exactly that. Janitorial usually sits alongside window washing, grounds care and handyman work under one point of contact.",
      },
    ],
    legacyPath: "/janitorial-cleaning",
  },

  /* ---------------------------------------------------------------- REPAIRS */
  {
    slug: "painting-handyman",
    name: "Painting & Handyman",
    group: "repairs",
    tagline: "The lingering to-do list, finally done.",
    intro:
      "Are there projects lingering in the back of your mind? The air filters that need changing, the light bulbs in the cathedral ceiling, the room that has needed repainting for two years. Our carpenters and painters take on full interior and exterior painting for homes and commercial spaces, and handyman work by the hour or by the project, so the whole list goes at once.",
    includes: [
      "Full painting services for residential or commercial projects",
      "Painting by the hour or by the project",
      "Handyman services — everything on the to-do list",
      "Christmas and holiday decorations",
    ],
    brandId: null,
    related: ["gutter-cleaning", "junk-removal", "audio-video"],
    heroImage: "/images/services/painting-handyman-hero.jpg",
    gallery: [
      "/images/services/painting-handyman-1.jpg",
      "/images/services/painting-handyman-2.jpg",
    ],
    faqs: [
      {
        q: "Is there a minimum size of job?",
        a: "No. We work by the hour as well as by the project, which is how the small jobs nobody else will come out for actually get done.",
      },
      {
        q: "Do you paint exteriors as well as interiors?",
        a: "Both, for homes and for commercial spaces. If the exterior needs washing first, our power washing crew handles that on the same job.",
      },
      {
        q: "Can you hang holiday decorations?",
        a: "Yes. Christmas and holiday decorating is a service we run every season, including the parts that involve a ladder.",
      },
      {
        q: "Can I hand over a whole list at once?",
        a: "Please do. That is the point of the company. One visit, one crew, one invoice, list gone.",
      },
    ],
    legacyPath: "/painting-handyman",
  },
  {
    slug: "junk-removal",
    name: "Junk Removal",
    group: "repairs",
    tagline: "We sort it, lift it, load it and take it away.",
    intro:
      "At Cross Junk Removal we handle everything from sorting and lifting to loading and disposal, so the only thing you have to do is point. Furniture, appliances, construction debris, an old hot tub or a full estate clear-out — it goes in one visit. We clear garages, attics, basements, storage units, offices and yards for homeowners, realtors and property managers alike.",
    includes: [
      "Furniture, appliances and mattresses",
      "Swing sets, sheds, fences and decks",
      "Construction debris and scrap metal",
      "Yard waste",
      "Office furniture",
      "Hot tubs",
      "Carpet removal",
      "Garage, attic and basement cleanouts",
      "Estate and storage unit cleanouts",
      "Office and yard cleanouts",
    ],
    brandId: null,
    related: ["residential-cleaning", "painting-handyman", "property-management"],
    heroImage: "/images/services/junk-removal-hero.jpg",
    gallery: [
      "/images/services/junk-removal-1.jpg",
      "/images/services/junk-removal-2.jpg",
    ],
    faqs: [
      {
        q: "Do I have to move anything to the curb?",
        a: "No. Our team does the sorting, lifting, loading and disposal. It can stay exactly where it is until we get there.",
      },
      {
        q: "Will you take a hot tub, a shed or a deck?",
        a: "Yes. Hot tubs, sheds, swing sets, fences and decks are all things we dismantle and remove.",
      },
      {
        q: "Can you handle a full estate or an apartment turnover?",
        a: "Yes. Estate cleanouts and turnovers are regular work, and we can follow the removal with a full clean so the space is ready to list.",
      },
      {
        q: "What happens to everything you take?",
        a: "It is sorted and disposed of properly. Scrap metal and yard waste go where they should rather than straight into a hole.",
      },
    ],
    legacyPath: "/junk-removal",
  },
  {
    slug: "audio-video",
    name: "Audio & Video",
    group: "repairs",
    tagline: "Screens, sound, cameras and networks that hold up.",
    intro:
      "Do not let outdated technology or security gaps disrupt your home or your business. Our technology division installs and supports audio and video systems, network cameras, data networking, hosted phone systems and video conferencing. For a homeowner that means the TV and the wifi finally behave. For a facility manager it means the cameras, the phones and the conference rooms are one vendor's problem instead of four.",
    includes: [
      "Audio and video systems",
      "Network cameras",
      "Data networking",
      "Tech consulting",
      "Hosted phone systems",
      "Video conference solutions",
    ],
    brandId: null,
    related: ["painting-handyman", "property-management", "residential-cleaning"],
    heroImage: "/images/services/audio-video-hero.jpg",
    gallery: ["/images/services/audio-video-1.jpg", "/images/services/audio-video-2.jpg"],
    faqs: [
      {
        q: "Do you work on existing systems or only new installs?",
        a: "Both. A lot of our work is taking over equipment somebody else installed, working out what is actually wrong, and making it reliable.",
      },
      {
        q: "Can you install security cameras at a commercial building?",
        a: "Yes. Network cameras and the data networking behind them are a core part of what this division does.",
      },
      {
        q: "Do you handle phones and conference rooms?",
        a: "Yes. Hosted phone systems and video conference setups are both on the list, including the cabling.",
      },
      {
        q: "Can you advise before we buy anything?",
        a: "Tech consulting is a service on its own. We would rather help you spec it properly than install the wrong thing well.",
      },
    ],
    legacyPath: "/new-page-2",
  },

  /* --------------------------------------------------------------- PROPERTY */
  {
    slug: "property-management",
    name: "Property Management",
    group: "property",
    tagline: "One point of contact for the whole property, all year.",
    intro:
      "Have peace of mind knowing that your property is being cared for when you cannot be there and that all of its needs are being met. We handle routine maintenance and preventative care, run large and small projects, and stay reachable for emergencies around the clock, for a low monthly fee. It works the same way for a second home you visit twice a year and for a commercial building with tenants in it.",
    includes: [
      "Routine maintenance",
      "Preventative care",
      "Management of large or small projects",
      "24/7 emergency contact",
      "Low monthly fee",
    ],
    brandId: null,
    related: ["janitorial-cleaning", "landscaping", "painting-handyman"],
    heroImage: "/images/services/property-management-hero.jpg",
    gallery: [
      "/images/services/property-management-1.jpg",
      "/images/services/property-management-2.jpg",
    ],
    faqs: [
      {
        q: "What does routine maintenance actually cover?",
        a: "We build the schedule around the property: seasonal systems, filters, gutters, grounds, the checks that stop a small thing becoming a claim. You approve the plan before it starts.",
      },
      {
        q: "Who do I call in an emergency?",
        a: "Us, at any hour. A 24/7 emergency contact is part of the arrangement, and because our own crews cover cleaning, grounds, carpentry and tech, the response usually does not need a third party.",
      },
      {
        q: "Do you manage second homes and vacant properties?",
        a: "Yes. Keeping an eye on a property while the owner is away is one of the most common reasons people start with us.",
      },
      {
        q: "Do you manage commercial buildings?",
        a: "We do, including buildings Cross owns and operates in the Natick and Needham business parks.",
      },
    ],
    legacyPath: "/property-management",
  },

  /* --------------------------------------------------------------- VEHICLES */
  {
    slug: "car-detailing",
    name: "Car Detailing",
    group: "vehicles",
    tagline: "Hand detailing, with free pick-up and delivery nearby.",
    intro:
      "Keep your car, truck or van looking and feeling new. Your vehicle is an investment, so it should be treated like one. Classic Shine was the first Cross business, founded in 1989, and it still does full details, interior or exterior only, hand washes, mobile detailing at your home or office, and seasonal car storage — with free pick-up and delivery within five miles.",
    includes: [
      "Full detail",
      "Exterior or interior detail only",
      "Hand wash",
      "Free pick-up and delivery within 5 miles",
      "Mobile detailing",
      "Car storage",
    ],
    brandId: "classic-shine",
    related: ["residential-cleaning", "power-washing", "property-management"],
    heroImage: "/images/services/car-detailing-hero.jpg",
    gallery: [
      "/images/services/car-detailing-1.jpg",
      "/images/services/car-detailing-2.jpg",
    ],
    beforeAfter: {
      before: "/images/services/car-detailing-before.jpg",
      after: "/images/services/car-detailing-after.jpg",
      caption: "Interior detail, front to back.",
    },
    faqs: [
      {
        q: "Do you come to me?",
        a: "We can. Mobile detailing brings the work to your driveway or your office car park, and within five miles pick-up and delivery is free.",
      },
      {
        q: "Can I book interior only?",
        a: "Yes. Full detail, exterior only, interior only or a hand wash — you pick.",
      },
      {
        q: "Do you store cars over the winter?",
        a: "Yes, car storage is one of the services Classic Shine offers. Call us for availability.",
      },
      {
        q: "Do you look after company vehicles?",
        a: "Yes. Fleets, vans and company cars are regular work, and we can set up a repeating schedule so they stay presentable.",
      },
    ],
    legacyPath: "/car-detailing",
  },
];

/* --------------------------------------------------------------------------
   Helpers used by the pages. You should not need to edit anything below here.
   -------------------------------------------------------------------------- */

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesInGroup(group: ServiceGroup): Service[] {
  return services.filter((s) => s.group === group);
}

/** Services bucketed into the five groups, in the order set above. */
export function servicesByGroup(): {
  id: ServiceGroup;
  name: string;
  services: Service[];
}[] {
  return serviceGroups.map((g) => ({ ...g, services: getServicesInGroup(g.id) }));
}

export function getRelatedServices(service: Service): Service[] {
  return service.related
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));
}

export const serviceSlugs = services.map((s) => s.slug);
