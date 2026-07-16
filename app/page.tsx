"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ProjectCard = {
  title: string;
  meta: string;
  description: string;
  progress: number;
  status: string;
};

type Zone = {
  id: string;
  number: string;
  room: string;
  name: string;
  function: string;
  description: string;
  x: number;
  y: number;
  zoom: number;
  stats: [string, string][];
  cards: ProjectCard[];
};

const zones: Zone[] = [
  {
    id: "bridge",
    number: "01",
    room: "Leadership Suite",
    name: "The Bridge",
    function: "Leadership & Portfolio",
    description:
      "The agency command room for priorities, portfolio health and the decisions that move every team forward.",
    x: 61,
    y: 17,
    zoom: 2.15,
    stats: [
      ["06", "Active priorities"],
      ["84%", "Quarter aligned"],
    ],
    cards: [
      {
        title: "Q3 Agency Roadmap",
        meta: "Portfolio / Executive",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The next review is scheduled for Thursday.",
        progress: 84,
        status: "On track",
      },
      {
        title: "Northstar Alignment",
        meta: "Strategy / Internal",
        description:
          "Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Owners are aligning final outcomes.",
        progress: 62,
        status: "In review",
      },
      {
        title: "Partner Council",
        meta: "Growth / Partnerships",
        description:
          "Aenean lacinia bibendum nulla sed consectetur. Three partnership briefs are ready for evaluation.",
        progress: 41,
        status: "Planning",
      },
    ],
  },
  {
    id: "forum",
    number: "02",
    room: "Strategy Forum",
    name: "The Forum",
    function: "Strategy & Workshops",
    description:
      "A shared table for turning complicated client questions into clear narratives, systems and next moves.",
    x: 31,
    y: 34,
    zoom: 2.05,
    stats: [
      ["04", "Workshops this week"],
      ["19", "Open decisions"],
    ],
    cards: [
      {
        title: "Atlas Brand Sprint",
        meta: "Client / Workshop",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Synthesis notes and territories are in progress.",
        progress: 76,
        status: "In session",
      },
      {
        title: "Bluebird GTM",
        meta: "Strategy / Launch",
        description:
          "Integer posuere erat a ante venenatis dapibus posuere velit aliquet. The launch map needs final owners.",
        progress: 53,
        status: "Working",
      },
      {
        title: "Signal Workshop Kit",
        meta: "System / Internal",
        description:
          "Donec sed odio dui. A modular facilitation kit is being prepared for every strategy lead.",
        progress: 68,
        status: "Building",
      },
    ],
  },
  {
    id: "lab",
    number: "03",
    room: "Creative Lab",
    name: "The Lab",
    function: "Concepting & Design",
    description:
      "The experimental floor where visual systems, prototypes and unlikely ideas are made tangible together.",
    x: 80,
    y: 34,
    zoom: 2.05,
    stats: [
      ["12", "Concepts in motion"],
      ["03", "Reviews today"],
    ],
    cards: [
      {
        title: "Luma Identity System",
        meta: "Brand / Design",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The team is testing motion and type behavior.",
        progress: 71,
        status: "Designing",
      },
      {
        title: "Field Notes Prototype",
        meta: "Product / Prototype",
        description:
          "Maecenas faucibus mollis interdum. Usability feedback is being folded into the second interactive pass.",
        progress: 48,
        status: "Testing",
      },
      {
        title: "Future Forms R&D",
        meta: "Experiment / AI",
        description:
          "Cras mattis consectetur purus sit amet fermentum. A small batch of generative studies is ready to share.",
        progress: 36,
        status: "Exploring",
      },
    ],
  },
  {
    id: "archive",
    number: "04",
    room: "Knowledge Library",
    name: "The Archive",
    function: "Research & Intelligence",
    description:
      "Sentient's collective memory: research, case studies, reusable methods and the evidence behind the work.",
    x: 23,
    y: 59,
    zoom: 2.15,
    stats: [
      ["248", "Knowledge objects"],
      ["17", "New this month"],
    ],
    cards: [
      {
        title: "AI Behavior Index",
        meta: "Research / Living report",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. The July signal set is being normalized.",
        progress: 88,
        status: "Updating",
      },
      {
        title: "Case Study Library",
        meta: "Stories / Archive",
        description:
          "Nullam id dolor id nibh ultricies vehicula ut id elit. Six project narratives need their final outcomes.",
        progress: 64,
        status: "Curating",
      },
      {
        title: "Sentient Methods v2",
        meta: "Playbook / System",
        description:
          "Vestibulum id ligula porta felis euismod semper. Core workshop patterns are now in editorial review.",
        progress: 79,
        status: "Editing",
      },
    ],
  },
  {
    id: "commons",
    number: "05",
    room: "Client Commons",
    name: "The Commons",
    function: "Relationships & Culture",
    description:
      "A calm in-between space for client conversations, one-to-ones, team rituals and the work around the work.",
    x: 61,
    y: 58,
    zoom: 2.2,
    stats: [
      ["09", "Conversations today"],
      ["92%", "Team pulse"],
    ],
    cards: [
      {
        title: "Client Pulse",
        meta: "Relationships / Weekly",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Account signals are healthy across the portfolio.",
        progress: 92,
        status: "Healthy",
      },
      {
        title: "Friday Assembly",
        meta: "Culture / All hands",
        description:
          "Etiam porta sem malesuada magna mollis euismod. Wins, lessons and open asks are queued for the team.",
        progress: 55,
        status: "Preparing",
      },
      {
        title: "Mentor Circles",
        meta: "People / Learning",
        description:
          "Curabitur blandit tempus porttitor. The next round pairs craft leads with six emerging makers.",
        progress: 44,
        status: "Matching",
      },
    ],
  },
  {
    id: "front-door",
    number: "06",
    room: "Welcome Desk",
    name: "The Front Door",
    function: "Intake & New Business",
    description:
      "Every new opportunity enters here—qualified, shaped and routed to the right people with useful context.",
    x: 36,
    y: 81,
    zoom: 2.15,
    stats: [
      ["14", "Open opportunities"],
      ["$2.4m", "Mock pipeline"],
    ],
    cards: [
      {
        title: "Nova Opportunity",
        meta: "New business / Brand",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Discovery is complete and the brief is being shaped.",
        progress: 32,
        status: "Qualifying",
      },
      {
        title: "Orchard RFP",
        meta: "Proposal / Experience",
        description:
          "Sed posuere consectetur est at lobortis. The response team is assembling proof, scope and a point of view.",
        progress: 61,
        status: "Responding",
      },
      {
        title: "Warm Introductions",
        meta: "Pipeline / Network",
        description:
          "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Five conversations await an agency owner.",
        progress: 47,
        status: "Routing",
      },
    ],
  },
  {
    id: "floor",
    number: "07",
    room: "Delivery Studio",
    name: "The Floor",
    function: "Active Work & Production",
    description:
      "The operating heart of the agency, where live projects move from clear plans to beautifully finished work.",
    x: 79,
    y: 80,
    zoom: 2.15,
    stats: [
      ["23", "Active workstreams"],
      ["87%", "On-time pulse"],
    ],
    cards: [
      {
        title: "Meridian Launch",
        meta: "Delivery / Integrated",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Production is moving through final QA this week.",
        progress: 87,
        status: "Shipping",
      },
      {
        title: "Kite Digital Platform",
        meta: "Product / Build",
        description:
          "Duis mollis, est non commodo luctus, nisi erat porttitor ligula. The core experience is feature complete.",
        progress: 74,
        status: "Building",
      },
      {
        title: "Afterlight Campaign",
        meta: "Campaign / Production",
        description:
          "Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis. Final assets are entering localization.",
        progress: 69,
        status: "Producing",
      },
    ],
  },
];

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [mapSize, setMapSize] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const mapRef = useRef<HTMLDivElement>(null);

  const activeZone = activeIndex === null ? null : zones[activeIndex];

  const selectZone = useCallback((index: number) => {
    setActiveIndex(index);
    setExpandedCard(null);
  }, []);

  const returnToOverview = useCallback(() => {
    setActiveIndex(null);
    setExpandedCard(null);
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
    if (!activeZone || !mapSize) {
      return { scale: 1, x: 0, y: 0 };
    }

    const scale = activeZone.zoom;
    const horizontalOffset = viewportWidth > 980 ? -170 : 0;
    const verticalOffset = viewportWidth <= 720 ? -115 : 12;
    const x = -(activeZone.x / 100 - 0.5) * mapSize * scale + horizontalOffset;
    const y = -(activeZone.y / 100 - 0.5) * mapSize * scale + verticalOffset;

    return { scale, x, y };
  }, [activeZone, mapSize, viewportWidth]);

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

        <div className="topbarStatus" aria-label="Demo status">
          <span className="liveDot" aria-hidden="true" />
          <span>Demo mode</span>
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
          <span className="overviewGrid" aria-hidden="true">
            <i /><i /><i /><i />
          </span>
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
            } as React.CSSProperties
          }
        >
          <img
            className="agencyMap"
            src={`${assetBase}/sentient-agency-map.png`}
            alt="Isometric illustration of Sentient Agency arranged across seven connected office platforms"
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
              <span className="hotspotCore">
                <b>{zone.number}</b>
                <i aria-hidden="true" />
              </span>
              <span className="hotspotLabel">
                <strong>{zone.name}</strong>
                <small>{zone.function}</small>
              </span>
            </button>
          ))}
        </div>
      </section>

      {!activeZone && (
        <section className="welcomePanel" aria-labelledby="welcome-title">
          <span className="eyebrow">The sentient agency</span>
          <h1 id="welcome-title">Seven rooms.<br />One living system.</h1>
          <p>
            Move through the office to see where decisions, ideas and active work live. Choose any numbered zone to begin.
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
            <button type="button" onClick={returnToOverview} className="backButton">
              <span aria-hidden="true">←</span> All rooms
            </button>
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
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="projectsHeader">
            <span>Selected work</span>
            <small>Mock data</small>
          </div>

          <div className="projectList">
            {activeZone.cards.map((card, cardIndex) => {
              const expanded = expandedCard === cardIndex;
              return (
                <button
                  className={`projectCard ${expanded ? "expanded" : ""}`}
                  type="button"
                  key={card.title}
                  onClick={() => setExpandedCard(expanded ? null : cardIndex)}
                  aria-expanded={expanded}
                >
                  <span className="cardIndex">0{cardIndex + 1}</span>
                  <span className="cardBody">
                    <small>{card.meta}</small>
                    <strong>{card.title}</strong>
                    <span className="cardDescription">{card.description}</span>
                    <span className="progressTrack" aria-label={`${card.progress}% complete`}>
                      <i style={{ width: `${card.progress}%` }} />
                    </span>
                    <span className="cardMeta">
                      <span>{card.status}</span>
                      <span>{card.progress}%</span>
                    </span>
                  </span>
                  <span className="cardArrow" aria-hidden="true">{expanded ? "−" : "+"}</span>
                </button>
              );
            })}
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
        <span className="footerHint">
          <kbd>1–7</kbd> Rooms <kbd>← →</kbd> Navigate <kbd>Esc</kbd> Overview
        </span>
        <span>Prototype / v0.1</span>
      </footer>
    </main>
  );
}
