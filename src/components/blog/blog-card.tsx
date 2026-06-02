import Link from 'next/link';
import { formatBlogDate, type BlogPostMeta } from '@/lib/blog';

type BlogCardProps = {
  post: BlogPostMeta;
};

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      className="group block"
      href={`/blog/${post.slug}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold lowercase tracking-[0.12em] text-[#d9a766]/80">
            {formatBlogDate(post.date)}
          </p>
          <h2 className="mt-3 text-3xl font-bold lowercase tracking-[-0.055em] text-[#f4efe3] transition-colors group-hover:text-[#d9a766]">
            {post.title}
          </h2>
        </div>

        <span className="text-sm font-bold text-[#f4efe3]/40 transition-colors group-hover:text-[#f4efe3]">
          read
        </span>
      </div>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-[#f4efe3]/58">
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
    </Link>
  );
};
