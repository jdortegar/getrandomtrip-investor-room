export interface MarketingDictionary {
  businessModels: {
    cards: Array<{
      channel: string;
      description?: string;
      descriptionLabel?: string;
      margin?: string;
      marginLabel?: string;
      name: string;
    }>;
    description: string;
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
  paragraph: string;
  roadmap: {
    panels: Array<{
      items: string[];
      year: string;
    }>;
    title: string;
  };
  safe: {
    allocations: Array<{ label: string }>;
    description: string;
    title: string;
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
