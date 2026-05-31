import { experience } from '@/lib/data';

export const ExperienceSection = () => {
  return (
    <section
      className="rounded-2xl border border-[#f4efe3]/20 bg-[#e8dfcf] p-4 text-[#111111] shadow-[0_24px_80px_rgba(74,23,27,0.18)]"
      id="experience"
    >
      <h2 className="text-lg font-bold tracking-[-0.035em]">experience.</h2>

      <div className="mt-4">
        {experience.map((item, index) => (
          <div
            className="relative grid grid-cols-[18px_minmax(0,1fr)] gap-3 pb-5 last:pb-0"
            key={`${item.role}-${item.company}`}
          >
            {index < experience.length - 1 && (
              <span className="absolute left-[8.5px] top-4 h-[calc(100%-1rem)] w-px bg-black/12" />
            )}

            <span
              className={`relative z-10 mt-1 size-[18px] rounded-full border border-[#6f1d24]/55 shadow-[inset_0_0_0_4px_#e8dfcf] transition-colors ${
                item.current
                  ? 'bg-[#6f1d24]'
                  : 'bg-[#f4efe3] hover:bg-[#6f1d24]'
              }`}
            />

            <div className="min-w-0 py-0.5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-bold leading-snug tracking-[-0.025em]">
                  {item.role}
                </h3>

                <span className="shrink-0 pt-0.5 text-xs font-bold text-black/42">
                  {item.year}
                </span>
              </div>

              <p className="mt-1 text-sm font-bold text-black/68">
                {item.company}
              </p>
              <p className="mt-1 text-xs font-medium text-black/44">
                {item.period}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
