'use client'

import { useState, useEffect, useCallback } from 'react'
import type { MCQRecord } from '@/lib/quiz'

const MCQ_KEY = 'claudeMasterclass_quizMCQ'
const CHALLENGE_KEY = 'claudeMasterclass_quizChallenge'

export interface ChallengeRecord {
  completed: boolean
}

export interface QuizState {
  mcq: Record<string, MCQRecord>
  challenge: Record<string, ChallengeRecord>
  hydrated: boolean
  saveMCQResult: (moduleSlug: string, attempts: number) => void
  saveChallengeComplete: (moduleSlug: string) => void
}

export function useQuiz(): QuizState {
  const [mcq, setMcq] = useState<Record<string, MCQRecord>>({})
  const [challenge, setChallenge] = useState<Record<string, ChallengeRecord>>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const storedMcq = localStorage.getItem(MCQ_KEY)
      if (storedMcq) {
        const parsed = JSON.parse(storedMcq) as Record<string, MCQRecord>
        setMcq(parsed)
      }
      const storedChallenge = localStorage.getItem(CHALLENGE_KEY)
      if (storedChallenge) {
        const parsed = JSON.parse(storedChallenge) as Record<string, ChallengeRecord>
        setChallenge(parsed)
      }
    } catch {
      // localStorage unavailable or corrupt — start fresh
    }
    setHydrated(true)
  }, [])

  const saveMCQResult = useCallback((moduleSlug: string, attempts: number) => {
    setMcq((prev) => {
      const existing = prev[moduleSlug]
      const bestAttempts =
        existing && existing.completed
          ? Math.min(existing.bestAttempts, attempts)
          : attempts
      const next: Record<string, MCQRecord> = {
        ...prev,
        [moduleSlug]: {
          completed: true,
          latestAttempts: attempts,
          bestAttempts,
        },
      }
      try {
        localStorage.setItem(MCQ_KEY, JSON.stringify(next))
      } catch {
        // ignore write errors
      }
      return next
    })
  }, [])

  const saveChallengeComplete = useCallback((moduleSlug: string) => {
    setChallenge((prev) => {
      const next: Record<string, ChallengeRecord> = {
        ...prev,
        [moduleSlug]: { completed: true },
      }
      try {
        localStorage.setItem(CHALLENGE_KEY, JSON.stringify(next))
      } catch {
        // ignore write errors
      }
      return next
    })
  }, [])

  return { mcq, challenge, hydrated, saveMCQResult, saveChallengeComplete }
}
