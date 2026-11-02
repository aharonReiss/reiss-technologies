/**
 * Demo content so the site can be viewed end to end.
 * Run with `pnpm seed`. It REPLACES all content (users and leads are kept).
 */
import fs from 'fs/promises'
import path from 'path'
import type { CollectionSlug, Payload } from 'payload'
import { getPayload } from 'payload'
import sharp from 'sharp'

import config from '@payload-config'
import type { Service } from '@/payload-types'
import { abstractArt, palettes, svgToPng, websiteMockup, wordmark } from './images'
import { doc, h, p, quote, ul } from './lexical'
import { aboutStudio } from './aboutStudio'
import { projectStories } from './projectStories'
import { caseStudies, galleryImages } from './caseStudies'

const ctx = { disableRevalidate: true }

/** Brand promise from the business strategy; used for SEO defaults and the footer. */
const SITE_DESCRIPTION =
  'אתרים מקצועיים ומערכות Web לעסקים: עיצוב, ביצועים, SEO, ניהול תוכן ופיתוח בהתאמה אישית.'

const FOUNDER = {
  name: 'אהרן רייס',
  role: 'מייסד REISS DIGITAL',
  signature: 'אהרן רייס',
}

const wipe: CollectionSlug[] = [
  'redirects',
  'pages',
  'posts',
  'categories',
  'projects',
  'services',
  'testimonials',
  'faqs',
  'clients',
  'media',
]

async function upload(payload: Payload, name: string, alt: string, svg: string) {
  return uploadBuffer(payload, name, alt, await svgToPng(svg))
}

async function uploadBuffer(payload: Payload, name: string, alt: string, data: Buffer) {
  return payload.create({
    collection: 'media',
    data: { alt },
    file: { data, mimetype: 'image/png', name: `${name}.png`, size: data.length },
    context: ctx,
  })
}

type Ref = { relationTo: 'pages' | 'services' | 'projects' | 'posts'; value: number }

const link = (
  reference: Ref,
  label: string,
  appearance: 'primary' | 'secondary' | 'link' = 'primary',
) => ({ type: 'reference' as const, reference, label, appearance })

const custom = (url: string, label: string, appearance: 'primary' | 'secondary' | 'link' = 'primary') => ({
  type: 'custom' as const,
  url,
  label,
  appearance,
})

