'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, StickyNote } from 'lucide-react'
import { useProgress } from '@/lib/useProgress'
import { NotesPanel } from '@/components/NotesPanel'

interface LessonViewerProps {
  module: string
  lesson: string
  title: string
  order: number
  estimatedMinutes: number
  prev: { module: string; lesson: string; title: string } | null
  next: { module: string; lesson: string; title: string } | null
  children: React.ReactNode
}

export default function LessonViewer({
  module,
  lesson,
  title,
  order,
  estimatedMinutes,
  prev,
  next,
  children,
}: LessonViewerProps) {
  const { completed, hydrated, toggleLesson, recordVisit } = useProgress()
  const [notesOpen, setNotesOpen] = useState(false)
  const lessonId = `${module}/${lesson}`
  const isComplete = hydrated ? completed.has(lessonId) : false
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    recordVisit(lessonId)
  }, [lessonId, recordVisit])

  useEffect(() => {
    const body = bodyRef.current
    if (!body) return
    const heading = body.querySelector<HTMLElement>('.try-it-heading')
    if (!heading || heading.closest('.try-it-wrapper')) return

    const wrapper = document.createElement('div')
    wrapper.className = 'try-it-wrapper'
    heading.parentNode!.insertBefore(wrapper, heading)

    // Collect heading + all subsequent siblings
    const elements: Element[] = [heading]
    let sib = heading.nextElementSibling
    while (sib) {
      elements.push(sib)
      sib = sib.nextElementSibling
    }

    // Group: h2 pairs with next element; label-only <p> pairs with next element
    let i = 0
    while (i < elements.length) {
      const el = elements[i]
      const nextEl = elements[i + 1]
      const isH2 = el.tagName === 'H2'
      const isLabelOnly =
        el.tagName === 'P' &&
        el.children.length === 1 &&
        el.children[0].tagName === 'STRONG' &&
        (el.textContent ?? '').trim() === (el.children[0].textContent ?? '').trim()

      const item = document.createElement('div')
      item.className = 'try-it-item'
      item.appendChild(el)
      if ((isH2 || isLabelOnly) && nextEl) {
        item.appendChild(nextEl)
        i += 2
      } else {
        i += 1
      }
      wrapper.appendChild(item)
    }
  }, [lesson])

  return (
    <div className="max-w-[700px] mx-auto px-6 py-12">
      {/* Lesson header */}
      <div className="mb-8">
        <p className="text-sm text-zinc-400 uppercase tracking-wide mb-2">
          Lesson {order} · {estimatedMinutes} min
        </p>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
      </div>

      {/* MDX content */}
      <article className="prose prose-invert max-w-none">
        <div className="lesson-body" ref={bodyRef}>
          {children}
        </div>
      </article>

      {/* Lesson completion checkbox */}
      <div className="mt-12 pt-8 border-t border-zinc-800 flex items-center gap-3">
        <button
          onClick={() => toggleLesson(lessonId)}
          disabled={!hydrated}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isComplete
              ? 'bg-indigo-900/40 text-indigo-300 border border-indigo-700'
              : 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-600 hover:text-zinc-300'
          }`}
        >
          {isComplete ? <CheckCircle2 size={16} /> : <Circle size={16} />}
          {isComplete ? 'Lesson complete' : 'Mark as complete'}
        </button>
      </div>

      {/* Prev/Next navigation */}
      <div className="mt-8 flex items-center justify-between gap-4">
        {prev ? (
          <Link
            href={`/modules/${prev.module}/${prev.lesson}`}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors max-w-[45%]"
          >
            <ChevronLeft size={16} className="flex-shrink-0" />
            <span className="truncate">{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/modules/${next.module}/${next.lesson}`}
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors text-right max-w-[45%]"
          >
            <span className="truncate">{next.title}</span>
            <ChevronRight size={16} className="flex-shrink-0" />
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Notes trigger button — fixed bottom-right */}
      <button
        onClick={() => setNotesOpen(true)}
        aria-label="Open notes"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium shadow-lg transition-colors"
      >
        <StickyNote size={16} />
        Notes
      </button>

      {/* Notes panel */}
      <NotesPanel
        lessonId={lessonId}
        isOpen={notesOpen}
        onClose={() => setNotesOpen(false)}
      />
    </div>
  )
}
