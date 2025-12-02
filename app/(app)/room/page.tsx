import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart3, FileText, FileSignature, Gift } from 'lucide-react';
import { getGoogleMeetLink } from '@/lib/constants/meeting';

export default function RoomPage() {
  const modules = [
    {
      title: 'Metrics Dashboard',
      description: 'View real-time metrics, KPIs, and performance data',
      href: '/room/metrics',
      icon: BarChart3,
      color: 'text-primary',
    },
    {
      title: 'Legal Center',
      description: 'Access secure documents, cap table, and legal materials',
      href: '/room/legal',
      icon: FileText,
      color: 'text-primary',
    },
    {
      title: 'SAFE Generator',
      description: 'Generate and sign your SAFE agreement',
      href: '/room/safe',
      icon: FileSignature,
      color: 'text-secondary',
    },
    {
      title: 'First Believer Kit',
      description: 'Unlock exclusive benefits after signing',
      href: '/room/first-believer',
      icon: Gift,
      color: 'text-secondary',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h2 className="mb-4 font-serif text-4xl font-bold text-foreground sm:text-5xl">
          Your Investor Dashboard
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Access metrics, documents, and tools to support your investment
          decision
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Link key={module.href} href={module.href}>
              <Card className="h-full transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex items-center gap-4">
                    <div className={`rounded-lg bg-muted p-3 ${module.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-medium text-primary">View →</div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 rounded-lg border bg-muted/30 p-8 text-center">
        <h3 className="mb-2 font-serif text-2xl font-semibold">Questions?</h3>
        <p className="mb-4 text-muted-foreground">
          Schedule a call with our founders to discuss the opportunity
        </p>
        <Link
          className="text-primary hover:underline"
          href={getGoogleMeetLink()}
          rel="noopener noreferrer"
          target="_blank"
        >
          Book a Founder Call →
        </Link>
      </div>
    </div>
  );
}