async function seed() {
  const payload = await getPayload({ config })
  const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)

  log('Clearing existing content…')
  for (const collection of wipe) {
    await payload.delete({ collection, where: { id: { exists: true } }, context: ctx })
  }

  // ---------------------------------------------------------------- media
  log('Rendering images…')
  const projectData = [
    { slug: 'bloom-studio', name: 'Bloom Studio', title: 'Bloom Studio, סטודיו לעיצוב פרחים', client: 'Bloom Studio', tags: ['אתר תדמית', 'מיתוג'] },
    { slug: 'nordic-home', name: 'Nordic Home', title: 'Nordic Home, חנות רהיטים', client: 'Nordic Home', tags: ['חנות אונליין', 'WooCommerce'] },
    { slug: 'levi-law', name: 'Levi & Co. Law', title: 'משרד עורכי דין לוי ושות׳', client: 'לוי ושות׳', tags: ['אתר תדמית', 'SEO'] },
    { slug: 'fitpro', name: 'FitPro', title: 'FitPro, אפליקציית אימונים', client: 'FitPro', tags: ['דף נחיתה', 'קמפיין'] },
    { slug: 'urban-coffee', name: 'Urban Coffee', title: 'Urban Coffee, רשת בתי קפה', client: 'Urban Coffee', tags: ['אתר תדמית', 'הזמנות'] },
    { slug: 'medix-clinic', name: 'Medix Clinic', title: 'Medix, מרפאה פרטית', client: 'Medix', tags: ['אתר תדמית', 'זימון תורים'] },
  ]
  const covers = await Promise.all(
    projectData.map((pr, i) =>
      upload(payload, `project-${pr.slug}`, `צילום מסך של אתר ${pr.client}`, websiteMockup(pr.name, palettes[i % palettes.length]!)),
    ),
  )
  const postImages = await Promise.all(
    [0, 1, 2].map((i) => upload(payload, `post-${i}`, 'איור מופשט', abstractArt(palettes[(i + 3) % palettes.length]!, i + 1))),
  )
  // Real screenshots of hineni.io (captured with scripts/capture-screenshots.mjs).
  const assets = path.resolve(process.cwd(), 'src/seed/assets')
  const hineniDesktopFile = await fs.readFile(path.join(assets, 'hineni-desktop.png'))
  const hineniDesktop = await uploadBuffer(payload, 'hineni-desktop', 'צילום מסך של אתר מכללת הנני בדסקטופ', hineniDesktopFile)
  const hineniMobile = await uploadBuffer(
    payload,
    'hineni-mobile',
    'צילום מסך של אתר מכללת הנני במובייל',
    await fs.readFile(path.join(assets, 'hineni-mobile.png')),
  )
  const hineniCover = await uploadBuffer(
    payload,
    'hineni-cover',
    'אתר מכללת הנני',
    await sharp(hineniDesktopFile).extract({ left: 0, top: 0, width: 1440, height: 1080 }).png().toBuffer(),
  )
  // Real screenshots of the "אמנות של אמונה" gallery site.
  const seaviewDesktop = await uploadBuffer(payload, 'seaview-desktop', 'SEA VIEW: עמוד הבית בדסקטופ', await fs.readFile(path.join(assets, 'seaview-desktop.png')))
  const seaviewMobile = await uploadBuffer(payload, 'seaview-mobile', 'SEA VIEW: עמוד הבית במובייל', await fs.readFile(path.join(assets, 'seaview-mobile.png')))
  const emunaDesktopFile = await fs.readFile(path.join(assets, 'emuna-art-desktop.png'))
  const emunaDesktop = await uploadBuffer(payload, 'emuna-art-desktop', 'צילום מסך של אתר אמנות של אמונה בדסקטופ', emunaDesktopFile)
  const emunaMobile = await uploadBuffer(
    payload,
    'emuna-art-mobile',
    'צילום מסך של אתר אמנות של אמונה במובייל',
    await fs.readFile(path.join(assets, 'emuna-art-mobile.png')),
  )
  const emunaCover = await uploadBuffer(
    payload,
    'emuna-art-cover',
    'אתר אמנות של אמונה',
    await sharp(emunaDesktopFile).extract({ left: 0, top: 0, width: 1440, height: 1080 }).png().toBuffer(),
  )


  // The founder's real handwritten signature (prepared with scripts/prepare-signature.mjs).
  const signatureImage = await uploadBuffer(
    payload,
    'signature',
    `חתימה: ${FOUNDER.name}`,
    await fs.readFile(path.join(assets, 'signature.png')),
  )
  const founderPortrait = await uploadBuffer(
    payload,
    'founder',
    `${FOUNDER.name}, ${FOUNDER.role}`,
    await fs.readFile(path.join(assets, 'founder.png')),
  )
  // The same cutout, smiling: the home page portrait turns to it.
  const founderSmile = await uploadBuffer(
    payload,
    'founder-smile',
    `${FOUNDER.name} מחייך`,
    await fs.readFile(path.join(assets, 'founder-smile.png')),
  )

  const clientNames = ['Bloom', 'Nordic', 'FitPro', 'Medix', 'Urban', 'Levi&Co', 'Atlas', 'Kite']
  const logos = await Promise.all(
    clientNames.map((n, i) => upload(payload, `logo-${i}`, `לוגו ${n}`, wordmark(n, i))),
  )

  // ----------------------------------------------------------- components
  log('Creating services…')
  // The product basket: business websites, online stores and custom systems.
  const list = (items: string[]) => items.map((text) => ({ text }))
  const serviceData: Pick<Service, 'slug' | 'title' | 'icon' | 'excerpt' | 'pricing' | 'menu'>[] = [
    {
      slug: 'business-websites',
      title: 'אתרי תדמית ומותג',
      icon: 'briefcase',
      excerpt: 'אתר שמציג את העסק שלכם בדיוק כמו שצריך, ובונה את הרושם הנכון מהרגע הראשון.',
      menu: {
        text: 'אתר שמציג את העסק בצורה מקצועית, ועוזר ללקוחות להבין למה לבחור דווקא בכם.',
        capabilities: list(['עיצוב מותאם למובייל ולדסקטופ', 'התאמה למנועי חיפוש', 'טפסים ודרכי יצירת קשר', 'ניהול תוכן עצמאי, לפי הצורך']),
        ctaLabel: 'בואו נדבר על האתר שלכם',
        contactType: 'אתר תדמית',
      },
      pricing: {
        // Approved starting price for a simple, limited-scope website.
        price: 3500,
        showPrice: true,
        priceNote: 'לפני מע״מ',
        purpose:
          'אתר תדמית הוא הכרטיס הדיגיטלי של העסק: המקום שבו לקוח פוטנציאלי מבין מי אתם, מה אתם מציעים ולמה כדאי לבחור בכם, ומשאיר פרטים.',
        niches: list(['מכללות ומוסדות לימוד', 'קליניקות ומטפלים', 'משרדים ונותני שירות', 'חברות B2B']),
        included: list([
          'עמודים לפי צורך העסק: בית, אודות, שירותים וצור קשר',
          'עיצוב מותאם למותג ורספונסיבי למובייל',
          'טופס יצירת קשר וקישור ל־WhatsApp',
          'מערכת לניהול תוכן בעברית',
          'SEO טכני וחיבור Google Search Console',
          'הדרכה במסירת האתר',
        ]),
        process: list([
          'שיחת היכרות ואפיון: מטרות, קהל ומבנה העמודים',
          'עיצוב מותאם למותג, במובייל ובדסקטופ',
          'בנייה, חיבור טפסים ו־WhatsApp והגדרות SEO',
          'העלאה לאוויר, בדיקות והדרכה',
        ]),
      },
    },
    {
      slug: 'online-store',
      title: 'חנויות אונליין',
      icon: 'cart',
      excerpt: 'חוויית קנייה נוחה ומדויקת, שמאפשרת ללקוחות לקנות ולעסק שלכם לצמוח.',
      menu: {
        text: 'חנות שבה קל ללקוחות למצוא, לבחור ולשלם, וקל לכם לנהל את המוצרים וההזמנות.',
        capabilities: list(['קטלוג מוצרים וקטגוריות', 'סליקה ותהליך רכישה', 'ניהול מוצרים והזמנות', 'חיבור למערכות נוספות לפי הצורך']),
        ctaLabel: 'בואו נדבר על החנות שלכם',
        contactType: 'חנות אונליין',
      },
      pricing: {
        price: 12000,
        // Not approved for the site yet: shown as "מחיר בהתאם לפרויקט".
        showPrice: false,
        priceNote: 'לפני מע״מ',
        highlighted: true,
        purpose:
          'חנות אונליין מאפשרת למכור 24/7: הלקוח מוצא מוצר, משלם ומקבל אישור, ואתם מנהלים מוצרים, מלאי, הזמנות ומשלוחים ממקום אחד.',
        niches: list(['מותגים ויצרנים', 'חנויות שעוברות לאונליין', 'עסקים עם קטלוג מוצרים', 'מועדונים וקהילות']),
        included: list([
          'אפיון קטלוג, קטגוריות ומסלול רכישה',
          'עיצוב חנות מותאם למותג',
          'ניהול מוצרים, מלאי והזמנות',
          'חיבור סליקה ומשלוחים',
          'SEO לעמודי מוצרים וקטגוריות',
          'מדידת מכירות והמרות',
          'הדרכה ותמיכה בתקופת ההשקה',
        ]),
        process: list([
          'אפיון: מוצרים, קטגוריות, תשלום ומשלוח',
          'עיצוב עמוד בית, קטגוריה, מוצר וקופה',
          'פיתוח, חיבור סליקה ומשלוחים והעלאת מוצרים',
          'בדיקות רכישה, השקה והדרכה על ניהול החנות',
        ]),
      },
    },
    {
      slug: 'custom-systems',
      title: 'מערכות דיגיטליות',
      icon: 'layers',
      excerpt: 'מערכות מותאמות לעסק שלכם, שעוזרות לנהל תהליכים ולעבוד בצורה חכמה יותר.',
      menu: {
        text: 'מערכת שנבנית סביב תהליך העבודה שלכם, וחוסכת עבודה ידנית שחוזרת על עצמה.',
        capabilities: list(['מערכות הזמנות', 'אזורים אישיים ללקוחות', 'ממשקי ניהול', 'אוטומציות וחיבורים לשירותים חיצוניים']),
        ctaLabel: 'בואו נדבר על המערכת שלכם',
        contactType: 'מערכת דיגיטלית',
      },
      pricing: {
        showPrice: false,
        purpose:
          'מערכת שנבנית סביב תהליך העבודה שלכם (ניהול לקוחות, פניות, הרשמות ואינטגרציות) במקום לעבוד עם אקסלים וכלים שלא מדברים זה עם זה.',
        niches: list(['מוסדות לימוד', 'עסקי שירות עם הרבה לקוחות', 'חברות עם תהליכים ידניים']),
        included: list([
          'אפיון תהליך העבודה',
          'פיתוח Full Stack בהתאמה אישית',
          'אינטגרציות למערכות קיימות',
          'אזורים אישיים, הרשמה וטפסים מתקדמים',
          'ליווי לאחר העלייה לאוויר',
        ]),
        process: list([
          'אפיון התהליך והדרישות',
          'תכנון המערכת והצעת מחיר מפורטת',
          'פיתוח בשלבים עם בדיקות שוטפות',
          'הטמעה, הדרכה וליווי',
        ]),
      },
    },
  ]
  const services: Service[] = []
  for (const s of serviceData) {
    services.push(
      await payload.create({
        collection: 'services',
        context: ctx,
        data: {
          ...s,
          _status: 'published',
          content: doc(
            h('h2', 'מה מקבלים?'),
            p(`${s.excerpt} אנחנו מלווים אתכם מהאפיון ועד העלייה לאוויר, ונשארים זמינים גם אחרי.`),
            p('כל פרויקט נבנה על **קוד נקי ומהיר**, מותאם למובייל ולנגישות, ומחובר לכלי מדידה מהיום הראשון.'),
          ),
          features: [
            { title: 'אפיון ואסטרטגיה', description: 'מבינים את העסק, הקהל והמטרות לפני שמתחילים לעצב.' },
            { title: 'עיצוב בהתאמה אישית', description: 'בלי תבניות: עיצוב שנבנה סביב המותג שלכם.' },
            { title: 'פיתוח מהיר ומאובטח', description: 'ציוני ביצועים גבוהים ותשתית שגדלה איתכם.' },
            { title: 'מערכת ניהול נוחה', description: 'עורכים תוכן, תמונות ועמודים לבד, בלי לחכות לנו.' },
          ],
          meta: { title: s.title, description: s.excerpt },
        },
      }),
    )
  }

  log('Creating testimonials, FAQs, clients…')
  const testimonialData = [
    { name: 'מיכל אברהם', role: 'מנכ״לית', company: 'Bloom Studio', quote: 'מהפגישה הראשונה הרגשנו שמבינים אותנו. האתר החדש נראה מדהים, והפניות מהאתר הוכפלו בתוך חודשיים.' },
    { name: 'יואב כהן', role: 'בעלים', company: 'Nordic Home', quote: 'עברנו לחנות החדשה והמכירות אונליין עלו ב־60%. מקצוענים, זמינים, ועומדים בלוחות זמנים.' },
    { name: 'עו״ד דנה לוי', role: 'שותפה מנהלת', company: 'לוי ושות׳', quote: 'קיבלנו אתר מכובד שמשקף את המשרד, ותוך כמה חודשים התחלנו להופיע בעמוד הראשון בגוגל.' },
    { name: 'אורי שמעוני', role: 'סמנכ״ל שיווק', company: 'FitPro', quote: 'דפי הנחיתה שבנו לנו הורידו את עלות הליד בכמעט חצי. עבודה מדויקת ומבוססת נתונים.' },
  ]
  const testimonials = []
  for (const t of testimonialData) {
    testimonials.push(await payload.create({ collection: 'testimonials', context: ctx, data: { ...t, rating: 5 } }))
  }

  // Until real quotes arrive the services page shows these, each marked as temporary.
  const tempTestimonials = []
  for (let k = 1; k <= 3; k++) {
    const t = await payload.create({
      collection: 'testimonials',
      context: ctx,
      data: {
        quote: `כאן תופיע המלצה אמיתית של לקוח (${k} מתוך 3). הטקסט הזה זמני ויוחלף לפני שהעמוד יוצג ללקוחות.`,
        name: 'שם הלקוח',
        company: 'שם העסק',
        placeholder: true,
      },
    })
    tempTestimonials.push(t.id)
  }

  const faqData: [string, string][] = [
    ['כמה עולה אתר?', 'אתר תדמית פשוט מתחיל מ־3,500 ₪. חנויות ומערכות מתומחרות לפי היקף הפרויקט, והמחיר הסופי נקבע בהתאם לאפיון ולצרכים.'],
    ['אתר תדמית או חנות אונליין: מה מתאים לי?', 'אם המטרה היא להציג את העסק ולקבל פניות (למשל מכללה, קליניקה או משרד), אתר תדמית. אם אתם מוכרים מוצרים ורוצים שלקוחות יקנו ישירות מהאתר, עם תשלום ומשלוח, חנות אונליין. לא בטוחים? שיחה קצרה ונמליץ.'],
    ['האם אתר ב־3,500 ₪ הוא אתר מבוסס תבנית?', 'לא בהכרח. גם אתר פשוט יכול להיבנות בפיתוח מקצועי. המחיר תלוי בעיקר בהיקף הפרויקט, במורכבות העיצוב וביכולות הנדרשות.'],
    ['איך יודעים איזה שירות מתאים לנו?', 'לא חייבים לדעת מראש. בשיחה קצרה נבין מה העסק צריך ונעזור לבחור את הפתרון המתאים.'],
    ['אפשר להתחיל מאתר פשוט ולהרחיב בהמשך?', 'בהחלט. בהתאם לאופן שבו הפרויקט נבנה, אפשר לתכנן תשתית שתאפשר להוסיף עמודים ויכולות בהמשך. הרחבות יתומחרו לפי הצורך.'],
    ['כמה זמן לוקח לבנות אתר?', 'זה תלוי בהיקף הפרויקט, במורכבות ובזמינות החומרים. לאחר שנבין את הצרכים, נוכל להעריך את לוח הזמנים.'],
    ['מה כולל המחיר, ומה משפיע על הצעת המחיר?', 'המחיר נקבע לפי היקף הפרויקט: מספר העמודים, מורכבות העיצוב, התוכן והיכולות שצריך. אתר שמתחיל מ־3,500 ₪ הוא אתר בהיקף קטן יותר, לא בסטנדרט נמוך יותר. כל פרויקט נבנה באותה רמת פיתוח. לפני שמתחילים תקבלו הצעת מחיר שמפרטת מה כלול.'],
    ['איך יודעים איזה פתרון מתאים לנו?', 'לא צריך לדעת מראש. בשיחה הראשונה נבין מה העסק עושה, מי הלקוחות ומה אתם רוצים שהאתר ישיג, ונמליץ על הפתרון שמתאים לכם, גם אם הוא הפשוט מביניהם.'],
    ['מה נדרש מאיתנו במהלך העבודה?', 'בעיקר זמינות לשיחה ולמשוב. נבקש מכם מידע על העסק, תכנים ותמונות אם יש לכם, ואישור בנקודות שבהן מחליטים על הכיוון. אם חסר תוכן, נדבר על זה כבר בתחילת הדרך.'],
    ['מה קורה אחרי שהאתר עולה לאוויר?', 'האתר עובד, ואתם יכולים לעדכן בו תכנים בהתאם למה שהוגדר בפרויקט. אם תרצו בהמשך להוסיף עמודים או יכולות, נתמחר את ההרחבה לפי הצורך.'],
    ['האם אוכל לעדכן את האתר בעצמי?', 'כן. באתר העסקי המתקדם יש מערכת ניהול תוכן נוחה בעברית: עורכים טקסטים, תמונות, עמודים ומקרי בוחן בלי ידע טכני. כל חבילה כוללת הדרכה במסירה.'],
    ['אני צריך משהו מורכב יותר מאתר. אפשר?', 'בדיוק בשביל זה יש מערכות Web בהתאמה אישית: אינטגרציות למערכות קיימות, אזורים אישיים, הרשמה ותהליכים ייעודיים, עם הצעת מחיר לפי אפיון.'],
    ['יש לנו אתר ישן. אפשר לשדרג אותו?', 'כן. בודקים את האתר הקיים, שומרים על התוכן ועל הדירוג בגוגל באמצעות הפניות 301, ובונים אותו מחדש בצורה נכונה.'],
  ]
  const faqIds: Record<string, number> = {}
  for (const [question, answer] of faqData) {
    const f = await payload.create({ collection: 'faqs', context: ctx, data: { question, answer: doc(p(answer)) } })
    faqIds[question] = f.id
  }
  // The services page asks only these, in this order.
  const servicesFaqs = [
    'מה כולל המחיר, ומה משפיע על הצעת המחיר?',
    'איך יודעים איזה פתרון מתאים לנו?',
    'מה נדרש מאיתנו במהלך העבודה?',
    'מה קורה אחרי שהאתר עולה לאוויר?',
  ].map((q) => faqIds[q]!)

  for (const [i, name] of clientNames.entries()) {
    await payload.create({ collection: 'clients', context: ctx, data: { name, logo: logos[i]!.id } })
  }

  // ------------------------------------------------------------- projects
  log('Creating projects…')
  // Verified against the live site (seaviewpenthouse.co.il), October 2026.
  const seaview = await payload.create({
    collection: 'projects',
    context: ctx,
    data: {
      title: 'SEA VIEW, פנטהאוזים יוקרתיים מול הים בנתניה',
      slug: 'seaview',
      need: 'להציג שני פנטהאוזים שונים ולאפשר לאורחים למצוא בקלות את האפשרות המתאימה להם.',
      answer: 'אתר רב־לשוני עם חוויית מובייל מותאמת, עמוד לכל פנטהאוז ובדיקת זמינות לפי תאריכים.',
      client: 'SEA VIEW · Penthouses & Spa',
      tags: ['אתר אירוח פרימיום', 'בדיקת זמינות והזמנה'],
      excerpt: 'חוויה דיגיטלית לשני פנטהאוזים יוקרתיים מול הים בנתניה: עמוד לכל פנטהאוז, בדיקת זמינות לפי תאריכים ומספר אורחים, ושלוש שפות.',
      coverImage: seaviewDesktop.id,
      websiteUrl: 'https://seaviewpenthouse.co.il/he',
      desktopScreenshot: seaviewDesktop.id,
      mobileScreenshot: seaviewMobile.id,
      ...(await caseStudies.seaview(payload)),
      ...(await galleryImages.seaview(payload)),
      featured: true,
      challenge: doc(p('SEA VIEW מציע שני פנטהאוזים יוקרתיים מול הים בנתניה, גרנד פנטהאוז ומיני פנטהאוז, וגם את המתחם המלא. האתר צריך להעביר את תחושת האירוח היוקרתית, להציג כל פנטהאוז בנפרד, ולהוביל אורחים מישראל ומחו״ל לבדוק זמינות ולהזמין.')),
      solution: doc(
        p('בנינו אתר בעיצוב פרימיום שמוביל את המבקר מהחוויה אל ההזמנה, בדסקטופ ובמובייל.'),
        ul([
          'עמוד ייעודי לגרנד פנטהאוז, למיני פנטהאוז ולמתחם המלא',
          'בדיקת זמינות לפי תאריכי צ׳ק־אין וצ׳ק־אאוט ומספר אורחים',
          'עברית, אנגלית וצרפתית',
          'עמודים ייעודיים לשומרי שבת ולהתארגנות כלה',
          'ממשק מותאם לדסקטופ ולמובייל, עם פנייה מהירה ב־WhatsApp',
        ]),
      ),
      _status: 'published',
      meta: { title: 'SEA VIEW' },
    },
  })

  const hineni = await payload.create({
    collection: 'projects',
    context: ctx,
    data: {
      title: 'מכללת הנני, פסיכותרפיה חווייתית',
      slug: 'hineni',
      need: 'להציג מסלולי לימוד, מרצים ותוכן עשיר, ולאפשר לצוות לעדכן הכול בעצמו.',
      answer: 'אתר מהיר ונגיש עם מערכת ניהול תוכן מלאה, עמודי מסלולים ומרצים, פודקאסט ובלוג.',
      client: 'מכללת הנני',
      year: 2026,
      tags: ['אתר תדמית', 'מערכת ניהול'],
      excerpt: 'אתר למכללה לפסיכותרפיה חווייתית: מסלולי לימוד, צוות, פודקאסט, בלוג וקהילה. הכל מנוהל ממערכת אחת.',
      coverImage: hineniCover.id,
      websiteUrl: 'https://hineni.io',
      desktopScreenshot: hineniDesktop.id,
      mobileScreenshot: hineniMobile.id,
      featured: true,
      services: [services[0]!.id, services[2]!.id],
      challenge: doc(p('המכללה הייתה צריכה אתר שמציג מסלולי לימוד, מרצים ותוכן עשיר, ומאפשר לצוות לעדכן הכל בעצמו.')),
      solution: doc(
        p('בנינו אתר מהיר ונגיש עם מערכת ניהול תוכן מלאה, ממשק נוח בעברית ותשתית SEO.'),
        ul(['עמודי מסלולים עם מחזורים ותאריכים', 'עמודי מרצים', 'פודקאסט ובלוג', 'טפסי לידים ותיאום שיחה']),
      ),
      ...(await caseStudies.hineni(payload)),
      ...(await galleryImages.hineni(payload)),
      _status: 'published',
      meta: { title: 'מכללת הנני' },
    },
  })

  // A second real project, captured with scripts/capture-screenshots.mjs.
  const emunaArt = await payload.create({
    collection: 'projects',
    context: ctx,
    data: {
      title: 'אמנות של אמונה, קליגרפיה יהודית מקורית',
      slug: 'emuna-art',
      need: 'בית דיגיטלי שמציג את היצירות באווירה שמתאימה להן ומאפשר להזמין יצירה בקלות.',
      answer: 'אתר גלריה עם קולקציות לפי נושא, עמוד לכל יצירה והזמנה אישית ב־WhatsApp.',
      client: 'אמנות של אמונה',
      year: 2026,
      tags: ['אתר תדמית', 'גלריה'],
      excerpt: 'אתר גלריה לקליגרפיה יהודית מקורית: קולקציות לפי נושא, יצירות נבחרות, הזמנה אישית ופנייה ישירה ב־WhatsApp.',
      coverImage: emunaCover.id,
      websiteUrl: 'https://omanut-emuna.com',
      desktopScreenshot: emunaDesktop.id,
      mobileScreenshot: emunaMobile.id,
      featured: true,
      services: [services[0]!.id],
      challenge: doc(p('האמנית רצתה בית דיגיטלי שמציג את היצירות באווירה שמתאימה להן, ומאפשר להזמין יצירה בקלות.')),
      solution: doc(p('בנינו אתר גלריה רך ונקי: קולקציות לפי נושא, עמוד לכל יצירה, הזמנה אישית ופנייה ישירה ב־WhatsApp.')),
      ...(await caseStudies['emuna-art'](payload)),
      ...(await galleryImages['emuna-art'](payload)),
      _status: 'published',
      meta: { title: 'אמנות של אמונה' },
    },
  })

  for (const [i, pr] of projectData.entries()) {
    await payload.create({
      collection: 'projects',
      context: ctx,
      data: {
        title: pr.title,
        slug: pr.slug,
        client: pr.client,
        year: 2025 - (i % 2),
        tags: pr.tags,
        excerpt: `${pr.tags[0]} חדש ל${pr.client}, עם דגש על חוויית משתמש, מהירות והמרות.`,
        coverImage: covers[i]!.id,
        // Demo projects stay as drafts: only real work is published.
        featured: false,
        services: [services[i % 2]!.id],
        challenge: doc(p(`ל${pr.client} היה אתר ישן, איטי ולא מותאם למובייל, שלא הצליח להפוך מבקרים לפניות.`)),
        solution: doc(
          p('בנינו אתר חדש מאפס: אפיון מבוסס נתונים, עיצוב שמשקף את המותג ופיתוח מהיר במיוחד.'),
          ul(['עיצוב מחדש של כל העמודים', 'טפסים ממוקדי המרה', 'תשתית SEO מלאה', 'מערכת ניהול תוכן נוחה']),
        ),
        results: [
          { value: `+${80 + i * 15}%`, label: 'עלייה בפניות' },
          { value: '0.9s', label: 'זמן טעינה' },
          { value: '98', label: 'ציון ביצועים' },
        ],
        testimonial: testimonials[i % testimonials.length]!.id,
        _status: 'draft',
        meta: { title: pr.title },
      },
    })
  }

  // ----------------------------------------------------------------- blog
  log('Creating blog…')
  const categories = []
  for (const [title, slug] of [
    ['בניית אתרים', 'web'],
    ['שיווק דיגיטלי', 'marketing'],
    ['SEO', 'seo'],
  ] as const) {
    categories.push(await payload.create({ collection: 'categories', context: ctx, data: { title, slug } }))
  }
  const postData = [
    { slug: 'how-much-does-a-website-cost', title: 'כמה עולה לבנות אתר ב־2026? המדריך המלא', excerpt: 'פירוט מלא של כל הגורמים שמשפיעים על מחיר אתר, ואיך לקבל הצעת מחיר שאפשר להשוות.', cat: 0 },
    { slug: 'landing-page-conversion', title: '7 טיפים לדף נחיתה שממיר', excerpt: 'מהכותרת ועד הטופס: כל מה שצריך כדי שדף הנחיתה שלכם יביא יותר לידים מאותו תקציב.', cat: 1 },
    { slug: 'seo-basics', title: 'SEO לעסקים קטנים: מאיפה מתחילים?', excerpt: 'הצעדים הראשונים והחשובים ביותר כדי שגוגל יתחיל להכיר את האתר שלכם.', cat: 2 },
  ]
  // Sample articles stay as drafts until real ones are written.
  for (const [i, post] of postData.entries()) {
    await payload.create({
      collection: 'posts',
      context: ctx,
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        heroImage: postImages[i]!.id,
        categories: [categories[post.cat]!.id],
        publishedAt: new Date(Date.now() - i * 9 * 86400000).toISOString(),
        content: doc(
          p(post.excerpt),
          h('h2', 'למה זה חשוב?'),
          p('האתר הוא לרוב נקודת המגע הראשונה של לקוח עם העסק. **רושם ראשוני טוב** מתורגם ישירות לפניות ולמכירות.'),
          ul(['מהירות טעינה', 'התאמה מלאה למובייל', 'מסר ברור וקריאה לפעולה', 'אמון: המלצות, לקוחות ותוצאות']),
          h('h2', 'השורה התחתונה'),
          quote('אתר טוב הוא לא הוצאה. הוא איש המכירות הכי חרוץ שלכם.'),
          p('רוצים לשמוע איך זה יכול לעבוד אצלכם? דברו איתנו.'),
        ),
        _status: 'draft',
        meta: { title: post.title, description: post.excerpt },
      },
    })
  }

  // ---------------------------------------------------------------- pages
  log('Creating pages…')
  const createPage = (title: string, slug: string, layout: unknown[], description?: string, metaTitle?: string) =>
    payload.create({
      collection: 'pages',
      context: ctx,
      data: {
        title,
        slug,
        layout: layout as never,
        _status: 'published',
        meta: { title: metaTitle ?? title, description },
      },
    })

  // Created first so other pages can link to it.
  const contact = await createPage(
    'צור קשר',
    'contact',
    [
      {
        // A short form that prepares a WhatsApp message; the number comes from Site Settings.
        blockType: 'contactStart',
        heading: 'בואו נדבר על הפרויקט שלכם.',
        intro: 'יש לכם רעיון? מעולה.\nעדיין לא בטוחים בדיוק מה אתם צריכים? גם מצוין.\nספרו לנו קצת, ונחשוב יחד איך להתקדם.',
        projectTypes: ['אתר תדמית', 'חנות אונליין', 'מערכת דיגיטלית', 'עדיין לא בטוחים'].map((label) => ({ label })),
        greeting: 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL 👋',
        signoff: 'אשמח שנדבר!',
        directMessage: 'היי אהרן, הגעתי דרך האתר של REISS DIGITAL ואשמח להתייעץ לגבי פרויקט.',
        faqHeading: 'עוד כמה דברים שאולי רציתם לדעת.',
        faqs: [
          { question: 'כמה עולה לבנות אתר?', answer: 'המחיר תלוי בסוג הפרויקט, בהיקף ובפונקציות הנדרשות. אחרי שנבין מה אתם צריכים, נוכל להציע הצעת מחיר מותאמת.' },
          { question: 'כמה זמן לוקח לבנות אתר?', answer: 'משך העבודה תלוי במורכבות הפרויקט ובהיקף התוכן. נגדיר יחד לוחות זמנים לפני תחילת העבודה.' },
          { question: 'האם אוכל לעדכן את האתר בעצמי?', answer: 'אפשר לבנות ממשק ניהול שמאפשר לעדכן תכנים באופן עצמאי, בהתאם לצורכי הפרויקט.' },
          { question: 'אני עדיין לא יודע בדיוק מה אני צריך. אפשר לפנות?', answer: 'בהחלט. לא צריך להגיע עם אפיון מוכן. נתחיל משיחה ונעזור להבין מה הפתרון המתאים.' },
        ],
        anchor: 'contact',
      },
    ],
    'ספרו לנו בכמה מילים על העסק או על הרעיון, ונמשיך בשיחה בוואטסאפ. לא צריך אפיון מסודר כדי לפנות.',
  )
  const contactRef: Ref = { relationTo: 'pages', value: contact.id }

  // The founder's credo, shown on the home and about pages.
  const founderBlock = {
    blockType: 'founder',
    eyebrow: 'האני מאמין שלי',
    quote:
      [
        'אחרי ניסיון של שנים',
        'בפיתוח אתרי סחר למועדונים מהגדולים בישראל,',
        'השאיפה שלי היא לאפשר לכל עסק בישראל',
        '*אתר שיביא לו לקוחות* ויקפיץ את העסק שלו קדימה.',
      ].join('\n'),
    text: 'בין אם אתה עסק חדש ובין אם אתה עסק שכבר עובד שנים, לכולם מגיע אתר חזק ומדויק לעסק שלהם.',
    portrait: founderPortrait.id,
    signatureText: FOUNDER.signature,
    signatureImage: signatureImage.id,
    name: FOUNDER.name,
    role: FOUNDER.role,
    links: [{ link: link(contactRef, 'בוא נכיר') }],
  }

  const pricingBlock = {
    blockType: 'pricing',
    eyebrow: 'מה אנחנו בונים',
    heading: 'לעסקים שמבינים שאתר הוא *כלי עסקי*',
    intro: 'בוחרים את מה שמתאים לעסק, רואים בדיוק מה כלול ואיך התהליך עובד, ואם צריך משהו מורכב יותר, בונים הצעה מותאמת.',
    contactPage: contact.id,
    ctaLabel: 'לקבלת הצעה',
    note: 'המחירים לפני מע״מ. ההיקף המדויק נקבע באפיון, ולוח הזמנים תלוי גם בקבלת התכנים מכם.',
    anchor: 'pricing',
  }

  // Each service row links to a real project of its kind (none yet for online stores).
  for (const [service, project] of [['business-websites', 'hineni'], ['custom-systems', 'seaview']] as const) {
    const sv = services.find((x) => x.slug === service)!
    const pr = await payload.find({ collection: 'projects', where: { slug: { equals: project } }, limit: 1, depth: 0 })
    await payload.update({ collection: 'services', id: sv.id, context: ctx, data: { menu: { ...sv.menu, exampleProject: pr.docs[0]!.id } } })
  }

  const servicesPage = await createPage(
    'שירותים',
    'services',
    [
      {
        blockType: 'serviceMenu',
        heading: 'מה אנחנו מציעים.',
        intro: 'מאתר תדמית פשוט ועד מערכת דיגיטלית מורכבת. אנחנו מתכננים, מעצבים ומפתחים פתרונות שמתאימים לעסק שלכם.',
        note: 'לפני שמתחילים, תקבלו הצעת מחיר ברורה בהתאם להיקף הפרויקט.',
        proofLead: 'רוצים לראות איך זה נראה בפועל?',
        proof: { type: 'custom', url: '/projects', label: 'הציצו בפרויקטים שלנו' },
        contactPage: contact.id,
        anchor: 'services',
      },
      {
        blockType: 'statement',
        heading: 'אתר שמתאים לכם היום. *ויכול לצמוח איתכם מחר.*',
        text: 'לא בטוחים מה העסק שלכם צריך? נתחיל מלהבין אתכם ואת המטרות שלכם, ונמצא יחד את הפתרון המתאים.',
        cta: link(contactRef, 'נבדוק מה מתאים לעסק שלכם'),
        ctaNote: 'לא צריך להגיע עם תוכנית מוכנה.',
      },
      { blockType: 'quoteRotator', label: 'מילים של לקוחות.', testimonials: tempTestimonials },
      {
        blockType: 'processSteps',
        variant: 'row',
        heading: 'אז איך מתחילים?',
        intro: 'תהליך פשוט, עם ליווי לאורך הדרך.',
        background: 'light',
        steps: [
          { title: 'מדברים', description: 'שיחה קצרה על העסק ועל מה שאתם צריכים. אחריה תקבלו הצעת מחיר ברורה.' },
          { title: 'רואים עיצוב', description: 'לפני שמתחילים לפתח, תראו את העיצוב ותגידו מה לשנות.' },
          { title: 'בונים יחד', description: 'אנחנו מפתחים, ואתם רואים את האתר מתקדם ומאשרים לפני ההשקה.' },
          { title: 'עולים לאוויר', description: 'אחרי האישור שלכם האתר עולה, ואנחנו בודקים שהכול עובד.' },
        ],
      },
      { blockType: 'faq', heading: 'שאלות שעולות לפני שמתחילים', faqs: servicesFaqs, background: 'light', anchor: 'faq' },
      {
        blockType: 'cta',
        heading: 'יש לכם רעיון? בואו נדבר.',
        text: 'גם אם אתם עדיין לא בטוחים מה בדיוק צריך, נוכל להבין את זה יחד.',
        links: [{ link: link(contactRef, 'בואו נדבר על הפרויקט שלכם') }],
        background: 'brand',
      },
    ],
    'בניית אתרי תדמית החל מ־3,500 ₪, חנויות אונליין ומערכות דיגיטליות בהתאמה אישית. עיצוב, פיתוח וליווי שמתחילים בהבנת העסק שלכם.',
    'בניית אתרים, חנויות אונליין ומערכות דיגיטליות | REISS DIGITAL',
  )

  const projectsPage = await createPage('פרויקטים', 'projects', [
    { blockType: 'projectGallery', heading: 'הפרויקטים שלנו.', intro: 'כל פרויקט מתחיל בצורך אחר. הנה כמה מהפתרונות שבנינו.' },
    await projectStories(payload, { seaview: seaview.id, hineni: hineni.id, 'emuna-art': emunaArt.id }),
    {
      blockType: 'cta',
      heading: 'יש לכם פרויקט בראש?',
      text: 'לכל עסק יש את האתגר שלו. בואו נמצא את הפתרון שלכם.',
      links: [{ link: link(contactRef, 'בואו נדבר') }],
      background: 'brand',
    },
  ])

  const blogPage = await createPage('בלוג', 'blog', [
    { blockType: 'hero', variant: 'page', eyebrow: 'בלוג', heading: 'מאמרים, טיפים *ותובנות*', subheading: 'כל מה שכדאי לדעת על אתרים, שיווק דיגיטלי וקידום, בשפה פשוטה.' },
    { blockType: 'blogTeaser', limit: 0, background: 'light' },
  ])

  const about = await createPage(
    'אודות',
    'about',
    [await aboutStudio(payload, { portrait: founderPortrait.id, contact: contactRef, projects: { relationTo: 'pages', value: projectsPage.id }, seaview: seaview.id })],
    'REISS DIGITAL, סטודיו לפיתוח אתרים ופתרונות דיגיטליים: אתרי עסקים, חנויות אונליין ומערכות בהתאמה אישית. נוסד על ידי אהרן רייס.',
    'אודות הסטודיו | REISS DIGITAL',
  )

  const privacy = await createPage('מדיניות פרטיות', 'privacy', [
    { blockType: 'hero', variant: 'page', heading: 'מדיניות פרטיות' },
    { blockType: 'richText', width: 'narrow', content: doc(p('זהו טקסט לדוגמה. יש להחליף אותו במדיניות הפרטיות של העסק.'), h('h2', 'איסוף מידע'), p('אנו אוספים רק את המידע שתמסרו לנו בטופס יצירת הקשר, לצורך חזרה אליכם.')) },
  ])
  const accessibility = await createPage('הצהרת נגישות', 'accessibility', [
    { blockType: 'hero', variant: 'page', heading: 'הצהרת נגישות' },
    { blockType: 'richText', width: 'narrow', content: doc(p('זהו טקסט לדוגמה. יש להחליף אותו בהצהרת הנגישות של האתר, בהתאם לתקן הישראלי 5568.')) },
  ])

  const servicesRef: Ref = { relationTo: 'pages', value: servicesPage.id }
  const projectsRef: Ref = { relationTo: 'pages', value: projectsPage.id }
  const blogRef: Ref = { relationTo: 'pages', value: blogPage.id }

  await createPage(
    'דף הבית',
    'home',
    [
      {
        blockType: 'hero',
        variant: 'personal',
        // Studio-led hero: no portrait or signature, balanced by the geometric layers.
        eyebrow: 'אסטרטגיה • עיצוב • טכנולוגיה',
        heading: 'לא רק אתר שנראה טוב, *אתר שהעסק צומח איתו*',
        growWord: 'צומח',
        subheading:
          'אנחנו משלבים אסטרטגיה, עיצוב חדשני ופיתוח מתקדם כדי ליצור אתרים ומערכות דיגיטליות שמותאמים לעסק שלכם ולדרך שבה הוא עובד.',
        links: [
          { link: link(contactRef, 'בואו נדבר', 'primary') },
          { link: link(projectsRef, 'לפרויקטים שלנו', 'secondary') },
        ],
      },
      {
        blockType: 'manifesto',
        question: 'אתם לא צריכים להבין בבניית אתרים.\nבשביל זה אנחנו כאן.',
        approach:
          'אתם מביאים את העסק והחזון. אנחנו מביאים את הידע, הניסיון והליווי כדי להפוך אותם לאתר הנכון לעסק שלכם.',
        person: {
          name: FOUNDER.name,
          role: FOUNDER.role,
          text: 'ניסיון של שנים בפיתוח Full Stack ובפיתוח אתרי סחר למועדונים מהגדולים בישראל. היום הניסיון הזה מושקע בכל אתר ומערכת שאנחנו בונים.',
          portrait: founderPortrait.id,
          portraitSmile: founderSmile.id,
        },
        index: [
          { link: custom('#work', 'הפרויקטים שלנו') },
          { link: custom('#services', 'מה אנחנו מציעים') },
          { link: link(contactRef, 'בואו נדבר') },
        ],
      },
      {
        blockType: 'workRail',
        heading: 'הפרויקטים שלנו',
        items: [
          { project: seaview.id, tone: '#123947' },
          { project: hineni.id, tone: '#1d2a63' },
          { project: emunaArt.id, tone: '#4a3a2b' },
        ],
        // The rail hands over to the services; the contact invitation closes the page.
        closingTitle: 'ומה אפשר לבנות בשבילכם?',
        closingLink: custom('#services', 'לשירותים'),
        anchor: 'work',
      },
      {
        blockType: 'serviceStack',
        heading: 'מה אנחנו מציעים.',
        anchor: 'services',
        cards: [
          {
            label: 'אתרי תדמית ואתרי מותג',
            title: 'אתרים שמשאירים רושם.',
            description:
              'אתרי תדמית בהתאמה אישית, שמציגים את העסק שלכם בצורה מדויקת, בונים אמון ומעודדים את הלקוחות הנכונים לפנות אליכם.',
            theme: 'white',
            link: link(servicesRef, 'לפרטים על השירות'),
          },
          {
            label: 'חנויות אונליין',
            title: 'חנויות שמוכרות יותר.',
            description: 'חנויות אונליין עם חוויית קנייה נוחה, ניהול פשוט ותשתית שמאפשרת לעסק שלכם לגדול.',
            theme: 'white',
            link: link(servicesRef, 'לפרטים על השירות'),
          },
          {
            label: 'מערכות דיגיטליות',
            title: 'מערכות שעובדות בשבילכם.',
            description:
              'מערכות הזמנות וניהול שנבנות סביב תהליכי העבודה שלכם, כדי לחסוך זמן, לצמצם עבודה ידנית ולייעל את העסק.',
            theme: 'white',
            link: link(servicesRef, 'לפרטים על השירות'),
          },
        ],
      },
      // Story: the question → we understand → what we built → what we build → how we
      // start → the invitation. About, FAQ, blog and prices live on their own pages.
      {
        blockType: 'processSteps',
        variant: 'timeline',
        heading: 'אז איך מתחילים?',
        intro: 'אתם מספרים לנו על העסק ועל מה שתרצו להשיג. אנחנו עוזרים להבין מה נכון לבנות ואיך להגיע לשם.',
        steps: [
          { title: 'מכירים ומבינים.', description: 'נכיר את העסק, את הקהל ואת המטרות שלכם.' },
          { title: 'מתכננים ומעצבים.', description: 'נהפוך את הצרכים למבנה ולחוויית משתמש מדויקת.' },
          { title: 'מפתחים ומדייקים.', description: 'נבנה את האתר או המערכת, נבדוק ונדייק את הפרטים.' },
          { title: 'עולים לאוויר.', description: 'נוודא שהכול מוכן ונלווה את העלייה לאוויר.' },
        ],
        background: 'light',
        anchor: 'process',
      },
      {
        blockType: 'cta',
        heading: 'הפרויקט הבא יכול להיות שלכם.',
        text: 'יש לכם רעיון לאתר או למערכת? גם אם אתם עדיין לא בטוחים בדיוק מה אתם צריכים, נשמח לשמוע על העסק שלכם ולחשוב יחד מה נכון לבנות.',
        links: [{ link: link(contactRef, 'בואו נדבר') }],
        background: 'brand',
        anchor: 'contact',
      },
    ],
    SITE_DESCRIPTION,
    'REISS DIGITAL | בניית אתרים ומערכות Web לעסקים',
  )

  // -------------------------------------------------------------- globals
  log('Updating globals…')
  const serviceRef = (i: number): Ref => ({ relationTo: 'services', value: services[i]!.id })

  await payload.updateGlobal({
    slug: 'header',
    context: ctx,
    data: {
      navItems: [
        {
          link: link(servicesRef, 'שירותים'),
          children: services.map((s, i) => ({ link: link(serviceRef(i), s.title) })),
        },
        { link: link(projectsRef, 'פרויקטים') },
        { link: link({ relationTo: 'pages', value: about.id }, 'אודות') },
        { link: link(contactRef, 'צור קשר') },
      ],
      cta: link(contactRef, 'בואו נדבר'),
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: ctx,
    data: {
      about: SITE_DESCRIPTION,
      columns: [
        {
          title: 'שירותים',
          links: [
            ...services.map((s, i) => ({ link: link(serviceRef(i), s.title) })),
            { link: link(servicesRef, 'כל השירותים') },
          ],
        },
        {
          title: 'החברה',
          links: [
            { link: link({ relationTo: 'pages', value: about.id }, 'אודות') },
            { link: link(projectsRef, 'פרויקטים') },
            { link: link(contactRef, 'צור קשר') },
          ],
        },
      ],
      bottomLinks: [
        { link: link({ relationTo: 'pages', value: privacy.id }, 'מדיניות פרטיות') },
        { link: link({ relationTo: 'pages', value: accessibility.id }, 'הצהרת נגישות') },
      ],
      copyright: '© {year} REISS DIGITAL. כל הזכויות שמורות.',
    },
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    context: ctx,
    data: {
      siteName: 'REISS DIGITAL',
      tagline: 'לא רק אתר שנראה טוב, אתר שהעסק צומח איתו',
      contact: {
        phone: null,
        email: 'reiss.dgtl@gmail.com',
        whatsapp: '972539288821',
        whatsappMessage: 'היי, אשמח לשמוע פרטים על בניית אתר',
        address: 'תל אביב',
        hours: 'א׳-ה׳, 09:00-18:00',
        social: [{ platform: 'instagram', url: 'https://www.instagram.com/reiss.digital/' }],
      },
      seo: {
        titleTemplate: '%s | REISS DIGITAL',
        defaultDescription: SITE_DESCRIPTION,
        defaultImage: covers[0]!.id,
        organizationType: 'ProfessionalService',
      },
    },
  })

  log('Done ✓  Open http://localhost:3000')
  process.exit(0)
}

const processSteps = [
  { title: 'היכרות ואפיון', description: 'שיחה על העסק, הקהל והמטרות, ובניית מפת אתר ותוכנית עבודה.' },
  { title: 'עיצוב', description: 'עיצוב מותאם אישית לכל העמודים, במובייל ובדסקטופ, עד שאתם מרוצים.' },
  { title: 'פיתוח', description: 'בנייה בקוד מודרני ומהיר, חיבור מערכת ניהול, SEO ונגישות.' },
  { title: 'עלייה ומעקב', description: 'העלאה לאוויר, הדרכה, ומעקב אחרי ביצועים ותוצאות.' },
]

// `payload run` exits as soon as the module finishes loading, so this must be awaited.
await seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
