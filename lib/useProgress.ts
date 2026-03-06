'use client'

import { useState, useEffect, useCallback } from 'react'

const COMPLETED_KEY = 'claudeMasterclass_completedLessons'
const LAST_VISITED_KEY = 'claudeMasterclass_lastVisited'

export interface ProgressState {
  completed: Set<string>
  lastVisited: string | null
  hydrated: boolean
  toggleLesson: (lessonId: string) => void
  recordVisit: (lessonId: string) => void
}

export function useProgress(): ProgressState {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [lastVisited, setLastVisited] = useState<string | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPLETED_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as string[]
        setCompleted(new Set(parsed))
      }
      const lv = localStorage.getItem(LAST_VISITED_KEY)
      if (lv) {
        setLastVisited(lv)
      }
    } catch {
      // localStorage unavailable or corrupt — start fresh
    }
    setHydrated(true)
  }, [])

  const toggleLesson = useCallback((lessonId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(lessonId)) {
        next.delete(lessonId)
      } else {
        next.add(lessonId)
      }
      try {
        localStorage.setItem(COMPLETED_KEY, JSON.stringify(Array.from(next)))
      } catch {
        // ignore write errors
      }
      return next
    })
  }, [])

  const recordVisit = useCallback((lessonId: string) => {
    setLastVisited(lessonId)
    try {
      localStorage.setItem(LAST_VISITED_KEY, lessonId)
    } catch {
      // ignore write errors
    }
  }, [])

  return { completed, lastVisited, hydrated, toggleLesson, recordVisit }
}
