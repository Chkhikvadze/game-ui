export const number = (number: number | string = 0, precision: number) =>
  Number(number).toLocaleString(undefined, {
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  })
