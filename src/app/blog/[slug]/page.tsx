import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/blog/mdx-components';
import { SiteBackground } from '@/components/site/site-background';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { getBlogPost, getBlogPosts } from '@/lib/blog';

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export const generateMetadata = async ({
  params,
}: BlogPostPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    description: post.description,
    title: `${post.title} | russellfrrr`,
  };
};

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative flex min-h-screen flex-col text-white">
      <SiteBackground />
      <SiteHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <article className="rounded-2xl border border-[#f4efe3]/10 bg-[#151515]/95 p-5 text-[#f4efe3] shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:p-8">
          <Link
            className="text-sm font-bold lowercase text-[#f4efe3]/46 transition-colors hover:text-[#d9a766]"
            href="/blog"
          >
            back to blog.
          </Link>

          <header className="mt-8 border-b border-[#f4efe3]/10 pb-8">
            <p className="text-xs font-bold lowercase tracking-[0.12em] text-[#d9a766]/80">
              {post.date}
            </p>
            <h1 className="mt-4 text-5xl font-bold lowercase tracking-[-0.06em] text-[#f4efe3]">
              {post.title}
            </h1>
            <p className="mt-5 text-base leading-7 text-[#f4efe3]/58">
              {post.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  className="text-xs font-bold lowercase text-[#f4efe3]/34"
                  key={tag}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </header>

          <div className="pt-4">
            <MDXRemote components={mdxComponents} source={post.content} />
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
};

export default BlogPostPage;
