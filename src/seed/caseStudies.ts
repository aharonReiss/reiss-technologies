import fs from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'
import sharp from 'sharp'

import type { Project } from '@/payload-types'

const assets = path.resolve(process.cwd(), 'src/seed/assets')

/** Uploads a capture made by scripts/capture-case-study.mjs. */
const upload = async (payload: Payload, file: string, alt: string) => {
  const data = await fs.readFile(path.join(assets, `${file}.png`))
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data, mimetype: 'image/png', name: `${file}.png`, size: data.length },
    context: { disableRevalidate: true },
  })
  return doc.id
}

/** Crops a capture to the size the projects gallery shows: from the top, or from `top` px down. */
const crop = async (payload: Payload, file: string, out: string, width: number, height: number, alt: string, top = 0) => {
  const src = sharp(path.join(assets, `${file}.png`))
  const data = await (top ? src.extract({ left: 0, top, width, height }) : src.resize({ width, height, fit: 'cover', position: 'top' }))
    .png()
    .toBuffer()
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data, mimetype: 'image/png', name: `${out}.png`, size: data.length },
    context: { disableRevalidate: true },
  })
  return doc.id
}

/**
 * The two images of each project on the projects page: its opening screen at
 * 16:10 for desktop and the top of the mobile site at 4:5 for phones.
 */
export const galleryImages: Record<string, (payload: Payload) => Promise<Partial<Project>>> = {
  seaview: async (payload) => ({
    galleryWide: await crop(payload, 'seaview-cs-hero', 'seaview-gallery-wide', 1440, 900, 'SEA VIEW: מסך הפתיחה של האתר'),
    galleryTall: await crop(payload, 'seaview-mobile', 'seaview-gallery-tall', 780, 975, 'SEA VIEW: מסך הפתיחה במובייל, מול הים', 500),
  }),
  hineni: async (payload) => ({
    galleryWide: await crop(payload, 'hineni-desktop', 'hineni-gallery-wide', 1440, 900, 'מכללת הנני: מסך הפתיחה של האתר'),
    galleryTall: await crop(payload, 'hineni-mobile', 'hineni-gallery-tall', 780, 975, 'מכללת הנני: מסך הפתיחה במובייל'),
  }),
  'emuna-art': async (payload) => ({
    galleryWide: await crop(payload, 'emuna-art-desktop', 'emuna-art-gallery-wide', 1440, 900, 'אמנות של אמונה: מסך הפתיחה של האתר'),
    galleryTall: await crop(payload, 'emuna-art-mobile', 'emuna-art-gallery-tall', 780, 975, 'אמנות של אמונה: מסך הפתיחה במובייל'),
  }),
}

/**
 * Case-study content per project. Everything here was checked against the live
 * site (screens, pages and features), October 2026.
 */
export const caseStudies: Record<string, (payload: Payload) => Promise<Partial<Project>>> = {
  seaview: async (payload) => {
    const shot = (name: string, alt: string) => upload(payload, `seaview-cs-${name}`, `SEA VIEW: ${alt}`)
    return {
      heroImage: await shot('hero', 'מסך הפתיחה של האתר'),
      desktopScroll: await shot('scroll', 'עמוד הבית בדסקטופ, מהפתיחה ועד הספא'),
      mobilePreview: await shot('m-full', 'עמוד הבית במובייל, מתחילתו ועד סופו'),
      mobileNote:
        'במובייל ההזמנה תמיד במרחק נגיעה: סרגל קבוע בתחתית המסך עם בדיקת זמינות, WhatsApp ונגישות, וטופס תאריכים שנפרש לרוחב המסך כולו.',
      details: [
        {
          title: 'בדיקת זמינות בכמה צעדים',
          text: 'בוחרים תאריכי צ׳ק־אין וצ׳ק־אאוט ומספר אורחים, ובודקים זמינות. אותו סרגל מופיע כבר במסך הפתיחה של עמוד הבית, ובעמוד הזמנה ייעודי.',
          images: [await shot('availability', 'עמוד בדיקת הזמינות'), await shot('m-availability', 'בדיקת זמינות במובייל')],
          kind: 'desktop',
        },
        {
          title: 'שלוש שפות, חוויה אחת',
          text: 'האתר זמין בעברית, באנגלית ובצרפתית. כל שפה מקבלת את כיוון הכתיבה שלה, והתפריט, הלוגו והטקסטים מתהפכים בהתאם.',
          images: [await shot('en', 'האתר באנגלית'), await shot('fr', 'האתר בצרפתית')],
          kind: 'desktop',
        },
        {
          title: 'עמוד לכל קהל',
          text: 'עמודים ייעודיים לשומרי שבת ולהתארגנות כלה, שמציגים לכל קהל בדיוק את מה שחשוב לו לפני ההזמנה.',
          images: [await shot('shabbat', 'העמוד לשומרי שבת')],
          kind: 'desktop',
        },
      ],
    }
  },
  hineni: async (payload) => ({
    mobilePreview: await upload(payload, 'hineni-cs-m-full', 'מכללת הנני: עמוד הבית במובייל, מתחילתו ועד סופו'),
  }),
  'emuna-art': async (payload) => ({
    mobilePreview: await upload(payload, 'emuna-art-cs-m-full', 'אמנות של אמונה: עמוד הבית במובייל, מתחילתו ועד סופו'),
  }),
}
