import { useState, useEffect, useRef } from "react";
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

export default function Services() {
  const [active, setActive] = useState(DEFAULT_ACTIVE_CARD);
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
    </>
  );
}
