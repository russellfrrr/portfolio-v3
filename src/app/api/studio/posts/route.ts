import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { type BlogDraftPayload, slugify } from '@/lib/studio';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export const runtime = 'nodejs';

const escapeFrontmatterValue = (value: string) => {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
};

const createMdxFile = ({
  content,
  date,
  description,
  tags,
  title,
}: Omit<BlogDraftPayload, 'password' | 'slug'>) => {
  const tagList = tags.map((tag) => `"${escapeFrontmatterValue(tag)}"`).join(', ');

  return `---
title: "${escapeFrontmatterValue(title)}"
description: "${escapeFrontmatterValue(description)}"
date: "${escapeFrontmatterValue(date)}"
tags: [${tagList}]
---

${content.trim()}
`;
};

const isValidPayload = (payload: Partial<BlogDraftPayload>) => {
  return Boolean(
    payload.content?.trim()
      && payload.date?.trim()
      && payload.description?.trim()
      && payload.title?.trim()
  );
};

export const POST = async (request: Request) => {
  const payload = (await request.json()) as Partial<BlogDraftPayload>;

  if (!isValidPayload(payload)) {
    return NextResponse.json(
      { message: 'Title, description, date, and content are required.' },
      { status: 400 }
    );
  }

  const slug = slugify(payload.slug || payload.title || '');

  if (!slug) {
    return NextResponse.json(
      { message: 'Use a title or slug with letters or numbers.' },
      { status: 400 }
    );
  }

  const fileName = `${slug}.mdx`;
  const filePath = path.join(blogDirectory, fileName);
  const mdx = createMdxFile({
    content: payload.content ?? '',
    date: payload.date ?? '',
    description: payload.description ?? '',
    tags: payload.tags ?? [],
    title: payload.title ?? '',
  });

  try {
    await mkdir(blogDirectory, { recursive: true });
    await writeFile(filePath, mdx, { encoding: 'utf8', flag: 'wx' });
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'EEXIST') {
      return NextResponse.json(
        { message: 'A post with this slug already exists.' },
        { status: 409 }
      );
    }

    throw error;
  }

  return NextResponse.json({ fileName, slug });
};
