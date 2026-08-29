import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactForm } from "@/components/sections/ContactForm";

/**
 * Contact details card (nodes 480:381 desktop, 536:97 mobile) — value is
 * Inter Regular 18px, not the Jost body font used everywhere else for
 * this kind of row; a literal one-off, not the shared KVRow shape.
 */
function ContactDetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="font-body text-[14px] text-black">{label}</p>
      <p className="font-heading text-[18px] font-normal text-black">{value}</p>
    </div>
  );
}

const contactDetails = [
  { label: "Office Address", value: "Lagos Nigeria" },
  { label: "Support Email", value: "Novaricktech.com" },
  { label: "Whatsapp/Call Number", value: "00000000000" },
];

export default function Contact() {
  return (
    <>
      <Navbar />

      <WhoWeAre
        headline="Tell us what you need"
        gap="gap-4"
        text="Let's talk about what you need. Schedule a call with our team so we can learn more about your vision, understand your goals, and explore how we can bring them to life."
      />

      <div className="w-full px-4 pb-10 lg:px-20 lg:pb-6">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 lg:flex-row lg:items-start">
          <ContactForm />
          <Card
            tone="light"
            radius="panel"
            className="flex w-full flex-col gap-4 border border-black/5 px-4 py-6 lg:flex-1 lg:px-6"
          >
            {contactDetails.flatMap((row, i) => [
              <ContactDetailRow key={row.label} {...row} />,
              i < contactDetails.length - 1 && (
                <div key={`${row.label}-divider`} className="h-px w-full bg-black/10" />
              ),
            ])}
          </Card>
        </div>
      </div>

      <Section>
        <Testimonials heading="What they say about working with us" />
      </Section>

      <Footer />
    </>
  );
}
