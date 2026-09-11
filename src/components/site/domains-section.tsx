import { useEffect, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Section } from "@/components/site/section";
import { DomainSwitch } from "@/components/site/domain-switch";
import { useDomainState } from "@/components/domain-context";
import { domainList } from "@/data/domains";
import type { Domain } from "@/data/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * The five pillars, as one coverflow carousel at every width.
 *
 * This replaced a desktop-only layout of stacked full-width bands that
 * collapsed to vertical rails. The carousel says the same thing in a fifth of
 * the page height, and it behaves identically on a phone and on a desktop, so
 * there is one layout to reason about rather than two.
 *
 * Picking a domain in the switcher slides the carousel to it. Swiping does not
 * change the site theme in return: each card carries its own data-domain, so it
 * is already the right colour, and re-theming the whole page from a swipe would
 * be a large effect from a small gesture.
 */
export function DomainsSection() {
  const { active } = useDomainState();
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (!swiper || swiper.destroyed || active === "all") return;
    const index = domainList.findIndex((d) => d.id === active);
    // realIndex / slideToLoop, not activeIndex / slideTo: looping inserts
    // duplicated slides, so the raw index no longer matches the domain list.
    if (index >= 0 && index !== swiper.realIndex) swiper.slideToLoop(index);
  }, [swiper, active]);

  return (
    <Section
      id="domains"
      index="02"
      eyebrow="What I actually do"
      title="About Domains"
      lead="A model that spots the risk. A contract that moves the money. Checks that keep both safe. Then the screens and the database around all of it. In financial software these are not separate jobs."
      aside={
        <DomainSwitch
          className="hidden md:inline-flex"
          size="sm"
          layoutId="domain-switch-section"
        />
      }
    >
      {/* Coverflow puts transform-style: preserve-3d on the slide wrapper, and an
          element inside a 3D context cannot be clipped by an ancestor's
          overflow. The slides therefore escaped the carousel and were sliced
          square by the viewport edge. This wrapper is flat, so it clips, and
          the mask dissolves the outermost cards instead of cutting them. */}
      {/* The pagination vars live out here because the dots are rendered into
          the control row below, outside the carousel element itself. */}
      <div
        style={
          {
            "--swiper-pagination-color": "var(--domain)",
            "--swiper-pagination-bullet-inactive-color":
              "var(--muted-foreground)",
            "--swiper-pagination-bullet-inactive-opacity": "0.4",
            "--swiper-pagination-bullet-size": "7px",
          } as React.CSSProperties
        }
      >
        <div className="fade-edges relative overflow-hidden">
          <Swiper
            onSwiper={setSwiper}
            modules={[EffectCoverflow, Pagination]}
            effect="coverflow"
            grabCursor
            loop
            slideToClickedSlide
            centeredSlides
            slidesPerView="auto"
            spaceBetween={16}
            coverflowEffect={{
              rotate: 18,
              stretch: 0,
              depth: 130,
              modifier: 1.6,
              slideShadows: false,
            }}
            pagination={{ el: ".domains-pagination", clickable: true }}
            // Swiper preventDefaults the pointerdown unless the target itself
            // matches its focusableElements list. The accordion label is a
            // <span> inside the trigger, so it did not match and the press
            // never reached Radix - only the chevron area worked, where the
            // chevron is pointer-events-none and the target is the button.
            // This makes Swiper stand back for anything inside a control;
            // swiping from the rest of the card is unaffected.
            noSwipingSelector="button, a, [role='button'], input, textarea, select"
            observer
            observeParents
            className="domain-swiper !pb-2"
          >
            {domainList.map((domain) => (
              // Narrower slides on wider screens, so the neighbouring cards stay
              // visible either side instead of one card filling the row.
              <SwiperSlide
                key={domain.id}
                className="!h-auto !w-[86%] max-w-sm sm:!w-[62%] sm:max-w-md lg:!w-[46%] lg:max-w-lg xl:!w-[40%] xl:max-w-xl"
              >
                <div
                  data-domain={domain.id}
                  className="hud-corner flex h-full flex-col rounded-lg border border-border bg-card/40 p-6 lg:p-8"
                >
                  <PanelHead domain={domain} />
                  <PanelBody domain={domain} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Arrows sit either side of the dots rather than over the cards, where
          they would cover the copy. */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Arrow direction="prev" onClick={() => swiper?.slidePrev()} />
          <div className="domains-pagination !static !w-auto" />
          <Arrow direction="next" onClick={() => swiper?.slideNext()} />
        </div>
      </div>
    </Section>
  );
}

function Arrow({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous domain" : "Next domain"}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 hover:border-[var(--domain)] hover:text-[var(--domain)]"
    >
      <Icon className="size-4" />
    </button>
  );
}

/** Shared chip list. */
function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded border border-border/80 bg-background/50 px-2 py-1 font-mono text-[10px] tracking-wide text-muted-foreground transition-colors duration-300 hover:border-[var(--domain)]/50 hover:text-[var(--domain)]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function PanelHead({ domain }: { domain: Domain }) {
  return (
    <header className="mb-5">
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[10px] tracking-[0.18em] text-[var(--domain)]">
          {domain.index}
        </span>
        <span className="h-px flex-1 bg-border" />
        <span className="eyebrow text-muted-foreground">{domain.label}</span>
      </div>
      <h3 className="font-display display-md mt-4 text-foreground">
        {domain.title}
      </h3>
      <p className="mt-2 font-serif text-base text-[var(--domain)] italic">
        {domain.statement}
      </p>
    </header>
  );
}

function PanelBody({ domain }: { domain: Domain }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <p className="text-[13px] leading-[1.55] text-muted-foreground text-pretty">
        {domain.body}
      </p>

      <Accordion type="multiple" className="mt-5 border-t border-border">
        {domain.groups.map((group) => (
          <AccordionItem
            key={group.name}
            value={group.name}
            className="border-b border-border"
          >
            {/* The chevrons are pointer-events-none, so a click there lands on
                the button and toggles. The label was a live target of its own,
                and inside the carousel that press never reached Radix. Making
                the label transparent to pointers means the whole row behaves
                like the chevron: the button is always what gets clicked.
                select-none stops a click on the words turning into a text
                drag, which the carousel reads as a swipe. */}
            <AccordionTrigger className="items-center gap-3 py-3 select-none hover:no-underline">
              <span className="eyebrow pointer-events-none text-muted-foreground">
                {group.name}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <Chips items={group.items} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* No border here: the last accordion row already closes with one, and
          the two together read as a double rule. */}
      <ul className="mt-6 space-y-2">
        {domain.proof.map((point) => (
          <li
            key={point}
            className="flex gap-2.5 text-[12.5px] leading-[1.5] text-foreground/80"
          >
            <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--domain)]" />
            <span className="text-pretty">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
