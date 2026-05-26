import type { ReactNode } from 'react';

type SectionPanelProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};

export const SectionPanel = ({ title, action, children }: SectionPanelProps) => {
  return (
    <section className="border border-zinc-200 bg-white p-5 transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
          {title}
        </h2>
        {action}
      </div>

      {children}
    </section>
  );
};
