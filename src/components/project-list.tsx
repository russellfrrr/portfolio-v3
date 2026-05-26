import { projects } from '@/lib/data';
import { SectionPanel } from '@/components/section-panel';

export const ProjectList = () => {
  return (
    <SectionPanel title="Featured Projects">
      <div className="space-y-3">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.href}
            className="block border border-zinc-200 bg-zinc-50 p-4 transition-colors duration-200 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-black dark:hover:bg-zinc-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="text-xs text-zinc-500 dark:text-zinc-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </SectionPanel>
  );
};
