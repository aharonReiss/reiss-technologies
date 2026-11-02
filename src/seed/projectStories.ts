import fs from 'fs/promises'
import path from 'path'
import type { Payload } from 'payload'

const dir = path.resolve(process.cwd(), 'src/seed/assets/stories')

const upload = async (payload: Payload, file: string, alt: string) => {
  const data = await fs.readFile(path.join(dir, file))
  const mimetype = file.endsWith('.mp4') ? 'video/mp4' : 'image/png'
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data, mimetype, name: file, size: data.length },
    context: { disableRevalidate: true },
  })
  return doc.id
}

/**
 * The "behind the work" section of the projects page. Every screen and recording
 * is the live site (captured November 2026); each story names one decision that
 * can be seen in it.
 */
export async function projectStories(payload: Payload, project: Record<'seaview' | 'hineni' | 'emuna-art', number>) {
  return {
    blockType: 'projectStories' as const,
    eyebrow: 'BEHIND THE WORK',
    heading: 'לא רק איך זה נראה. *גם למה זה עובד.*',
    intro: 'שלושה פרויקטים. שלושה אתגרים שונים. פתרונות שנבנו סביב הצרכים של כל עסק.',
    stories: [
      {
        project: project.seaview,
        label: 'SEA VIEW',
        headline: 'שני פנטהאוזים. בחירה אחת פשוטה.',
        text: 'האתגר היה להציג שני נכסים שונים בלי להעמיס על המבקר. בנינו בחירה אחת ברורה בין הגרנד למיני: לחיצה מחליפה את התמונות ואת הפרטים, ומשם יש קישור ישיר לפנטהאוז שבחרתם. גם בטלפון.',
        layout: 'browser' as const,
        desktop: await upload(payload, 'sv-desk.mp4', 'SEA VIEW: מעבר בין הגרנד פנטהאוז למיני פנטהאוז בעמוד הבית'),
        desktopPoster: await upload(payload, 'sv-desk-poster.png', 'SEA VIEW: בחירת פנטהאוז בעמוד הבית'),
        phone: await upload(payload, 'sv-mob.mp4', 'SEA VIEW: בחירת פנטהאוז במובייל, עם קישור לפנטהאוז שנבחר'),
        phonePoster: await upload(payload, 'sv-mob-poster.png', 'SEA VIEW: בחירת פנטהאוז במובייל'),
      },
      {
        project: project.hineni,
        label: 'HINENI',
        headline: 'הרבה תוכן. תפריט אחד ברור.',
        text: 'למכללה שני מסלולי לימוד, תוכנית תלת־שנתית, מרצים, פודקאסט, בלוג, ספרייה ועמודים של רוני אילון. סידרנו את הכול בתפריט היררכי אחד: כל שנה תחת המסלול שלה, וכל נושא במקום שקל למצוא, במחשב ובטלפון.',
        layout: 'browser' as const,
        desktop: await upload(payload, 'hn-desk.mp4', 'מכללת הנני: התפריט בדסקטופ, עם תתי־התפריטים של פסיכותרפיה, אודות ורוני אילון'),
        desktopPoster: await upload(payload, 'hn-desk-poster.png', 'מכללת הנני: תת־התפריט של מסלול הפסיכותרפיה'),
        phone: await upload(payload, 'hn-mob-menu.png', 'מכללת הנני: התפריט המלא במובייל, בהיררכיה'),
      },
      {
        project: project['emuna-art'],
        label: 'אמנות של אמונה',
        headline: 'גלריה שמרגישה כמו היצירות.',
        text: 'האתר של נעמי נבנה סביב העבודות שלה: צבעים רכים, כותרות בזהב וקולקציות לפי נושא בחלונות מקושתים. מי שרוצה יצירה משלו מגיע מהתפריט להזמנה אישית, ומשם לשיחת WhatsApp.',
        layout: 'phones' as const,
        phone: await upload(payload, 'em-mob-collections.png', 'אמנות של אמונה: הקולקציות לפי נושא, במובייל'),
        phone2: await upload(payload, 'em-mob-custom.png', 'אמנות של אמונה: יצירה בהתאמה אישית, עם תיאום ב־WhatsApp'),
      },
    ],
  }
}
