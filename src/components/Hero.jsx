import React from "react";

// Static hero background avoids scroll-linked JavaScript and layout work.
export default function Hero({ site, children }) {
  const { hero } = site;
  return (
    <header className="hero" id="top">
      <div className={`hero-bg ${hero.image ? "has-image" : ""}`}>
        {hero.image ? <img src={`/${hero.image.replace(/^\//, "")}`} alt={hero.imageAlt || ""} fetchPriority="high" decoding="async" /> : null}
      </div>
      <div className="hero-scrim" />
      <div className="hero-inner">
        {hero.eyebrow ? <p className="glass-dark inline-block rounded-full px-4 py-1.5 text-sm mb-5">{hero.eyebrow}</p> : null}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-3xl">{hero.headline}</h1>
        {hero.subheadline ? <p className="mt-4 text-lg md:text-xl max-w-2xl opacity-90">{hero.subheadline}</p> : null}
        <div className="mt-8 flex flex-wrap gap-3">{children}</div>
      </div>
    </header>
  );
}

