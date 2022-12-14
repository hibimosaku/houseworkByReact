import { sort } from "../../common/sort";
import { Record } from "../record/record-model";
import { Work } from "../work/work-model";
//日別の分析用データ（月の作業に対して）
export type AnalysisDailyWork = {
  readonly year: number;
  readonly month: number;
  readonly work: Work;
  readonly workDailynum: Array<number>;
  readonly sumWorkDailynum: Array<number>;
};

//生成
export function createAnalysisDailyWork(
  records: Array<Record>,
  year: number,
  month: number
): Array<AnalysisDailyWork> {
  const d = new Date(year, month);
  //月末日取得
  d.setDate(0);

  //recordsから対象の年月を抽出
  const m = new Map();
  const targetRecord = records.filter((v) => {
    const targetYear = v.created_at.substring(0, 4);
    const targetMonth = v.created_at.substring(6, 7);
    return targetYear === String(year) && targetMonth === String(month);
  });
  //targetRecordからAnalysisDailyWorkの生成
  targetRecord.forEach((v) => {
    const key =
      v.created_at.substring(0, 4) +
      v.created_at.substring(5, 7) +
      "-workid" +
      v.work;
    //更新：以前作成分なら、worknumを1足す
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
      //新規
    } else {
      const aryDay = Array(d.getDate()).fill(0);
      const day = v.created_at.substring(8, 10);

      aryDay[Number(day) - 1] = 1;
      m.set(key, {
        year: key.substring(0, 4),
        month: key.substring(4, 6),
        work: {
          id: v.work,
          name: v.workname,
          type: v.typeid,
          typename: v.typename,
        },
        workDailynum: aryDay,
        sumWorkDailynum: calcSumWorkDailynum(aryDay),
      });
    }
  });
  const result = sort(Array.from(m.values()), "workDailynum", "descending");
  return result;
}

//並び替え
// function sortAnalysisDailyWork(
//   analysisDailyWorks: Array<AnalysisDailyWork>
// ): Array<AnalysisDailyWork> {
//   return analysisDailyWorks.sort(
//     (a: AnalysisDailyWork, b: AnalysisDailyWork) => {
//       return (
//         calcSumWorkDailynum(b.workDailynum) -
//         calcSumWorkDailynum(a.workDailynum)
//       );
//     }
//   );
// }
//workDailynumの合計を算定
export function calcSumWorkDailynum(
  workDailynum: AnalysisDailyWork["workDailynum"]
): number {
  const result = workDailynum.reduce((result, current) => {
    return result + current;
  }, 0);
  return result;
}
