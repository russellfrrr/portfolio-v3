import { techStack } from '@/lib/data';
import { SectionPanel } from '@/components/section-panel';

export const TechStack = () => {
  return (
    <SectionPanel title="Tech Stack">
      <div className="space-y-5">
        {Object.entries(techStack).map(([category, items]) => (
          <div key={category}>
            <h3 className="mb-2 text-sm font-semibold capitalize text-zinc-800 dark:text-zinc-200">
              {category}
            </h3>

            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <span
                  key={item}
                  className="border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-zinc-700 transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionPanel>
  );
};
