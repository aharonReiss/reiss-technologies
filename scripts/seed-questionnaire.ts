/**
 * A starting point for the client questionnaire, published once. Runs only while
 * the questionnaire is empty, so it never overwrites edits made in the admin.
 *
 *   pnpm payload run scripts/seed-questionnaire.ts
 */
import { getPayload } from 'payload'

import config from '@payload-config'

type Q = { label: string; type: string; required?: boolean; help?: string; placeholder?: string; options?: string[]; multiple?: boolean }
const q = ({ options, ...rest }: Q) => ({ ...rest, required: Boolean(rest.required), ...(options ? { options: options.map((label) => ({ label })) } : {}) })

const sections = [
  {
    title: 'על העסק',
    description: 'כמה מילים עליכם, כדי שנבין את העסק כמו שאתם מכירים אותו.',
    questions: [
      q({ label: 'מה שם העסק כפי שיופיע באתר?', type: 'text', required: true }),
      q({ label: 'במה העסק עוסק?', type: 'textarea', required: true, help: 'במשפטים פשוטים, כאילו אתם מסבירים לחבר.' }),
      q({ label: 'מי הלקוחות שלכם?', type: 'textarea', required: true, help: 'גיל, אזור, תחום, ומה הם מחפשים כשהם פונים אליכם.' }),
      q({ label: 'מה מבדל אתכם מהמתחרים?', type: 'textarea' }),
      q({ label: 'יש לכם אתר היום?', type: 'yesno', required: true }),
      q({ label: 'כתובת האתר הנוכחי', type: 'url', help: 'אם יש.' }),
    ],
  },
  {
    title: 'מטרות האתר',
    description: 'מה האתר צריך לעשות בשביל העסק.',
    questions: [
      q({
        label: 'מה המטרות העיקריות של האתר?',
        type: 'checkbox',
        required: true,
        options: ['לקבל פניות ולידים', 'למכור אונליין', 'להציג עבודות ופרויקטים', 'לבנות אמינות ותדמית', 'לקבוע תורים או הזמנות', 'לתת מידע ללקוחות קיימים'],
      }),
      q({ label: 'מה הפעולה הכי חשובה שמבקר צריך לעשות באתר?', type: 'text', required: true, placeholder: 'למשל: להשאיר פרטים, להתקשר, לקנות' }),
      q({ label: 'אילו עמודים אתם צריכים?', type: 'checkbox', options: ['דף בית', 'אודות', 'שירותים', 'פרויקטים / גלריה', 'בלוג', 'שאלות נפוצות', 'צור קשר', 'חנות'] }),
      q({ label: 'מתי תרצו שהאתר יעלה?', type: 'select', options: ['כמה שיותר מהר', 'תוך חודש', 'תוך חודשיים–שלושה', 'אין לחץ זמן'] }),
    ],
  },
  {
    title: 'עיצוב ומיתוג',
    description: 'הטעם שלכם עוזר לנו לכוון נכון מההתחלה.',
    questions: [
      q({ label: 'יש לכם לוגו?', type: 'radio', required: true, options: ['כן, יש לוגו', 'יש, אבל רוצים לחדש', 'אין לוגו'] }),
      q({ label: 'צבעים או סגנון שאתם אוהבים', type: 'textarea', help: 'גם "לא בטוחים" זו תשובה טובה.' }),
      q({ label: 'אתרים שאתם אוהבים', type: 'textarea', help: 'קישורים, ומה אהבתם בכל אחד.' }),
      q({ label: 'אתרים של מתחרים', type: 'textarea' }),
    ],
  },
  {
    title: 'תוכן',
    questions: [
      q({ label: 'מי יכתוב את הטקסטים לאתר?', type: 'radio', required: true, options: ['יש לנו טקסטים מוכנים', 'נכתוב בעצמנו', 'נשמח לעזרה בכתיבה'] }),
      q({ label: 'יש תמונות מקצועיות של העסק?', type: 'radio', options: ['כן', 'חלקית', 'לא, נצטרך צילום או תמונות'] }),
      q({ label: 'רשתות חברתיות', type: 'textarea', help: 'קישורים לאינסטגרם, פייסבוק, לינקדאין וכו׳.' }),
    ],
  },
  {
    title: 'חומרים',
    description: 'מה שיש לכם, תעלו. מה שאין, נשלים יחד.',
    questions: [
      q({ label: 'לוגו', type: 'file', help: 'עדיף בקובץ המקורי (AI, PDF או PNG שקוף).' }),
      q({ label: 'תמונות של העסק, הצוות או המוצרים', type: 'image' }),
      q({ label: 'מסמכים וטקסטים', type: 'file', help: 'פרופיל עסקי, מצגת, מחירון, טקסטים קיימים.' }),
    ],
  },
  {
    title: 'עוד כמה פרטים',
    questions: [
      q({ label: 'יש לכם דומיין (כתובת אתר)?', type: 'radio', options: ['כן', 'לא', 'לא בטוחים'] }),
      q({ label: 'מסגרת תקציב', type: 'select', options: ['עד 5,000 ₪', '5,000–10,000 ₪', '10,000–20,000 ₪', 'מעל 20,000 ₪', 'עוד לא יודעים'] }),
      q({ label: 'יש עוד משהו שחשוב שנדע?', type: 'textarea' }),
    ],
  },
]

const payload = await getPayload({ config })
const current = await payload.findGlobal({ slug: 'questionnaire', draft: true })
if (current.sections?.length) {
  payload.logger.info('The questionnaire already has content; nothing changed.')
} else {
  await payload.updateGlobal({
    slug: 'questionnaire',
    data: {
      _status: 'published',
      intro:
        'כדי שנבנה בדיוק את מה שהעסק שלכם צריך, נשמח שתענו על כמה שאלות ותעלו חומרים שכבר יש לכם.\nזה לוקח בערך 15 דקות, ואפשר לעצור ולהמשיך בכל זמן.',
      closingTitle: 'תודה, קיבלנו הכול',
      closingText: 'נעבור על התשובות והחומרים ונחזור אליכם תוך יום–יומיים עם הצעדים הבאים.',
      maxFileSizeMB: 25,
      sections: sections as never,
    },
  })
  payload.logger.info('Questionnaire published.')
}
process.exit(0)
