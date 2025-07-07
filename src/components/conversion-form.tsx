"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { convertIntegerPart, convertFractionalPart } from "@/lib/conversion";
import type { ConversionResult } from "./conversion-results";
import { ArrowRight } from "lucide-react";

const formSchema = z.object({
  decimal: z.string().refine((val) => !isNaN(parseFloat(val)) && isFinite(Number(val)), {
    message: "Debe ser un número decimal válido.",
  }),
  system: z.enum(["2", "8", "16"]),
});

type ConversionFormProps = {
  onConvert: (data: ConversionResult) => void;
};

export function ConversionForm({ onConvert }: ConversionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      decimal: "",
      system: "2",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const decimalValue = parseFloat(values.decimal);
    const base = parseInt(values.system, 10);

    const integerPart = Math.trunc(decimalValue);
    const fractionalPart = Math.abs(decimalValue - integerPart);

    const integerConversion = convertIntegerPart(integerPart, base);
    const fractionalConversion = convertFractionalPart(fractionalPart, base);

    const systemName =
      base === 2 ? "Binario" : base === 8 ? "Octal" : "Hexadecimal";

    onConvert({
      originalDecimal: values.decimal,
      base,
      systemName,
      integerSteps: integerConversion.steps,
      fractionalSteps: fractionalConversion.steps,
      finalResult: `${integerConversion.result}${
        fractionalConversion.result ? "." : ""
      }${fractionalConversion.result}`,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded-lg border bg-card p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-end">
          <FormField
            control={form.control}
            name="decimal"
            render={({ field }) => (
              <FormItem className="md:col-span-1">
                <FormLabel>Número Decimal</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: 123.45" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="system"
            render={({ field }) => (
              <FormItem className="md:col-span-1">
                <FormLabel>Sistema de Destino</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un sistema" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="2">Binario</SelectItem>
                    <SelectItem value="8">Octal</SelectItem>
                    <SelectItem value="16">Hexadecimal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 md:w-auto">
            Convertir <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
