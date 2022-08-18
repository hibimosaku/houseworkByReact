import { useCallback } from "react";
import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ApiStock } from "../api/stock.api-service";
import { Stock } from "../model/stock-model";
import { RecoilAtomKeys } from "./RecoilKeys";

const stockState = atom<Array<Stock>>({
  key: RecoilAtomKeys.STOCK_STATE,
  default: [],
});

//stateの読み取り
const useStocks = () => {
  return {
    stocks: useRecoilValue(stockState),
  };
};
//useStocksと同じ内容
// const stocksSelector = selector<Array<Stock>>({
//   key: RecoilSelectorKeys.TODO_STOCKS,
//   get: ({ get }) => get(stockState),
// });
//初期値の取得(useRecoilbackを使わないパターン)
const useInitStocks = () => {
  const setState = useSetRecoilState(stockState);
  return {
    initStock: useCallback(() => {
      ApiStock.getAllStocksData()
        .then((res) => {
          setState(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  };
};

//stateの保存
const useAddStock = () => {
  return {
    addStock: useRecoilCallback(({ set }) => (res: Array<Stock>) => {
      set(stockState, res);
    }),
  };
};

export const StockState = {
  useStocks,
  useAddStock,
  useInitStocks,
};

//以下テスト
//テスト用
export const asyncStockState = atom({
  key: "asyncStockState",
  default: ApiStock.getAllStocksData(),
});
//テスト用
export const asyncStock = selector({
  key: "fdafda",
  get: ({ get }) => {
    const fff = ApiStock.getAllStocksData();
    return fff;
  },
});

export const testState = atom<number>({
  key: "test",
  default: new Promise((resolve) => {
    setTimeout(() => {
      resolve(100);
    }, 5 * 1000);
  }),
});
