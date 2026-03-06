// lib/content.ts — server-side only, do not import in client components
import { globby as glob } from 'globby'

export interface LessonMeta {
  title: string
  module: string
  order: number
  estimatedMinutes: number
  challengeTitle: string
}

export interface LessonPath {
  module: string
  lesson: string
}

export async function getAllLessonPaths(): Promise<LessonPath[]> {
  const files = await glob('content/modules/**/*.mdx', {
    ignore: ['**/capstone.mdx'],
    cwd: process.cwd(),
  })
  return files
    .map((file) => {
      const parts = file.replace('content/modules/', '').replace('.mdx', '').split('/')
      return { module: parts[0], lesson: parts[1] }
    })
    .sort((a, b) => {
      if (a.module !== b.module) return a.module.localeCompare(b.module)
      return a.lesson.localeCompare(b.lesson)
    })
}

export async function getLessonsByModule(moduleSlug: string): Promise<LessonPath[]> {
  const all = await getAllLessonPaths()
  return all.filter((p) => p.module === moduleSlug)
}

export interface LessonWithMeta extends LessonPath, LessonMeta {}

export async function getLessonMeta(module: string, lesson: string): Promise<LessonMeta> {
  try {
    const mod = await import(`@/content/modules/${module}/${lesson}.mdx`)
    const meta = mod.metadata as LessonMeta
    return {
      title: meta?.title ?? lesson,
      module: meta?.module ?? module,
      order: meta?.order ?? 0,
      estimatedMinutes: meta?.estimatedMinutes ?? 5,
      challengeTitle: meta?.challengeTitle ?? '',
    }
  } catch {
    return {
      title: lesson,
      module,
      order: 0,
      estimatedMinutes: 5,
      challengeTitle: '',
    }
  }
}

export async function getAllLessonsWithMeta(): Promise<LessonWithMeta[]> {
  const paths = await getAllLessonPaths()
  const lessons = await Promise.all(
    paths.map(async (p) => {
      const meta = await getLessonMeta(p.module, p.lesson)
      return { ...p, ...meta }
    })
  )
  return lessons
}
