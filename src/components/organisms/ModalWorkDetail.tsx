import React, {
  Dispatch,
  FC,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { ApiWork } from "../../model/work/work.api-service";
import {
  findWorkStock,
  NameAddOrDecOrNull,
  Work,
  WorkStock,
} from "../../model/work/work-model";
import { StockState } from "../../model/stock/stockState";
import "../../../src/styles.css";
import { CSSTransition } from "react-transition-group";

type Props = {
  idWork: number | undefined;
  isShowModal: boolean;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
};

const ModalWorkDetail: FC<Props> = memo((props) => {
  const { idWork, isShowModal, setIsShowModal } = props;
  const [, setWork] = useState<Work>();
  const { stocks } = StockState.useStocks();
  const [workStock, setWorkStock] = useState<WorkStock | null>(null);
  useEffect(() => {
    if (idWork) {
      ApiWork.getWorkDetail(idWork).then((work) => {
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
  }, [idWork]);

  const overlay: any = {
    zIndex: 2,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  };
  const overlayA: any = {
    zIndex: 3,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <CSSTransition
        classNames="modal-all"
        in={isShowModal}
        timeout={700}
        unmountOnExit
      >
        <div style={overlay}></div>
      </CSSTransition>

      <CSSTransition
        classNames="modal"
        in={isShowModal}
        timeout={700}
        unmountOnExit
      >
        <div
          style={overlayA}
          className="fixed"
          onClick={() => {
            setIsShowModal(false);
          }}
        >
          {/* <div className="absolute top-10 left-1/4 sm:left-1/3 bg-white p-5 rounded-lg"> */}
          {/* {isModalWork && ( */}
          <div className="bg-white p-5 rounded-lg">
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
          {/* )} */}
        </div>
      </CSSTransition>
    </>
  );
});

export default ModalWorkDetail;
