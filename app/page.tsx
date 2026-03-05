import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Claude Masterclass
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
          Go from casual Claude user to someone who can repeatedly turn ideas into
          shipped, sellable products — without ever writing code yourself.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/modules/01-prompting-mastery"
          className="group block p-6 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-indigo-500 hover:bg-zinc-800/80 transition-all"
        >
          <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide mb-2">
            Module 1
          </div>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-100">
            Prompting Mastery
          </h2>
          <p className="text-sm text-zinc-400">
            Reliably produce high-quality results from Claude on the first or second attempt.
          </p>
        </Link>

        <Link
          href="/modules/02-claude-code-gsd"
          className="group block p-6 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-indigo-500 hover:bg-zinc-800/80 transition-all"
        >
          <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide mb-2">
            Module 2
          </div>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-100">
            Claude Code &amp; GSD
          </h2>
          <p className="text-sm text-zinc-400">
            Build and deploy real software projects without writing a single line of code.
          </p>
        </Link>

        <Link
          href="/modules/03-ai-agents-automation"
          className="group block p-6 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-indigo-500 hover:bg-zinc-800/80 transition-all"
        >
          <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide mb-2">
            Module 3
          </div>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-100">
            AI Agents &amp; Automation
          </h2>
          <p className="text-sm text-zinc-400">
            Design and run multi-step AI workflows that work without constant manual input.
          </p>
        </Link>

        <Link
          href="/modules/04-idea-to-product"
          className="group block p-6 rounded-xl border border-zinc-800 bg-zinc-900 hover:border-indigo-500 hover:bg-zinc-800/80 transition-all"
        >
          <div className="text-xs font-medium text-indigo-400 uppercase tracking-wide mb-2">
            Module 4
          </div>
          <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-100">
            Idea-to-Product Pipeline
          </h2>
          <p className="text-sm text-zinc-400">
            Take any idea from concept to a live, usable product — with Claude as your entire dev team.
          </p>
        </Link>
      </div>

      <div className="mt-12 text-sm text-zinc-500">
        40 lessons across 4 modules &middot; Each with hands-on challenges &middot; Learn at your own pace
      </div>
    </main>
  );
}
