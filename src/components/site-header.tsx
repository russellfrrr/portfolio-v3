import { ThemeToggle } from '@/components/theme-toggle';

const navItems = ['Projects', 'Stack', 'Experience', 'Blog'];

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a className="text-sm font-semibold tracking-tight" href="#">
          russellfrrr
        </a>

        <nav className="hidden items-center gap-5 text-sm text-muted-foreground sm:flex">
          {navItems.map((item) => (
            <a
              key={item}
              className="transition-colors hover:text-foreground"
              href={`#${item.toLowerCase()}`}
            >
              {item}
            </a>
          ))}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};
