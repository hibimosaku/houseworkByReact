import { useEffect, useState } from "react";
import { ApiRecord } from "../api/record.api-service";
import { ApiStock } from "../api/stock.api-service";
import { ApiWork } from "../api/work.api-service";
import { Stock, StockModel } from "../model/stock-model";
import { Work } from "../model/work-model";
import { RecordState } from "../store/recordState";
import { StockState } from "../store/stockState";

export const useRecordCreate = () => {
  const { stocks } = StockState.useStocks();
  const { addStock } = StockState.useAddStock();
  const { createRecord, updateRecord } = RecordState.useChangeRecord();

  const [stockNum, setStockNum] = useState<number>(1);
  const [stock, setStock] = useState<Stock | {}>({});
  const [works, setWorks] = useState<Array<Work>>([]);
  const [workid, setWorkId] = useState<number | null>(0);
  //【課題】1つにまとめれそう
  const [isAddwork, setIsAddwork] = useState(false);
  const [isDecreasework, setIsDecreasework] = useState(false);

  useEffect(() => {
    ApiWork.getAllWorksData()
      .then((res) => {
        setWorks(res);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeWork = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const eventId = Number(event.target.value);
    setWorkId(Number(eventId));
    if (Number(eventId) === 0) return;

    setIsAddwork(false);
    setIsDecreasework(false);

    const isAdd = StockModel.isStockAddwrok(stocks, eventId);
    const isDecrease = StockModel.isStockDecreasewrok(stocks, eventId);

    if (isAdd) {
      setIsAddwork(true);
      return;
    } else if (isDecrease) {
      const stock = StockModel.findStockDecreasework(stocks, eventId);
      setIsDecreasework(true);
      setStock(stock);
      return;
    } else {
      setStock({});
      return;
    }
  };

  const onChangeStock = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStockNum(Number(event.target.value));
  };
  const onClickCreateRecord = () => {
    const targetWork = works.filter((v) => v.id === workid);
    if (!targetWork[0].id) return;
    createRecord(targetWork[0].id);
    // ApiRecord.creatRecord(targetWork[0].id).then(() => {
    //   ApiRecord.getAllRecordsData().then((res) => createRecord(res)); //課題 onClickCreateRecordAddStockではこの書き方では反映せず
    // });
    setWorkId(0);
  };
  const onClickCreateRecordDecreaseStock = () => {
    const targetWork = works.filter((v) => v.id === workid);
    ApiRecord.creatRecord(targetWork[0].id, 1).then(() => {
      const targetDecreaseStock: Stock = stocks.filter(
        (v: Stock) => v.decrease_work === workid
      )[0];
      ApiStock.decreaseStock(targetDecreaseStock).then(() => {
        ApiRecord.getAllRecordsData().then((res) => {
          updateRecord(res);
          ApiStock.getAllStocksData().then((res) => {
            addStock(res);
          });
        });
      });
    });
    setIsDecreasework(false);
    setWorkId(0);
  };

  const onClickCreateRecordAddStock = () => {
    const targetWork = works.filter((v) => v.id === workid);
    ApiRecord.creatRecord(targetWork[0].id, stockNum).then(() => {
      const targetAddStock: Stock = stocks.filter(
        (v: Stock) => v.add_work === workid
      )[0];
      //きたない。awaitを考えたが、変数がない場合もあり。
      ApiStock.addStock(targetAddStock, stockNum).then(() => {
        ApiRecord.getAllRecordsData().then((res) => {
          updateRecord(res);
          ApiStock.getAllStocksData().then((res) => {
            addStock(res);
          });
        });
      });
    });
    setIsAddwork(false);
    setWorkId(0);
  };

  return {
    stockNum,
    stock,
    works,
    workid,
    isAddwork,
    isDecreasework,
    onChangeWork,
    onChangeStock,
    onClickCreateRecord,
    onClickCreateRecordDecreaseStock,
    onClickCreateRecordAddStock,
  };
};
