import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IntegerStep, FractionalStep } from "@/lib/conversion";
import { Separator } from "./ui/separator";

export interface ConversionResult {
  originalDecimal: string;
  base: number;
  systemName: string;
  integerSteps: IntegerStep[];
  fractionalSteps: FractionalStep[];
  finalResult: string;
}

export function ConversionResults({
  originalDecimal,
  base,
  systemName,
  integerSteps,
  fractionalSteps,
  finalResult,
}: ConversionResult) {
  return (
    <Card className="w-full animate-fade-in">
      <CardHeader>
        <CardTitle>Resultados de la Conversión</CardTitle>
        <CardDescription>
          Conversión de{" "}
          <span className="font-bold">{originalDecimal}</span> (base 10) a{" "}
          <span className="font-bold">{systemName}</span> (base {base})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Resultado Final</h3>
          <div className="rounded-md bg-accent/20 p-4 text-center">
            <p className="text-2xl font-bold text-accent-foreground font-code break-all">
              ({originalDecimal})<sub className="text-sm">10</sub> = (
              {finalResult})<sub className="text-sm">{base}</sub>
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 text-lg font-semibold">
            Parte Entera: Divisiones Sucesivas
          </h3>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>División</TableHead>
                  <TableHead>Cociente</TableHead>
                  <TableHead>Resto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {integerSteps.map((step, index) => (
                  <TableRow
                    key={index}
                    className="animate-fade-in-down"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <TableCell>{step.division}</TableCell>
                    <TableCell>{step.quotient}</TableCell>
                    <TableCell className="font-bold text-primary">
                      {step.remainder}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {fractionalSteps.length > 0 && (
          <>
            <Separator />
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Parte Fraccionaria: Multiplicaciones Sucesivas
              </h3>
              <div className="overflow-hidden rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Multiplicación</TableHead>
                      <TableHead>Parte Entera</TableHead>
                      <TableHead>Parte Fraccionaria</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fractionalSteps.map((step, index) => (
                      <TableRow
                        key={index}
                        className="animate-fade-in-down"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <TableCell>{step.multiplication}</TableCell>
                        <TableCell className="font-bold text-primary">
                          {step.integerPart}
                        </TableCell>
                        <TableCell>{step.fractionalPart.toFixed(4)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
