'use client'

import Link from 'next/link'
import { useNotes } from '@/lib/useNotes'
import { groupNotesByModule } from '@/lib/notes'
import { Card, CardContent } from '@/components/ui/card'
import type { LessonWithMeta } from '@/lib/content'

interface NotesPageProps {
  lessons: LessonWithMeta[]
}

export default function NotesPage({ lessons }: NotesPageProps) {
  const { notes, hydrated } = useNotes()
  const grouped = hydrated ? groupNotesByModule(lessons, notes) : []

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-white mb-8">All Notes</h1>

      {!hydrated && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-zinc-800 rounded-xl h-24 animate-pulse" />
          ))}
        </div>
      )}

      {hydrated && grouped.length === 0 && (
        <p className="text-zinc-400 text-sm">
          No notes yet. Open any lesson and start writing.
        </p>
      )}

      {hydrated && grouped.length > 0 && (
        <div className="space-y-10">
          {grouped.map(({ moduleName, entries }) => (
            <section key={moduleName}>
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">
                {moduleName.replace(/^\d+-/, '').replace(/-/g, ' ')}
              </p>
              <div className="space-y-4">
                {entries.map((entry) => {
                  // Look up the lesson title from the lessons array
                  const lessonMeta = lessons.find(
                    (l) => l.module === entry.module && l.lesson === entry.lesson
                  )
                  const title = lessonMeta?.title ?? entry.lesson

                  return (
                    <Card key={entry.lessonId} className="border-zinc-800 bg-zinc-900/60">
                      <CardContent className="pt-6">
                        <Link
                          href={`/modules/${entry.module}/${entry.lesson}`}
                          className="text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors"
                        >
                          {title}
                        </Link>
                        <p className="text-zinc-300 text-sm mt-2 whitespace-pre-wrap">
                          {entry.text}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  )
}
