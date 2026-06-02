import { BlogStudio } from '@/components/studio/blog-studio';
import { SiteBackground } from '@/components/site/site-background';
import { SiteFooter } from '@/components/site/site-footer';

const StudioPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col text-white">
      <SiteBackground />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <BlogStudio />
      </main>

      <SiteFooter />
    </div>
  );
};

export default StudioPage;
