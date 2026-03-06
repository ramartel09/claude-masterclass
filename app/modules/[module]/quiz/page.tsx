import { readFileSync } from 'fs'
import { join } from 'path'
import { QuizEngine } from '@/components/QuizEngine'
import type { QuizQuestion, ChallengeData } from '@/lib/quiz'

export async function generateStaticParams() {
  return [
    { module: '01-prompting-mastery' },
    { module: '02-claude-code-gsd' },
    { module: '03-ai-agents-automation' },
    { module: '04-idea-to-product' },
  ]
}

export const dynamicParams = false

export default async function QuizPage({
  params,
}: {
  params: Promise<{ module: string }>
}) {
  const { module: moduleSlug } = await params

  let questions: QuizQuestion[]
  let challenge: ChallengeData

  try {
    const mcqPath = join(process.cwd(), 'content', 'quizzes', `${moduleSlug}.json`)
    const challengePath = join(process.cwd(), 'content', 'quizzes', `${moduleSlug}-challenge.json`)
    questions = JSON.parse(readFileSync(mcqPath, 'utf-8')) as QuizQuestion[]
    challenge = JSON.parse(readFileSync(challengePath, 'utf-8')) as ChallengeData
  } catch {
    return (
      <main className="max-w-2xl mx-auto px-6 py-10">
        <p className="text-zinc-400 p-12">Quiz not available yet.</p>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <QuizEngine moduleSlug={moduleSlug} questions={questions} challenge={challenge} />
    </main>
  )
}
