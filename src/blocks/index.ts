import type { Block } from 'payload'

import { AboutStudioBlock } from './AboutStudio/config'
import { BlogTeaserBlock } from './BlogTeaser/config'
import { ContactFormBlock } from './ContactForm/config'
import { CTABlock } from './CTA/config'
import { ContactStartBlock } from './ContactStart/config'
import { DeviceShowcaseBlock } from './DeviceShowcase/config'
import { FAQBlock } from './FAQ/config'
import { FeatureGridBlock } from './FeatureGrid/config'
import { FounderBlock } from './Founder/config'
import { PricingBlock } from './Pricing/config'
import { ManifestoBlock } from './Manifesto/config'
import { WorkRailBlock } from './WorkRail/config'
import { ServiceStackBlock } from './ServiceStack/config'
import { CapabilitiesBlock } from './Capabilities/config'
import { HeroBlock } from './Hero/config'
import { ImageTextBlock } from './ImageText/config'
import { LogoCloudBlock } from './LogoCloud/config'
import { ProcessStepsBlock } from './ProcessSteps/config'
import { ProjectGalleryBlock } from './ProjectGallery/config'
import { ProjectStoriesBlock } from './ProjectStories/config'
import { QuoteRotatorBlock } from './QuoteRotator/config'
import { ServiceMenuBlock } from './ServiceMenu/config'
import { StatementBlock } from './Statement/config'
import { ProjectsGridBlock } from './ProjectsGrid/config'
import { RichTextBlock } from './RichText/config'
import { ServicesGridBlock } from './ServicesGrid/config'
import { StatsBlock } from './Stats/config'
import { TestimonialsBlock } from './Testimonials/config'

/** Every block available in a page layout, in the order shown in the admin picker. */
export const layoutBlocks: Block[] = [
  HeroBlock,
  ManifestoBlock,
  AboutStudioBlock,
  WorkRailBlock,
  ServiceStackBlock,
  ServiceMenuBlock,
  StatementBlock,
  QuoteRotatorBlock,
  ProjectStoriesBlock,
  CapabilitiesBlock,
  RichTextBlock,
  ImageTextBlock,
  FounderBlock,
  DeviceShowcaseBlock,
  ServicesGridBlock,
  PricingBlock,
  FeatureGridBlock,
  ProjectGalleryBlock,
  ProjectsGridBlock,
  ProcessStepsBlock,
  StatsBlock,
  TestimonialsBlock,
  FAQBlock,
  LogoCloudBlock,
  BlogTeaserBlock,
  CTABlock,
  ContactStartBlock,
  ContactFormBlock,
]

/**
 * Retired blocks stay in the schema, so page history that used them keeps its data,
 * but are no longer offered to editors. The device showcase gave way to the case
 * study's own desktop showcase and scrollable phone preview.
 */
const retiredBlocks = new Set(['deviceShowcase'])
export const offeredBlocks = () => layoutBlocks.map((b) => b.slug).filter((slug) => !retiredBlocks.has(slug))
