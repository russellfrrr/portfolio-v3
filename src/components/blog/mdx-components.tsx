import type { ReactNode } from 'react';

type CalloutProps = {
  children: ReactNode;
};

export const Callout = ({ children }: CalloutProps) => {
  return (
    <div className="my-8 rounded-2xl border border-[#6f1d24]/35 bg-[#6f1d24]/16 p-5 text-[#f4efe3]/78">
      {children}
    </div>
  );
};

export const Highlight = ({ children }: CalloutProps) => {
  return (
    <span className="font-bold text-[#d9a766]">
      {children}
    </span>
  );
};

export const mdxComponents = {
  Callout,
  Highlight,
  a: ({ children, href }: { children: ReactNode; href?: string }) => (
    <a
      className="font-bold text-[#d9a766] underline decoration-[#d9a766]/35 underline-offset-4 transition-colors hover:text-[#f4efe3]"
      href={href}
      rel="noreferrer"
      target={href?.startsWith('http') ? '_blank' : undefined}
    >
      {children}
    </a>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <h2 className="mt-10 text-3xl font-bold tracking-[-0.05em] text-[#f4efe3]">
      {children}
    </h2>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <p className="mt-5 text-base leading-8 text-[#f4efe3]/66">
      {children}
    </p>
  ),
};
