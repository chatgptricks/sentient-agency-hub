"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { zones, type ProjectCard } from "./hub-data";

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function CardShell({ card, children }: { card: ProjectCard; children: ReactNode }) {
  const className = `projectCard state-${card.state}`;
  const label = `${card.title}: ${card.status}`;

  if (card.href) {
    return (
      <a className={className} href={card.href} target="_blank" rel="noreferrer" aria-label={`${label}, opens in a new tab`}>
        {children}
      </a>
    );
  }

  return (
    <div className={`${className} isUnavailable`} aria-label={label} aria-disabled="true">
      {children}
    </div>
  );
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mapSize, setMapSize] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const mapRef = useRef<HTMLDivElement>(null);

  const activeZone = activeIndex === null ? null : zones[activeIndex];

  const selectZone = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const returnToOverview = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const move = useCallback(
    (direction: 1 | -1) => {
      const current = activeIndex ?? (direction === 1 ? -1 : 0);
      selectZone((current + direction + zones.length) % zones.length);
    },
    [activeIndex, selectZone],
  );

  useEffect(() => {
    const node = mapRef.current;
    if (!node) return;

    const measure = () => {
      setMapSize(node.getBoundingClientRect().width);
      setViewportWidth(window.innerWidth);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select, [contenteditable='true']")) return;

      const numeric = Number(event.key);
      if (numeric >= 1 && numeric <= 7) {
        event.preventDefault();
        selectZone(numeric - 1);
      } else if (event.key === "Escape" || event.key === "Home") {
        event.preventDefault();
        returnToOverview();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [move, returnToOverview, selectZone]);

  const mapMotion = useMemo(() => {
    if (!activeZone || !mapSize) return { scale: 1, x: 0, y: 0 };

    const scale = activeZone.zoom;
    const horizontalOffset = viewportWidth > 980 ? -170 : 0;
    const verticalOffset = viewportWidth <= 720 ? -115 : 12;
    const x = -(activeZone.x / 100 - 0.5) * mapSize * scale + horizontalOffset;
    const y = -(activeZone.y / 100 - 0.5) * mapSize * scale + verticalOffset;

    return { scale, x, y };
  }, [activeZone, mapSize, viewportWidth]);

  const connectedCount = activeZone?.cards.filter((card) => card.href).length ?? 0;

  return (
    <main className={`hub ${activeZone ? "is-exploring" : "is-overview"}`}>
      <header className="topbar">
        <button className="brand" type="button" onClick={returnToOverview} aria-label="Return to agency overview">
          <span className="brandMark" aria-hidden="true">S/</span>
          <span className="brandCopy">
            <strong>Sentient HQ</strong>
            <small>Agency operating hub</small>
          </span>
        </button>

        <div className="topbarStatus" aria-label="Hub status">
          <span className="liveDot" aria-hidden="true" />
          <span>Live index</span>
          <span className="statusDivider" aria-hidden="true" />
          <span>07 zones</span>
        </div>
      </header>

      <nav className="zoneRail" aria-label="Agency zones">
        <button
          className={`overviewButton ${activeIndex === null ? "active" : ""}`}
          type="button"
          onClick={returnToOverview}
          aria-current={activeIndex === null ? "page" : undefined}
          aria-label="View the complete agency"
        >
          <span className="overviewGrid" aria-hidden="true"><i /><i /><i /><i /></span>
          <span className="railTooltip">Overview</span>
        </button>

        <span className="railLine" aria-hidden="true" />

        {zones.map((zone, index) => (
          <button
            className={`railZone ${activeIndex === index ? "active" : ""}`}
            type="button"
            key={zone.id}
            onClick={() => selectZone(index)}
            aria-current={activeIndex === index ? "page" : undefined}
            aria-label={`${zone.number}: ${zone.name}, ${zone.function}`}
          >
            <span>{zone.number}</span>
            <span className="railTooltip">{zone.name}</span>
          </button>
        ))}
      </nav>

      <section className="mapStage" aria-label="Interactive isometric map of Sentient Agency">
        <div
          className="mapCanvas"
          ref={mapRef}
          style={
            {
              "--map-scale": mapMotion.scale,
              "--map-x": `${mapMotion.x}px`,
              "--map-y": `${mapMotion.y}px`,
            } as CSSProperties
          }
        >
          <Image
            className="agencyMap"
            src={`${assetBase}/sentient-agency-map.png`}
            alt="Isometric illustration of Sentient Agency arranged across seven connected office platforms"
            width={1600}
            height={1600}
            priority
            unoptimized
            draggable={false}
          />

          {zones.map((zone, index) => (
            <button
              className={`mapHotspot ${activeIndex === index ? "active" : ""} ${activeIndex !== null && activeIndex !== index ? "muted" : ""}`}
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              type="button"
              key={zone.id}
              onClick={() => selectZone(index)}
              aria-label={`Zoom to ${zone.name}: ${zone.function}`}
              aria-pressed={activeIndex === index}
            >
              <span className="hotspotCore"><b>{zone.number}</b><i aria-hidden="true" /></span>
              <span className="hotspotLabel"><strong>{zone.name}</strong><small>{zone.function}</small></span>
            </button>
          ))}
        </div>
      </section>

      {!activeZone && (
        <section className="welcomePanel" aria-labelledby="welcome-title">
          <span className="eyebrow">The sentient agency</span>
          <h1 id="welcome-title">Seven rooms.<br />One living system.</h1>
          <p>
            Explore Sentient&apos;s real tools, client builds, intelligence and shared resources. Live cards open the source system; pending cards show what still needs a home.
          </p>
          <button type="button" onClick={() => selectZone(0)}>
            Enter the agency <span aria-hidden="true">↗</span>
          </button>
        </section>
      )}

      {activeZone && (
        <aside className="detailPanel" aria-live="polite" aria-label={`${activeZone.name} details`}>
          <div className="panelTopline" />
          <div className="panelToolbar">
            <button type="button" onClick={returnToOverview} className="backButton"><span aria-hidden="true">←</span> All rooms</button>
            <span>HQ / {activeZone.number}</span>
          </div>

          <div className="panelHeading">
            <span className="eyebrow">{activeZone.room}</span>
            <h2>{activeZone.name}</h2>
            <p className="zoneFunction">{activeZone.function}</p>
            <p className="zoneDescription">{activeZone.description}</p>
          </div>

          <div className="statGrid">
            {activeZone.stats.map(([value, label]) => (
              <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>

          <div className="projectsHeader">
            <span>Connected systems</span>
            <small>{connectedCount} linked</small>
          </div>

          <div className="projectList">
            {activeZone.cards.map((card, cardIndex) => (
              <CardShell card={card} key={card.title}>
                <span className="cardIndex">{String(cardIndex + 1).padStart(2, "0")}</span>
                <span className="cardBody">
                  <small>{card.meta}</small>
                  <strong>{card.title}</strong>
                  <span className="cardDescription">{card.description}</span>
                  <span className="cardMeta">
                    <span className="cardStatus"><i aria-hidden="true" />{card.status}</span>
                    <span>{card.href ? "Open" : "Pending"}</span>
                  </span>
                </span>
                <span className="cardArrow" aria-hidden="true">{card.href ? "↗" : "—"}</span>
              </CardShell>
            ))}
          </div>

          <div className="panelNavigation">
            <button type="button" onClick={() => move(-1)} aria-label="Previous room">← Prev</button>
            <span>{activeZone.number} / 07</span>
            <button type="button" onClick={() => move(1)} aria-label="Next room">Next →</button>
          </div>
        </aside>
      )}

      <footer className="footerBar">
        <span>© Sentient Agency</span>
        <span className="footerHint"><kbd>1–7</kbd> Rooms <kbd>← →</kbd> Navigate <kbd>Esc</kbd> Overview</span>
        <span>Live index / v0.2</span>
      </footer>
    </main>
  );
}
