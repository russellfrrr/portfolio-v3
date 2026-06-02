import { ArrowUpRight } from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiExpress,
  SiFramer,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiShadcnui,
  SiTypescript,
  SiVitest,
} from 'react-icons/si';
import { projects } from '@/lib/data';

const statusStyles: Record<string, string> = {
  live: 'text-[#9ad7a0]',
  'in progress': 'text-[#d9a766]',
  prototype: 'text-[#b9a7dd]',
};

const statusDots: Record<string, string> = {
  live: 'animate-[soft-blink_1.8s_ease-in-out_infinite] bg-[#9ad7a0]',
  'in progress': 'bg-[#d9a766]',
  prototype: 'bg-[#b9a7dd]',
};

const statusOrder: Record<string, number> = {
  live: 0,
  'in progress': 1,
  prototype: 2,
};

const stackIcons: Record<string, { icon?: IconType; label?: string }> = {
  Express: {
    icon: SiExpress,
  },
  JavaScript: {
    icon: SiJavascript,
  },
  MERN: {
    label: 'MERN',
  },
  MongoDB: {
    icon: SiMongodb,
  },
  Motion: {
    icon: SiFramer,
  },
  'Next.js': {
    icon: SiNextdotjs,
  },
  'Node.js': {
    icon: SiNodedotjs,
  },
  Qdrant: {
    label: 'Q',
  },
  RAG: {
    label: 'RAG',
  },
  React: {
    icon: SiReact,
  },
  'shadcn/ui': {
    icon: SiShadcnui,
  },
  TypeScript: {
    icon: SiTypescript,
  },
  Vitest: {
    icon: SiVitest,
  },
};

export const ProjectsSection = () => {
  const sortedProjects = [...projects].sort(
    (a, b) => (statusOrder[a.status] ?? 99) - (statusOrder[b.status] ?? 99)
  );

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
        {sortedProjects.map((project) => (
          <article
            className="border-t border-[#f4efe3]/10 py-6 text-[#f4efe3] first:border-t-0 first:pt-3 last:pb-1"
            key={project.name}
          >
            <div>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <a
                      className="text-2xl font-bold tracking-[-0.05em] text-[#f4efe3] outline-none transition-colors hover:text-[#d9a766] focus-visible:text-[#d9a766] sm:text-3xl"
                      href={project.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {project.name}
                    </a>
                  </div>

                  <div className="flex shrink-0 items-start gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 pt-1 text-xs font-bold lowercase ${
                        statusStyles[project.status] ??
                        'text-[#f4efe3]/55'
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          statusDots[project.status] ?? 'bg-[#f4efe3]/55'
                        }`}
                      />
                      {project.status}
                    </span>
                  </div>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f4efe3]/60 sm:text-base sm:leading-7">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold lowercase text-[#f4efe3]/42">
                  <p className="text-[#d9a766]/80">{project.role}</p>
                  <div className="flex flex-wrap items-center gap-3 text-[#f4efe3]/36">
                    {project.stack.map((item) => {
                      const stack = stackIcons[item];
                      const Icon = stack?.icon;

                      return (
                        <span
                          className="inline-flex items-center text-[#f4efe3]/38"
                          key={item}
                          title={item}
                        >
                          {Icon ? (
                            <Icon aria-label={item} className="size-4" />
                          ) : (
                            <span className="text-[0.65rem] font-bold uppercase tracking-[0.08em]">
                              {stack?.label ?? item}
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
