import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export type BlogPostMeta = {
  date: string;
  description: string;
  slug: string;
  tags: string[];
  title: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const isMdxFile = (fileName: string) => fileName.endsWith('.mdx');

const getSlugFromFileName = (fileName: string) => fileName.replace(/\.mdx$/, '');

const parseBlogFile = async (fileName: string): Promise<BlogPost> => {
  const slug = getSlugFromFileName(fileName);
  const filePath = path.join(blogDirectory, fileName);
  const file = await readFile(filePath, 'utf8');
  const { content, data } = matter(file);

  return {
    content,
    date: String(data.date ?? ''),
    description: String(data.description ?? ''),
    slug,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    title: String(data.title ?? slug),
  };
};

export const getBlogPosts = async () => {
  const files = await readdir(blogDirectory);
  const posts = await Promise.all(files.filter(isMdxFile).map(parseBlogFile));

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getLatestBlogPosts = async (limit = 2) => {
  const posts = await getBlogPosts();

  return posts.slice(0, limit);
};

export const getBlogPost = async (slug: string) => {
  const posts = await getBlogPosts();

  return posts.find((post) => post.slug === slug) ?? null;
};
