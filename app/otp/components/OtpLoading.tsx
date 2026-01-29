import { CardContent } from '@/components/ui/card';

export function OtpLoading() {
  return (
    <CardContent className="flex items-center justify-center p-8">
      <div className="text-muted-foreground">Cargando...</div>
    </CardContent>
  );
}
