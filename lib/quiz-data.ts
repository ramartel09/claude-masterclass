import type { QuizQuestion, ChallengeData } from '@/lib/quiz'

import m01 from '@/content/quizzes/01-prompting-mastery.json'
import m01c from '@/content/quizzes/01-prompting-mastery-challenge.json'
import m02 from '@/content/quizzes/02-claude-code-gsd.json'
import m02c from '@/content/quizzes/02-claude-code-gsd-challenge.json'
import m03 from '@/content/quizzes/03-ai-agents-automation.json'
import m03c from '@/content/quizzes/03-ai-agents-automation-challenge.json'
import m04 from '@/content/quizzes/04-idea-to-product.json'
import m04c from '@/content/quizzes/04-idea-to-product-challenge.json'

export const quizData: Record<string, { questions: QuizQuestion[]; challenge: ChallengeData }> = {
  '01-prompting-mastery': { questions: m01 as QuizQuestion[], challenge: m01c as ChallengeData },
  '02-claude-code-gsd': { questions: m02 as QuizQuestion[], challenge: m02c as ChallengeData },
  '03-ai-agents-automation': { questions: m03 as QuizQuestion[], challenge: m03c as ChallengeData },
  '04-idea-to-product': { questions: m04 as QuizQuestion[], challenge: m04c as ChallengeData },
}
