import { Globe, Menu } from 'lucide-react';

export const SiteHeader = () => {
  return (
    <header className="sticky top-4 z-20 mx-auto flex max-w-5xl justify-center px-4">
      <div className="flex h-14 w-full items-center justify-between rounded-2xl border border-neutral-200 bg-[#f4efe3] px-5 text-black shadow-sm">
        <button type="button" aria-label="Open menu">
          <Menu className="size-5" />
        </button>

        <a className="text-sm font-bold tracking-tight" href="#">
          russellfrrr
        </a>

        <a href="#links" aria-label="Links">
          <Globe className="size-5" />
        </a>
      </div>
    </header>
  );
};