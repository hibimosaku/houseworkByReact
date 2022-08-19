import { Record } from "../record/record-model";
import { Reminder } from "../reminder/reminder-model";

export const MONTHNUM = 6;
//【課題】こまごまとした関数はどこに置くのがわかりやすい？
export type AnalysisWork = {
  readonly workid: number;
  readonly workname: string;
  readonly typeid: number;
  readonly typename: string;
  readonly averageReminderday: number | null;
  readonly monthWorkCount: Array<number>;
};

type AnalysisData = {
  year: number;
  workid: number;
  workname: string;
  typeid: number;
  typename: string;
  month: number;
  reminderday?: number;
  worknum: number;
};

type sumMonthWorkCount = Array<number>;

export function createAnalysisWork(
  records: Array<Record>,
  reminders: Array<Reminder>
): Array<AnalysisWork> {
  const analysisData = getAnalysisData(records, reminders);
  const analysiWork = createAryWorks(analysisData);

  const result = Array.from(analysiWork.values()).map((v) => {
    return {
      workid: v[0],
      workname: v[1],
      typeid: v[2],
      typename: v[3],
      averageReminderday: v[4],
      monthWorkCount: v[5],
    };
  });
  const sort = sortAnalysisWork(result);
  return sort;
}

export function createSumMonthWorkCount(
  analysisWorks: Array<AnalysisWork>
): sumMonthWorkCount {
  //monthWorkCountを抽出
  const extractMonthWorkCount = analysisWorks.map((v) => {
    return v.monthWorkCount;
  });
  //抽出したmonthWorkCountを合算
  let m = new Map();
  for (let i = 0; i < MONTHNUM; i++) {
    extractMonthWorkCount.forEach((v, index) => {
      if (m.has(i)) {
        m.set(i, m.get(i) + v[i]);
      } else {
        m.set(i, v[i]);
      }
    });
  }
  return Array.from(m.values());
}

//当月の作業多い順
function sortAnalysisWork(analysisWorks: Array<AnalysisWork>) {
  const result = analysisWorks.sort((a, b) => {
    return b.monthWorkCount[MONTHNUM - 1] - a.monthWorkCount[MONTHNUM - 1];
  });
  return result;
}

function getAnalysisData(
  records: Array<Record>,
  reminders: Array<Reminder>
): Array<AnalysisData> {
  const m = new Map();

  const res = records.reduce(
    (result: Array<AnalysisData> | [], current: Record) => {
      const day = new Date(current.created_at);
      let key =
        String(current["work"]) +
        String(day.getFullYear()) +
        String(day.getMonth() + 1);
      const targetreminder = findWorkReminder(reminders, current.work);
      if (m.has(key)) {
        m.set(key, {
          workid: current.work,
          workname: current.workname,
          typeid: current.typeid,
          typename: current.typename,
          year: day.getFullYear(),
          month: day.getMonth() + 1,
          reminderday: targetreminder?.day,
          worknum: m.get(key)["worknum"] + 1,
        });
      } else {
        m.set(key, {
          workid: current.work,
          workname: current.workname,
          typeid: current.typeid,
          typename: current.typename,
          year: day.getFullYear(),
          month: day.getMonth() + 1,
          reminderday: targetreminder?.day,
          worknum: 1,
        });
      }
      return Array.from(m.values());
    },
    []
  );
  return res;
}

const today = new Date();
export const YEAR = today.getFullYear();
//分析結果の月の数

export type AnalysisYearMonth = {
  year: number;
  month: number;
};

//分析用の年、月の配列生成
const analysisYearMonth: Array<AnalysisYearMonth> = Array(MONTHNUM)
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

export const aryAnalysisYearMonth = analysisYearMonth.reduce(
  (result: any, current) => {
    result["year"].push(current.year);
    result["month"].push(current.month);
    return result;
  },
  { year: [], month: [] }
);

//これなら、オブジェクトでできる
// const test = new Map();
// test.set("a", { id: 1, name: "fff", ary: [1, 2, 5] });
// test.set("b", { id: 2, name: "gggg", ary: [11, 12, 35] });
// test.set("a", { id: 1, name: "gggg", ary: [41, 42, 35] });
// console.log("test", test.entries());

//左からworkid,work名、在庫数、月別作業回数
export type InfoAnalysis = [
  number,
  string,
  number,
  string,
  number | null,
  Array<number>
];

function createAryWorks(analysis: Array<AnalysisData>): Array<InfoAnalysis> {
  const emptyMonthNum = Array(MONTHNUM).fill(0);
  const m1 = new Map();
  analysis.forEach((v) => {
    analysisYearMonth.forEach((m, index) => {
      if (v.year === m.year && v.month === m.month) {
        const key = String(v.workid);
        //keyがなければ新規作成
        if (!m1.has(key)) {
          const ary = [...emptyMonthNum];
          ary.splice(index, 1, v.worknum);
          m1.set(key, [
            v.workid,
            v.workname,
            v.typeid,
            v.typename,
            averageReminderday(v.reminderday),
            ary,
          ]);
          //keyがあるので上書き
        } else {
          const targetKeyAry = m1.get(key)[5];
          targetKeyAry.splice(index, 1, v.worknum);
          m1.set(key, [
            v.workid,
            v.workname,
            v.typeid,
            v.typename,
            averageReminderday(v.reminderday),
            targetKeyAry,
          ]);
        }
      }
    });
  });
  return Array.from(m1.values());
}

function findWorkReminder(
  reminders: Array<Reminder>,
  workid: number
): Reminder | null {
  const target = reminders.find((v) => {
    return v.work === workid;
  });
  if (!target) return null;
  return target;
}

function averageReminderday(reminderday?: number) {
  if (!reminderday) return null;
  return Math.round((30 / reminderday) * 10) / 10;
}
