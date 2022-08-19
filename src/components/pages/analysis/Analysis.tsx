import { useRecoilState } from "recoil";
import { recordState } from "../../../store/recordState";
import { Record } from "../../../model/record-model";
import React, { useEffect, useMemo, useState } from "react";
import {
  AnalysisWork,
  createAnalysisWork,
  createSumMonthWorkCount,
} from "../../../model/analysis/analysisWork-model";
import { getAllReminder } from "../../../api/reminder.api-service";
import { useModal } from "../../../hooks/useModal";
import WorkDetail from "../../organisms/ModalWorkDetail";
import { ModalScreen } from "../../organisms/ModalScreen";

import { CSSTransition } from "react-transition-group";
import {
  AnalysisWorkYearMonth,
  createAnalysisWorkYearMonth,
  calcCountYear,
  YEAR,
} from "../../../model/analysis/analysisWorkYearMonth-model";
import { AnalysisWorkTable } from "../../organisms/AnalysisWorkTable";

export const Analysis = () => {
  const [animate, setAnimate] = useState(false);
  const { isWork, isModalWork, onClickWorkOpenClose } = useModal();
  const [recodsInfo] = useRecoilState<Array<Record>>(recordState);

  const analysisWorkYearMonth: AnalysisWorkYearMonth =
    createAnalysisWorkYearMonth();

  const countYear = calcCountYear(
    analysisWorkYearMonth["year"],
    new Date().getFullYear()
  );
  console.log("【課題】再レンダリングが多い14回");
  const [analysisAry, setAnalysisAry] = useState<Array<AnalysisWork>>([]);

  // const fetcher: Fetcher<Array<AnalysisWork>> = (url: string): Promise<Array<AnalysisWork>> =>
  //   fetch(url).then((res) => res.json());
  // const { data: stock, error, mutate } = useSWR(`${URL}/reminder/`, fetcher);
  const sumMonthWorkCount = useMemo(
    () => createSumMonthWorkCount(analysisAry),
    [analysisAry]
  );
  useEffect(() => {
    getAllReminder().then((res) => {
      const analysisWorks: Array<AnalysisWork> = createAnalysisWork(
        recodsInfo,
        res
      );
      setAnalysisAry(analysisWorks);
    });
  }, [recodsInfo]);

  return (
    <>
      <ModalScreen>
        <h1 className="font-bold text-md my-5 underline decoration-wavy">
          分析
        </h1>
        <h3 className="text-md my-1 underline decoration-dash">月別作業</h3>
        <AnalysisWorkTable
          analysisWorkYearMonth={analysisWorkYearMonth}
          analysisAry={analysisAry}
          countYear={countYear}
          YEAR={YEAR}
          onClickWorkOpenClose={onClickWorkOpenClose}
          sumMonthWorkCount={sumMonthWorkCount}
        />
        <h3 className="text-md my-1 underline decoration-dash">日別作業</h3>
        <ul>
          <li>1レコード情報取得</li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <hr />
        以下はテスト
        <br />
        {isModalWork && <WorkDetail id={isWork} />}
        <>
          {/* 【課題】失敗 
            clickからのtransitionが失敗
          */}
          <button onClick={() => setAnimate((prev) => !prev)}>
            {animate ? "falseにする" : "trueにする"}
          </button>
          <CSSTransition in={animate} timeout={2000} unmountOnExit>
            {(state) => {
              return <h1 style={{ backgroundColor: "red" }}>{state}</h1>;
            }}
          </CSSTransition>
        </>
      </ModalScreen>
    </>
  );
};
