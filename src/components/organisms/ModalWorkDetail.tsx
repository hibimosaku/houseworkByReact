import React, { FC, memo, useEffect, useState } from "react";

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

const ModalWorkDetail: FC<Props> = memo((props) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div className="absolute top-10 left-1/4 sm:left-1/3 bg-white p-5 rounded-lg">
        <h1 className="text-xl font-bold my-2">作業詳細</h1>
        <hr className="my-2" />
        {workStock && (
          <>
            <p className="py-2">
              名前<span className="px-2">:</span>
              {workStock.name}
            </p>
            <p className="py-2">
              type<span className="px-2">:</span>
              {workStock.typename}
            </p>
            {/* 【課題】これも失敗 */}
            {/* <Suspense fallback={<div>loading中...</div>}> */}
            <p className="py-2">
              stcokタイプ<span className="px-2">:</span>
              {NameAddOrDecOrNull(workStock.addOrDecOrNull)}
            </p>
            {/* </Suspense> */}
            <p className="py-2">
              stcok数<span className="px-2">:</span>
              {workStock.num ? workStock.num : "-"}
            </p>
          </>
        )}
      </div>
    </>
  );
});

export default ModalWorkDetail;
