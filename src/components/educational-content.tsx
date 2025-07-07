import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Binary, Cpu, Code } from "lucide-react";

export function EducationalContent() {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-center text-2xl font-bold text-primary font-headline">
        Contenido Educativo
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-lg border bg-card p-4 shadow-sm"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center gap-2 text-left">
              <Binary className="h-5 w-5 text-primary shrink-0" />
              <span>Sistemas Numéricos (Binario, Octal, Hexadecimal)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 text-muted-foreground">
            <p>
              Los sistemas numéricos son formas de representar números. Mientras
              que los humanos usamos comúnmente el sistema decimal (base 10),
              las computadoras operan fundamentalmente con el sistema binario
              (base 2).
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>Binario (Base 2):</strong> Utiliza solo dos dígitos: 0 y
                1. Es el lenguaje nativo de los circuitos electrónicos.
              </li>
              <li>
                <strong>Octal (Base 8):</strong> Utiliza dígitos del 0 al 7. Es
                una forma más compacta de representar números binarios (3 bits
                por dígito octal).
              </li>
              <li>
                <strong>Hexadecimal (Base 16):</strong> Utiliza dígitos del 0 al
                9 y letras de la A a la F. Es aún más compacto que el octal y
                muy usado en programación para representar direcciones de
                memoria, colores, etc. (4 bits por dígito hexadecimal).
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center gap-2 text-left">
              <Cpu className="h-5 w-5 text-primary shrink-0" />
              <span>Uso en la ALU (Unidad Aritmético-Lógica)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 text-muted-foreground">
            <p>
              La ALU es el "cerebro" matemático del procesador (CPU). Realiza
              todas las operaciones aritméticas (suma, resta) y lógicas (AND,
              OR, NOT) directamente sobre números binarios. Los sistemas octal
              y hexadecimal son simplemente representaciones más legibles para
              los programadores; la ALU siempre trabaja en binario. Esta
              conversión es esencial para que las instrucciones de alto nivel se
              traduzcan en operaciones que el hardware puede ejecutar.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex items-center gap-2 text-left">
              <Code className="h-5 w-5 text-primary shrink-0" />
              <span>Características del Lenguaje JavaScript</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-2 pt-2 text-muted-foreground">
            <p>
              JavaScript maneja todos los números como valores de punto flotante
              de 64 bits (según el estándar IEEE 754). Esto tiene
              implicaciones importantes:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>No hay distinción de enteros:</strong> A diferencia de
                otros lenguajes, no existe un tipo de dato "integer" separado.{" "}
                <code>10</code> y <code>10.0</code> son el mismo valor.
              </li>
              <li>
                <strong>Precisión limitada:</strong> Debido a la representación
                de punto flotante, las operaciones con fracciones pueden llevar
                a pequeños errores de redondeo. Por ejemplo,{" "}
                <code>0.1 + 0.2</code> no es exactamente <code>0.3</code>.
              </li>
              <li>
                <strong>Manejo de bases:</strong> JavaScript puede interpretar
                números en diferentes bases usando prefijos (<code>0b</code>{" "}
                para binario, <code>0o</code> para octal, <code>0x</code> para
                hexadecimal) y convertirlos a decimal fácilmente, pero la
                conversión inversa, especialmente con decimales, requiere
                algoritmos personalizados como los que utiliza esta aplicación.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
