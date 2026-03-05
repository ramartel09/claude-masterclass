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
