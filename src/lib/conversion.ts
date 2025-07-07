export interface IntegerStep {
  division: string;
  quotient: number;
  remainder: string;
}

export interface FractionalStep {
  multiplication: string;
  integerPart: string;
  fractionalPart: number;
}

const getHexValue = (v: number): string => {
  if (v < 10) return v.toString();
  // ASCII 'A' is 65. (55 + 10 = 65)
  return String.fromCharCode(55 + v); 
};

export const convertIntegerPart = (
  integerPart: number,
  base: number
): { steps: IntegerStep[]; result: string } => {
  const steps: IntegerStep[] = [];
  let currentVal = Math.abs(integerPart);
  let result = "";

  if (currentVal === 0) {
    return { steps: [{ division: "0", quotient: 0, remainder: "0" }], result: "0" };
  }

  while (currentVal > 0) {
    const remainder = currentVal % base;
    const quotient = Math.floor(currentVal / base);
    steps.push({
      division: `${currentVal} / ${base}`,
      quotient: quotient,
      remainder: getHexValue(remainder),
    });
    result = getHexValue(remainder) + result;
    currentVal = quotient;
  }
  
  const sign = integerPart < 0 ? '-' : '';
  return { steps, result: sign + (result || "0") };
};

export const convertFractionalPart = (
  fractionalPart: number,
  base: number
): { steps: FractionalStep[]; result: string } => {
  const steps: FractionalStep[] = [];
  let currentVal = fractionalPart;
  let result = "";
  const MAX_ITERATIONS = 8;
  let zeroStreak = 0;

  if (fractionalPart === 0) {
    return { steps: [], result: "" };
  }

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    // Stop if the fractional part is effectively zero or repeats
    if (currentVal < 1e-9) break;

    const product = currentVal * base;
    const integer = Math.floor(product);
    const fractional = product - integer;

    steps.push({
      multiplication: `${currentVal.toFixed(4)} * ${base}`,
      integerPart: getHexValue(integer),
      fractionalPart: fractional,
    });

    result += getHexValue(integer);
    currentVal = fractional;
    
    if (integer === 0) {
      zeroStreak++;
    } else {
      zeroStreak = 0;
    }

    // Stop after 3 consecutive zeros after at least 3 iterations
    if (zeroStreak >= 3 && i > 2) break;
  }

  return { steps, result };
};
