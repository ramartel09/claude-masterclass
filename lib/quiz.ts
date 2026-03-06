export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface ChallengeData {
  title: string
  taskDescription: string
  starterPrompt: string
  rubric: string[]
}

export interface MCQRecord {
  completed: boolean
  latestAttempts: number
  bestAttempts: number
}

export function initQueue(questionCount: number): number[] {
  return Array.from({ length: questionCount }, (_, i) => i)
}

export function requeueWrong(currentQueue: number[], wrongQuestionIndex: number): number[] {
  const insertAt = Math.floor(Math.random() * currentQueue.length) + 1
  const next = [...currentQueue]
  next.splice(insertAt, 0, wrongQuestionIndex)
  return next
}
