import { SiteBackground } from '@/components/site/site-background';
import { SiteHeader } from '@/components/site/site-header';
import { BlogPreview } from '@/components/sections/blog-preview';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ProfileCard } from '@/components/sections/profile-card';
import { ProjectsSection } from '@/components/sections/projects-section';
import { StackSection } from '@/components/sections/stack-section';
import { StatusCard } from '@/components/sections/status-card';

const Home = () => {
  return (
    <div className="relative min-h-screen text-white">
      <SiteBackground />
      <SiteHeader />

      <main className="mx-auto grid max-w-5xl gap-4 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <ProfileCard />
          <ProjectsSection />
        </div>

        <aside className="space-y-4">
          <StatusCard />
          <StackSection />
          <ExperienceSection />
          <BlogPreview />
        </aside>
      </main>
    </div>
  );
};

export default Home;
