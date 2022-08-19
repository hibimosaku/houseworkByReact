import React, { FC, Suspense, useEffect, useState } from "react";

import { ApiWork } from "../../work/work.api-service";
import {
  findWorkStock,
  NameAddOrDecOrNull,
  Work,
  WorkStock,
} from "../../work/work-model";
import { StockState } from "../../stock/stockState";

type Props = {
  id: number | undefined;
};

const ModalWorkDetail: FC<Props> = (props) => {
  let { id } = props;
  const [, setWork] = useState<Work>();
  const { stocks } = StockState.useStocks();

  let [workStock, setWorkStock] = useState<WorkStock | null>(null);

  useEffect(() => {
    if (id) {
      ApiWork.getWorkDetail(id).then((work) => {
        setWork(work);
        const target = findWorkStock(work, stocks);
        if (target) {
          setWorkStock(target);
        } else {
          setWorkStock(null);
        }
      });
    }
  }, [id, stocks]);

  return (
    <>
      <div className="absolute inset-1/4 bg-white transition duration-200 ease-in-out">
        <h1 className="font-bold text-lg pb-1">作業詳細</h1>
        {workStock && (
          <>
            <p>名前:{workStock.name}</p>
            <p>type:{workStock.typename}</p>
            {/* 【課題】これも失敗 */}
            <Suspense fallback={<div>loading中...</div>}>
              <p>stcokタイプ:{NameAddOrDecOrNull(workStock.addOrDecOrNull)}</p>
            </Suspense>
            <p>stcok数:{workStock.num ? workStock.num : "-"}</p>
          </>
        )}
      </div>
    </>
  );
};

export default ModalWorkDetail;
