import { Record } from "../record/record-model";

export type AnalysisDailyWork = {
  readonly year: number;
  readonly month: number;
  readonly workid: number;
  readonly workname: string;
  readonly typeid: number;
  readonly typename: string;
  readonly workDailynum: Array<number>;
  readonly sumWorkDailynum: Array<number>;
};
export function createAnalysisDailyWork(
  records: Array<Record>,
  year: number,
  month: number
): Array<AnalysisDailyWork> {
  const d = new Date(year, month);
  //月末日取得
  d.setDate(0);
  const m = new Map();
  //recordsで対象の分析年月に絞り込み
  const targetRecord = records.filter((v) => {
    const targetYear = v.created_at.substring(0, 4);
    const targetMonth = v.created_at.substring(6, 7);
    return targetYear === String(year) && targetMonth === String(month);
  });
  targetRecord.forEach((v) => {
    const key =
      v.created_at.substring(0, 4) +
      v.created_at.substring(5, 7) +
      "-workid" +
      v.work;

    if (m.has(key)) {
      const targetDay = v.created_at.substring(8, 10);
      const targetAnalysis = m.get(key);
      const targetWorknum = targetAnalysis.workDailynum;

      targetWorknum[Number(targetDay) - 1] =
        targetWorknum[Number(targetDay) - 1] + 1;
      m.set(key, {
        ...targetAnalysis,
        workDailynum: targetWorknum,
        sumWorkDailynum: calcSumWorkDailynum(targetWorknum),
      });
    } else {
      const aryDay = Array(d.getDate()).fill(0);
      const day = v.created_at.substring(8, 10);
      aryDay[Number(day) - 1] = 1;
      m.set(key, {
        year: key.substring(0, 4),
        month: key.substring(4, 6),
        typeid: v.typeid,
        typename: v.typename,
        workid: v.work,
        workname: v.workname,
        workDailynum: aryDay,
        sumWorkDailynum: calcSumWorkDailynum(aryDay),
      });
    }
  });

  return sortAnalysisDailyWork(Array.from(m.values()));
}

//workDailynumの合計が多い順に並び替え
function sortAnalysisDailyWork(
  analysisDailyWorks: Array<AnalysisDailyWork>
): Array<AnalysisDailyWork> {
  const result = analysisDailyWorks.sort(
    (a: AnalysisDailyWork, b: AnalysisDailyWork) => {
      return (
        calcSumWorkDailynum(b.workDailynum) -
        calcSumWorkDailynum(a.workDailynum)
      );
    }
  );
  return result;
}
//workDailynumの合計を算定
export function calcSumWorkDailynum(
  workDailynum: AnalysisDailyWork["workDailynum"]
): number {
  const result = workDailynum.reduce((result, current) => {
    return result + current;
  }, 0);
  return result;
}
