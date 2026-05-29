import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { projects } from '@/lib/data';

export const ProjectsSection = () => {
  return (
    <Card id="projects">
      <CardHeader>
        <CardTitle>Featured Projects</CardTitle>
        <CardAction>
          <Button size="sm" variant="ghost">
            View all
            <ArrowUpRight />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="grid gap-3">
        {projects.map((project) => (
          <a
            className="group rounded-lg border bg-background p-4 transition-colors hover:bg-muted/50"
            href={project.href}
            key={project.name}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium tracking-tight">{project.name}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
};
