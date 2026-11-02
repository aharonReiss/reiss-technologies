import Link from 'next/link'
import React from 'react'

import { Icon } from '@/components/Icon'
import { Media } from '@/components/Media'
import type { Category, Post, Project, Service } from '@/payload-types'
import { formatPrice } from '@/utilities/format'
import { docPath } from '@/utilities/routes'

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link
      href={docPath('services', service.slug)}
      className="group relative flex h-full flex-col rounded-card border border-line bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/10"
    >
      <div className="mb-10 flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
          <Icon name={service.icon ?? 'code'} className="size-7" />
        </span>
        <span className="font-display text-sm font-semibold text-body/50" dir="ltr">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="mb-3 text-2xl font-bold">{service.title}</h3>
      <p className="mb-8 leading-relaxed">{service.excerpt}</p>
      <span className="mt-auto mb-5 text-sm">
        {service.pricing?.price ? (
          <>
            החל מ־
            <span className="font-display text-lg font-bold text-ink">
              {formatPrice(service.pricing.price)}
            </span>
          </>
        ) : (
          <span className="font-semibold text-ink">הצעת מחיר מותאמת</span>
        )}
      </span>
      <span className="inline-flex items-center gap-2 font-semibold text-ink">
        לפרטים
        <Icon
          name="arrow"
          className="size-5 transition group-hover:-translate-x-1 group-hover:text-brand"
        />
      </span>
    </Link>
  )
}

export function ProjectCard({ project, large }: { project: Project; large?: boolean }) {
  return (
    <Link href={docPath('projects', project.slug)} className="group block">
      <div
        data-reveal="wipe"
        className={`relative mb-5 overflow-hidden rounded-card bg-muted ${large ? 'aspect-[4/3] md:aspect-[16/11]' : 'aspect-[4/3]'}`}
      >
        <Media
          resource={project.coverImage}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          imgClassName="transition duration-700 group-hover:scale-105"
        />
        <span className="absolute end-5 top-5 grid size-12 translate-y-2 place-items-center rounded-full bg-white text-ink opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Icon name="arrowUpLeft" className="size-5" />
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold transition group-hover:text-brand md:text-2xl">
            {project.title}
          </h3>
          {project.excerpt && <p className="mt-1.5 line-clamp-2">{project.excerpt}</p>}
        </div>
        {project.tags && project.tags.length > 0 && (
          <ul className="hidden shrink-0 flex-wrap justify-end gap-1.5 sm:flex">
            {project.tags.slice(0, 2).map((t) => (
              <li
                key={t}
                className="rounded-full border border-line px-3 py-1 text-xs font-medium whitespace-nowrap"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  )
}

const dateFormat = new Intl.DateTimeFormat('he-IL', { dateStyle: 'long' })

export function PostCard({ post }: { post: Post }) {
  const category = (post.categories ?? []).find((c): c is Category => typeof c === 'object')
  return (
    <Link href={docPath('posts', post.slug)} className="group flex h-full flex-col">
      <div data-reveal="wipe" className="relative mb-5 aspect-[16/10] overflow-hidden rounded-card bg-muted">
        <Media
          resource={post.heroImage}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          imgClassName="transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mb-3 flex items-center gap-3 text-sm">
        {category && <span className="font-semibold text-brand">{category.title}</span>}
        {post.publishedAt && (
          <time dateTime={post.publishedAt}>{dateFormat.format(new Date(post.publishedAt))}</time>
        )}
      </div>
      <h3 className="mb-2 text-xl leading-snug font-bold transition group-hover:text-brand">
        {post.title}
      </h3>
      {post.excerpt && <p className="line-clamp-3 leading-relaxed">{post.excerpt}</p>}
    </Link>
  )
}
