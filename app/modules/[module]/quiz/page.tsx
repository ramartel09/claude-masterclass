import { QuizEngine } from '@/components/QuizEngine'
import { quizData } from '@/lib/quiz-data'

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
  const data = quizData[moduleSlug]

  if (!data) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-10">
        <p className="text-zinc-400 p-12">Quiz not available yet.</p>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <QuizEngine moduleSlug={moduleSlug} questions={data.questions} challenge={data.challenge} />
    </main>
  )
}
