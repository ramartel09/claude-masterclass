'use client'

import Link from 'next/link'
import { CheckCircle2, Circle } from 'lucide-react'
import { ModuleProgressBar } from '@/components/ModuleProgressBar'
import { useProgress } from '@/lib/useProgress'
import type { LessonWithMeta } from '@/lib/content'

interface ModulePageClientProps {
  moduleSlug: string
  moduleMeta: { name: string; description: string; number: number }
  lessons: LessonWithMeta[]
}

export function ModulePageClient({ moduleSlug, moduleMeta, lessons }: ModulePageClientProps) {
  const { completed, hydrated } = useProgress()

  const completedCount = hydrated
    ? lessons.filter((l) => completed.has(`${moduleSlug}/${l.lesson}`)).length
    : 0

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      {/* Module header */}
      <div className="mb-6">
        <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide mb-1">
          Module {moduleMeta.number}
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{moduleMeta.name}</h1>
        <p className="text-zinc-400 text-sm mb-4">{moduleMeta.description}</p>
        <ModuleProgressBar completedCount={completedCount} total={lessons.length} />
      </div>

      {/* Lesson list */}
      <ul className="mt-6">
        {lessons.map((lesson) => {
          const lessonId = `${moduleSlug}/${lesson.lesson}`
          const isDone = hydrated && completed.has(lessonId)

          return (
            <li key={lessonId}>
              <Link
                href={`/modules/${moduleSlug}/${lesson.lesson}`}
                className="flex items-center gap-3 py-3 border-b border-zinc-800/60 hover:bg-zinc-900/40 px-3 rounded-md transition-colors"
              >
                {isDone ? (
                  <CheckCircle2 size={16} className="text-indigo-400 shrink-0" />
                ) : (
                  <Circle size={16} className="text-zinc-600 shrink-0" />
                )}
                <span className="flex-1 text-sm text-zinc-200">{lesson.title}</span>
                <span className="text-zinc-500 text-xs shrink-0">{lesson.estimatedMinutes} min</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
