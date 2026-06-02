'use client';

import { useMemo, useState, type ChangeEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Braces, Highlighter, LinkIcon, LogOut, Pilcrow, Plus, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { BlogPost } from '@/lib/blog';
import { parseTags, slugify, type BlogDraftResult } from '@/lib/studio';

type StudioStatus = {
  message: string;
  tone: 'idle' | 'error' | 'success';
};

const today = new Date().toISOString().slice(0, 10);

const defaultContent = `## opening note

Write the thought here. Keep it human, specific, and useful.

<Callout>
  use this for a sharp side note.
</Callout>

This is a <Highlight>highlighted phrase</Highlight>.`;

const snippets = [
  {
    icon: Pilcrow,
    label: 'heading',
    value: '\n\n## section title\n\n',
  },
  {
    icon: Braces,
    label: 'callout',
    value: '\n\n<Callout>\n  note goes here.\n</Callout>\n\n',
  },
  {
    icon: Highlighter,
    label: 'highlight',
    value: '<Highlight>important words</Highlight>',
  },
  {
    icon: LinkIcon,
    label: 'link',
    value: '[link text](https://example.com)',
  },
];

type BlogStudioProps = {
  initialPosts: BlogPost[];
};

export const BlogStudio = ({ initialPosts }: BlogStudioProps) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(today);
  const [tags, setTags] = useState('');
  const [content, setContent] = useState(defaultContent);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [status, setStatus] = useState<StudioStatus>({
    message: 'Draft locally, then publish.',
    tone: 'idle',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [publishedPost, setPublishedPost] = useState<BlogDraftResult | null>(null);

  const resolvedSlug = useMemo(() => slugify(slug || title), [slug, title]);
  const tagList = useMemo(() => parseTags(tags), [tags]);
  const isEditing = Boolean(activeSlug);

  const fetchPosts = async () => {
    const response = await fetch('/api/studio/posts');

    if (!response.ok) {
      setStatus({
        message: 'Could not load existing posts.',
        tone: 'error',
      });
      return;
    }

    const data = (await response.json()) as { posts: BlogPost[] };

    setPosts(data.posts);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTitle(value);

    if (!slug) {
      setSlug(slugify(value));
    }
  };

  const insertSnippet = (snippet: string) => {
    setContent((current) => `${current}${snippet}`);
  };

  const resetDraft = () => {
    setActiveSlug(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setDate(today);
    setTags('');
    setContent(defaultContent);
    setPublishedPost(null);
    setStatus({
      message: 'Draft locally, then publish.',
      tone: 'idle',
    });
  };

  const editPost = (post: BlogPost) => {
    setActiveSlug(post.slug);
    setTitle(post.title);
    setSlug(post.slug);
    setDescription(post.description);
    setDate(post.date);
    setTags(post.tags.join(', '));
    setContent(post.content);
    setPublishedPost({ fileName: `${post.slug}.mdx`, slug: post.slug });
    setStatus({
      message: `Editing ${post.title}.`,
      tone: 'idle',
    });
  };

  const deletePost = async (post: BlogPost) => {
    const shouldDelete = window.confirm(`Delete "${post.title}"?`);

    if (!shouldDelete) {
      return;
    }

    setStatus({ message: 'Deleting post...', tone: 'idle' });

    const response = await fetch(`/api/studio/posts/${post.slug}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus({
        message: data.message ?? 'Could not delete post.',
        tone: 'error',
      });
      return;
    }

    if (activeSlug === post.slug) {
      resetDraft();
    }

    await fetchPosts();
    router.refresh();
    setStatus({
      message: `Deleted ${post.title}.`,
      tone: 'success',
    });
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setPublishedPost(null);
    setStatus({
      message: isEditing ? 'Updating post...' : 'Saving post...',
      tone: 'idle',
    });

    const response = await fetch(
      isEditing ? `/api/studio/posts/${activeSlug}` : '/api/studio/posts',
      {
      body: JSON.stringify({
        content,
        date,
        description,
        slug: resolvedSlug,
        tags: tagList,
        title,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
        method: isEditing ? 'PUT' : 'POST',
      }
    );

    const data = await response.json();

    setIsSaving(false);

    if (!response.ok) {
      setStatus({
        message: data.message ?? 'Something went sideways while saving.',
        tone: 'error',
      });
      return;
    }

    setPublishedPost(data);
    setActiveSlug(data.slug);
    setStatus({
      message: `${isEditing ? 'Updated' : 'Saved'} ${data.fileName}.`,
      tone: 'success',
    });
    await fetchPosts();
    router.refresh();
  };

  const handleLogout = async () => {
    await fetch('/api/studio/logout', { method: 'POST' });
    router.push('/studio/login');
    router.refresh();
  };

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
      <div className="rounded-2xl border border-[#f4efe3]/10 bg-[#151515]/95 p-5 text-[#f4efe3] shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#d9a766]/80">
              Private writer
            </p>
            <h1 className="mt-2 text-3xl font-semibold">
              Blog studio
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              className="inline-flex items-center gap-2 rounded-full border border-[#f4efe3]/14 px-4 py-2 text-sm font-semibold text-[#f4efe3]/58 transition-colors hover:border-[#6f1d24] hover:text-[#f4efe3]"
              onClick={resetDraft}
              type="button"
            >
              New
              <Plus className="size-4" />
            </button>

            <button
              className="inline-flex items-center gap-2 rounded-full border border-[#f4efe3]/14 px-4 py-2 text-sm font-semibold text-[#f4efe3]/58 transition-colors hover:border-[#6f1d24] hover:text-[#f4efe3]"
              onClick={handleLogout}
              type="button"
            >
              Logout
              <LogOut className="size-4" />
            </button>

            <button
              className="inline-flex items-center gap-2 rounded-full border border-[#f4efe3]/14 bg-[#f4efe3] px-4 py-2 text-sm font-semibold text-[#111111] transition-colors hover:border-[#d9a766] hover:bg-[#d9a766] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving}
              onClick={handleSubmit}
              type="button"
            >
              {isSaving ? 'Saving' : isEditing ? 'Update' : 'Publish'}
              <Send className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-[#f4efe3]/52">
              Title
            </span>
            <input
              className="mt-2 w-full rounded-xl border border-[#f4efe3]/12 bg-[#0b0b0b]/80 px-4 py-3 text-sm font-medium text-[#f4efe3] outline-none transition-colors placeholder:text-[#f4efe3]/24 focus:border-[#d9a766]/70"
              onChange={handleTitleChange}
              placeholder="Building better interfaces"
              type="text"
              value={title}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-[#f4efe3]/52">
              Slug
            </span>
            <input
              className="mt-2 w-full rounded-xl border border-[#f4efe3]/12 bg-[#0b0b0b]/80 px-4 py-3 text-sm font-medium text-[#f4efe3] outline-none transition-colors placeholder:text-[#f4efe3]/24 focus:border-[#d9a766]/70"
              onChange={(event) => setSlug(slugify(event.target.value))}
              placeholder="building-better-interfaces"
              type="text"
              value={slug}
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_180px]">
          <label className="block">
            <span className="text-sm font-medium text-[#f4efe3]/52">
              Description
            </span>
            <input
              className="mt-2 w-full rounded-xl border border-[#f4efe3]/12 bg-[#0b0b0b]/80 px-4 py-3 text-sm font-medium text-[#f4efe3] outline-none transition-colors placeholder:text-[#f4efe3]/24 focus:border-[#d9a766]/70"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="A clean one-line summary."
              type="text"
              value={description}
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-[#f4efe3]/52">
              Date
            </span>
            <input
              className="mt-2 w-full rounded-xl border border-[#f4efe3]/12 bg-[#0b0b0b]/80 px-4 py-3 text-sm font-medium text-[#f4efe3] outline-none transition-colors focus:border-[#d9a766]/70"
              onChange={(event) => setDate(event.target.value)}
              type="date"
              value={date}
            />
          </label>
        </div>

        <div className="mt-4">
          <label className="block">
            <span className="text-sm font-medium text-[#f4efe3]/52">
              Tags
            </span>
            <input
              className="mt-2 w-full rounded-xl border border-[#f4efe3]/12 bg-[#0b0b0b]/80 px-4 py-3 text-sm font-medium text-[#f4efe3] outline-none transition-colors placeholder:text-[#f4efe3]/24 focus:border-[#d9a766]/70"
              onChange={(event) => setTags(event.target.value)}
              placeholder="next.js, design, notes"
              type="text"
              value={tags}
            />
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {snippets.map(({ icon: Icon, label, value }) => (
            <button
              className="inline-flex items-center gap-2 rounded-full border border-[#f4efe3]/12 px-3 py-2 text-xs font-medium text-[#f4efe3]/58 transition-colors hover:border-[#6f1d24] hover:text-[#f4efe3]"
              key={label}
              onClick={() => insertSnippet(value)}
              type="button"
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-[#f4efe3]/52">
            MDX body
          </span>
          <textarea
            className="mt-2 min-h-[460px] w-full resize-y rounded-2xl border border-[#f4efe3]/12 bg-[#070707]/88 px-4 py-4 font-mono text-sm leading-7 text-[#f4efe3]/78 outline-none transition-colors placeholder:text-[#f4efe3]/24 focus:border-[#d9a766]/70"
            onChange={(event) => setContent(event.target.value)}
            spellCheck="false"
            value={content}
          />
        </label>
      </div>

      <aside className="rounded-2xl bg-[#f4efe3] p-5 text-[#111111] shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-7">
        <h2 className="text-lg font-semibold">
          Publish check
        </h2>

        <dl className="mt-6 space-y-6">
          <div>
            <dt className="text-sm font-medium text-[#111111]/42">
              Title
            </dt>
            <dd className="mt-1 text-lg font-semibold">
              {title || 'Untitled post'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-[#111111]/42">
              Slug
            </dt>
            <dd className="mt-1 break-words text-sm font-semibold text-[#6f1d24]">
              {resolvedSlug || 'waiting-for-title'}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-[#111111]/42">
              Tags
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {tagList.length > 0 ? (
                tagList.map((tag) => (
                  <span className="text-xs font-medium text-[#111111]/46" key={tag}>
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="text-sm font-medium text-[#111111]/34">
                  No tags yet
                </span>
              )}
            </dd>
          </div>
        </dl>

        <p
          className={`mt-8 rounded-xl border px-4 py-3 text-sm font-medium ${
            status.tone === 'success'
              ? 'border-[#6f1d24]/30 bg-[#6f1d24]/10 text-[#6f1d24]'
              : status.tone === 'error'
                ? 'border-red-500/25 bg-red-500/10 text-red-700'
                : 'border-[#111111]/10 bg-[#111111]/5 text-[#111111]/46'
          }`}
        >
          {status.message}
        </p>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-[#111111]/70">
            Existing posts
          </h3>

          <div className="mt-3 space-y-3">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  className="rounded-xl border border-[#111111]/10 px-4 py-3"
                  key={post.slug}
                >
                  <p className="text-sm font-semibold leading-5">
                    {post.title}
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#111111]/42">
                    {post.slug}
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6f1d24] transition-colors hover:text-[#111111]"
                      onClick={() => editPost(post)}
                      type="button"
                    >
                      edit
                    </button>

                    <button
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700/70 transition-colors hover:text-red-800"
                      onClick={() => deletePost(post)}
                      type="button"
                    >
                      delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm font-medium text-[#111111]/34">
                No posts yet.
              </p>
            )}
          </div>
        </div>

        {publishedPost ? (
          <Link
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold lowercase text-[#6f1d24] transition-colors hover:text-[#111111]"
            href={`/blog/${publishedPost.slug}`}
          >
            View post
            <ArrowUpRight className="size-4" />
          </Link>
        ) : null}
      </aside>
    </section>
  );
};
