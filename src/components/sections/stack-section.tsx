import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { techStack } from '@/lib/data';

export const StackSection = () => {
  return (
    <Card id="stack">
      <CardHeader>
        <CardTitle>Tech Stack</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {Object.entries(techStack).map(([category, items]) => (
          <div key={category}>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {category}
            </p>

            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
