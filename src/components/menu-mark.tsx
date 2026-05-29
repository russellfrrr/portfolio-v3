'use client';

import { motion, type Transition } from 'motion/react';

type MenuMarkProps = {
  isActive: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export const MenuMark = ({
  isActive,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: MenuMarkProps) => {
  const lineTransition: Transition = {
    duration: 0.24,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <button
      aria-label="Open menu"
      className="group flex size-9 items-center justify-center rounded-full text-black"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      type="button"
    >
      <span className="relative block h-4 w-6">
        <motion.span
          animate={{
            rotate: isActive ? 45 : 0,
            x: 0,
            y: isActive ? 7 : 0,
          }}
          className="absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current"
          transition={lineTransition}
        />
        <motion.span
          animate={{
            opacity: isActive ? 0 : 1,
            x: isHovered && !isActive ? -4 : 0,
          }}
          className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rounded-full bg-current"
          transition={lineTransition}
        />
        <motion.span
          animate={{
            rotate: isActive ? -45 : 0,
            x: 0,
            y: isActive ? -7 : 0,
          }}
          className="absolute bottom-0 left-0 h-0.5 w-6 rounded-full bg-current"
          transition={lineTransition}
        />
      </span>
    </button>
  );
};
