'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { LogoMark } from '@/components/signature-pill/logo-mark';
import { MenuMark } from '@/components/signature-pill/menu-mark';
import { SlitherBrand } from '@/components/signature-pill/slither-brand';

const menuItems = [
  {
    label: 'projects.',
    href: '#projects',
    gradient:
      'radial-gradient(circle at 18% 28%, rgba(255, 180, 80, 0.95), transparent 34%), radial-gradient(circle at 82% 74%, rgba(255, 92, 28, 0.85), transparent 38%), linear-gradient(135deg, rgba(244, 239, 227, 0.34), rgba(24, 24, 24, 0.15))',
  },
  {
    label: 'blog.',
    href: '#blog',
    gradient:
      'radial-gradient(circle at 20% 30%, rgba(94, 234, 212, 0.9), transparent 34%), radial-gradient(circle at 84% 76%, rgba(96, 165, 250, 0.8), transparent 40%), linear-gradient(135deg, rgba(244, 239, 227, 0.22), rgba(24, 24, 24, 0.12))',
  },
  {
    label: 'contact.',
    href: 'mailto:russellferrero00@gmail.com',
    gradient:
      'radial-gradient(circle at 18% 30%, rgba(214, 255, 107, 0.9), transparent 34%), radial-gradient(circle at 82% 76%, rgba(52, 211, 153, 0.78), transparent 40%), linear-gradient(135deg, rgba(244, 239, 227, 0.28), rgba(24, 24, 24, 0.12))',
  },
];

export const SignaturePill = () => {
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [openHeight, setOpenHeight] = useState(220);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const updateOpenHeight = () => {
      setOpenHeight(window.innerWidth < 640 ? 376 : 220);
    };

    updateOpenHeight();
    window.addEventListener('resize', updateOpenHeight);

    return () => {
      window.removeEventListener('resize', updateOpenHeight);
    };
  }, []);

  return (
    <header className="sticky top-3 z-20 mx-auto h-14 max-w-5xl px-3 sm:top-4 sm:px-4">
      <motion.div
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        className="pointer-events-none fixed inset-0 top-0 -z-10 bg-black/20 backdrop-blur-[2px]"
        initial={false}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      />

      <motion.div
        animate={{ height: isMenuOpen ? openHeight : 56 }}
        className="absolute inset-x-3 top-0 overflow-hidden rounded-2xl border border-neutral-200 bg-[#f4efe3] text-black shadow-[0_14px_45px_rgba(0,0,0,0.28)] sm:inset-x-4"
        initial={false}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex h-14 w-full items-center justify-between px-4">
          <MenuMark
            isActive={isMenuOpen}
            isHovered={isMenuHovered}
            onClick={() => setIsMenuOpen((current) => !current)}
            onMouseEnter={() => setIsMenuHovered(true)}
            onMouseLeave={() => setIsMenuHovered(false)}
          />

          <SlitherBrand />
          <LogoMark />
        </div>

        <motion.div
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            y: isMenuOpen ? 0 : -8,
          }}
          className="pointer-events-none absolute inset-x-0 top-14"
          initial={false}
          transition={{
            duration: 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className={`grid gap-2 px-3 pb-3 pt-1 sm:grid-cols-3 sm:gap-3 sm:px-4 sm:pb-4 ${
              isMenuOpen ? 'pointer-events-auto' : ''
            }`}
          >
            {menuItems.map((item) => (
              <a
                className="group relative flex h-24 overflow-hidden rounded-xl bg-[#181818] p-4 text-[#f4efe3] ring-1 ring-black/10 transition-transform hover:-translate-y-0.5 sm:h-36 sm:p-5"
                href={item.href}
                key={item.label}
                onClick={() => setIsMenuOpen(false)}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <span
                  className="absolute -inset-8 opacity-80 blur-2xl"
                  style={{
                    background: item.gradient,
                  }}
                />
                <span className="absolute inset-0 bg-[#181818]/45" />

                <span className="relative z-10 flex size-full flex-col justify-between">
                  <ArrowUpRight className="ml-auto size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span>
                    <span className="block text-2xl font-bold lowercase leading-none tracking-[-0.035em] text-[#f4efe3] sm:text-3xl">
                      {item.label}
                    </span>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
};
