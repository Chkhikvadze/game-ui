export const number = (number: number | string = 0, precision: number) => {
  return Number(number).toLocaleString(undefined, {
    maximumFractionDigits: precision,
    minimumFractionDigits: precision,
  })
}
