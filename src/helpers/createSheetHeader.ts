export const createSheetHeader = (rows: string[][]): string[] => {
  const maxChoiceLength = Math.max(...rows.map((row) => row.slice(4).length))
  const choiceOrderHeeader = [...Array(maxChoiceLength)]
    .map((_, i) => i + 1)
    .map((e) => `第${e}希望`)
  return [
    'タイムスタンプ',
    '生徒番号',
    'ユーザー名',
    'プラットフォーム',
  ].concat(choiceOrderHeeader)
}
