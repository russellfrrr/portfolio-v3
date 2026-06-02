'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

const logoSrc = '/brand-logo.png';

export const LogoMark = () => {
  return (
    <Link
      aria-label="Russell Ferrero logo"
      className="grid size-9 place-items-center rounded-full text-black outline-none"
      href="/"
    >
      <motion.span
        className="grid size-9 place-items-center"
        transition={{ duration: 0.22, ease: 'easeOut' }}
        whileFocus={{ rotate: 45, scale: 1.04 }}
        whileHover={{ rotate: 45, scale: 1.04 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Tiny UI chrome icon; raw img avoids next/image repaint quirks here. */}
        <img
          alt=""
          className="size-[22px] object-contain"
          src={logoSrc}
        />
      </motion.span>
    </Link>
  );
};
