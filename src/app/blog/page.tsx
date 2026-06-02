import { SiteBackground } from '@/components/site/site-background';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { BlogCard } from '@/components/blog/blog-card';
import { getBlogPosts } from '@/lib/blog';

const BlogPage = async () => {
  const posts = await getBlogPosts();

  return (
    <div className="relative flex min-h-screen flex-col text-white">
      <SiteBackground />
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <section className="rounded-2xl border border-[#f4efe3]/10 bg-[#151515]/95 p-5 text-[#f4efe3] shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:p-8">
          <h1 className="text-5xl font-bold lowercase tracking-[-0.06em]">
            blog.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#f4efe3]/58">
            thoughts about random stuff.
          </p>

          <div className="mt-12 space-y-10">
            {posts.length > 0 ? (
              posts.map((post) => <BlogCard key={post.slug} post={post} />)
            ) : (
              <p className="pt-6 text-sm text-[#f4efe3]/52">no posts yet.</p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BlogPage;
