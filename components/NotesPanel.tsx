'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useNotes } from '@/lib/useNotes'

interface NotesPanelProps {
  lessonId: string
  isOpen: boolean
  onClose: () => void
}

export function NotesPanel({ lessonId, isOpen, onClose }: NotesPanelProps) {
  const { notes, hydrated, setNote } = useNotes()
  const [localText, setLocalText] = useState('')
  const [savedVisible, setSavedVisible] = useState(false)

  // Reset localText when lessonId changes or after hydration
  useEffect(() => {
    if (hydrated) {
      setLocalText(notes[lessonId] ?? '')
    }
  }, [hydrated, lessonId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced save — 1000ms after typing stops
  useEffect(() => {
    if (!hydrated) return
    const timer = setTimeout(() => {
      setNote(lessonId, localText)
      setSavedVisible(true)
      const fadeTimer = setTimeout(() => setSavedVisible(false), 1500)
      return () => clearTimeout(fadeTimer)
    }, 1000)
    return () => clearTimeout(timer)
  }, [localText, lessonId, hydrated, setNote])

  return (
    <>
      {/* Backdrop on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Notes panel */}
      <div
        className={[
          'fixed right-0 top-0 h-full w-80 z-50 bg-zinc-900 border-l border-zinc-800',
          'transform transition-transform duration-200 ease-in-out',
          'flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        aria-label="Notes panel"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-zinc-200">Notes</h2>
            <span
              className={[
                'text-xs text-indigo-400 transition-opacity duration-300',
                savedVisible ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            >
              Saved
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close notes"
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-3 min-h-0">
          <textarea
            value={localText}
            onChange={(e) => setLocalText(e.target.value)}
            disabled={!hydrated}
            placeholder={hydrated ? 'Take notes here…' : ''}
            className="bg-zinc-800 text-zinc-100 text-sm p-3 resize-none w-full h-full rounded-md border border-zinc-700 focus:outline-none focus:border-indigo-500 placeholder:text-zinc-600 disabled:opacity-50"
          />
        </div>
      </div>
    </>
  )
}
