export const projects = [
  {
    id: "trading",
    title: "my-trading-platform",
    short: "Stocks, fast order entry and breakout automation.",
    overview:
      "A personal stock-trading platform I actively use for short- and longer-term positions. It combines rapid order entry, live market data, breakout detection and automation, protective orders, broker reconciliation and P&L tracking through Interactive Brokers.",
    contribution:
      "The central design challenge is coordinating asynchronous market data, order submission and broker callbacks across a reliable end-to-end lifecycle—handling race conditions, state reconciliation, failures and recovery without losing track of live orders.",
    stack: "Python · FastAPI · React · Postgres · IBKR",
    status: "LIVE · BUILDING",
    statusTone: "green",
    githubUrl: "https://github.com/HoutanGh/my-trading-platform",
    hasGithub: true,
    hasSite: false,
  },
  {
    id: "acupuncture",
    title: "Acupuncture Website",
    short: "A completed client website.",
    overview:
      "A completed public-facing website that gives prospective clients a calm, direct route from understanding the service to making contact.",
    contribution:
      "I handled the information structure, implementation and content presentation.",
    stack: "Responsive web build · content design · SEO",
    status: "LIVE",
    statusTone: "green",
    githubUrl: null,
    siteUrl: null,
    hasGithub: true,
    hasSite: true,
  },
  {
    id: "notifications",
    title: "windows-clean-notifications",
    short: "A cleaner feed for market and trader alerts.",
    overview:
      "A local Windows notification dashboard I use to collect and clean noisy alerts from market trackers, trading communities and other selected apps. It turns Windows notifications into a compact live feed while keeping notification data on the machine.",
    contribution:
      "The system combines a C#/.NET collector, SQLite persistence, a loopback HTTP API and Server-Sent Events with a React/TypeScript dashboard, including deduplication, retention and privacy-first source controls.",
    stack: "C# · .NET · React · TypeScript · SQLite",
    status: "LIVE · BUILDING",
    statusTone: "green",
    githubUrl: null,
    hasGithub: true,
    hasSite: false,
  },
  {
    id: "village",
    title: "village-square",
    short: "A community platform concept.",
    overview: "A private community platform concept.",
    contribution: "Private project",
    stack: "Product definition · web application · systems thinking",
    status: "PLANNED",
    statusTone: "grey",
    githubUrl: null,
    hasGithub: false,
    hasSite: false,
    private: true,
  },
  {
    id: "quant",
    title: "small-quant-model",
    short: "Machine-learning research for intraday momentum setups.",
    overview:
      "An MVP machine-learning research platform for intraday stock-trading analysis, focused on high-relative-volume momentum setups. It replays historical one-minute OHLCV data as an unfolding chart, generates entry and exit signals, and evaluates performance through historical backtesting and paper-trading workflows.",
    contribution:
      "I built a modular architecture that separates data ingestion, feature engineering, labelling, model algorithms and backtesting rules so each layer can evolve independently. The longer-term research direction is to explore scalable neural networks that learn chart behaviour, trade timing and market structure from historical stock data.",
    stack: "Python · machine learning · OHLCV · backtesting",
    status: "PAUSED",
    statusTone: "amber",
    githubUrl: null,
    hasGithub: true,
    hasSite: false,
  },
];
