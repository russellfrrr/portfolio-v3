import { CircleDot, GitBranch, Sparkles } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const statusItems = [
  {
    label: 'Current focus',
    value: 'Portfolio v3',
    icon: Sparkles,
  },
  {
    label: 'Workflow',
    value: 'Next.js + pnpm',
    icon: GitBranch,
  },
  {
    label: 'Mode',
    value: 'Clean UI, no noise',
    icon: CircleDot,
  },
];

export const StatusCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {statusItems.map((item) => {
          const Icon = item.icon;

          return (
            <div className="flex items-start gap-3" key={item.label}>
              <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg bg-muted">
                <Icon className="size-4" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-medium">{item.value}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
