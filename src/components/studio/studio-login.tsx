'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { LockKeyhole } from 'lucide-react';

export const StudioLogin = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('private writing room. password only.');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('checking...');

    const response = await fetch('/api/studio/login', {
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    const data = await response.json();

    setIsLoading(false);

    if (!response.ok) {
      setMessage(data.message ?? 'Login failed.');
      return;
    }

    router.push('/studio');
    router.refresh();
  };

  return (
    <section className="mx-auto max-w-md rounded-2xl border border-[#f4efe3]/10 bg-[#151515]/95 p-5 text-[#f4efe3] shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:p-8">
      <div className="flex size-11 items-center justify-center rounded-full bg-[#f4efe3] text-[#111111]">
        <LockKeyhole className="size-5" />
      </div>

      <p className="mt-7 text-sm font-bold lowercase text-[#d9a766]/80">
        studio access.
      </p>
      <h1 className="mt-3 text-5xl font-bold lowercase tracking-[-0.06em]">
        login
      </h1>

      <form className="mt-8" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-sm font-medium text-[#f4efe3]/52">
            Password
          </span>
          <input
            className="mt-2 w-full rounded-xl border border-[#f4efe3]/12 bg-[#0b0b0b]/80 px-4 py-3 text-sm font-medium text-[#f4efe3] outline-none transition-colors placeholder:text-[#f4efe3]/24 focus:border-[#d9a766]/70"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter studio password"
            type="password"
            value={password}
          />
        </label>

        <button
          className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-[#f4efe3]/14 bg-[#f4efe3] px-4 py-3 text-sm font-semibold lowercase text-[#111111] transition-colors hover:border-[#d9a766] hover:bg-[#d9a766] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? 'entering' : 'enter studio'}
        </button>
      </form>

      <p className="mt-5 text-sm font-medium text-[#f4efe3]/52">
        {message}
      </p>
    </section>
  );
};
