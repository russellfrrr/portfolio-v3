import { experience } from '@/lib/data';
import { SectionPanel } from '@/components/section-panel';

export const ExperienceList = () => {
  return (
    <SectionPanel title="Experience">
      <div className="space-y-4">
        {experience.map((item) => (
          <div
            key={`${item.role}-${item.company}`}
            className="border-l border-zinc-200 pl-4 transition-colors duration-200 dark:border-zinc-800"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.company}
                </p>
              </div>

              <span className="text-xs font-medium text-zinc-500">
                {item.year}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionPanel>
  );
};
