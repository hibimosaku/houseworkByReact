import { useEffect, useState } from "react";
import { ApiRecord } from "../record/record.api-service";
import { ApiStock } from "../stock/stock.api-service";
import { Stock, StockModel } from "../stock/stock-model";
import { Work } from "../work/work-model";
import { RecordState } from "../record/recordState";
import { StockState } from "../stock/stockState";
import { WorkState } from "../work/workState";
import { WorkTypeState } from "../worktype/workTypeState";

export const useRecordCreate = () => {
  const { stocks } = StockState.useStocks();
  const { works } = WorkState.useWorks();
  const { worktypes } = WorkTypeState.useWorkTypes();
  const { addStock } = StockState.useAddStock();
  const { createRecord, updateRecord } = RecordState.useChangeRecord();

  const [stockNum, setStockNum] = useState<number>(1);
  const [stock, setStock] = useState<Stock | {}>({});
  const [workid, setWorkId] = useState<number | null>(0);
  const [workTypeid, setWorkTypeId] = useState<number | null>(0);
  //【課題】1つにまとめれそう
  const [isAddwork, setIsAddwork] = useState(false);
  const [isDecreasework, setIsDecreasework] = useState(false);
  const [filWorks, setFilWorks] = useState<Array<Work>>(works);

  useEffect(() => {
    setFilWorks(works); //【課題】邪道？
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChangeWorkType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWorkId(0);
    if (!event) return;

    const eventId = Number(event.target.value);
    if (eventId === 0) {
      setWorkTypeId(eventId);
      setFilWorks(works);
      return;
    }

    const result = works.filter((v) => {
      return v.type === eventId;
    });
    setWorkTypeId(eventId);
    setFilWorks(result);
  };

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
    worktypes,
    workid,
    isAddwork,
    isDecreasework,
    onChangeWork,
    onChangeStock,
    onClickCreateRecord,
    onClickCreateRecordDecreaseStock,
    onClickCreateRecordAddStock,
    workTypeid,
    setWorkTypeId,
    onChangeWorkType,
    filWorks,
  };
};
