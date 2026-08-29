export const plans = [
  {
    tone: "light" as const,
    desktopPosition: "left" as const,
    title: "Managed retainer",
    price: "₦850,000",
    period: "per month",
    description:
      "We stay responsible for a live system maintenance, support, monitoring and the small changes the business keeps needing.",
    features: [
      "Agreed monthly engineering hours",
      "Technical maintenance and dependency updates",
      "Incident response inside agreed hours",
      "Monthly operational report",
      "Price is slightly negotiable",
    ],
  },
  {
    tone: "dark" as const,
    desktopPosition: "middle" as const,
    title: "Build project",
    price: "₦6,000,000",
    period: "per project",
    description:
      "A defined product or application, designed, built, deployed into an environment we manage, and handed over running.",
    features: [
      "Product, design and engineering",
      "Environments configured before code ships",
      "Deployment, domain and SSL setup",
      "30 days post-launch support included",
      "Price is slightly negotiable",
    ],
  },
  {
    tone: "light" as const,
    desktopPosition: "right" as const,
    title: "Consulting",
    price: "₦250,000",
    period: "per session agreed",
    description:
      "Technology and product strategy, architecture review, or an audit of something already running, by the people who would build it.",
    features: [
      "Technology and product strategy",
      "Infrastructure and architecture review",
      "Audit of an existing system",
      "Written findings and recommendations",
      "Price is slightly negotiable",
    ],
  },
];
