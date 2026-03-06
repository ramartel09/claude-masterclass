'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Check, StickyNote } from 'lucide-react'
import { useProgress } from '@/lib/useProgress'
import type { LessonWithMeta } from '@/lib/content'

interface SidebarProps {
  lessons: LessonWithMeta[]
  onClose?: () => void
}

export function Sidebar({ lessons, onClose }: SidebarProps) {
  const pathname = usePathname() ?? ''
  const { completed, hydrated } = useProgress()

  // Group lessons by module
  const moduleMap = new Map<string, LessonWithMeta[]>()
  for (const lesson of lessons) {
    const existing = moduleMap.get(lesson.module) ?? []
    existing.push(lesson)
    moduleMap.set(lesson.module, existing)
  }

  return (
    <nav className="flex flex-col h-full overflow-y-auto py-4 px-2">
      {/* All Notes top-level link */}
      <div className="px-2 mb-2">
        <Link
          href="/notes"
          onClick={onClose}
          className={[
            'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
            pathname === '/notes'
              ? 'bg-indigo-900/40 text-indigo-100 font-medium'
              : 'text-zinc-400 hover:text-zinc-200',
          ].join(' ')}
        >
          <StickyNote size={14} className="flex-shrink-0" />
          All Notes
        </Link>
      </div>

      {Array.from(moduleMap.entries()).map(([moduleName, moduleLessons]) => (
        <div key={moduleName}>
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest px-3 py-2 mt-4">
            {moduleName.replace(/^\d+-/, '').replace(/-/g, ' ')}
          </div>
          <ul>
            {moduleLessons.map((lesson) => {
              const lessonId = `${lesson.module}/${lesson.lesson}`
              const href = `/modules/${lesson.module}/${lesson.lesson}`
              const isActive = pathname === href || pathname.startsWith(href + '/')
              const isCompleted = hydrated && completed.has(lessonId)

              return (
                <li key={lessonId}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={[
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors',
                      isActive
                        ? 'bg-indigo-900/40 text-indigo-100 font-medium'
                        : 'text-zinc-400 hover:text-zinc-200',
                    ].join(' ')}
                  >
                    {isCompleted && (
                      <Check size={12} className="text-indigo-400 flex-shrink-0" />
                    )}
                    <span>{lesson.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}
