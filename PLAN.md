# REISS DIGITAL — תוכנית האתר

אתר תדמית ולידים לחברת בניית אתרים. ההשראה העיצובית היא linestudio.co.il. כל התוכן מנוהל מ־CMS.

## טכנולוגיה

| שכבה | בחירה |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| CMS | Payload CMS 3, רץ בתוך אפליקציית ה־Next, אדמין ב־`/admin` |
| DB | PostgreSQL 17 (Docker, פורט 5434) |
| עיצוב | Tailwind CSS 4, RTL |
| מיילים | Nodemailer (SMTP), התראה על כל ליד |

## מפת האתר

```
/                     דף הבית (עמוד CMS עם slug=home)
/[slug]               כל עמוד שנוצר ב־CMS (אודות, שירותים, פרויקטים, בלוג, צור קשר, פרטיות, נגישות, דפי נחיתה)
/services/[slug]      עמוד שירות
/projects/[slug]      עמוד פרויקט (case study)
/blog/[slug]          מאמר
/admin                ממשק ניהול
/sitemap.xml, /robots.txt
```

## מודל ה־CMS

**Collections:**
- `pages`: עמודים שנבנים מבלוקים
- `services`, `projects`, `posts`, `categories`
- `testimonials`, `faqs`, `clients`
- `media`, `leads`, `users`
- `redirects`, מתוסף ה־Redirects

**Globals:**
- `header`: תפריט וכפתור CTA
- `footer`: עמודות קישורים ושורת זכויות
- `site-settings`: לוגו, פרטי קשר, WhatsApp, רשתות, SEO ברירת מחדל ו־GA4

**בלוקים:** Hero · RichText · ImageText · ServicesGrid · ProjectsGrid · ProcessSteps · Stats · Testimonials · FAQ · LogoCloud · BlogTeaser · CTA · ContactForm

## SEO

- **לשונית SEO בכל עמוד, שירות, פרויקט ומאמר:** meta title, meta description ותמונת OG, עם תצוגה מקדימה של גוגל
- **canonical, Open Graph ו־Twitter cards:** נבנים אוטומטית
- **JSON-LD:**
  - Organization ו־WebSite בכל האתר
  - Service, Article ו־BreadcrumbList בעמודים הרלוונטיים
  - FAQPage בבלוק השאלות הנפוצות
- **`sitemap.xml` דינמי ו־`robots.txt`**
- **הפניות 301 שמנוהלות מהאדמין:** טבלת Redirects
- **קישורים:** כל שדה קישור תומך בעמוד פנימי (בחירה מרשימה) או ב־URL חיצוני, וכך גם הקישורים בעורך הטקסט
- **מהירות:** העמוד מתעדכן מיד כשמפרסמים באדמין (revalidate on publish), עם `next/image`

## שלבי עבודה

1. [x] תשתית: Next, Payload ו־Postgres ב־Docker
2. [x] מודל תוכן: collections, globals ובלוקים
3. [x] עיצוב ורכיבים: Layout, Header, Footer ורכיבי הבלוקים
4. [ ] עמודים: דינמיים, שירות, פרויקט ומאמר
5. [ ] לידים: טופס, שמירה ב־DB ומייל
6. [ ] SEO, נגישות וביצועים
7. [ ] תוכן התחלתי (seed)
8. [ ] העלאה לאוויר

## הרצה מקומית

```bash
docker compose up -d     # Postgres
pnpm dev                 # http://localhost:3000
pnpm seed                # תוכן התחלתי (פעם אחת)
```
