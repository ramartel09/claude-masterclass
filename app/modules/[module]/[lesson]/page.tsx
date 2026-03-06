import { getAllLessonPaths, getAllLessonsWithMeta } from '@/lib/content'
import LessonViewer from '@/components/LessonViewer'

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

  const allLessons = await getAllLessonsWithMeta()
  const currentIndex = allLessons.findIndex((l) => l.module === module && l.lesson === lesson)
  const prev = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const next = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  return (
    <LessonViewer
      module={module}
      lesson={lesson}
      title={String(metadata.title ?? lesson)}
      order={Number(metadata.order ?? 0)}
      estimatedMinutes={Number(metadata.estimatedMinutes ?? 0)}
      prev={prev ? { module: prev.module, lesson: prev.lesson, title: prev.title } : null}
      next={next ? { module: next.module, lesson: next.lesson, title: next.title } : null}
    >
      <LessonContent />
    </LessonViewer>
  )
}
