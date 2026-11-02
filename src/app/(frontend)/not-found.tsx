import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center pt-24 text-center">
      <div className="container-site">
        <p dir="ltr" className="font-display text-8xl font-extrabold text-brand md:text-9xl">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">העמוד שחיפשתם לא נמצא</h1>
        <p className="mt-4 text-lg">ייתכן שהכתובת השתנתה או שהעמוד הוסר.</p>
        <Link href="/" className="btn-primary mt-10">
          חזרה לדף הבית
        </Link>
      </div>
    </section>
  )
}
