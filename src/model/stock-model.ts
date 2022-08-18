export type Stock = {
  readonly id: number;
  readonly name: string;
  readonly num?: number;
  readonly add_work: number;
  readonly add_workname: string;
  readonly decrease_work: number;
  readonly decrease_workname: string;
  readonly updated_at: string;
};

const DEFAULT_DECREASE_NUM = 1;

// function isStockWrok(stocks:Array<Stock>,workid:Pick<Work,'id'>):boolean{
function isStockAddwrok(stocks: Array<Stock>, workid: number): boolean {
  if (!stocks || !workid) return false;
  const result = stocks.filter((v) => {
    return v.add_work === workid;
  });
  if (result.length === 1) {
    return true;
  } else {
    return false;
  }
}

function isStockDecreasewrok(stocks: Array<Stock>, workid: number): boolean {
  if (!stocks || !workid) return false;
  const result = stocks.filter((v) => {
    return v.decrease_work === workid;
  });
  if (result.length === 1) {
    return true;
  } else {
    return false;
  }
}

function findStockDecreasework(stocks: Array<Stock>, workid: number): Stock {
  if (!stocks || !workid) throw new Error("stock or workid no");
  const result = stocks.filter((v) => {
    return v.decrease_work === Number(workid);
  });
  if (result.length !== 1) {
    throw new Error("stock is not one");
  } else {
    return result[0];
  }
}

export const StockModel = {
  isStockAddwrok,
  isStockDecreasewrok,
  findStockDecreasework,
  DEFAULT_DECREASE_NUM,
};
