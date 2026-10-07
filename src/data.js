export const brand = { name: "FiXiGN" };

export const navLinks = [
  { id: "home", label: "Home", href: "#home" },
  { id: "services", label: "Services", href: "#services" },
  { id: "pricing", label: "Pricing", href: "#pricing" },
  { id: "works", label: "Works", href: "#works" },
  { id: "career", label: "Career", href: "#career" },
  { id: "contact", label: "Contact Us", href: "#contact" },
];

// title = 2 fixed lines (so the layout never shifts)
// image  = put the file in /public/images
export const slides = [
  {
    id: 1,
    kicker: "FIXIGN A GLOBAL LEADER",
    title: ["IN GRAPHIC", "DESIGN"],
    quote:
      "creating seamless digital experiences and innovative branding solutions that elevate businesses and engage audiences worldwide.",
    description:
      "Fixign is a global leader in UX/UI design, creating seamless digital experiences and innovative branding solutions that elevate businesses and engage audiences worldwide.",
    image: "/images/brain.png",
  },
  {
    id: 2,
    kicker: "FIXIGN BOOSTS YOUR",
    title: ["BRAND", "IDENTITY"],
    quote:
      "from logos to full visual systems, we shape brands people remember and trust.",
    description:
      "Our team builds complete brand identities, from logo and color systems to guidelines that keep every touchpoint consistent across channels.",
    image: "/images/brain.png",
  },
  {
    id: 3,
    kicker: "FIXIGN DELIVERS",
    title: ["UX/UI", "PRODUCTS"],
    quote:
      "research-led interfaces that feel simple to use and look great on every screen.",
    description:
      "We design web and mobile products with clear flows, accessible interfaces and developer-ready handoff for every release.",
    image: "/images/brain.png",
  },
];

export const cta = {
  primary: { label: "Our Services", href: "#services" },
  secondary: { label: "See Portfolio", href: "#works" },
};

export const SLIDE_DURATION = 5000; // ms

// Figma frame size. Change these if your frame is not 1920 x 1080.
export const DESIGN_W = 1920;
export const DESIGN_H = 1047; // hero height = Rectangle 70's Y in Figma

/* ===================== SECTION 2 (Services) ===================== */
export const SECTION2_H = 12000; // was 10396

export const about = {
  heading: ["Boost the Growth Development", "Agency Your Branding!"],
  label: "About Us",
  quote: [
    "“creating seamless digital experiences and innovative branding solutions that elevate businesses and engage audiences worldwide.",
    "“creating seamless digital experiences and innovative branding solutions that elevate businesses and engage audiences worldwide.”",
  ],
};

export const services = [
  {
    id: 1,
    title: ["Boosts Marketing &", "Sales"],
    text: "Attractive designs increase engagement, strengthen credibility, and influence buying decisions.",
    image: "/images/service-1.jpg",
  },
  {
    id: 2,
    title: ["Builds Brand Identity"],
    text: "Consistent design (logo, colors, typography) helps establish trust and recognition.",
    image: "/images/service-2.jpg",
  },
  {
    id: 3,
    title: ["Improves", "Communication"],
    text: "Good design conveys messages quickly and effectively, making complex ideas easy to understand.",
    image: "/images/service-3.jpg",
  },
  {
    id: 4,
    title: ["Creates Strong First", "Impressions"],
    text: "Eye-catching visuals make a brand stand out and attract attention instantly.",
    image: "/images/service-4.jpg",
  },
];
export const DEFAULT_ACTIVE_CARD = 3; // 0 = first card ... 3 = fourth (yellow)

export const marqueeText = "Understanding Your Industry";

/* ===================== SECTION 3 (Graphic Design cards) ===================== */
const base = {
  image: "/images/graphic-design.png",
  title: "GRAPHIC DESIGN",
  text: "Design services are built around understanding users, business goals, and the latest design standards to deliver solutions that are intuitive, engaging, and impactful.",
  // first 5 go in column 1, last 5 in column 2
  categories: [
    "Category 01",
    "Category 01",
    "Category 01",
    "Category 01",
    "Category 01",
    "Category 01",
    "Category 01",
    "Category 01",
    "Category 01",
    "Category 01",
  ],
  button: { label: "Start Now", href: "#contact" },
};

// 3 identical cards. Change title / text / image on card 2 and 3 here.
export const graphicCards = [
  { ...base, id: 1 },
  { ...base, id: 2 }, // e.g. { ...base, id: 2, title: "UX/UI DESIGN", image: "/images/ux.png" }
  { ...base, id: 3 },
];

