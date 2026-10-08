import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Logo from "./Logo.jsx";
import {
  about,
  services,
  graphicCards,
  statCards,
  marquee2,
  featured,
  banner,
  pricing,
  brandBreak,
  whyUs,
  testimonials,
  faq,
  join,
  joinToast,
  brand,
  footer,
  FAQ_DEFAULT_OPEN,
  marqueeText,
  DEFAULT_ACTIVE_CARD,
  DESIGN_W,
} from "../data.js";

function Star() {
  return (
    <svg className="s2-star" viewBox="0 0 26 26" aria-hidden="true">
      <path
        d="M13 0C14 8 18 12 26 13C18 14 14 18 13 26C12 18 8 14 0 13C8 12 12 8 13 0Z"
        fill="#ffc928"
      />
    </svg>
  );
}

/* BrandBreak: big word. Each letter is its own <tspan> so its outline can light up on its own. */
function BrandBreak({ text, glow = false }) {
  return (
    <svg
      className={`bb ${glow ? "bb--glow" : ""}`}
      viewBox="0 0 1717 357"
      width="1717"
      height="357"
      aria-hidden={glow ? "true" : undefined}
      role={glow ? undefined : "img"}
      aria-label={glow ? undefined : text}
    >
      <text x="0" y="357" textLength="1717" lengthAdjust="spacing">
        {[...text].map((ch, i) => (
          <tspan key={i} style={{ "--k": i }}>
            {ch}
          </tspan>
        ))}
      </text>
    </svg>
  );
}

/* ---- FAQ (Framer Motion) ---- */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

