import React from 'react'

import type { ContactStartBlock as ContactStartBlockProps } from '@/payload-types'
import { getGlobal } from '@/utilities/payload'
import { faqJsonLd } from '@/utilities/seo'
import { WhatsAppForm } from './WhatsAppForm'

/**
 * The contact page in one block: a welcoming headline and a four-field form that
 * prepares a WhatsApp message (the visitor sends it themselves), then a short
 * navy FAQ. The number comes from Site Settings; nothing is sent to a server.
 */
export async function ContactStartBlock({
  heading,
  intro,
  projectTypes,
  greeting,
  signoff,
  directMessage,
  faqHeading,
  faqs,
  anchor,
}: ContactStartBlockProps) {
  const { contact } = await getGlobal('site-settings', 0)
  const number = contact?.whatsapp?.replace(/\D/g, '') || null
  const title = heading.replace(/\.$/, '')
  const questions = faqs ?? []

  const structured = faqJsonLd(questions)

  return (
    <>
      {structured && <script type="application/ld+json" dangerouslySetInnerHTML={structured} />}
      <section id={anchor || undefined} className="bg-muted text-ink">
        <div className="container-site grid gap-6 pt-[calc(72px+1.5rem)] pb-14 md:grid-cols-12 md:gap-x-16 md:pt-[calc(72px+9vh)] md:pb-[12vh]">
          <div className="md:col-span-5">
            <h1 className="m-0 font-display text-[clamp(2.6rem,12.4vw,3.7rem)] leading-[0.98] font-black tracking-[-0.045em] !text-ink md:text-[min(5.9vw,11svh,6.6rem)]">
              {title}
              <span className="text-brand">.</span>
            </h1>
            {intro && (
              // One sentence per line (Enter in the CMS); the last two words of a line stay
              // together, so a narrow screen never leaves one word on its own.
              <p className="mt-3 mb-0 text-base leading-[1.75] whitespace-pre-line text-body min-[380px]:text-[1.0625rem] md:mt-8 md:text-xl">
                {intro.replace(/ (\S+)$/gm, ' $1')}
              </p>
            )}
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-2">
            <WhatsAppForm
              number={number}
              projectTypes={(projectTypes ?? []).map((t) => t.label)}
              greeting={greeting ?? ''}
              signoff={signoff ?? ''}
              directMessage={directMessage ?? ''}
            />
          </div>
        </div>
      </section>

      {questions.length > 0 && (
        <section aria-labelledby="contact-faq" className="section-dark bg-ink text-white/70">
          <div className="container-site grid gap-8 py-16 md:grid-cols-12 md:gap-x-16 md:py-[12vh]">
            {faqHeading && (
              <h2
                id="contact-faq"
                className="m-0 max-w-[16ch] font-display text-[clamp(1.75rem,7.4vw,2.2rem)] leading-[1.1] font-extrabold tracking-[-0.03em] !text-white md:col-span-5 md:text-[clamp(2rem,2.8vw,2.75rem)]"
              >
                {faqHeading.replace(/\.$/, '')}
                <span className="text-brand">.</span>
              </h2>
            )}
            {/* One answer open at a time: the shared name makes the details exclusive. */}
            <div className="border-t border-white/15 md:col-span-7">
              {questions.map((f, i) => (
                <details key={f.id ?? i} name="contact-faq" className="contact-faq group border-b border-white/15">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-lg leading-snug font-semibold text-white md:text-xl [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span
                      aria-hidden
                      className="relative size-4 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:bg-brand after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:bg-brand after:transition-transform after:duration-300 group-open:after:scale-y-0 motion-reduce:after:transition-none"
                    />
                  </summary>
                  <p className="m-0 max-w-[52ch] pb-6 text-base leading-[1.7] text-white/75 md:text-lg">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
