import { Stock } from "../stock/stock-model";

export type Work = {
  readonly id: number | null;
  readonly name: string;
  readonly type: number | null;
  readonly typename: string;
};

export type WorkStock = Work & {
  num?: number;
  addOrDecOrNull: "add" | "dec" | "no";
};

//workにstock情報を追加
export function findWorkStock(work: Work, stocks: Array<Stock>): WorkStock {
  const target = stocks.filter((v) => {
    return work.id === v.add_work || work.id === v.decrease_work;
  });
  if (target.length === 0) {
    return {
      ...work,
      num: undefined,
      addOrDecOrNull: "no",
    };
  } else {
    const decisionAddOrDecOrNull = (): WorkStock["addOrDecOrNull"] => {
      if (work.id === target[0].add_work) return "add";
      if (work.id === target[0].decrease_work) return "dec";
      return "no";
    };
    return {
      ...work,
      num: target[0].num ? target[0].num : 0,
      addOrDecOrNull: decisionAddOrDecOrNull(),
    };
  }
}

//日本語に変換
export function NameAddOrDecOrNull(type: WorkStock["addOrDecOrNull"]) {
  switch (type) {
    case "add":
      return "増加";
    case "dec":
      return "減少";
    case "no":
      return "なし";
  }
}
