import { StudioLogin } from '@/components/studio/studio-login';
import { SiteBackground } from '@/components/site/site-background';
import { SiteFooter } from '@/components/site/site-footer';

const StudioLoginPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col text-white">
      <SiteBackground />

      <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-8">
        <StudioLogin />
      </main>

      <SiteFooter />
    </div>
  );
};

export default StudioLoginPage;
