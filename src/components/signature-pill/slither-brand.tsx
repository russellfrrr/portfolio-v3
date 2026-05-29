'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const phrases = {
  brand: 'russellfrrr',
  slogan: 'all about web.',
};

const getWave = (index: number) => {
  return index % 2 === 0 ? -10 : 10;
};

export const SlitherBrand = () => {
  const [isHovered, setIsHovered] = useState(false);
  const phrase = isHovered ? phrases.slogan : phrases.brand;

  return (
    <a
      aria-label="russellfrrr, all about web"
      className="relative flex h-9 min-w-44 items-center justify-center overflow-hidden text-base font-black tracking-tight text-black sm:min-w-56 sm:text-lg"
      href="#"
      onBlur={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          animate="show"
          className="absolute flex whitespace-pre"
          exit="hide"
          initial="hide"
          key={phrase}
          transition={{ staggerChildren: 0.018 }}
        >
          {phrase.split('').map((character, index) => (
            <motion.span
              className="inline-block"
              key={`${phrase}-${character}-${index}`}
              variants={{
                hide: {
                  opacity: 0,
                  x: index % 2 === 0 ? -12 : 12,
                  y: getWave(index),
                  rotate: index % 2 === 0 ? -8 : 8,
                },
                show: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  transition: {
                    duration: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              {character === ' ' ? '\u00A0' : character}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </a>
  );
};
