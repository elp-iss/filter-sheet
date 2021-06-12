const extractChoiceNumber = (row: string[]): number[] =>
  row.slice(4).map((e) => Number(e.match(/\d/)[0]))

// 1行まるごと渡してOK
export const shiftChoiceNumberToChoiceOrder =
  (teachers: string[]) =>
  (row: string[]): string[] => {
    const orders = [...Array(teachers.length)].map((_, i) => i + 1)
    const choices = extractChoiceNumber(row)
    return orders.map((order) => {
      const teacherIndex = choices.indexOf(order)
      return teachers[teacherIndex]
    })
  }
