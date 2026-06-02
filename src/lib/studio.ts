export type BlogDraftPayload = {
  content: string;
  date: string;
  description: string;
  slug: string;
  tags: string[];
  title: string;
};

export type BlogDraftResult = {
  fileName: string;
  slug: string;
};

const escapeFrontmatterValue = (value: string) => {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
};

export const createBlogMdxFile = ({
  content,
  date,
  description,
  tags,
  title,
}: Omit<BlogDraftPayload, 'slug'>) => {
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

export const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const parseTags = (value: string) => {
  return value
    .split(',')
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
};
