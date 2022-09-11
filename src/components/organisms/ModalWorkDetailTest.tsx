import React, { FC, memo, useEffect, useState } from "react";

import { ApiWork } from "../../model/work/work.api-service";
import {
  findWorkStock,
  NameAddOrDecOrNull,
  Work,
  WorkStock,
} from "../../model/work/work-model";
import { StockState } from "../../model/stock/stockState";
import { Transition } from "react-transition-group";
import { modalPropState, modalWorkState } from "../../store/modalState";
import { useModal } from "../../hooks/useModal";
import { useRecoilState } from "recoil";

type Props = {
  isWork: number | undefined;
  isModalWork: Boolean;
  setIsModalWork: any;
};

const ModalWorkDetailTest: FC<Props> = memo((props) => {
  const { isWork, isModalWork, setIsModalWork } = props;
  const [, setWork] = useState<Work>();
  const { stocks } = StockState.useStocks();
  const [workStock, setWorkStock] = useState<WorkStock | null>(null);
  const { onClickModal1 } = useModal();
  const onClicktest = () => {
    onClickModal1();
    setIsModalWork(false);
    setIsModalWorkState(!isModalWorkState);
  };

  // useEffect(() => {
  //   setIsModalWorkState(!isModalWorkState);
  // }, [isModalWork]);
  const [isModalWorkState, setIsModalWorkState] =
    useRecoilState(modalWorkState);
  const transitionStyles: any =
    // TransitionStatus
    // {
    //   entering: {};
    //   entered: {};
    //   exiting: {};
    //   exited: {};
    // }
    {
      entering: {
        opacity: 1,
        position: "absolute",
        // top: "10px",
        // left: "25%",
        transition: "all 0.3s ease",
      },
      entered: {
        position: "absolute",
        // top: "10px",
        // left: "25%",
        opacity: 1,
        // transition: "all 3s ease",
      },
      exiting: {
        opacity: 0,
        // position: "absolute",
        transition: "all 0.5s ease",
        // position: "absolute",
        // top: "10px",
        // left: "25%",
      },
      exited: {
        opacity: 0, //これだけだと、画面操作をじゃまする
        // position: "absolute",//これはduration効かない
        top: "-100%", //【課題】なしにしたいが、上にすると、transition効かない？
        transition: "all 1s ease",
      },
      //【課題】上手くいかず。reminderで調査中
      // exited: { opacity: 0, display: "none", transition: "all 1s ease" },
    };

  useEffect(() => {
    if (isWork) {
      ApiWork.getWorkDetail(isWork).then((work) => {
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
  }, [isWork]);

  return (
    <>
      {/* <div className="absolute top-10 left-1/4 sm:left-1/3 bg-white p-5 rounded-lg"> */}
      <Transition in={isModalWorkState as any} timeout={100}>
        {(state) => (
          <div
            // className="bg-white p-5 rounded-lg"
            className="-top-10 left-1/4 sm:left-1/3 bg-white p-5 rounded-lg transition-all transition-transform"
            style={transitionStyles[state]}
            onClick={onClicktest}
          >
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
        )}
      </Transition>

      {/* {isModalWork && (
      )} */}
    </>
  );
});

export default ModalWorkDetailTest;
