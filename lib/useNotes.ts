'use client'

import { useState, useEffect, useCallback } from 'react'

const NOTES_KEY = 'claudeMasterclass_notes'

export interface NotesState {
  notes: Record<string, string>
  hydrated: boolean
  setNote: (lessonId: string, text: string) => void
}

export function useNotes(): NotesState {
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(NOTES_KEY)
      if (stored) {
        setNotes(JSON.parse(stored) as Record<string, string>)
      }
    } catch {
      // localStorage unavailable or corrupt — start fresh
    }
    setHydrated(true)
  }, [])

  const setNote = useCallback((lessonId: string, text: string) => {
    setNotes((prev) => {
      const next = { ...prev, [lessonId]: text }
      try {
        localStorage.setItem(NOTES_KEY, JSON.stringify(next))
      } catch {
        // ignore write errors
      }
      return next
    })
  }, [])

  return { notes, hydrated, setNote }
}
