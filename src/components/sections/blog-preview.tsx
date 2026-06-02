import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { formatBlogDate, getLatestBlogPosts } from '@/lib/blog';

export const BlogPreview = async () => {
  const posts = await getLatestBlogPosts(2);

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-[#f4efe3]/10 bg-[#151515] p-5 text-[#f4efe3] shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
      id="blog"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(217,167,102,0.18),transparent_34%),radial-gradient(circle_at_88%_84%,rgba(111,29,36,0.34),transparent_42%),linear-gradient(135deg,rgba(244,239,227,0.05),rgba(0,0,0,0))]" />
      <div className="pointer-events-none absolute inset-0 bg-[#151515]/72" />

      <div className="relative flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold lowercase tracking-[-0.035em]">
          blog.
        </h2>

        <Link
          className="inline-flex items-center gap-1 text-sm font-bold lowercase text-[#f4efe3]/50 transition-colors hover:text-[#d9a766]"
          href="/blog"
        >
          view all
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="relative mt-5">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              className="group block border-t border-[#f4efe3]/10 py-4 first:border-t-0 first:pt-0 last:pb-0"
              href={`/blog/${post.slug}`}
              key={post.slug}
            >
              <p className="text-xs font-bold lowercase tracking-[0.12em] text-[#d9a766]/70">
                {formatBlogDate(post.date)}
              </p>
              <h3 className="mt-2 text-xl font-bold lowercase tracking-[-0.045em] transition-colors group-hover:text-[#d9a766]">
                {post.title}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#f4efe3]/54">
                {post.description}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-sm leading-6 text-[#f4efe3]/52">
            notes, lessons, and project breakdowns will live here soon.
          </p>
        )}
      </div>
    </section>
  );
};
