export type CardState = "live" | "source" | "pending" | "offline";

export type ProjectCard = {
  title: string;
  meta: string;
  description: string;
  status: string;
  state: CardState;
  href?: string;
};

export type Zone = {
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

const zoneCatalog: Zone[] = [
  {
    id: "bridge",
    number: "07",
    room: "Leadership Suite",
    name: "The Bridge",
    function: "Leadership & Portfolio",
    description:
      "The agency control room for campaign operations, portfolio visibility and the systems leadership uses to steer the work.",
    x: 61,
    y: 17,
    zoom: 2.15,
    stats: [
      ["01", "Control system found"],
      ["Local", "Deployment pending"],
    ],
    cards: [
      {
        title: "Sentient Promos CRM",
        meta: "Campaign operations / Project 11",
        description:
          "Clients, campaigns, media outlets, margins, payments, invoices, onboarding and Instagram-insights reporting. The recovered app currently runs only on this Mac.",
        status: "Coming soon",
        state: "pending",
      },
    ],
  },
  {
    id: "forum",
    number: "05",
    room: "Strategy Forum",
    name: "The Forum",
    function: "Use Cases & Playbooks",
    description:
      "The practical learning table: prompt systems, business use cases and the content formats used to explain what is possible.",
    x: 31,
    y: 34,
    zoom: 2.05,
    stats: [
      ["03", "Live resources"],
      ["100", "Use-case prompts"],
    ],
    cards: [
      {
        title: "ChatGPT at Work",
        meta: "Business use cases / Guide",
        description:
          "The dedicated ChatGPTricks experience for capabilities, workflows and practical business applications of ChatGPT.",
        status: "Live",
        state: "live",
        href: "https://chatgptricks.fun/#/ChatGPTatWork",
      },
      {
        title: "ChatGPTricks Prompt Hub",
        meta: "Prompt library / Production",
        description:
          "The main prompt-library experience, with searchable collections, direct-entry composers, saved prompts and recent copies.",
        status: "Live",
        state: "live",
        href: "https://chatgptricks.fun/",
      },
      {
        title: "Content Formats",
        meta: "Use-case showcase / Project 09",
        description:
          "A lightweight presentation of the ChatGPT Tricks format system: carousels, talking-head videos, Faceless 2.0 and standard reels.",
        status: "Live",
        state: "live",
        href: "https://chatgptricks.github.io/content-formats/",
      },
    ],
  },
  {
    id: "lab",
    number: "06",
    room: "Creative Lab",
    name: "The Lab",
    function: "Client Builds & Experiments",
    description:
      "A focused shelf for Sentient-owned client builds and experiments that have moved beyond a loose idea.",
    x: 80,
    y: 34,
    zoom: 2.05,
    stats: [
      ["01", "Sentient project"],
      ["Live", "Public build"],
    ],
    cards: [
      {
        title: "NEO Solutions",
        meta: "AI agent website / Project 14",
        description:
          "Bilingual lead-conversion website for AI agents that respond, qualify and book leads for growing businesses.",
        status: "Live",
        state: "live",
        href: "https://chatgptricks.github.io/neosolutions/",
      },
    ],
  },
  {
    id: "archive",
    number: "03",
    room: "Knowledge Library",
    name: "The Archive",
    function: "Intelligence & Evidence",
    description:
      "Sentient's working memory: performance intelligence, historical content, research signals, case studies and captured knowledge.",
    x: 23,
    y: 59,
    zoom: 2.15,
    stats: [
      ["05", "Live intelligence views"],
      ["01", "Local intake system"],
    ],
    cards: [
      {
        title: "Cortex by Sentient",
        meta: "Predict / Project 10",
        description:
          "Cover analysis, neural-response scoring, post intelligence, pattern exploration, A/B testing and Instagram imports.",
        status: "Live",
        state: "live",
        href: "https://chatgptricks.github.io/cortex/",
      },
      {
        title: "Tricks Dash",
        meta: "Historical dashboard / Project 09",
        description:
          "The searchable ChatGPT Tricks post archive with date, format, engagement, caption and OCR-text filters.",
        status: "Live",
        state: "live",
        href: "https://chatgptricks.github.io/tricks-dash/",
      },
      {
        title: "Sentient Case Studies",
        meta: "Campaign evidence / Project 16",
        description:
          "A metrics-backed library of sponsored-post outcomes and client case studies generated from the canonical Instagram dataset.",
        status: "Live",
        state: "live",
        href: "https://chatgptricks.github.io/sentient-case-studies/",
      },
      {
        title: "AI Safety Desk",
        meta: "Research sourcing / Maxx Tools",
        description:
          "A focused news-selection view for AI safety, governance and risk signals inside Schedulr.",
        status: "Live",
        state: "live",
        href: "https://maxxbot.cloud/#/ai-safety",
      },
      {
        title: "BCCR FX Intelligence",
        meta: "Economic dashboard / Maxx Tools",
        description:
          "USD/CRC and EUR/CRC reference-rate tracking with official BCCR data and trend context.",
        status: "Live",
        state: "live",
        href: "https://maxxbot.cloud/fx-tracker/",
      },
      {
        title: "Slack Link Catcher",
        meta: "Knowledge intake / Project 17",
        description:
          "A local Slack app that captures links from DMs, mentions and reactions, then adds notes, categories, reminders and CSV export.",
        status: "Local service",
        state: "pending",
      },
    ],
  },
  {
    id: "commons",
    number: "04",
    room: "Client Commons",
    name: "The Commons",
    function: "Account Decks & Shared Rooms",
    description:
      "The future shared deck directory for every account. This room is ready for the Canva links once the canonical list is supplied.",
    x: 61,
    y: 58,
    zoom: 2.2,
    stats: [
      ["00", "Deck links loaded"],
      ["Next", "Canva list needed"],
    ],
    cards: [
      {
        title: "Account Deck Directory",
        meta: "Canva / Awaiting source list",
        description:
          "No Canva deck URLs were found anywhere in the canonical Codex Projects archive. Add the account-by-account list here when it is available.",
        status: "Links requested",
        state: "pending",
      },
    ],
  },
  {
    id: "front-door",
    number: "01",
    room: "Welcome Desk",
    name: "The Front Door",
    function: "Accounts & Network View",
    description:
      "The visual entry point to Sentient's managed-account network, portfolio signals and the people behind each property.",
    x: 36,
    y: 81,
    zoom: 2.15,
    stats: [
      ["26", "Accounts tracked"],
      ["Live", "Network intelligence"],
    ],
    cards: [
      {
        title: "Sentient Accounts",
        meta: "Network intelligence / Maxx Tools",
        description:
          "The requested full-screen account visualization, with portfolio metrics, account planets, profile detail and performance context.",
        status: "Live",
        state: "live",
        href: "https://maxxbot.cloud/sentient-accounts/dashboard/",
      },
    ],
  },
  {
    id: "floor",
    number: "02",
    room: "Delivery Studio",
    name: "The Floor",
    function: "Production Tools & Utilities",
    description:
      "The operating heart of the agency: reusable tools for sourcing, designing, formatting and exporting production-ready assets.",
    x: 79,
    y: 80,
    zoom: 2.15,
    stats: [
      ["05", "Live production tools"],
      ["04", "Next to connect"],
    ],
    cards: [
      {
        title: "Maxx Tools",
        meta: "Production hub / Project 04",
        description:
          "The existing mini-app hub for Sentient's internal production and research utilities.",
        status: "Live",
        state: "live",
        href: "https://maxxbot.cloud/",
      },
      {
        title: "Reddit Visualizer",
        meta: "Asset generator / Maxx Tools",
        description:
          "Turns Reddit content into presentation-ready visual assets directly in the browser.",
        status: "Live",
        state: "live",
        href: "https://maxxbot.cloud/reddit-visualizer/",
      },
      {
        title: "X / Tweet Visualizer",
        meta: "Asset generator / Maxx Tools",
        description:
          "Builds customized dark-mode X post mockups and exports them as clean PNG assets.",
        status: "Live",
        state: "live",
        href: "https://maxxbot.cloud/tweet-visualizer/",
      },
      {
        title: "Chart Animator",
        meta: "Motion generator / Maxx Tools",
        description:
          "Creates 1080 × 1440 charts in single, comparison and timeline modes, exporting PNG stills or WebM motion.",
        status: "Live",
        state: "live",
        href: "https://maxxbot.cloud/chart-animator/",
      },
      {
        title: "Schedulr",
        meta: "Content operations / Maxx Tools",
        description:
          "Weekly planning, sourced feeds, account boards, performance signals and a browser clipper for production intake.",
        status: "Live",
        state: "live",
        href: "https://maxxbot.cloud/daily-tracker/",
      },
      {
        title: "Social Brain",
        meta: "Carousel generator / Project 12",
        description:
          "Converts article URLs into social copy and editable carousel creatives with image options, captions and PNG export. The web app is local-only; its source is public.",
        status: "Source code",
        state: "source",
        href: "https://github.com/ealfaro29/sentient",
      },
      {
        title: "Posts Production Library",
        meta: "Carousel systems / Project 03",
        description:
          "A large local library of editorial overlays, campaign carousels, prompt cards and export-ready HTML production systems.",
        status: "Local library",
        state: "pending",
      },
      {
        title: "Battle Giveaway",
        meta: "Instagram utility / Maxx Tools",
        description:
          "The source exists, but its Railway production destination currently returns “Application not found.” It needs a redeploy before linking.",
        status: "Needs redeploy",
        state: "offline",
      },
      {
        title: "QR Code Generator",
        meta: "Requested utility / Source missing",
        description:
          "No canonical QR generator source or deployment was found anywhere in Codex Projects. Keep this slot until the project is recovered or recreated.",
        status: "Not located",
        state: "pending",
      },
    ],
  },
];

export const zones: Zone[] = [...zoneCatalog].sort(
  (first, second) => Number(first.number) - Number(second.number),
);
