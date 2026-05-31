import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';

const statusStyles: Record<string, string> = {
  live: 'border-[#b9f6bc]/35 bg-[#b9f6bc] text-[#102012]',
  'in progress': 'border-[#ffd28a]/35 bg-[#ffd28a] text-[#271600]',
  prototype: 'border-[#d6c6ff]/35 bg-[#d6c6ff] text-[#1e1236]',
};

export const ProjectsSection = () => {
  return (
    <section
      className="rounded-2xl border border-[#f4efe3]/20 bg-[#e8dfcf] p-4 text-[#111111] shadow-[0_24px_80px_rgba(74,23,27,0.18)] sm:p-5"
      id="projects"
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold lowercase tracking-[-0.045em]">
          projects.
        </h2>

        <a
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-black/10 bg-[#f4efe3]/30 px-3 py-1.5 text-sm font-bold lowercase text-black/56 outline-none transition-colors hover:border-[#6f1d24] hover:text-black focus-visible:border-[#6f1d24] focus-visible:text-black"
          href="https://github.com/russellfrrr?tab=repositories"
          rel="noreferrer"
          target="_blank"
        >
          view all
          <ArrowUpRight className="size-4" />
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((project, index) => (
          <a
            className={`group flex min-h-64 flex-col justify-between overflow-hidden rounded-xl border border-black/10 bg-[#f4efe3]/28 p-4 text-[#111111] outline-none transition-colors hover:border-[#6f1d24] focus-visible:border-[#6f1d24] focus-visible:ring-2 focus-visible:ring-[#6f1d24]/20 ${
              index === 0 ? 'sm:col-span-2 sm:min-h-68 sm:p-5' : ''
            }`}
            href={project.href}
            key={project.name}
            rel="noreferrer"
            target="_blank"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <p className="pt-1 text-xs font-medium uppercase tracking-[0.14em] text-black/42">
                  {project.eyebrow}
                </p>

                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold lowercase ${
                    statusStyles[project.status] ??
                    'border-[#f4efe3]/20 bg-[#f4efe3] text-black'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <h3 className="mt-9 text-2xl font-bold tracking-[-0.05em] sm:text-3xl">
                {project.name}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-black/56 sm:text-base sm:leading-7">
                {project.description}
              </p>
            </div>

            <div className="mt-8 rounded-xl border border-black/10 bg-[#eadfcb]/42 p-3">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    className="rounded-full border border-black/10 px-2.5 py-1 text-xs font-bold text-black/52"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-black/10 pt-3">
                <p className="text-xs font-bold lowercase text-black/42">
                  {project.role}
                </p>

                <span className="inline-flex items-center gap-2 rounded-lg border border-black/14 bg-[#f4efe3]/22 px-3 py-2 text-sm font-bold lowercase text-black/70 transition-colors group-hover:border-[#6f1d24] group-hover:text-black">
                  link
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
