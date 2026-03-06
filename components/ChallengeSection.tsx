'use client'

import type { ChallengeData } from '@/lib/quiz'
import { useQuiz } from '@/lib/useQuiz'
import { CopyButton } from '@/components/CopyButton'

interface ChallengeSectionProps {
  moduleSlug: string
  challenge: ChallengeData
}

export function ChallengeSection({ moduleSlug, challenge }: ChallengeSectionProps) {
  const { challenge: challengeRecords, hydrated, saveChallengeComplete } = useQuiz()

  const isCompleted = hydrated && challengeRecords[moduleSlug]?.completed === true

  return (
    <div className="mt-2">
      <h2 className="text-xl font-bold text-indigo-400 mb-3">{challenge.title}</h2>
      <hr className="border-zinc-700 mb-6" />

      <p className="text-zinc-300 text-sm mb-6">{challenge.taskDescription}</p>

      <div className="mb-6">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">
          Starter Prompt
        </p>
        <div className="relative">
          <pre className="bg-zinc-800 rounded-md p-4 text-sm text-zinc-200 whitespace-pre-wrap overflow-x-auto">
            {challenge.starterPrompt}
          </pre>
          <CopyButton text={challenge.starterPrompt} />
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-3">
          Self-Check Rubric
        </p>
        <ul className="space-y-2">
          {challenge.rubric.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
              <input
                type="checkbox"
                className="mt-0.5 accent-indigo-500 shrink-0"
                readOnly
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {isCompleted ? (
        <div className="flex items-center gap-2 text-indigo-300 font-medium text-sm">
          <span>Challenge complete</span>
          <span className="text-indigo-400">✓</span>
        </div>
      ) : (
        <button
          onClick={() => saveChallengeComplete(moduleSlug)}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
        >
          Mark challenge complete
        </button>
      )}
    </div>
  )
}
