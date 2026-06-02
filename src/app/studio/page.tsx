import { BlogStudio } from '@/components/studio/blog-studio';
import { SiteBackground } from '@/components/site/site-background';
import { SiteFooter } from '@/components/site/site-footer';
import { getBlogPosts } from '@/lib/blog';

export const dynamic = 'force-dynamic';

const StudioPage = async () => {
  const posts = await getBlogPosts();

  return (
    <div className="relative flex min-h-screen flex-col text-white">
      <SiteBackground />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <BlogStudio initialPosts={posts} />
      </main>

      <SiteFooter />
    </div>
  );
};

export default StudioPage;
