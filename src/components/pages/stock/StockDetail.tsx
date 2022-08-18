import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecordState } from "../../../store/recordState";
import { Record } from "../../../model/record-model";
import { Stock } from "../../../model/stock-model";
import useSWR, { Fetcher } from "swr";
import { URL } from "../../../api/url";
import { StockDetailTable } from "../../organisms/StockDetailTable";

const StockDetail = () => {
  const { id } = useParams();
  //recoilから、stocksをとって、filterでstockの取得もできるが、、、
  const fetcher: Fetcher<Stock> = (url: string): Promise<Stock> =>
    fetch(url).then((res) => res.json());
  const { data: stock, error, mutate } = useSWR(`${URL}/stock/${id}/`, fetcher);

  const [adds, setAdd] = useState<Array<Record>>();
  const [decreases, setDecrease] = useState<Array<Record>>();

  const { records } = RecordState.useRecords();

  useEffect(() => {
    if (!records) return;
    if (!stock) return;

    const addreord = records.filter((v) => {
      return v.work === stock.add_work;
    });
    const decreaserecord = records.filter((v) => {
      return v.work === stock.decrease_work;
    });
    setAdd(addreord);
    setDecrease(decreaserecord);
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stock, records, id]);

  return (
    <>
      <h1 className="font-bold text-md my-5 underline decoration-wavy">
        在庫詳細
      </h1>
      名前：{(stock || {}).name}
      <br />
      数：{(stock || {}).num}
      <br />
      <h2>増加履歴情報</h2>
      {adds && <StockDetailTable records={adds} />}
      <h2>減少履歴情報</h2>
      {decreases && <StockDetailTable records={decreases} />}
    </>
  );
};

export default StockDetail;
