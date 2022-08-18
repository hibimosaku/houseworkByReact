import { useRecoilState } from "recoil";
import { recordState } from "../../../store/recordState";
import { Record } from "../../../model/record-model";
import React, { memo, useEffect, useState } from "react";
import {
  AnalysisWork,
  createAnalysisWork,
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

export const Analysis = memo(() => {
  const [animate, setAnimate] = useState(false);
  const { isWork, isModalWork, onClickWorkOpenClose } = useModal();
  const [recodsInfo] = useRecoilState<Array<Record>>(recordState);

  const analysisWorkYearMonth: AnalysisWorkYearMonth =
    createAnalysisWorkYearMonth();

  const countYear = calcCountYear(
    analysisWorkYearMonth["year"],
    new Date().getFullYear()
  );

  const [analysisAry, setAnalysisAry] = useState<any>([]);
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

        <table className="bg-white text-gray-900 border-separate w-full shadow-none text-sm sm:text-base">
          <thead>
            <tr>
              <th rowSpan={2} className="bg-green-700 text-white p-2"></th>
              {/* 年 */}
              {countYear["countBeforeTwoYear"] !== 0 && (
                <th
                  className="bg-green-700 text-white p-2"
                  colSpan={countYear["countBeforeTwoYear"]}
                >
                  {YEAR - 2}
                </th>
              )}
              {countYear["countBeforeOneYear"] !== 0 && (
                <th
                  className="bg-green-700 text-white p-2"
                  colSpan={countYear["countBeforeOneYear"]}
                >
                  {YEAR - 1}
                </th>
              )}
              <th
                className="bg-green-700 text-white p-2"
                colSpan={countYear["countCurrentYear"]}
              >
                {YEAR}
              </th>
              <th rowSpan={2} className="bg-green-700 text-white p-2">
                月<br />
                目標
              </th>
            </tr>
            {/* 月 */}
            <tr>
              {analysisWorkYearMonth["month"].map((m, index) => (
                <th className="bg-green-700 text-white p-2" key={index}>
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {analysisAry.map((v: AnalysisWork, index: number) => (
              <tr key={index}>
                <>
                  {/* 作業名 */}
                  <th
                    className={
                      index % 2 === 0
                        ? "bg-green-100 text-green-900 p-1 font-normal"
                        : "bg-green-200 text-green-900 p-1 font-normal"
                    }
                    key={index}
                    onClick={() => onClickWorkOpenClose(v["workid"])}
                  >
                    {v["workname"]}
                  </th>
                  {/* 作業月数 */}
                  {v["monthWorkCount"].map((x: any, index1: number) => (
                    <td
                      className={
                        index % 2 === 0
                          ? "bg-green-100 text-green-900 p-1"
                          : "bg-green-200 text-green-900 p-1"
                      }
                      key={index1}
                    >
                      {x}
                    </td>
                  ))}
                  {/* 目標数 */}
                  <td
                    className={
                      index % 2 === 0
                        ? "bg-green-100 text-green-900 p-1"
                        : "bg-green-200 text-green-900 p-1"
                    }
                  >
                    {!v["averageReminderday"] ? "-" : v["averageReminderday"]}
                  </td>
                </>
              </tr>
            ))}
          </tbody>
        </table>
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
});