function FaqItem({ index, q, a, open, onToggle }) {
  const id = `faq-panel-${index}`;
  return (
    <motion.div className="fq-item" variants={fadeUp}>
      <button
        className="fq-q"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
      >
        <motion.span
          whileHover={{ x: 6 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          {index + 1}. {q}
        </motion.span>

        {/* the + turns into an x when open */}
        <motion.span
          className="fq-icon"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M8 1v14M1 8h14" stroke="#fff" strokeWidth="1.5" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="fq-a">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Toast({ toast, onClose }) {
  return createPortal(
    <div className="tt-wrap" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className={`tt tt--${toast.type}`}
            role="status"
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <span className="tt-icon" aria-hidden="true">
              {toast.type === "success" ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3.5 9.5l3.6 3.6L14.5 5.5"
                    stroke="#111"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 4v6M9 13.5v.5"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </span>
            <div className="tt-body">
              <strong>{toast.title}</strong>
              <p>{toast.text}</p>
            </div>
            <button className="tt-x" onClick={onClose} aria-label="Close">
              ×
            </button>
            <motion.span
              className="tt-bar"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: toast.duration / 1000, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  );
}

/* ---- JOIN US ---- */
const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="2"
      y="4"
      width="16"
      height="12"
      rx="2"
      stroke="#111"
      strokeWidth="1.5"
    />
    <path
      d="M2.5 5.5l7.5 5.5 7.5-5.5"
      stroke="#111"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

function JoinUs() {
  const { kicker, person, form } = join;
  const empty = Object.fromEntries(form.fields.map((f) => [f.name, ""]));
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [toast, setToast] = useState(null);

  const showToast = (t) =>
    setToast({ ...t, id: Date.now(), duration: joinToast.duration });

  // close by itself
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), toast.duration);
    return () => clearTimeout(t);
  }, [toast]);

  const validate = (v) => {
    const e = {};
    form.fields.forEach((f) => {
      const val = v[f.name].trim();
      if (f.required && !val) e[f.name] = "Required";
      else if (f.type === "email" && val && !/^\S+@\S+\.\S+$/.test(val))
        e[f.name] = "Invalid email";
    });
    return e;
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    if (status === "sent") setStatus("idle");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = validate(values);
    setErrors(er);
    if (Object.values(er).some(Boolean)) {
      showToast(joinToast.error);
      return;
    }
    setStatus("sending");
    // TODO: replace this timer with your real request (fetch to Formspree etc.)
    setTimeout(() => {
      setStatus("sent");
      setValues(empty);
      showToast(joinToast.success);
    }, 900);
  };

  return (
    <div className="jn" id="contact">
      <h2 className="jn-kicker">
        <span className="jn-dot" aria-hidden="true" />
        {kicker}
      </h2>

      {/* left card */}
      <aside className="jn-left">
        <img
          className="jn-photo"
          src={person.photo}
          alt=""
          onError={(e) => (e.currentTarget.style.visibility = "hidden")}
        />
        <h3 className="jn-name">{person.name}</h3>
        <p className="jn-role">{person.role}</p>
        <p className="jn-text">{person.text}</p>
        <p className="jn-line jn-phone">
          <span>{person.phoneLabel}</span> {person.phone}
        </p>
        <p className="jn-line jn-email">
          <span>{person.emailLabel}</span> {person.email}
        </p>
        <span className="jn-follow">{person.followLabel}</span>
        {person.socials.map((s, i) => (
          <a
            key={s.label}
            className="jn-social"
            style={{ "--i": i }}
            href={s.href}
            aria-label={s.label}
          />
        ))}
      </aside>

      {/* right card: form */}
      <form className="jn-form" onSubmit={onSubmit} noValidate>
        {form.fields.map((f) => (
          <div
            key={f.name}
            className={`jn-field ${errors[f.name] ? "jn-field--err" : ""}`}
            data-f={f.name}
          >
            <label htmlFor={`jn-${f.name}`}>
              {f.label}
              {errors[f.name] && (
                <span className="jn-err">{errors[f.name]}</span>
              )}
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={`jn-${f.name}`}
                name={f.name}
                value={values[f.name]}
                onChange={onChange}
              />
            ) : (
              <input
                id={`jn-${f.name}`}
                name={f.name}
                type={f.type}
                value={values[f.name]}
                onChange={onChange}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="jn-btn jn-send"
          disabled={status === "sending"}
        >
          <MailIcon />
          {status === "sending"
            ? form.sending
            : status === "sent"
              ? form.sent
              : form.send}
        </button>

        <a className="jn-btn jn-work" href={form.work.href}>
          <MailIcon />
          {form.work.label}
        </a>

        <span className="jn-sr" role="status">
          {status === "sent" ? form.sent : ""}
        </span>
      </form>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

const TM_PITCH = 960; // card 930 + gap 30. Change together with .tm-card in styles.css
/* ---- sticky stack settings (Figma px) ---- */
const CARD_H = 720; // card height
const GAP = 120; // space between cards before they stack
const OFFSET = 24; // each stacked card sits 24px lower than the previous
const SHRINK = 0.05; // how much a card shrinks when the next one covers it
const DIM = 0.35; // how dark a covered card gets (0 to 1)
const STEP = CARD_H + GAP;
const TRACK_H = graphicCards.length * STEP - GAP;

/* counts up from 0 the first time it scrolls into view */
function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / 1500);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function StatCard({ index, data }) {
  return (
    <article className={`st-card st-${index}`}>
      <img
        className="st-img"
        src={data.image}
        alt=""
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <h3 className="st-num">
        <CountUp to={data.value} suffix={data.suffix} />
      </h3>
      <p className="st-label">
        {data.label.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </p>
      {data.button && (
        <a className="st-btn" href={data.button.href}>
          {data.button.label}
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 10L10 2M4 2h6v6"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </a>
      )}
    </article>
  );
}

/* ---- FOOTER ---- */
const SocialIcon = ({ id }) => {
  switch (id) {
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="#1877f2"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <defs>
            <linearGradient id="fo-ig" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#feda75" />
              <stop offset=".5" stopColor="#d62976" />
              <stop offset="1" stopColor="#4f5bd5" />
            </linearGradient>
          </defs>
          <rect
            x="2.5"
            y="2.5"
            width="19"
            height="19"
            rx="5.5"
            fill="none"
            stroke="url(#fo-ig)"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="4.3"
            fill="none"
            stroke="url(#fo-ig)"
            strokeWidth="2"
          />
          <circle cx="17.6" cy="6.4" r="1.3" fill="url(#fo-ig)" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="#0a66c2"
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            fill="#000"
            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
          />
        </svg>
      );
  }
};

function FooterColumn({ className, data }) {
  return (
    <nav className={`fo-col ${className}`} aria-label={data.title}>
      <h3>{data.title}</h3>
      <ul>
        {data.links.map((l, i) => (
          <li key={i}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="fo">
      {/* same logo as the navbar */}
      <div className="fo-logo">
        <Logo name={brand.name} />
      </div>

      <p className="fo-about">
        {footer.about.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </p>

      <FooterColumn className="fo-services" data={footer.services} />
      <FooterColumn className="fo-quick" data={footer.quick} />

      {/* contact */}
      <h3 className="fo-title fo-title--contact">{footer.contact.title}</h3>
      <span className="fo-ico fo-ico--phone" aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2a6ed6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </span>
      {footer.contact.phones.map((p, i) => (
        <a key={i} className={`fo-line fo-phone-${i}`} href={`tel:${p}`}>
          {p}
        </a>
      ))}
      <span className="fo-ico fo-ico--mail" aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2a6ed6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 6L2 7" />
        </svg>
      </span>
      <a className="fo-line fo-mail" href={`mailto:${footer.contact.email}`}>
        {footer.contact.email}
      </a>

      {/* follow */}
      <h3 className="fo-title fo-title--follow">{footer.follow.title}</h3>
      {footer.follow.socials.map((s, i) => (
        <a
          key={s.id}
          className="fo-social"
          style={{ "--i": i }}
          href={s.href}
          aria-label={s.label}
        >
          <SocialIcon id={s.id} />
        </a>
      ))}

      <span className="fo-rule" aria-hidden="true" />
      <p className="fo-copy">{footer.copyright}</p>
    </footer>
  );
}

export default function Services() {
  const [active, setActive] = useState(DEFAULT_ACTIVE_CARD);
  const [openFaq, setOpenFaq] = useState(FAQ_DEFAULT_OPEN);
  const [project, setProject] = useState(0);
  const current = services[active];

  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const shadeRefs = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const track = trackRef.current;
      if (!track) return;

      const scale = document.documentElement.clientWidth / DESIGN_W;
      const vh = window.innerHeight / scale; // screen height in Figma px
      const sY = -track.getBoundingClientRect().top / scale; // how far we scrolled into the stack
      const n = graphicCards.length;
      const pinBase = Math.max(24, (vh - CARD_H) / 2); // where cards stick (centered)

      // 1) how far each card is pushed down so it "sticks"
      const ty = [];
      for (let i = 0; i < n; i++) {
        const T = i * STEP;
        const pin = pinBase + i * OFFSET;
        const max = TRACK_H - CARD_H + i * OFFSET - T; // release at the end of the stack
        ty[i] = reduce
          ? 0
          : Math.min(Math.max(0, sY - (T - pin)), Math.max(0, max));
      }

      // 2) shrink + darken a card while later cards slide over it
      for (let i = 0; i < n; i++) {
        let cover = 0;
        for (let j = i + 1; j < n; j++) {
          const topJ = j * STEP + ty[j] - sY;
          const pinJ = pinBase + j * OFFSET;
          cover += Math.min(1, Math.max(0, (vh - topJ) / (vh - pinJ)));
        }
        const el = cardRefs.current[i];
        const shade = shadeRefs.current[i];
        if (!el) continue;
        const s = reduce ? 1 : 1 - SHRINK * cover;
        el.style.transform = `translateY(${ty[i]}px) scale(${s})`;
        if (shade) shade.style.opacity = reduce ? 0 : Math.min(1, DIM * cover);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* image behind everything (changes with the active card) */}
      <div className="s2-image">
        <img
          key={current.id}
          src={current.image}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
      {/* heading */}
      <h2 className="s2-heading">
        {about.heading.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h2>
      {/* about us row */}
      <span className="s2-about-label">{about.label}</span>
      <span className="s2-about-line" aria-hidden="true" />
      <div className="s2-about-text">
        {about.quote.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {/* cards */}
      {services.map((card, i) => (
        <div
          key={card.id}
          className={`s2-card ${i === active ? "s2-card--active" : ""}`}
          style={{ "--i": i }}
          data-i={i}
          tabIndex={0}
          role="button"
          aria-pressed={i === active}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
        >
          <h3>
            {card.title.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h3>
          <p>{card.text}</p>
        </div>
      ))}
      {/* scrolling text */}
      <div className="s2-marquee" aria-hidden="true">
        <div className="s2-track">
          {[0, 1, 2, 3].map((n) => (
            <div className="s2-unit" key={n}>
              <Star />
              <span>{marqueeText}</span>
            </div>
          ))}
        </div>
      </div>
      {/* ===== SECTION 3 : sticky stacking cards ===== */}
      <div className="gc-track" ref={trackRef} style={{ height: TRACK_H }}>
        {graphicCards.map((card, i) => (
          <article
            key={card.id}
            className="gc"
            style={{ top: i * STEP, zIndex: i + 1 }}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="gc-image">
              <img
                src={card.image}
                alt=""
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>

            <h2 className="gc-title">{card.title}</h2>
            <p className="gc-desc">{card.text}</p>

            <ul className="gc-list">
              {card.categories.map((c, k) => (
                <li key={k}>{c}</li>
              ))}
            </ul>

            <a className="gc-btn" href={card.button.href}>
              {card.button.label}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2 10L10 2M4 2h6v6" stroke="#111" strokeWidth="1.4" />
              </svg>
            </a>

            <span
              className="gc-shade"
              ref={(el) => (shadeRefs.current[i] = el)}
            />
          </article>
        ))}
      </div>
      {/* ===== SECTION 4 : stats grid ===== */}
      <div className="st">
        {statCards.map((card, i) => (
          <StatCard key={i} index={i + 1} data={card} />
        ))}
      </div>
      {/* second scrolling text */}
      <div className="s2-marquee s2-marquee--2" aria-hidden="true">
        <div className="s2-track2">
          {[0, 1].map((n) => (
            <div className="s2-seq" key={n}>
              {marquee2.map((t) => (
                <span className="s2-item" key={t}>
                  {t}
                  <Star />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* ===== SECTION 5 : featured projects ===== */}
      <h2 className="fp-title">
        {featured.title.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </h2>
      <p className="fp-text">{featured.text}</p>
      <a className="fp-btn" href={featured.button.href}>
        {featured.button.label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M2 10L10 2M4 2h6v6" stroke="#111" strokeWidth="1.4" />
        </svg>
      </a>
      <ul className="fp-list">
        {featured.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="fp-image">
        <img
          src={featured.image}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
      <p className="fp-caption">{featured.caption}</p>
      {/* ===== SECTION 6 : laptop banner image ===== */}
      <span className="bn-band" aria-hidden="true" />
      <div className="bn-image">
        <img
          src={banner.image}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>
      {/* ===== SECTION 7 : pricing plan (neon border) ===== */}
      <div className="pp-box">
        <div className="pp-inner">
          <h2 className="pp-title">{pricing.title}</h2>
          <p className="pp-sub">{pricing.subtitle}</p>
          <span className="pp-rule" aria-hidden="true" />

          {pricing.plans.map((plan, i) => (
            <article className="pp-card" style={{ "--i": i }} key={plan.id}>
              <h3 className="pp-price">{plan.price}</h3>
              <p className="pp-tag">{plan.tag}</p>
              <h4 className="pp-name">{plan.name}</h4>
              <span className="pp-cardrule" aria-hidden="true" />

              <ul className="pp-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8.5l3.2 3.2L13 4.8"
                        stroke="#fff"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                className={`pp-btn ${i === 0 ? "pp-btn--solid" : ""}`}
                href={plan.button.href}
              >
                {plan.button.label}
              </a>
            </article>
          ))}
        </div>
      </div>
      {/* ===== SECTION 8 : BrandBreak ===== */}
      <BrandBreak text={brandBreak} glow /> {/* drop-shadow glow, behind */}
      <BrandBreak text={brandBreak} />
      {/* ===== SECTION 9 : scrolling text under BrandBreak ===== */}
      <div className="s2-marquee s2-marquee--3" aria-hidden="true">
        <div className="s2-track2">
          {[0, 1].map((n) => (
            <div className="s2-seq" key={n}>
              {marquee2.map((t) => (
                <span className="s2-item" key={t}>
                  {t}
                  <Star />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* ===== SECTION 10 : Why choose us ===== */}
      <p className="wc-kicker">{whyUs.kicker}</p>
      <h2 className="wc-heading">
        {whyUs.heading.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </h2>
      <p className="wc-quote">{whyUs.quote}</p>
      {whyUs.cards.map((card, i) => (
        <article
          key={card.id}
          className={`wc ${i < 2 ? "wc--wide" : "wc--narrow"}`}
          data-i={i}
          tabIndex={0}
        >
          <img
            className="wc-icon"
            src={whyUs.icon}
            alt=""
            onError={(e) => (e.currentTarget.style.visibility = "hidden")}
          />
          <h3 className="wc-title">
            {card.title.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </h3>
          <p className="wc-text">{card.text}</p>
        </article>
      ))}
      {/* ===== SECTION 11 : testimonials ===== */}
      <p className="tm-kicker">{testimonials.kicker}</p>
      <h2 className="tm-heading">{testimonials.heading}</h2>
      <p className="tm-sub">{testimonials.subtitle}</p>
      <div className="tm-marquee">
        <div
          className="tm-track"
          style={{ "--unit": `${testimonials.items.length * TM_PITCH}px` }}
        >
          {/* 3 copies of the list so the loop never shows a gap. Only the middle one is read by screen readers. */}
          {[0, 1, 2].map((set) =>
            testimonials.items.map((t) => (
              <article
                className="tm-card"
                key={`${set}-${t.id}`}
                aria-hidden={set !== 1 ? "true" : undefined}
              >
                <img
                  className="tm-photo"
                  src={t.photo}
                  alt=""
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                />
                <p className="tm-quote">{t.text}</p>
                <h3 className="tm-name">{t.name}</h3>
                <p className="tm-role">{t.role}</p>
                <h3 className="tm-name tm-name2">{t.name2}</h3>
                <p className="tm-role tm-role2">{t.role2}</p>
              </article>
            )),
          )}
        </div>
      </div>
      {/* ===== SECTION 12 : Why choose us + stats grid (same boxes as section 4) ===== */}
      <span className="ws-band" aria-hidden="true" />
      <p className="ws-kicker">{whyUs.kicker}</p>
      <h2 className="ws-heading">
        {whyUs.heading.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </h2>
      <p className="ws-quote">{whyUs.quote}</p>
      <div className="st st--2">
        {statCards.map((card, i) => (
          <StatCard key={i} index={i + 1} data={card} />
        ))}
      </div>
      {/* ===== SECTION 13 : FAQ ===== */}
      <MotionConfig reducedMotion="user">
        <motion.div
          className="fq"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09 } },
          }}
        >
          <motion.h2 className="fq-title" variants={fadeUp}>
            {faq.heading} <span className="y">{faq.accent}</span>
            <br />
            {faq.heading2}
          </motion.h2>

          <motion.p className="fq-sub" variants={fadeUp}>
            {faq.subtitle.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </motion.p>

          <div className="fq-list">
            {faq.items.map((item, i) => (
              <FaqItem
                key={i}
                index={i}
                q={item.q}
                a={item.a}
                open={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
              />
            ))}
          </div>
        </motion.div>
      </MotionConfig>
      {/* ===== SECTION 14 : Join Us ===== */}
      <JoinUs />
      {/* ===== FOOTER ===== */}
      <Footer />
    </>
  );
}
