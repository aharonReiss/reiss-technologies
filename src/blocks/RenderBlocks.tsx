import React from 'react'

import type { Page } from '@/payload-types'
import { BlogTeaserBlock } from './BlogTeaser/Component'
import { ContactFormBlock } from './ContactForm/Component'
import { ContactStartBlock } from './ContactStart/Component'
import { CTABlock } from './CTA/Component'
import { DeviceShowcaseBlock } from './DeviceShowcase/Component'
import { FAQBlock } from './FAQ/Component'
import { FeatureGridBlock } from './FeatureGrid/Component'
import { FounderBlock } from './Founder/Component'
import { PricingBlock } from './Pricing/Component'
import { ManifestoBlock } from './Manifesto/Component'
import { WorkRailBlock } from './WorkRail/Component'
import { ServiceStackBlock } from './ServiceStack/Component'
import { CapabilitiesBlock } from './Capabilities/Component'
import { HeroBlock } from './Hero/Component'
import { ImageTextBlock } from './ImageText/Component'
import { LogoCloudBlock } from './LogoCloud/Component'
import { ProcessStepsBlock } from './ProcessSteps/Component'
import { ProjectGalleryBlock } from './ProjectGallery/Component'
import { ProjectStoriesBlock } from './ProjectStories/Component'
import { AboutStudioBlock } from './AboutStudio/Component'
import { QuoteRotatorBlock } from './QuoteRotator/Component'
import { ServiceMenuBlock } from './ServiceMenu/Component'
import { StatementBlock } from './Statement/Component'
import { ProjectsGridBlock } from './ProjectsGrid/Component'
import { RichTextBlock } from './RichText/Component'
import { ServicesGridBlock } from './ServicesGrid/Component'
import { StatsBlock } from './Stats/Component'
import { TestimonialsBlock } from './Testimonials/Component'

type LayoutBlock = NonNullable<Page['layout']>[number]

const components: {
  [K in LayoutBlock['blockType']]: React.ComponentType<Extract<LayoutBlock, { blockType: K }>>
} = {
  hero: HeroBlock,
  manifesto: ManifestoBlock,
  workRail: WorkRailBlock,
  serviceStack: ServiceStackBlock,
  capabilities: CapabilitiesBlock,
  richText: RichTextBlock,
  imageText: ImageTextBlock,
  deviceShowcase: DeviceShowcaseBlock,
  founder: FounderBlock,
  pricing: PricingBlock,
  featureGrid: FeatureGridBlock,
  servicesGrid: ServicesGridBlock,
  projectGallery: ProjectGalleryBlock,
  serviceMenu: ServiceMenuBlock,
  statement: StatementBlock,
  quoteRotator: QuoteRotatorBlock,
  projectStories: ProjectStoriesBlock,
  aboutStudio: AboutStudioBlock,
  projectsGrid: ProjectsGridBlock,
  processSteps: ProcessStepsBlock,
  stats: StatsBlock,
  testimonials: TestimonialsBlock,
  faq: FAQBlock,
  logoCloud: LogoCloudBlock,
  blogTeaser: BlogTeaserBlock,
  cta: CTABlock,
  contactForm: ContactFormBlock,
  contactStart: ContactStartBlock,
}

export function RenderBlocks({ blocks }: { blocks?: LayoutBlock[] | null }) {
  if (!blocks?.length) return null
  return (
    <>
      {blocks.map((block, i) => {
        const Component = components[block.blockType] as React.ComponentType<LayoutBlock>
        return Component ? <Component key={block.id ?? i} {...block} /> : null
      })}
    </>
  )
}
