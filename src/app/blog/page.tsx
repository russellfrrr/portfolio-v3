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
          <p className="text-sm font-bold lowercase text-[#d9a766]/80">
            writing.
          </p>
          <h1 className="mt-3 text-5xl font-bold lowercase tracking-[-0.06em]">
            blog.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#f4efe3]/58">
            notes, lessons, and build logs from the things i make and learn.
          </p>
        </section>

        <section className="mt-4 rounded-2xl border border-[#f4efe3]/10 bg-[#111111]/95 p-5 text-[#f4efe3] shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-8">
          {posts.length > 0 ? (
            posts.map((post) => <BlogCard key={post.slug} post={post} />)
          ) : (
            <p className="text-sm text-[#f4efe3]/52">no posts yet.</p>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BlogPage;
