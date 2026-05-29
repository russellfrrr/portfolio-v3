import { BlogPreview } from '@/components/blog-preview';
import { ExperienceSection } from '@/components/experience-section';
import { ProfileCard } from '@/components/profile-card';
import { ProjectsSection } from '@/components/projects-section';
import { SiteHeader } from '@/components/site-header';
import { StackSection } from '@/components/stack-section';
import { StatusCard } from '@/components/status-card';

const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto grid max-w-6xl gap-4 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-8">
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
