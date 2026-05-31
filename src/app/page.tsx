import { SiteBackground } from '@/components/site/site-background';
import { SiteHeader } from '@/components/site/site-header';
import { BlogPreview } from '@/components/sections/blog-preview';
import { DevProfile } from '@/components/sections/dev-profile';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { StackSection } from '@/components/sections/stack-section';
import { StatusCard } from '@/components/sections/status-card';

const Home = () => {
  return (
    <div className="relative min-h-screen text-white">
      <SiteBackground />
      <SiteHeader />

      <main className="mx-auto max-w-5xl space-y-4 px-4 py-8">
        <DevProfile />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <ProjectsSection />

          <aside className="space-y-4">
            <StatusCard />
            <ExperienceSection />
            <StackSection />
            <BlogPreview />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Home;