/* ===================== SECTION 4 (Stats grid) ===================== */
// order = top-left, top-right, bottom-left, bottom-right
export const statCards = [
  {
    value: 100,
    suffix: "+",
    label: ["Happy Clients Who Trust", "my work"],
    image: "/images/handshake.png",
    button: { label: "Start New Project", href: "#contact" },
  },
  {
    value: 40,
    suffix: "+",
    label: ["Clients come back for", "a new projects"],
    image: "/images/website-mockups.png",
  },
  {
    value: 4,
    suffix: "+",
    label: [
      "Years of professional",
      "experience in designing",
      "digital products",
    ],
    image: "/images/graphic-design.png",
  },
  {
    value: 90,
    suffix: "+",
    label: ["Successfully", "Completed Projects"],
    image: "/images/robot-ring.png",
    button: { label: "See Works", href: "#works" },
  },
];

// second scrolling text under the grid
export const marquee2 = [
  "Branding Your Industry",
  "Branding Design",
  "Development",
  "Graphic Design",
];

/* ===================== SECTION 5 (Featured Projects) ===================== */
export const featured = {
  title: ["FEATURED", "PROJECTS"],
  text: "Explore a selection of projects blending creativity with practical design",
  button: { label: "See All Works", href: "#works" },
  list: ["Web design", "Development", "Branding Design"],
  image: "/images/project.png",
  caption: "Creative Design template for modern agencies",
};

/* ===================== SECTION 6 (Laptop banner image) ===================== */
export const banner = {
  image: "/images/laptop.png",
};

/* ===================== SECTION 7 (Pricing Plan) ===================== */
const planBase = {
  price: "$2000",
  tag: "For Saas & fast MVP launches",
  name: "Web/Mobile App Design",
  features: [
    "UX Research",
    "Pixel-Perfect Execution",
    "Unlimited Revisions",
    "Developer handoff",
    "Ongoing Support & Updates",
    "Quality Assurance Testing",
    "Responsive across all devices",
  ],
  button: { label: "Start Here", href: "#contact" },
};

export const pricing = {
  title: "Pricing Plan",
  subtitle: "A Strong Commitment to Quality and Growth",
  // 3 identical plans for now. Edit price / name / features per plan here.
  plans: [
    { ...planBase, id: 1 },
    { ...planBase, id: 2 },
    { ...planBase, id: 3 },
  ],
};

/* ===================== SECTION 8 (BrandBreak) ===================== */
export const brandBreak = "FiXiGN";

/* ===================== SECTION 10 (Why Choose US) ===================== */
export const whyUs = {
  kicker: "Why Choose US?",
  heading: ["We Design for the Future to", "Drive Today’s Success"],
  quote:
    "“We’re committed to your satisfaction with unlimited revisions at every step. We deliver exactly as you imagine.”",
  icon: "/images/robot-ring.png",
  // first 2 = wide cards (row 1), last 3 = narrow cards (row 2)
  cards: [
    {
      id: 1,
      title: ["Unlimited Revisions"],
      text: "We’re committed to your satisfaction with unlimited revisions at every step. Our mission is to make your vision come to life exactly as you imagine.",
    },
    {
      id: 2,
      title: ["Lifetime Support"],
      text: "We’re committed to your satisfaction with unlimited revisions at every step. Our mission is to make your vision come to life exactly as you imagine.",
    },
    {
      id: 3,
      title: ["Personalised Plans"],
      text: "We’re committed to your satisfaction with unlimited revisions at every step. Our mission is to make your vision come to life exactly as you imagine.",
    },
    {
      id: 4,
      title: ["Custom Design", "Solutions"],
      text: "Our easy payment options are completely flexible. So, you can invest in your success while staying within your budget.",
    },
    {
      id: 5,
      title: ["24/7 Customer", "Support"],
      text: "Benefit from the expertise of our carefully chosen resources that are designed to make your journey smooth and effortless with outstanding results.",
    },
  ],
};

/* ===================== SECTION 11 (Testimonials) ===================== */
const testimonialBase = {
  photo: "/images/client.png",
  text: " Working with this team was a game-changer. Their design and development expertise brought our vision to life, and the results exceeded our expectations. Working with this team was a game-changer. Their design and development expertise brought our vision to life, and the results exceeded our expectations.",
  name: "DJ MARKO",
  role: "CEO & CO FOUNDER",
  name2: "DEXKO PIE",
  role2: "",
};

export const testimonials = {
  kicker: "Testimonials",
  heading: "Our Clients Say’s",
  subtitle:
    "Fixign turned our ideas into a unique project that inspires both us and our Clients.",
  // 3 identical cards for now. Change name / text / photo per card here.
  items: [
    { ...testimonialBase, id: 1 },
    { ...testimonialBase, id: 2 },
    { ...testimonialBase, id: 3 },
  ],
};
