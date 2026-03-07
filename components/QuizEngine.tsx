'use client'

import { useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import type { QuizQuestion } from '@/lib/quiz'
import { initQueue, requeueWrong } from '@/lib/quiz'
import { useQuiz } from '@/lib/useQuiz'

interface QuizEngineProps {
  moduleSlug: string
  questions: QuizQuestion[]
}

export function QuizEngine({ moduleSlug, questions }: QuizEngineProps) {
  const { saveMCQResult } = useQuiz()

  const [queue, setQueue] = useState<number[]>(() => initQueue(questions.length))
  const [currentPos, setCurrentPos] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [incorrectOnce, setIncorrectOnce] = useState<Set<number>>(new Set())
  const [attemptCount, setAttemptCount] = useState(0)
  const seenQuestions = useRef(new Set<number>([0]))
  const [seenCount, setSeenCount] = useState(1)
  const [done, setDone] = useState(false)

  const currentQuestionIndex = queue[currentPos]
  const currentQuestion = questions[currentQuestionIndex]

  const handleSelect = useCallback((idx: number) => {
    if (showFeedback) return
    setSelectedIndex(idx)
    setShowFeedback(true)
  }, [showFeedback])

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return

    const isCorrect = selectedIndex === currentQuestion.correctIndex

    if (!isCorrect) {
      setIncorrectOnce((prev) => {
        const next = new Set(prev)
        next.add(currentQuestionIndex)
        return next
      })
      const newQueue = requeueWrong(queue, currentQuestionIndex)
      setQueue(newQueue)
      setAttemptCount((prev) => prev + 1)
      const nextPos = currentPos + 1
      if (nextPos >= newQueue.length) {
        saveMCQResult(moduleSlug, attemptCount + 1)
        setDone(true)
      } else {
        const nextIdx = newQueue[nextPos]
        if (!seenQuestions.current.has(nextIdx)) {
          seenQuestions.current.add(nextIdx)
          setSeenCount((prev) => prev + 1)
        }
        setCurrentPos(nextPos)
      }
    } else {
      const newQueue = [...queue.slice(0, currentPos), ...queue.slice(currentPos + 1)]
      const nextPos = currentPos
      if (newQueue.length === 0 || nextPos >= newQueue.length) {
        saveMCQResult(moduleSlug, attemptCount)
        setDone(true)
        setQueue(newQueue)
      } else {
        const nextIdx = newQueue[nextPos]
        if (!seenQuestions.current.has(nextIdx)) {
          seenQuestions.current.add(nextIdx)
          setSeenCount((prev) => prev + 1)
        }
        setQueue(newQueue)
        setCurrentPos(nextPos)
      }
    }

    setSelectedIndex(null)
    setShowFeedback(false)
  }, [selectedIndex, currentQuestion, currentQuestionIndex, queue, currentPos, attemptCount, moduleSlug, saveMCQResult])

  const handleRetake = useCallback(() => {
    setQueue(initQueue(questions.length))
    setCurrentPos(0)
    setSelectedIndex(null)
    setShowFeedback(false)
    setIncorrectOnce(new Set())
    setAttemptCount(0)
    seenQuestions.current = new Set<number>([0])
    setSeenCount(1)
    setDone(false)
  }, [questions.length])

  if (done) {
    const incorrectList = Array.from(incorrectOnce)
    return (
      <div className="bg-zinc-900 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 py-10">
          <div className="mb-8 text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
            <p className="text-zinc-400">
              Mastered in {attemptCount} re-queue{attemptCount !== 1 ? 's' : ''}
            </p>
          </div>

          {incorrectList.length > 0 && (
            <div className="mb-8 bg-zinc-800/50 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-4">
                Questions that needed multiple attempts
              </h3>
              <ul className="space-y-4">
                {incorrectList.map((qi) => (
                  <li key={qi} className="text-sm">
                    <p className="text-zinc-300 mb-1">{questions[qi].question}</p>
                    <p className="text-indigo-300 text-xs">
                      Correct answer: {questions[qi].options[questions[qi].correctIndex]}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleRetake}
            className="mb-12 inline-flex items-center gap-2 border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
          >
            Retake Quiz
          </button>

          <div className="border-t border-zinc-800 pt-10 text-center">
            <p className="text-zinc-400 text-sm mb-6">Ready for the module challenge?</p>
            <Link
              href={`/modules/${moduleSlug}/challenge`}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              Take the Challenge →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Progress indicator */}
        <div className="text-xs text-zinc-500 mb-6">
          Question {seenCount} of {questions.length}
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-white mb-6">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, idx) => {
            let className =
              'w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors cursor-pointer '

            if (!showFeedback) {
              if (selectedIndex === idx) {
                className += 'border-indigo-500 bg-indigo-900/40 text-white'
              } else {
                className += 'border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-500 hover:text-white'
              }
            } else {
              if (idx === currentQuestion.correctIndex) {
                className += 'border-green-500 bg-green-900/30 text-green-200'
              } else if (idx === selectedIndex) {
                className += 'border-red-500 bg-red-900/30 text-red-200'
              } else {
                className += 'border-zinc-700 bg-zinc-800/50 text-zinc-500'
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showFeedback}
                className={className}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* Feedback */}
        {showFeedback && selectedIndex !== null && (
          <div className="mb-6">
            {selectedIndex === currentQuestion.correctIndex ? (
              <div className="flex items-start gap-2 p-4 bg-green-900/20 border border-green-700/40 rounded-lg">
                <span className="text-green-400 text-lg leading-none mt-0.5">✓</span>
                <div>
                  <p className="text-green-300 font-medium text-sm mb-1">Correct!</p>
                  <p className="text-zinc-300 text-sm">{currentQuestion.explanation}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 p-4 bg-red-900/20 border border-red-700/40 rounded-lg">
                <span className="text-red-400 text-lg leading-none mt-0.5">✗</span>
                <div>
                  <p className="text-red-300 font-medium text-sm mb-1">Incorrect</p>
                  <p className="text-zinc-300 text-sm mb-2">{currentQuestion.explanation}</p>
                  <p className="text-zinc-500 text-xs italic">This question will appear again.</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Next button */}
        {showFeedback && (
          <button
            onClick={handleNext}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}
