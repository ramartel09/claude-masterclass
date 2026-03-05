import { getAllLessonPaths } from '@/lib/content'

export async function generateStaticParams() {
  // Returns empty array if no .mdx files exist yet — build still succeeds
  try {
    return await getAllLessonPaths()
  } catch {
    return []
  }
}

export const dynamicParams = false

export default async function LessonPage({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>
}) {
  const { module, lesson } = await params

  let LessonContent: React.ComponentType
  let metadata: Record<string, unknown> = {}

  try {
    const imported = await import(`@/content/modules/${module}/${lesson}.mdx`)
    LessonContent = imported.default
    metadata = imported.metadata ?? {}
  } catch {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-zinc-400">Lesson not found.</p>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <p className="text-sm text-zinc-400 uppercase tracking-wide mb-2">
          Lesson {String(metadata.order ?? '')} · {String(metadata.estimatedMinutes ?? '')} min
        </p>
        <h1 className="text-3xl font-bold text-white">{String(metadata.title ?? lesson)}</h1>
      </div>
      <article className="prose prose-invert max-w-none">
        <LessonContent />
      </article>
    </main>
  )
}
