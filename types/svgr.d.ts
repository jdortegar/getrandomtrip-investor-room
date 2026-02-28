import type { FC, SVGProps } from 'react';

declare module '*.svg' {
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}
