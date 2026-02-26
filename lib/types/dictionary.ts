export interface MarketingDictionary {
  valueProposition: {
    title: string;
    titleBold: string;
    description: string;
    descriptionBold: string;
    descriptionBody: string;
    bullets: string[];
    foundingRound: string;
    ctaButton: string;
  };
  problemSolution: {
    problem: {
      title: string;
      description: string;
      highlight: string;
      highlightSuffix: string;
    };
    solution: {
      title: string;
      description: string;
      highlight: string;
      highlightSuffix: string;
    };
    whyNow: {
      title: string;
      lines: string[];
    };
  };
  paragraph: string;
  paragraphBold: string;
  paragraphMobile: {
    line1: string;
    line2: string;
    line3: string;
    bold: string;
  };
  paragraphDesktop: {
    line1: string;
    bold: string;
  };
  threeDecisions: {
    sectionTitle: string;
    headline: string;
    headlineBold: string;
    subtitle: string;
    subtitleBold: string;
    decisions: Array<{ label: string; title: string }>;
  };
  systemFeatures: {
    headline: string;
    headlineBold: string;
    subtitle: string;
    subtitleBold: string;
    features: Array<{
      title: string;
      description: string;
      descriptionBold: string;
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
}
