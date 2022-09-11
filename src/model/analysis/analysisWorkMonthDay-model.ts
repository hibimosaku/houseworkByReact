export const YEAR: number = new Date().getFullYear();
//分析結果の月の数

export type AnalysisWorkDay = number;

export function createAryDay(
  year: number,
  month: number
): Array<AnalysisWorkDay> {
  const d = new Date(year, month);
  //月末日取得
  d.setDate(0);
  const aryDate = Array(d.getDate()).fill(1);
  aryDate.forEach((v, index) => {
    aryDate[index] = index + 1;
    return v[index];
  });
  return aryDate;
}
