import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';

const statusStyles: Record<string, string> = {
  live: 'text-[#9ad7a0] before:bg-[#9ad7a0]',
  'in progress': 'text-[#d9a766] before:bg-[#d9a766]',
  prototype: 'text-[#b9a7dd] before:bg-[#b9a7dd]',
};

export const ProjectsSection = () => {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-[#f4efe3]/10 bg-[#111111] p-4 text-[#f4efe3] shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:p-5"
      id="projects"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_4%,rgba(244,239,227,0.08),transparent_34%),radial-gradient(circle_at_92%_94%,rgba(111,29,36,0.34),transparent_42%)]" />

      <div className="relative z-10 mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold lowercase tracking-[-0.045em]">
          projects.
        </h2>

        <a
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#f4efe3]/16 bg-[#f4efe3]/6 px-3 py-1.5 text-sm font-bold lowercase text-[#f4efe3]/62 outline-none transition-colors hover:border-[#6f1d24] hover:text-[#f4efe3] focus-visible:border-[#6f1d24] focus-visible:text-[#f4efe3]"
          href="https://github.com/russellfrrr?tab=repositories"
          rel="noreferrer"
          target="_blank"
        >
          view all
          <ArrowUpRight className="size-4" />
        </a>
      </div>

      <div className="relative z-10">
        {projects.map((project, index) => (
          <a
            className="group block border-t border-[#f4efe3]/10 py-6 text-[#f4efe3] outline-none first:border-t-0 first:pt-3 last:pb-1 focus-visible:ring-2 focus-visible:ring-[#6f1d24]/35"
            href={project.href}
            key={project.name}
            rel="noreferrer"
            target="_blank"
          >
            <div className={index === 0 ? '' : ''}>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#f4efe3]/36">
                      {project.eyebrow}
                    </p>

                    <h3 className="mt-3 text-2xl font-bold tracking-[-0.05em] transition-colors group-hover:text-[#f4efe3] sm:text-3xl">
                      {project.name}
                    </h3>
                  </div>

                  <div className="flex shrink-0 items-start gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 pt-1 text-xs font-bold lowercase before:size-1.5 before:rounded-full ${
                        statusStyles[project.status] ??
                        'text-[#f4efe3]/55 before:bg-[#f4efe3]/55'
                      }`}
                    >
                      {project.status}
                    </span>

                    <ArrowUpRight className="mt-0.5 size-4 text-[#f4efe3]/42 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#f4efe3]" />
                  </div>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f4efe3]/60 sm:text-base sm:leading-7">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold lowercase text-[#f4efe3]/42">
                  <p className="text-[#d9a766]/80">{project.role}</p>
                  <p className="text-[#f4efe3]/34">
                    {project.stack.join(' | ')}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
