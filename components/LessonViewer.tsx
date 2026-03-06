'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle2, Circle, ChevronLeft, ChevronRight } from 'lucide-react'
import { useProgress } from '@/lib/useProgress'

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
  const lessonId = `${module}/${lesson}`
  const isComplete = hydrated ? completed.has(lessonId) : false

  useEffect(() => {
    recordVisit(lessonId)
  }, [lessonId, recordVisit])

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
        <div className="lesson-body">
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
    </div>
  )
}
