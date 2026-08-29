import { Card } from "@/components/ui/Card";

type Tone = "light" | "dark";

/**
 * Paragraph variant has two genuinely different confirmed configurations,
 * not one style used at two sizes — CLAUDE.md's type table anticipates
 * this ("Card title" 28px vs "Card title small" 24-26px are different
 * named roles). "default" is Homepage's 4-card grid (nodes 466:8125-8144
 * desktop, 502:9+ mobile); "compact" is About Us's 6-card grid (nodes
 * 450:6990-7014 desktop, 524:87-116 mobile). Sizes, colours, AND which
 * breakpoint changes what all differ between the two — verified per
 * instance, not assumed to generalize.
 */
type ParagraphSize = "default" | "compact";

const paragraphEyebrowClasses: Record<ParagraphSize, Record<Tone, string>> = {
  default: {
    // Mobile dark eyebrow is literally lime (#D6FD70, node 524:113) — not
    // the same colour as the desktop dark eyebrow (#9AA3A0, node 466:8126).
    dark: "text-lime lg:text-text-dim-alt",
    light: "text-text-body",
  },
  compact: {
    // Compact variant's eyebrow colour doesn't shift by breakpoint at all
    // (dark: lime both, light: text-body both — nodes 450:7012 & 524:113
    // for dark; 450:6991 & 524:88 for light).
    dark: "text-lime",
    light: "text-text-body",
  },
};

const paragraphTitleClasses: Record<Tone, string> = {
  dark: "text-white",
  light: "text-black",
};

const paragraphBodyClasses: Record<ParagraphSize, Record<Tone, string>> = {
  default: {
    // Mobile #D1D1D1 (text-on-dark-alt) vs desktop #C0C0C0 (text-on-dark).
    dark: "text-text-on-dark-alt lg:text-text-on-dark",
    // Mobile #666666 (text-body-soft) vs desktop #4C4E4D (text-body-alt).
    light: "text-text-body-soft lg:text-text-body-alt",
  },
  compact: {
    // Compact variant's body colour is the same token at both breakpoints
    // (nodes 450:7014 & 524:116 dark; 450:6993 & 524:93 light).
    dark: "text-text-on-dark-alt",
    light: "text-text-body-soft",
  },
};

const listTitleClasses: Record<Tone, string> = {
  dark: "text-white",
  light: "text-black",
};

/** #E3E3E3 on dark list body text doesn't match any documented text token
 * (it collides with --line-light, a divider colour) — kept literal rather
 * than reusing that token for an unrelated purpose. Same colour at both
 * breakpoints; only the size changes (14px mobile, 15px desktop). */
const listBodyClasses: Record<Tone, string> = {
  dark: "text-[#e3e3e3]",
  light: "text-text-body-deep",
};

const dotClasses: Record<Tone, string> = {
  dark: "bg-lime",
  light: "bg-text-body-deep",
};

type NumberedCardProps = {
  tone?: Tone;
  className?: string;
} & (
  | {
      /** Plain "01" eyebrow + paragraph body — the 4/6/8-card "What we do" grids. */
      variant?: "paragraph";
      /** default = Homepage's 4-card grid, compact = About Us's 6-card
       * grid. See the module comment above — these are two confirmed
       * literal configurations, not one style at two sizes. */
      size?: ParagraphSize;
      eyebrow: string;
      title: string;
      body: string;
    }
  | {
      /** "TRACK 01" eyebrow + description + bullet list — the Tracks section. */
      variant: "list";
      eyebrow: string;
      title: string;
      description: string;
      items: string[];
    }
);

export function NumberedCard(props: NumberedCardProps) {
  const { tone = "light", className = "" } = props;

  if (props.variant === "list") {
    const { eyebrow, title, description, items } = props;
    return (
      <Card
        tone={tone}
        darkTrackBorder={tone === "dark"}
        className={`flex flex-col gap-4 px-4 py-6 lg:p-6 ${className}`}
      >
        <p
          className={`font-heading text-[12px] font-medium ${
            tone === "dark" ? "text-lime" : "text-text-body"
          }`}
        >
          {eyebrow}
        </p>
        <div className="flex flex-col gap-2 w-full">
          <p className={`font-heading text-[30px] font-medium ${listTitleClasses[tone]}`}>
            {title}
          </p>
          <div className="flex flex-col gap-3.5 w-full">
            <p className={`font-body text-[14px] leading-[22px] lg:text-[15px] ${listBodyClasses[tone]}`}>
              {description}
            </p>
            <ul className="flex flex-col gap-2.5 w-full">
              {items.map((item) => (
                <li key={item} className="flex items-center gap-[9px]">
                  <span
                    className={`size-[5px] shrink-0 rounded-full ${dotClasses[tone]}`}
                    aria-hidden
                  />
                  <span className={`font-body text-[14px] lg:text-[15px] ${listBodyClasses[tone]}`}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    );
  }

  const { eyebrow, title, body, size = "default" } = props;

  if (size === "compact") {
    return (
      <Card tone={tone} className={`flex flex-col gap-8 p-6 ${className}`}>
        <p className={`font-heading text-[12px] font-medium ${paragraphEyebrowClasses.compact[tone]}`}>
          {eyebrow}
        </p>
        <div className="flex flex-col gap-2 w-full">
          <p className={`font-heading text-[26px] font-medium tracking-[-1.3px] ${paragraphTitleClasses[tone]}`}>
            {title}
          </p>
          <p
            className={`font-body text-[14px] leading-[22px] tracking-[-0.32px] lg:text-[16px] ${paragraphBodyClasses.compact[tone]}`}
          >
            {body}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card tone={tone} className={`flex flex-col gap-8 p-6 lg:gap-20 ${className}`}>
      <p className={`font-heading text-[12px] font-medium lg:text-[16px] ${paragraphEyebrowClasses.default[tone]}`}>
        {eyebrow}
      </p>
      <div className="flex flex-col gap-2 w-full lg:gap-3">
        <p
          className={`font-heading text-[26px] font-medium tracking-[-1.3px] lg:text-[28px] lg:tracking-normal ${paragraphTitleClasses[tone]}`}
        >
          {title}
        </p>
        <p
          className={`font-body text-[14px] leading-[22px] tracking-[-0.28px] lg:text-[16px] lg:leading-6 lg:tracking-normal ${paragraphBodyClasses.default[tone]}`}
        >
          {body}
        </p>
      </div>
    </Card>
  );
}
