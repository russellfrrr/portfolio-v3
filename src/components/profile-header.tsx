import { ExternalLink, Mail, MapPin } from 'lucide-react';
import { profile } from '@/lib/data';
import { ThemeToggle } from '@/components/theme-toggle';

const links = [
  {
    label: 'GitHub',
    href: profile.github,
    icon: ExternalLink,
  },
  {
    label: 'LinkedIn',
    href: profile.linkedin,
    icon: ExternalLink,
  },
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
];

export const ProfileHeader = () => {
  return (
    <header className="border border-zinc-200 bg-white p-5 transition-colors duration-200 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {profile.name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            <span>{profile.role}</span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={14} />
              {profile.location}
            </span>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            {profile.intro}
          </p>
        </div>

        <ThemeToggle />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex h-9 items-center gap-2 border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition-colors duration-200 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
              target={link.label === 'Email' ? undefined : '_blank'}
              rel={link.label === 'Email' ? undefined : 'noreferrer'}
            >
              <Icon size={15} />
              {link.label}
            </a>
          );
        })}
      </div>
    </header>
  );
};
