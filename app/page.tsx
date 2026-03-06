'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ModuleProgressBar } from '@/components/ModuleProgressBar'
import { useProgress } from '@/lib/useProgress'

const MODULES = [
  {
    slug: '01-prompting-mastery',
    number: 1,
    name: 'Prompting Mastery',
    description: 'Reliably produce high-quality results from Claude on the first or second attempt.',
    total: 10,
  },
  {
    slug: '02-claude-code-gsd',
    number: 2,
    name: 'Claude Code & GSD',
    description: 'Build and deploy real software projects without writing a single line of code.',
    total: 10,
  },
  {
    slug: '03-ai-agents-automation',
    number: 3,
    name: 'AI Agents & Automation',
    description: 'Design and run multi-step AI workflows that work without constant manual input.',
    total: 10,
  },
  {
    slug: '04-idea-to-product',
    number: 4,
    name: 'Idea-to-Product Pipeline',
    description: 'Take any idea from concept to a live, usable product — with Claude as your entire dev team.',
    total: 10,
  },
]

const TOTAL_LESSONS = 40

export default function Dashboard() {
  const { completed, lastVisited, hydrated } = useProgress()

  // Build resume href from lastVisited lessonId (format: "module-slug/lesson-slug")
  const resumeHref = lastVisited ? `/modules/${lastVisited}` : '/modules/01-prompting-mastery/01-what-is-a-prompt'
  const isResuming = hydrated && completed.size > 0 && lastVisited !== null

  const overallCount = hydrated ? completed.size : 0
  const overallPercent = TOTAL_LESSONS > 0 ? Math.round((overallCount / TOTAL_LESSONS) * 100) : 0

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      {/* Section 1: Resume / Start hero button — first visible element */}
      <div className="mb-8">
        <Link
          href={resumeHref}
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          {isResuming ? 'Resume where you left off \u2192' : 'Start: What Is a Prompt? \u2192'}
        </Link>
      </div>

      {/* Section 2: Overall progress summary */}
      <div className="mb-8">
        {hydrated ? (
          <p className="text-zinc-400 text-sm">
            {overallCount} of {TOTAL_LESSONS} lessons complete &mdash; {overallPercent}%
          </p>
        ) : (
          <p className="text-zinc-600 text-sm">Loading progress...</p>
        )}
      </div>

      {/* Section 3: Module cards — full-width list, one per row */}
      <div className="flex flex-col gap-4">
        {MODULES.map((mod) => {
          const completedInModule = hydrated
            ? Array.from(completed).filter((id) => id.startsWith(`${mod.slug}/`)).length
            : 0

          return (
            <Link key={mod.slug} href={`/modules/${mod.slug}`} className="block group">
              <Card className="border-zinc-800 bg-zinc-900 hover:border-indigo-500 transition-colors py-0">
                <CardContent className="px-6 py-5">
                  <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide mb-1">
                    Module {mod.number}
                  </div>
                  <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-indigo-100 transition-colors">
                    {mod.name}
                  </h2>
                  <p className="text-sm text-zinc-400 mb-4">
                    {mod.description}
                  </p>
                  <ModuleProgressBar
                    completedCount={completedInModule}
                    total={mod.total}
                  />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
