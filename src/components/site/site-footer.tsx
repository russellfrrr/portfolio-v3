import { Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6';
import { profile } from '@/lib/data';

const footerLinks = [
  {
    label: 'github',
    href: profile.github,
    icon: FaGithub,
  },
  {
    label: 'linkedin',
    href: profile.linkedin,
    icon: FaLinkedinIn,
  },
  {
    label: 'email',
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
];

export const SiteFooter = () => {
  return (
    <footer className="mt-10 border-t border-[#f4efe3]/10 bg-[#151515]/92 px-4 py-10 text-[#f4efe3]">
      <div className="mx-auto grid max-w-5xl gap-8 text-center sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:text-left">
        <div>
          <p className="text-sm font-bold lowercase text-[#f4efe3]/52">
            {profile.slogan}
          </p>
          <a
            className="mt-5 inline-block text-3xl font-bold tracking-[-0.055em] outline-none transition-colors hover:text-[#d9a766] focus-visible:text-[#d9a766]"
            href={`mailto:${profile.email}`}
          >
            {profile.handle}
          </a>
        </div>

        <div className="space-y-5 sm:text-right">
          <div className="flex justify-center gap-4 sm:justify-end">
            {footerLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  aria-label={link.label}
                  className="text-[#f4efe3]/52 transition-colors hover:text-[#d9a766] focus-visible:text-[#d9a766]"
                  href={link.href}
                  key={link.label}
                  rel={link.label === 'email' ? undefined : 'noreferrer'}
                  target={link.label === 'email' ? undefined : '_blank'}
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>

          <p className="text-sm font-medium text-[#f4efe3]/42">
            © 2026 Russell Ferrero. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
