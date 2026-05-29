import { ArrowUpRight, ExternalLink, Mail, MapPin } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { profile } from '@/lib/data';

const profileLinks = [
  {
    label: 'GitHub',
    href: profile.github,
    icon: ExternalLink,
    isExternal: true,
  },
  {
    label: 'LinkedIn',
    href: profile.linkedin,
    icon: ExternalLink,
    isExternal: true,
  },
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    icon: Mail,
    isExternal: false,
  },
];

export const ProfileCard = () => {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary" />

      <CardHeader className="gap-6 pt-6 sm:flex sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="size-14 rounded-xl" size="lg">
            <AvatarFallback className="rounded-xl text-base font-semibold">
              RF
            </AvatarFallback>
          </Avatar>

          <div>
            <Badge className="mb-3" variant="secondary">
              Available for thoughtful builds
            </Badge>

            <CardTitle className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {profile.name}
            </CardTitle>

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span>{profile.role}</span>
              <span>/</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                {profile.location}
              </span>
            </div>
          </div>
        </div>

        <Button asChild size="sm">
          <a href={`mailto:${profile.email}`}>
            Let&apos;s talk
            <ArrowUpRight />
          </a>
        </Button>
      </CardHeader>

      <CardContent>
        <p className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground">
          {profile.intro}
        </p>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 bg-transparent">
        {profileLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Button asChild key={link.label} size="sm" variant="outline">
              <a
                href={link.href}
                rel={link.isExternal ? 'noreferrer' : undefined}
                target={link.isExternal ? '_blank' : undefined}
              >
                <Icon />
                {link.label}
              </a>
            </Button>
          );
        })}
      </CardFooter>
    </Card>
  );
};
