import { CardContent } from '@/components/ui/card';

interface OtpLoadingProps {
  loadingText: string;
}

export function OtpLoading({ loadingText }: OtpLoadingProps) {
  return (
    <CardContent className="flex items-center justify-center p-8">
      <div className="font-barlow text-muted-foreground">{loadingText}</div>
    </CardContent>
  );
}
