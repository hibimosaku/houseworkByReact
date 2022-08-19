import { MONTHNUM } from "./analysisWork-model";

export const YEAR: number = new Date().getFullYear();
//分析結果の月の数

export type AnalysisWorkYearMonth = {
  readonly year: Array<number>;
  readonly month: Array<number>;
};

function aryYearMonth(today: Date) {
  return Array(MONTHNUM)
    .fill(1)
    .map((v, index) => {
      if (index === 0) {
        today.setMonth(today.getMonth());
      } else {
        today.setMonth(today.getMonth() - v);
      }
      return {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
      };
    })
    .reverse();
}

export function createAnalysisWorkYearMonth(): AnalysisWorkYearMonth {
  const yearMonth = aryYearMonth(new Date());
  const result = yearMonth.reduce(
    (result: any, current) => {
      result["year"].push(current.year);
      result["month"].push(current.month);
      return result;
    },

    { year: [], month: [] }
  );
  return result;
}

export function calcCountYear(
  aryYear: AnalysisWorkYearMonth["year"],
  currentYear: number
) {
  const countCurrentYear = aryYear.filter((v) => v === currentYear).length;
  const countBeforeOneYear = aryYear.filter(
    (v) => v === currentYear - 1
  ).length;
  const countBeforeTwoYear = aryYear.filter(
    (v) => v === currentYear - 2
  ).length;

  return {
    countCurrentYear,
    countBeforeOneYear,
    countBeforeTwoYear,
  };
}
