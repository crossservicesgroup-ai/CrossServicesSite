/* ==========================================================================
   LEADERSHIP TEAM — shown on the About page.

   A person with no bio and no photo still renders correctly: they get their
   initials in a circle and just a name and title. Never put a company logo
   in a headshot slot.

   To add a headshot: drop the file into /public/images/team/ and set `photo`
   to its path, e.g. "/images/team/megan-griffith.jpg".
   ========================================================================== */

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  /** Path to the headshot, or null if we do not have one yet. */
  photo: string | null;
  /** Full bio, or null. A missing bio simply hides the "Read bio" control. */
  bio: string | null;
};

export const team: TeamMember[] = [
  {
    id: "warren-cross-jr",
    name: "Warren Cross Jr.",
    title: "President and CEO",
    photo: "/images/team/warren-cross-jr.png",
    bio: "Warren founded Cross Services Group in 1989, after graduating college, and serves as the President & CEO of the company. A classic serial entrepreneur, Warren loves the challenge of starting or acquiring businesses that have complimentary features.\n\nIn 2007, Warren developed Cross Courts Squash and Fitness Center. Cross Courts now boasts one of the most active Junior Programs in the country with over 175 juniors. Cross Courts also has a very active adult program. The Club has (4) International Squash Courts, (4) Squash Professionals, Fitness facilities, Yoga/Stretch Studio, Lounge area and well appointed Locker Rooms.\n\nBesides his service businesses, Warren is the owner of six commercial buildings, totaling approximately 130,000 square feet, in various Natick Business Parks and Needham.\n\nWarren graduated from Belmont Hill School, University of Richmond and received his Executive MBA from Northeastern University. Warren lives in South Natick with his wife and three children. He and his wife also have three beautiful granddaughters.\n\nWarren is a Trustee at Tenacre Country Day School, where he is the Treasurer and Chairs the Finance Committee, a Trustee at Belmont Hill School, where he sits on the Facility Committee and Audit Committee, a Trustee at Babson College, where he is Co-Vice Chair of The Board and is Chair of the Facilities Committee. He has recently joined the Board of Advisors at Newton-Wellesley Hospital. Warren is a former Trustee at Dana Hall School and at Lynchburg College in Virginia.\n\nWarren enjoys spending time with his family, playing paddle tennis, tennis and working out. He also loves spending time at his homes in Jackson, NH and Osterville, MA.",
  },
  {
    id: "warren-cross-iii",
    name: "Warren Cross III",
    title: "Vice President",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
  },
  {
    id: "chris-mastrodicasa",
    name: "Chris Mastrodicasa",
    title: "Chief Financial Officer",
    photo: null, // [NEEDS INPUT] headshot
    bio: "Chris joined Cross Services Group in October 2022 with a degree in Accounting and Finance from Babson College. He began his career in a first-generation family manufacturing business and became its president within four years, going on to reinvent its operations over 35 years before the business was sold. He then helped another family-operated company through an administrative and financial restructuring as it grew into a multimillion-dollar national organization. A problem solver with a critical thinker's mindset, Chris puts a high value on contributing to the growth and success of the people around him.",
  },
  {
    id: "chip-tarbell",
    name: "Chip Tarbell",
    title: "Vice President of Operations",
    photo: null, // [NEEDS INPUT] headshot
    bio: "Chip joined Cross Services Group in July 2018 and oversees day-to-day operations. He graduated from St. Lawrence University in 1981 with a BA in Economics, lettering in both football and track. His career has included Haynes Management's landscape division and D.M. Bernardi contracting, followed by twelve years as Director of Facilities at Belmont Hill School, where he also coached football and wrestling. Chip lives in Wakefield with his wife and has two adult children and a grandchild. He is an avid New England sports fan and spends as much time as he can in Rockport, MA.",
  },
  {
    id: "campbell-armstrong",
    name: "Campbell Armstrong",
    title: "Business Development and Real Estate Manager",
    photo: null, // [NEEDS INPUT] headshot
    bio: "Campbell joined Cross Services Group in July 2015, having grown up in Malvern, Pennsylvania. He manages the New-View division, covering window cleaning, power washing and gutter cleaning, and oversees the Cross Courts fitness center. As one of the company's longer-tenured managers he works across every division, and he holds a real estate license, helping clients buy and sell property. Before Cross he was an analyst in Investment Manager Services at SEI Investments and a marketing intern at Scala Inc. He earned a BA from Lynchburg College, where he captained the men's lacrosse team. Campbell golfs, skis and plays guitar, and lives with his wife and four children.",
  },
  {
    id: "megan-griffith",
    name: "Megan Griffith",
    title: "Customer Development Manager",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
  },
  {
    id: "giulia-palizzolo",
    name: "Giulia Palizzolo",
    title: "Operations Associate",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
  },
  {
    id: "grace-silva",
    name: "Grace Silva",
    title: "Head of House Cleaning",
    photo: null, // [NEEDS INPUT] headshot
    bio: "Grace joined Cross Services Group in January 2020 and manages residential house cleaning. Originally from São Paulo, Brazil, she holds degrees in Tech Tourism and Hospitality from College Progresso, Administration and Marketing from University Torricelli, and Financial Management from College Eniac, along with an MBA in Coaching for People Management from Unopar. She previously led teams on political campaigns and served as a Director at the Sports Secretariat in Guarulhos, Brazil. After relocating to the United States in 2018 she established a cleaning business and obtained a professional house cleaning license from ARCSI in 2022. Grace loves working with all types of people, and enjoys traveling and spending time with her husband.",
  },
  {
    id: "joe-slavik",
    name: "Joe Slavik",
    title: "Operations Analyst",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
  },
  {
    id: "brian-rothwell",
    name: "Brian Rothwell",
    title: "Technology",
    photo: null, // [NEEDS INPUT] headshot
    bio: null, // [NEEDS INPUT] bio
  },
];

/** "Warren Cross Jr." -> "WC". Used for the initials circle. */
export function initialsOf(name: string): string {
  const parts = name
    .replace(/\b(Jr\.?|Sr\.?|II|III|IV)\b/gi, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
