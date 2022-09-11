import { URL } from "../../api/url";
import { Stock, StockModel } from "./stock-model";

// const sleep = (waitSeconds: number) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("成功");
//     }, waitSeconds * 1000);
//   });
// };

async function getAllStocksData(): Promise<Array<Stock>> {
  // await sleep(5)
  const result = await fetch(`${URL}/stock`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const records = await result.json();
  return records;
}

async function addStock(targetStock: Stock, num: number): Promise<void> {
  const addStock = {
    name: targetStock.name,
    num: Number(targetStock.num) + Number(num),
    add_work: targetStock.add_work,
    decrease_work: targetStock.decrease_work,
  };
  fetch(`${URL}/stock/${targetStock.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addStock),
  });
}

async function decreaseStock(
  targetStock: Stock,
  num: number = StockModel.DEFAULT_DECREASE_NUM
): Promise<void> {
  const addStock = {
    name: targetStock.name,
    num: Number(targetStock.num) - num,
    add_work: targetStock.add_work,
    decrease_work: targetStock.decrease_work,
  };

  fetch(`${URL}/stock/${targetStock.id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addStock),
  })
    .then((res) => {})
    .catch((err) => {
      console.log("失敗", err);
    });
}

export const ApiStock = {
  getAllStocksData,
  addStock,
  decreaseStock,
};
