import { useEffect, useState } from "react";
import { slides, cta, SLIDE_DURATION } from "../data.js";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [imgFailed, setImgFailed] = useState(false);
  const slide = slides[index];

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % slides.length),
      SLIDE_DURATION
    );
    return () => clearTimeout(t);
  }, [index, playing]);

  useEffect(() => setImgFailed(false), [index]);

  return (
    <section id="home">
      {/* decorative shapes */}
      <span className="triangle" aria-hidden="true" />
      <span className="baseline" aria-hidden="true" />
      <svg className="diagonal" viewBox="0 0 153 177" aria-hidden="true">
        <line x1="0" y1="0" x2="153" y2="177" />
      </svg>
      <span className="link-line" aria-hidden="true" />
      <span className="dot" aria-hidden="true" />

      {/* left text */}
      <p key={`k${slide.id}`} className="kicker swap">{slide.kicker}</p>
      <h1 key={`t${slide.id}`} className="title swap">
        {slide.title.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>

      <div className="dashes" role="tablist" aria-label="Slides">
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}`}
            className={`dash ${i === index ? "dash--active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <blockquote key={`q${slide.id}`} className="quote swap">
        “{slide.quote}”
      </blockquote>

      {/* circle + play icon */}
      <button
        className="circle"
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause slideshow" : "Play slideshow"}
      >
        <svg className="circle__icon" viewBox="0 0 12 14" fill="#fff" aria-hidden="true">
          {playing ? (
            <>
              <rect x="1" y="1" width="3.5" height="12" />
              <rect x="7.5" y="1" width="3.5" height="12" />
            </>
          ) : (
            <path d="M1 1l10 6-10 6V1Z" />
          )}
        </svg>
      </button>

      {/* right side */}
      <div className="image">
        {!imgFailed && (
          <img
            key={slide.id}
            src={slide.image}
            alt=""
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      <p key={`d${slide.id}`} className="info swap">{slide.description}</p>

      <a className="btn-solid" href={cta.primary.href}>
        {cta.primary.label}
      </a>
      <a className="btn-link" href={cta.secondary.href}>
        {cta.secondary.label}
        <svg width="30" height="10" viewBox="0 0 30 10" fill="none" aria-hidden="true">
          <path d="M0 5h28M24 1l4 4-4 4" stroke="#fff" strokeWidth="1.2" />
        </svg>
      </a>
    </section>
  );
}
