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
// Función que convierte un número (v) en su equivalente en formato hexadecimal (si es mayor a 9).
// Por ejemplo, 10 se convierte en 'A', 11 en 'B', hasta 15 que se convierte en 'F'.
const getHexValue = (v: number): string => {
  if (v < 10) return v.toString(); // Si el número es menor que 10, simplemente se convierte en texto (ej. 5 => "5").
  // Para números entre 10 y 15, se convierten en letras: 10 -> A, 11 -> B, ..., 15 -> F.
  // Esto se hace sumando 55 al número para obtener el código ASCII correspondiente (A = 65).
  return String.fromCharCode(55 + v);
};

// Esta función convierte la **parte entera** de un número decimal a otra base (como binario, octal, hexadecimal, etc.).
// También guarda los pasos que se realizaron para que el usuario vea cómo se hizo la conversión.
export const convertIntegerPart = (
  integerPart: number, // Parte entera del número (por ejemplo, en 12.5 sería 12).
  base: number         // La base a la que se quiere convertir (por ejemplo, 2, 8, 16, etc.).
): { steps: IntegerStep[]; result: string } => {
  const steps: IntegerStep[] = []; // Aquí se guardarán los pasos de la conversión.
  let currentVal = Math.abs(integerPart); // Se toma el valor absoluto para evitar errores con números negativos.
  let result = ""; // Aquí se construirá el resultado final.

  // Si el número es 0, simplemente se devuelve 0 como resultado con un solo paso.
  if (currentVal === 0) {
    return { steps: [{ division: "0", quotient: 0, remainder: "0" }], result: "0" };
  }

  // Mientras el número sea mayor a cero, se sigue dividiendo.
  while (currentVal > 0) {
    const remainder = currentVal % base; // Se obtiene el residuo (lo que sobra) al dividir entre la base.
    const quotient = Math.floor(currentVal / base); // Se obtiene el cociente (la parte entera del resultado).
    
    // Se guarda el paso actual como un objeto con: la operación, el cociente y el residuo.
    steps.push({
      division: currentVal / base,
      quotient: quotient,
      remainder: getHexValue(remainder),
    });

    // Se agrega el residuo al resultado (al inicio, porque la conversión se hace de abajo hacia arriba).
    result = getHexValue(remainder) + result;

    // El nuevo valor a dividir es el cociente calculado.
    currentVal = quotient;
  }

  // Si el número original era negativo, se le agrega el signo negativo al resultado final.
  const sign = integerPart < 0 ? '-' : '';
  return { steps, result: sign + (result || "0") };
};

// Esta función convierte la **parte decimal** (o fraccionaria) de un número a otra base.
// Por ejemplo, en 12.5, la parte fraccionaria sería 0.5.
export const convertFractionalPart = (
  fractionalPart: number, // Parte fraccionaria del número (ej. 0.25, 0.75, etc.).
  base: number            // Base a la que se quiere convertir.
): { steps: FractionalStep[]; result: string } => {
  const steps: FractionalStep[] = []; // Aquí se guardan los pasos de multiplicación realizados.
  let currentVal = fractionalPart; // Se comienza con el valor fraccionario actual.
  let result = ""; // Aquí se irá formando el resultado.
  const MAX_ITERATIONS = 8; // Se limita el número de iteraciones para evitar ciclos infinitos.
  let zeroStreak = 0; // Contador de ceros seguidos, usado para cortar el proceso si se repite mucho.

  // Si la parte fraccionaria es 0, no hay nada que convertir.
  if (fractionalPart === 0) {
    return { steps: [], result: "" };
  }

  // Se repite un máximo de 8 veces (o menos si se cumple una condición de salida).
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    // Si el valor es muy pequeño, se considera como si ya fuera 0 y se detiene.
    if (currentVal < 1e-9) break;

    // Se multiplica el número por la base para obtener el siguiente dígito en la nueva base.
    const product = currentVal * base;
    const integer = Math.floor(product); // Parte entera del resultado.
    const fractional = product - integer; // Parte fraccionaria restante.

    // Se guarda el paso actual: la multiplicación, el número entero obtenido, y la fracción restante.
    steps.push({
      multiplication: currentVal.toFixed(4) * base, // Se redondea a 4 cifras decimales para mostrar.
      integerPart: getHexValue(integer),
      fractionalPart: fractional,
    });

    // Se agrega el valor convertido al resultado final.
    result += getHexValue(integer);
    currentVal = fractional; // La nueva fracción a convertir es la que sobró.

    // Control para evitar bucles infinitos con ceros seguidos.
    if (integer === 0) {
      zeroStreak++;
    } else {
      zeroStreak = 0;
    }

    // Si hay 3 ceros seguidos después de 3 iteraciones, se detiene.
    if (zeroStreak >= 3 && i > 2) break;
  }

  // Se devuelve el resultado y los pasos realizados.
  return { steps, result };
};
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
