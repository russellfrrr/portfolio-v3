import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { createBlogMdxFile, type BlogDraftPayload, slugify } from '@/lib/studio';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export const runtime = 'nodejs';

type BlogPostRouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

const isValidPayload = (payload: Partial<BlogDraftPayload>) => {
  return Boolean(
    payload.content?.trim()
      && payload.date?.trim()
      && payload.description?.trim()
      && payload.title?.trim()
  );
};

export const PUT = async (
  request: Request,
  { params }: BlogPostRouteContext
) => {
  const { slug } = await params;
  const currentSlug = slugify(slug);
  const payload = (await request.json()) as Partial<BlogDraftPayload>;

  if (!currentSlug) {
    return NextResponse.json(
      { message: 'Post slug is invalid.' },
      { status: 400 }
    );
  }

  if (!isValidPayload(payload)) {
    return NextResponse.json(
      { message: 'Title, description, date, and content are required.' },
      { status: 400 }
    );
  }

  const nextSlug = slugify(payload.slug || payload.title || '');

  if (!nextSlug) {
    return NextResponse.json(
      { message: 'Use a title or slug with letters or numbers.' },
      { status: 400 }
    );
  }

  const currentPath = path.join(blogDirectory, `${currentSlug}.mdx`);
  const nextPath = path.join(blogDirectory, `${nextSlug}.mdx`);
  const mdx = createBlogMdxFile({
    content: payload.content ?? '',
    date: payload.date ?? '',
    description: payload.description ?? '',
    tags: payload.tags ?? [],
    title: payload.title ?? '',
  });

  await mkdir(blogDirectory, { recursive: true });

  try {
    await writeFile(nextPath, mdx, {
      encoding: 'utf8',
      flag: currentSlug === nextSlug ? 'w' : 'wx',
    });

    if (currentSlug !== nextSlug) {
      await unlink(currentPath);
    }
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'EEXIST') {
      return NextResponse.json(
        { message: 'A post with this slug already exists.' },
        { status: 409 }
      );
    }

    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return NextResponse.json(
        { message: 'Post not found.' },
        { status: 404 }
      );
    }

    throw error;
  }

  return NextResponse.json({ fileName: `${nextSlug}.mdx`, slug: nextSlug });
};

export const DELETE = async (
  _request: Request,
  { params }: BlogPostRouteContext
) => {
  const { slug } = await params;
  const currentSlug = slugify(slug);

  if (!currentSlug) {
    return NextResponse.json(
      { message: 'Post slug is invalid.' },
      { status: 400 }
    );
  }

  try {
    await unlink(path.join(blogDirectory, `${currentSlug}.mdx`));
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return NextResponse.json(
        { message: 'Post not found.' },
        { status: 404 }
      );
    }

    throw error;
  }

  return NextResponse.json({ slug: currentSlug });
};
