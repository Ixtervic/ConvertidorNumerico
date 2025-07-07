"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code } from "lucide-react";

const codeSnippet = `// Lógica simplificada para la conversión de la parte entera
function convertInteger(integerPart, base) {
  let result = '';
  let currentVal = integerPart;

  while (currentVal > 0) {
    const remainder = currentVal % base;
    result = getHexValue(remainder) + result;
    currentVal = Math.floor(currentVal / base);
  }
  return result || '0';
}

// Lógica simplificada para la conversión de la parte fraccionaria
function convertFractional(fractionalPart, base) {
  let result = '';
  let currentVal = fractionalPart;
  const MAX_ITERATIONS = 8;

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    if (currentVal === 0) break;
    
    const product = currentVal * base;
    const integer = Math.floor(product);
    result += getHexValue(integer);
    currentVal = product - integer;
  }
  return result;
}

// Función auxiliar para valores hexadecimales
function getHexValue(value) {
  if (value < 10) return value.toString();
  // 'A' es 65 en ASCII. 55 + 10 = 65.
  return String.fromCharCode(55 + value);
}
`;

export function SourceCodeViewer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Code className="mr-2 h-4 w-4" />
          Ver Código
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Vista del Código Fuente (Simplificado)</DialogTitle>
          <DialogDescription>
            Este es un extracto simplificado que ilustra la lógica principal de conversión de la aplicación.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full">
          <pre className="w-full rounded-md bg-muted p-4 text-sm text-muted-foreground">
            <code className="font-code">{codeSnippet}</code>
          </pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
