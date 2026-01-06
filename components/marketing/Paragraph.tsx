interface ParagraphProps {
  children: string;
}

export function Paragraph({ children }: ParagraphProps) {
  return (
    <div className="px-4 md:px-8 xl:px-12 2xl:px-16">
      <h2 className="mx-auto mb-12 xl:mb-16 2xl:mb-20 max-w-4xl xl:max-w-5xl 2xl:max-w-6xl text-center font-barlow-condensed text-2xl uppercase tracking-wide text-foreground md:text-5xl">
        {children}
      </h2>
    </div>
  );
}
