import { BookOpen, PenLine } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const BlogPreview = () => {
  return (
    <Card id="blog">
      <CardHeader>
        <CardTitle>Blog</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex items-start gap-3 rounded-lg border bg-background p-4">
          <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <BookOpen className="size-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <PenLine className="size-3.5 text-muted-foreground" />
              <p className="text-sm font-medium">Build notes coming soon</p>
            </div>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Notes, lessons, and project breakdowns will live here once the
              writing system is ready.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
