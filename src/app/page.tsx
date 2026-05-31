import { SiteBackground } from '@/components/site/site-background';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { BlogPreview } from '@/components/sections/blog-preview';
import { DevProfile } from '@/components/sections/dev-profile';
import { ExperienceSection } from '@/components/sections/experience-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { StackSection } from '@/components/sections/stack-section';

const Home = () => {
  return (
    <div className="relative min-h-screen text-white">
      <SiteBackground />
      <SiteHeader />

      <main className="mx-auto max-w-5xl space-y-4 px-4 py-8">
        <DevProfile />

        <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <ProjectsSection />

          <aside className="flex h-full flex-col gap-4">
            <ExperienceSection />
            <div className="mt-auto">
              <StackSection />
            </div>
          </aside>
        </div>

        <BlogPreview />
      </main>

      <SiteFooter />
    </div>
  );
};

export default Home;
