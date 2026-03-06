import { getAllLessonsWithMeta } from '@/lib/content'
import { ModulePageClient } from '@/components/ModulePageClient'

const MODULE_META: Record<string, { name: string; description: string; number: number }> = {
  '01-prompting-mastery': {
    name: 'Prompting Mastery',
    description: 'Reliably produce high-quality results from Claude on the first or second attempt.',
    number: 1,
  },
  '02-claude-code-gsd': {
    name: 'Claude Code & GSD',
    description: 'Build and deploy real software projects without writing a single line of code.',
    number: 2,
  },
  '03-ai-agents-automation': {
    name: 'AI Agents & Automation',
    description: 'Design and run multi-step AI workflows that work without constant manual input.',
    number: 3,
  },
  '04-idea-to-product': {
    name: 'Idea-to-Product Pipeline',
    description: 'Take any idea from concept to a live, usable product — with Claude as your entire dev team.',
    number: 4,
  },
}

export async function generateStaticParams() {
  return [
    { module: '01-prompting-mastery' },
    { module: '02-claude-code-gsd' },
    { module: '03-ai-agents-automation' },
    { module: '04-idea-to-product' },
  ]
}

export const dynamicParams = false

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>
}) {
  const { module: moduleSlug } = await params
  const allLessons = await getAllLessonsWithMeta()
  const lessons = allLessons.filter((l) => l.module === moduleSlug)
  const moduleMeta = MODULE_META[moduleSlug] ?? {
    name: moduleSlug,
    description: '',
    number: 0,
  }

  return (
    <ModulePageClient
      moduleSlug={moduleSlug}
      moduleMeta={moduleMeta}
      lessons={lessons}
    />
  )
}
