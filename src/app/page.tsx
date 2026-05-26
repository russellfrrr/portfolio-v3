import { ExperienceList } from '@/components/experience-list';
import { ProfileHeader } from '@/components/profile-header';
import { ProjectList } from '@/components/project-list';
import { SectionPanel } from '@/components/section-panel';
import { TechStack } from '@/components/tech-stack';

const Home = () => {
  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-6 text-zinc-950 transition-colors duration-200 dark:bg-black dark:text-zinc-50 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1fr_340px]">
        <div className="space-y-4">
          <ProfileHeader />

          <SectionPanel title="About">
            <p className="text-sm leading-7 text-zinc-700 dark:text-zinc-300">
              I&apos;m building a cleaner, more focused portfolio that presents
              my work like a developer command center: direct, minimal, and easy
              to scan.
            </p>
          </SectionPanel>

          <ProjectList />
        </div>

        <aside className="space-y-4">
          <TechStack />
          <ExperienceList />

          <SectionPanel title="Blog">
            <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Notes, lessons, and build logs will live here soon.
            </p>
          </SectionPanel>
        </aside>
      </div>
    </main>
  );
};

export default Home;
