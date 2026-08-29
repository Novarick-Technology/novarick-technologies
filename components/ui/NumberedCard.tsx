import { Card } from "@/components/ui/Card";

type Tone = "light" | "dark";

const eyebrowClasses: Record<Tone, string> = {
  dark: "text-text-dim-alt",
  light: "text-text-body",
};

const titleClasses: Record<Tone, string> = {
  dark: "text-white",
  light: "text-black",
};

const paragraphClasses: Record<Tone, string> = {
  dark: "text-text-on-dark",
  light: "text-text-body-alt",
};

/** #E3E3E3 on dark list body text doesn't match any documented text token
 * (it collides with --line-light, a divider colour) — kept literal rather
 * than reusing that token for an unrelated purpose. */
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
        border={tone === "dark"}
        className={`flex flex-col gap-4 p-6 ${className}`}
      >
        <p
          className={`font-heading text-[12px] font-medium ${
            tone === "dark" ? "text-lime" : "text-text-body"
          }`}
        >
          {eyebrow}
        </p>
        <div className="flex flex-col gap-3.5 w-full">
          <div className="flex flex-col gap-2">
            <p className={`font-heading text-[30px] font-medium ${titleClasses[tone]}`}>
              {title}
            </p>
            <p className={`font-body text-[15px] leading-[22px] ${listBodyClasses[tone]}`}>
              {description}
            </p>
          </div>
          <ul className="flex flex-col gap-2.5 w-full">
            {items.map((item) => (
              <li key={item} className="flex items-center gap-[9px]">
                <span
                  className={`size-[5px] shrink-0 rounded-full ${dotClasses[tone]}`}
                  aria-hidden
                />
                <span className={`font-body text-[15px] ${listBodyClasses[tone]}`}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    );
  }

  const { eyebrow, title, body } = props;
  return (
    <Card tone={tone} className={`flex flex-col gap-20 p-6 ${className}`}>
      <p className={`font-heading text-[16px] font-medium ${eyebrowClasses[tone]}`}>
        {eyebrow}
      </p>
      <div className="flex flex-col gap-3 w-full">
        <p className={`font-heading text-[28px] font-medium ${titleClasses[tone]}`}>
          {title}
        </p>
        <p className={`font-body text-[16px] leading-6 ${paragraphClasses[tone]}`}>
          {body}
        </p>
      </div>
    </Card>
  );
}
