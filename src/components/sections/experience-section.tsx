import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { experience } from '@/lib/data';

export const ExperienceSection = () => {
  return (
    <Card id="experience">
      <CardHeader>
        <CardTitle>Experience</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {experience.map((item) => (
          <div className="relative border-l pl-4" key={`${item.role}-${item.company}`}>
            <div className="absolute -left-1.5 top-1.5 size-3 rounded-full border bg-background" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium">{item.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.company}
                </p>
              </div>

              <span className="text-xs font-medium text-muted-foreground">
                {item.year}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
