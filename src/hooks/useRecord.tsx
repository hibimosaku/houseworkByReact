import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { ApiRecord } from "../model/record/record.api-service";
import { ApiStock } from "../model/stock/stock.api-service";
import { Record } from "../model/record/record-model";
import { StockModel } from "../model/stock/stock-model";
import { recordState, RecordState } from "../model/record/recordState";
import { StockState } from "../model/stock/stockState";

export const useRecord = () => {
  const { updateRecord, deleteRecord } = RecordState.useChangeRecord();
  // const { deleteRecord } = RecordState.useDeleteRecord();

  const [recodsInfo] = useRecoilState<Array<Record>>(recordState);
  const { addStock } = StockState.useAddStock();
  const { stocks } = StockState.useStocks();
  // const stocks = useRecoilValue(StockState.stocksSelector);

  // const [list]:Array<Record> = props//これだとうまくいかず
  // const {recordList} = props
  // const [records,setRecords] = useState<Array<Record>>([])
  const [filTypes, setFilTypes] = useState<
    Array<Pick<Record, "typeid" | "typename">>
  >([]);
  const [filType, setFilType] = useState<number | string>("all");
  const [filWork, setFilWork] = useState<number | string>("all");
  const [filWorks, setFilWorks] = useState<
    Array<Pick<Record, "work" | "workname" | "typeid">>
  >([]);
  const [filRecords, setFilRecords] = useState<Array<Record>>([]); //抽出用

  const [defaultWorks, setDefaultWorks] = useState<
    Array<Pick<Record, "work" | "workname" | "typeid">>
  >([]);

  useEffect(() => {
    setFilRecords(recodsInfo);
    const resultType = Array.from(
      new Map(
        recodsInfo.map((record: Record) => [record.typeid, record])
      ).values()
    );
    const arraytype = resultType.map((v) => {
      return {
        typeid: v.typeid,
        typename: v.typename,
      };
    });
    setFilTypes(arraytype);

    const resultWork = Array.from(
      new Map(
        recodsInfo.map((record: Record) => [record.work, record])
      ).values()
    );
    const arraywork = resultWork.map((v) => {
      return {
        work: v.work,
        workname: v.workname,
        typeid: v.typeid,
      };
    });
    setFilWorks(arraywork);
    setDefaultWorks(arraywork);
  }, [recodsInfo]); //【課題】recordsInfoもよくない？ recoil更新用

  const onClickDeleteRecord = (id: number | null, workid: number | null) => {
    if (!id || !workid) return;
    const isAdd = StockModel.isStockAddwrok(stocks, workid);
    const isDecrease = StockModel.isStockDecreasewrok(stocks, workid);

    if (!isAdd && !isDecrease) {
      deleteRecord(id);
    } else if (isAdd && !isDecrease) {
      ApiRecord.deleteRecord(id).then(() => {
        const filRecord = recodsInfo.filter((v) => v.id === id);
        const targetRecord = recodsInfo.filter((v) => v.id === id)[0];
        const targetStock = stocks.filter(
          (v) => v.add_work === filRecord[0].work
        )[0];
        if (!targetRecord.num) return;
        ApiStock.addStock(targetStock, -targetRecord.num)
          .then(() => {
            ApiRecord.getAllRecordsData().then((res) => {
              updateRecord(res);
              ApiStock.getAllStocksData().then((res) => {
                addStock(res);
              });
            });
            return;
          })
          .catch((err) => console.log(err));
      });
    } else if (!isAdd && isDecrease) {
      ApiRecord.deleteRecord(id).then(() => {
        const filRecord = recodsInfo.filter((v) => v.id === id);
        const targetRecord = recodsInfo.filter((v) => v.id === id)[0];
        const targetStock = stocks.filter(
          (v) => v.decrease_work === filRecord[0].work
        )[0];
        if (!targetRecord.num) return;
        ApiStock.decreaseStock(targetStock, -targetRecord.num)
          .then(() => {
            ApiRecord.getAllRecordsData().then((res) => {
              updateRecord(res);
              ApiStock.getAllStocksData().then((res) => {
                addStock(res);
              });
            });
            return;
          })
          .catch((err) => console.log(err));
      });
    }
    // throw new Error("why");
  };
  const onChangeFiltype = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!event) return;
    const eventFilType = event.target.value;

    const currentFilWork = document.querySelectorAll("select");
    currentFilWork[2].value = "all";

    if (eventFilType === "all") {
      setFilType(eventFilType);
      setFilWorks(defaultWorks);
      setFilRecords(recodsInfo);
    }
    if (eventFilType !== "all") {
      setFilType(Number(eventFilType));
      const result = defaultWorks.filter((v) => {
        return v.typeid === Number(eventFilType);
      });
      setFilWorks(result);
      const res = recodsInfo.filter(
        (v: Record) => v.typeid === Number(eventFilType)
      );
      setFilRecords(res);
    }
  };
  const onChangeWorktype = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!event) return;
    const eventFilWork = event.target.value;

    if (eventFilWork === "all") setFilWork(eventFilWork);
    if (eventFilWork !== "all") setFilWork(Number(eventFilWork));

    //種類別=all,作業別=all
    if (filType === "all" && eventFilWork === "all") {
      setFilRecords(recodsInfo);
      setFilWorks(defaultWorks);
    }
    //種類別=allじゃない,作業別=allじゃない
    if (filType !== "all" && eventFilWork !== "all") {
      const res = recodsInfo.filter(
        (v: Record) => v.typeid === filType && v.work === Number(eventFilWork)
      );
      setFilRecords(res);
    }
    //種類別=all,作業別=allじゃない
    if (filType === "all" && eventFilWork !== "all") {
      const res = recodsInfo.filter(
        (v: Record) => v.work === Number(eventFilWork)
      );
      setFilRecords(res);
    }
    //種類別=allじゃない,作業別=all
    if (filType !== "all" && event.target.value === "all") {
      const res = recodsInfo.filter((v: Record) => v.typeid === filType);
      setFilRecords(res);
    }
  };

  return {
    filTypes,
    filWorks,
    filRecords,
    onClickDeleteRecord,
    onChangeFiltype,
    onChangeWorktype,
    filType,
    filWork,
  };
};
