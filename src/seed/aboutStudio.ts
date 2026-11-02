import fs from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

type Ref = { relationTo: 'pages' | 'services' | 'projects' | 'posts'; value: number }

const dir = path.resolve(process.cwd(), 'src/seed/assets/langs')

const upload = async (payload: Payload, file: string, alt: string) => {
  const data = await fs.readFile(path.join(dir, file))
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data, mimetype: 'image/webp', name: `seaview-lang-${file}`, size: data.length },
    context: { disableRevalidate: true },
  })
  return doc.id
}

/**
 * The about page. REISS DIGITAL is a studio with a team; Aharon Reiss founded
 * it. The seven years, the large club systems and the large-scale e-commerce
 * are his professional experience, not the studio's portfolio, and the copy
 * keeps it so. The proof is SEA VIEW's real home page in its three languages
 * (captured from the live site, November 2026).
 */
export const aboutStudio = async (
  payload: Payload,
  { portrait, contact, projects, seaview }: { portrait: number; contact: Ref; projects: Ref; seaview: number },
) => {
  const languages = [
    ['he', 'עברית', 'בעברית, מימין לשמאל'],
    ['en', 'English', 'באנגלית, משמאל לימין'],
    ['fr', 'Français', 'בצרפתית, משמאל לימין'],
  ] as const
  const screens = []
  for (const [code, label, alt] of languages) {
    screens.push({
      label,
      desktop: await upload(payload, `d-${code}.webp`, `SEA VIEW: עמוד הבית ${alt}`),
      phone: await upload(payload, `m-${code}.webp`, `SEA VIEW: עמוד הבית במובייל ${alt}`),
    })
  }

  return {
    blockType: 'aboutStudio' as const,
    intro: {
      eyebrow: 'אודות REISS DIGITAL',
      heading: 'חושבים מעבר לעיצוב. *בונים הרבה מעבר לאתר.*',
      text: 'אנחנו סטודיו לפיתוח אתרים ופתרונות דיגיטליים. משלבים ניסיון טכנולוגי, חשיבה עיצובית והבנה עסקית, ובונים אתרים ומערכות שמתאימים לצרכים של כל עסק.',
    },
    experience: {
      eyebrow: 'הניסיון של המייסד',
      years: 7,
      label: 'שנות ניסיון בפיתוח מערכות ואתרים בהיקפים גדולים.',
      text: 'כולל עבודה עם מועדונים גדולים ואתרי סחר מורכבים, שבהם ביצועים, יציבות ותכנון נכון הם חלק מהעבודה היומיומית.',
    },
    founder: {
      eyebrow: 'THE FOUNDER',
      headline: 'ניסיון שמוביל את הדרך.',
      name: 'אהרן רייס',
      role: 'מייסד REISS DIGITAL',
      text: [
        'אהרן רייס, מייסד REISS DIGITAL, מעורב בעבודה המקצועית של הסטודיו. הניסיון שצבר בפרויקטים גדולים ומורכבים משתלב בעבודה המשותפת של הצוות.',
        'הניסיון הזה הוא חלק מהבסיס המקצועי של הסטודיו. עליו אנחנו משלבים חשיבה, עיצוב ופיתוח בעבודת צוות, כדי ליצור פתרונות שמתאימים לצרכים של כל פרויקט.',
      ].join('\n\n'),
      portrait,
    },
    proof: {
      eyebrow: 'מהעבודה שלנו · SEA VIEW',
      heading: 'שלוש שפות. *אתר אחד שמתהפך איתן.*',
      text: 'לא רק תרגמנו את התוכן. התאמנו את הממשק כולו לעברית, לאנגלית ולצרפתית, כולל כיווני התצוגה והניווט. בעברית האתר נקרא מימין לשמאל, ובאנגלית ובצרפתית הלוגו, התפריט וסרגל ההזמנה עוברים צד.',
      project: seaview,
      linkLabel: 'לסיפור המלא של SEA VIEW',
      screens,
    },
    closing: {
      heading: 'עכשיו בואו נדבר *על מה שאתם רוצים לבנות.*',
      text: 'ספרו לנו בכמה מילים על העסק ועל הרעיון, ונמשיך משם יחד.',
      primary: { type: 'reference' as const, reference: contact, label: 'בואו נדבר' },
      secondary: { type: 'reference' as const, reference: projects, label: 'לפרויקטים שלנו' },
    },
  }
}
