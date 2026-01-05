interface ParagraphProps {
  children: string;
}

export function Paragraph({ children }: ParagraphProps) {
  return (
    <div className="px-4 md:px-8">
      <h2 className="mx-auto mb-12 max-w-4xl text-center font-barlow-condensed text-2xl uppercase tracking-wide text-foreground md:text-5xl">
        {children}
      </h2>
    </div>
  );
}
