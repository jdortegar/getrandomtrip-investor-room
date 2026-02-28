export interface MarketingDictionary {
  valueProposition: {
    title: string;
    titleBold: string;
    description: string;
    descriptionBold: string;
    descriptionBody: string;
    /** Paragraph HTML (e.g. with <strong>). Rendered as-is. */
    descriptionHtml: string;
    bullets: string[];
    foundingRound: string;
    ctaButton: string;
  };
  problemSolution: {
    problem: {
      description: string;
      descriptionHtml: string;
      highlight: string;
      highlightSuffix: string;
      title: string;
    };
    solution: {
      description: string;
      descriptionHtml: string;
      highlight: string;
      highlightSuffix: string;
      title: string;
    };
    whyNow: {
      contentHtml: string;
      lines: string[];
      title: string;
    };
  };
  paragraph: string;
  paragraphBold: string;
  /** Mobile view: HTML string (e.g. with <br /> and <strong>). */
  paragraphMobileHtml: string;
  /** Desktop view: HTML string (e.g. with <br /> and <strong>). */
  paragraphDesktopHtml: string;
  threeDecisions: {
    sectionTitle: string;
    headline: string;
    headlineBold: string;
    /** Subtitle HTML (e.g. with <strong>). Rendered with dangerouslySetInnerHTML. */
    subtitleHtml: string;
    decisions: Array<{ label: string; title: string }>;
  };
  systemFeatures: {
    headline: string;
    headlineBold: string;
    /** Subtitle HTML (e.g. with <br /> and <strong>). Rendered with dangerouslySetInnerHTML. */
    subtitleHtml: string;
    features: Array<{
      title: string;
      /** Description HTML (e.g. with <br /> and <strong>). Rendered with dangerouslySetInnerHTML. */
      descriptionHtml: string;
    }>;
  };
  businessModels: {
    cards: Array<{
      channel: string;
      description?: string;
      descriptionLabel?: string;
      margin?: string;
      marginLabel?: string;
      name: string;
      imageUrl: string;
      backgroundColor?: string | null;
    }>;
    description: string;
    headline1: string;
    headline2: string;
    title: string;
  };
  businessVerticals: {
    cards: Array<{
      description: string[];
      title: string;
    }>;
    title: string;
  };
  community: {
    features: Array<{
      description: string;
      title: string;
    }>;
    profiles: Array<{
      description: string;
      name: string;
      role: string;
    }>;
    subtitle: string;
    title: string;
  };
  footer: {
    tagline: string;
    visitButton: string;
  };
  howItWorks: {
    sectionDescription: string;
    steps: Array<{ description: string; title: string }>;
    title: string;
  };
  inspiration: {
    ctaButton: string;
    headline: string;
    subtext?: string;
  };
  metrics: {
    headline: string;
    sam: string;
    samLabel: string;
    som: string;
    somLabel: string;
    sources: string;
    tam: string;
    tamLabel: string;
  };
  nav: {
    contact: string;
    home: string;
    investorsRoom: string;
    logIn: string;
  };
  roadmap: {
    title: string;
    phases: Array<{
      period: string;
      subtitle?: string;
      items: string[];
    }>;
  };
  safe: {
    title: string;
    description: string;
    marketingLabel: string;
    operationsLabel: string;
    techLabel: string;
    marketingItems: string[];
    operationsItems: string[];
    techItems: string[];
  };
  team: {
    members: Array<{
      description: string;
      name: string;
      role: string;
    }>;
    title: string;
  };
  waitlist: {
    adminLoginLabel: string;
    emailPlaceholder: string;
    headline: string;
    lastNamePlaceholder: string;
    loginModal: {
      description: string;
      passwordPlaceholder: string;
      submitButton: string;
      title: string;
      usernamePlaceholder: string;
    };
    namePlaceholder: string;
    subheadline: string;
    submitButton: string;
    successMessage: string;
  };
}
