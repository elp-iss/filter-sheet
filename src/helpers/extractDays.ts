type DayFilter = (a: number) => boolean
export const extractDays =
  (filter: DayFilter) =>
  (rows: string[][]): string[][] => {
    return rows.map((row) => row.filter((_, i) => filter(i)))
  }
