import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { Card } from '@/components/ui/card';
import { profile } from '@/lib/data';

const profileLinks = [
  {
    label: 'github',
    handle: '@russellfrrr',
    href: profile.github,
    icon: FaGithub,
    external: true,
  },
  {
    label: 'linkedin',
    handle: '/in/russellfrrr',
    href: profile.linkedin,
    icon: FaLinkedinIn,
    external: true,
  },
  {
    label: 'email',
    handle: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
];

const profileMeta = [
  {
    label: 'based in',
    value: profile.location,
  },
  {
    label: 'focus',
    value: 'web apps',
  },
  {
    label: 'stack',
    value: 'next.js / node',
  },
  {
    label: 'expertise',
    value: 'frontend / full-stack',
  },
];

export const DevProfile = () => {
  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="relative h-full overflow-hidden rounded-2xl border-[#f4efe3]/10 bg-[#151515]/95 p-6 text-[#f4efe3] shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="absolute -inset-16 animate-[profile-glow_8s_ease-in-out_infinite] bg-[radial-gradient(circle_at_16%_10%,rgba(244,239,227,0.08),transparent_32%),radial-gradient(circle_at_90%_82%,rgba(74,23,27,0.58),transparent_44%),radial-gradient(circle_at_78%_22%,rgba(122,42,47,0.13),transparent_34%)]" />

        <div className="relative z-10 flex h-full min-h-[340px] flex-col sm:min-h-[380px]">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#f4efe3]/58">
              <MapPin className="size-4" />
              {profile.location}
            </p>

            <h1 className="max-w-2xl text-5xl font-bold tracking-[-0.055em] text-balance sm:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-4 text-xl font-medium tracking-[-0.025em] text-[#f4efe3]/76">
              {profile.role}
            </p>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#f4efe3]/62 sm:text-lg sm:leading-8">
              {profile.intro}
            </p>
          </div>

          <div className="mt-auto grid gap-2 pt-6 sm:grid-cols-3">
            {profileLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  className="group flex min-h-24 flex-col justify-between rounded-xl border border-[#f4efe3]/30 bg-[#101010]/70 p-3 text-[#f4efe3] outline-none transition duration-300 hover:border-[#6f1d24] focus-visible:border-[#6f1d24] focus-visible:ring-2 focus-visible:ring-[#6f1d24]/35"
                  href={link.href}
                  key={link.label}
                  rel={link.external ? 'noreferrer' : undefined}
                  target={link.external ? '_blank' : undefined}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Icon className="size-5 transition-colors duration-300 group-hover:text-[#f4efe3]" />
                    <ArrowUpRight className="size-4 opacity-55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </div>

                  <div>
                    <p className="text-sm font-bold tracking-[-0.02em]">
                      {link.label}
                    </p>
                    <p className="mt-0.5 truncate text-xs font-medium text-[#f4efe3]/55">
                      {link.handle}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </Card>

      <Card className="rounded-2xl border-[#f4efe3]/20 bg-[#e8dfcf] p-5 text-[#111111] shadow-[0_24px_80px_rgba(74,23,27,0.18)]">
        <div className="flex h-full flex-col">
          <div>
            <p className="text-sm font-bold lowercase tracking-[-0.02em]">
              overview.
            </p>

            <p className="mt-2 text-sm leading-6 text-black/52">
              summary for the VIPs.
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-evenly py-2">
            {profileMeta.map((item) => (
              <div key={item.label}>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/42">
                  {item.label}
                </p>
                <p className="mt-1.5 text-base font-bold leading-snug tracking-[-0.035em]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
};
