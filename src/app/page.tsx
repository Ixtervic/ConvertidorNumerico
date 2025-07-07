"use client";

import { useState } from 'react';
import { ConversionForm } from '@/components/conversion-form';
import { ConversionResults, type ConversionResult } from '@/components/conversion-results';
import { EducationalContent } from '@/components/educational-content';
import { SourceCodeViewer } from '@/components/source-code-viewer';
import { Binary } from 'lucide-react';

export default function Home() {
  const [results, setResults] = useState<ConversionResult | null>(null);

  const handleConvert = (data: ConversionResult) => {
    setResults(data);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 shadow-sm md:px-6">
        <div className="flex items-center gap-2">
          <Binary className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-primary font-headline">
            ConvertidorNumérico
          </h1>
        </div>
        <div className="ml-auto">
          <SourceCodeViewer />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="mx-auto w-full max-w-4xl">
          <ConversionForm onConvert={handleConvert} />
        </div>
        {results && (
          <div className="mx-auto w-full max-w-4xl">
            <ConversionResults {...results} />
          </div>
        )}
        <div className="mx-auto w-full max-w-4xl">
          <EducationalContent />
        </div>
      </main>
      <footer className="mt-auto border-t bg-card p-4 text-center text-sm text-muted-foreground">
        <p>JHHC tel: 7713492514</p>
      </footer>
    </div>
  );
}
