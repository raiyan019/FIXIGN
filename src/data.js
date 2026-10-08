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
export const SECTION2_H = 14340; // was 13690

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

/* ===================== SECTION 13 (FAQ) ===================== */
const faqAnswer1 =
  "Starting your project is easy—simply contact us via our website or email. We’ll discuss your goals, gather project details, and create a tailored plan to bring your vision to life.";
const faqAnswer2 =
  "Project costs vary depending on complexity, scope, and features. After understanding your requirements, we provide a transparent estimate that aligns with your budget and project needs.";
const faqAnswer3 =
  "Fixign stands out by blending creativity, strategy, and user research to craft designs that truly work. We don’t just design interfaces—we create meaningful experiences that connect with users and drive business results.";

const faqAnswer4 =
  "The timeline depends on the project’s size and complexity. Smaller projects, like landing pages, may take 2–3 weeks, while full apps or platforms can take several months. We always provide a clear timeline before starting.";
const faqAnswer5 =
  "Fixign specializes in website design, mobile app design, dashboards, product design, and wireframes & prototypes. We focus on creating user-friendly, visually engaging solutions that balance creativity with functionality.";

const faqAnswer6 =
  "We maintain quality across time zones by using clear communication, modern project management tools, and flexible collaboration schedules. Our workflow ensures smooth progress and consistent results, no matter where you are.";

export const faq = {
  heading: "Curious About",
  accent: "Fixign?",
  heading2: "Find Your Answers Here!",
  subtitle: [
    "Everything you need to know about our services, process, and",
    "how we bring your ideas to life.",
  ],
  // answers 1 and 2 are repeated on the other questions for now. Edit each "a" later.
  items: [
    { q: "How do I begin working with Fixign?", a: faqAnswer1 },
    { q: "What is the typical cost of a UI/UX design project?", a: faqAnswer2 },
    {
      q: "What sets Fixign apart from other UI/UX design agencies?",
      a: faqAnswer3,
    },
    { q: "How long does a typical design project take?", a: faqAnswer4 },
    { q: "What are Fixign’s main areas of expertise in UI/UX?", a: faqAnswer5 },
    {
      q: "How do you maintain quality when working across different time zones?",
      a: faqAnswer6,
    },
  ],
};
export const FAQ_DEFAULT_OPEN = -1; // -1 = all closed, 0 = first question open

/* ===================== SECTION 14 (Join Us) ===================== */
export const join = {
  kicker: "Join Us",
  person: {
    photo: "/images/sarah.png",
    name: "Sarah Johnson",
    role: "CEO & Founder",
    text: "We put your ideas and thus your wishes in the form of a unique web project that inspires.”“We put your ideas and thus your wishes in the form of a unique web project that inspires.",
    phoneLabel: "Phone:",
    phone: "+012 345 678 90",
    emailLabel: "Email:",
    email: "admin@example.com",
    followLabel: "Follow Me:",
    // the 4 boxes (empty in the design). Add real links here.
    socials: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "X", href: "#" },
      { label: "LinkedIn", href: "#" },
    ],
  },
  form: {
    fields: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "tel" },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "title", label: "Project Title", type: "text" },
      { name: "message", label: "Message (Project Details)", type: "textarea" },
    ],
    send: "Send Message",
    sending: "Sending...",
    sent: "Message Sent",
    work: {
      label: "Work With Us",
      href: "mailto:admin@example.com?subject=Work%20with%20Fixign",
    },
  },
};

/* ===================== Join Us pop-up messages ===================== */
export const joinToast = {
  duration: 4500, // ms before it closes by itself
  success: {
    type: "success",
    title: "Message sent successfully!",
    text: "Thanks for reaching out. We'll get back to you soon.",
  },
  error: {
    type: "error",
    title: "Please check the form",
    text: "Fill in the required fields with a valid email.",
  },
};

/* ===================== FOOTER ===================== */
export const footer = {
  about: [
    "From UX design to full-scale development, Fixign builds",
    "meaningful digital products and brand identities that",
    "inspire confidence and create lasting impact.",
  ],
  services: {
    title: "Services",
    links: [
      { label: "UX/UI Design", href: "#services" },
      { label: "Web Design", href: "#services" },
      { label: "Graphic Design", href: "#services" },
      { label: "Mobile App Design", href: "#services" },
      { label: "Web App Development", href: "#services" },
      { label: "Branding Design", href: "#services" },
    ],
  },
  quick: {
    title: "Quick links",
    links: [
      { label: "Contact Us", href: "#contact" },
      { label: "About Us", href: "#services" },
      { label: "Pricing", href: "#pricing" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Condition", href: "#" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  contact: {
    title: "CONTACT US:",
    phones: ["+8801603474320", "+8801603474320"],
    email: "support@fixign.com",
  },
  follow: {
    title: "FOLLOW US:",
    socials: [
      { id: "facebook", label: "Facebook", href: "#" },
      { id: "instagram", label: "Instagram", href: "#" },
      { id: "linkedin", label: "LinkedIn", href: "#" },
      { id: "x", label: "X", href: "#" },
    ],
  },
  copyright: "©2025. Fixign. All Right Reserved.",
};
