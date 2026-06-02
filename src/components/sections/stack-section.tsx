import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { techStack } from '@/lib/data';

const stackLinks = {
  TypeScript: {
    href: 'https://www.typescriptlang.org/',
    icon: SiTypescript,
  },
  React: {
    href: 'https://react.dev/',
    icon: SiReact,
  },
  'Next.js': {
    href: 'https://nextjs.org/',
    icon: SiNextdotjs,
  },
  TailwindCSS: {
    href: 'https://tailwindcss.com/',
    icon: SiTailwindcss,
  },
  'Node.js': {
    href: 'https://nodejs.org/',
    icon: SiNodedotjs,
  },
  Express: {
    href: 'https://expressjs.com/',
    icon: SiExpress,
  },
  MongoDB: {
    href: 'https://www.mongodb.com/',
    icon: SiMongodb,
  },
  PostgreSQL: {
    href: 'https://www.postgresql.org/',
    icon: SiPostgresql,
  },
};

export const StackSection = () => {
  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-[#f4efe3]/10 bg-[#151515]/95 p-4 text-[#f4efe3] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
      id="stack"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(111,29,36,0.32),transparent_42%),linear-gradient(to_right,rgba(244,239,227,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,239,227,0.025)_1px,transparent_1px)] bg-[size:auto,36px_36px,36px_36px]" />

      <div className="relative z-10">
        <h2 className="text-lg font-bold tracking-[-0.035em]">tech stack.</h2>

        <div className="mt-5 space-y-6">
        {Object.entries(techStack).map(([category, items]) => (
          <div key={category}>
            <p className="mb-3 text-xs font-bold lowercase tracking-[0.14em] text-[#f4efe3]/36">
              {category.toLowerCase()}
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-4">
              {items.map((item) => {
                const stack = stackLinks[item as keyof typeof stackLinks];
                const Icon = stack.icon;

                return (
                  <a
                    aria-label={item}
                    className="group text-[#f4efe3]/48 outline-none transition-colors hover:text-[#d9a766] focus-visible:text-[#d9a766]"
                    href={stack.href}
                    key={item}
                    rel="noreferrer"
                    target="_blank"
                    title={item}
                  >
                    <Icon className="size-7 transition-transform group-hover:-translate-y-0.5" />
                  </a>
                );
              })}
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};
