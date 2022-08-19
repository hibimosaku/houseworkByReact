import { FC, memo } from "react";
import { AnalysisWork } from "../../model/analysis/analysisWork-model";
import { AnalysisWorkYearMonth } from "../../model/analysis/analysisWorkYearMonth-model";

type Props = {
  analysisWorkYearMonth: AnalysisWorkYearMonth;
  analysisAry: Array<AnalysisWork>;
  countYear: any;
  YEAR: any;
  onClickWorkOpenClose: any;
  sumMonthWorkCount: any;
};
export const AnalysisWorkTable: FC<Props> = memo((props) => {
  const {
    analysisWorkYearMonth,
    analysisAry,
    countYear,
    YEAR,
    onClickWorkOpenClose,
    sumMonthWorkCount,
  } = props;
  return (
    <>
      <table className="bg-white text-gray-900 border-separate w-full shadow-none text-sm sm:text-base">
        <thead>
          <tr>
            <th rowSpan={2} className="bg-green-700 text-white p-2 font-normal">
              分類
            </th>
            <th rowSpan={2} className="bg-green-700 text-white p-2 font-normal">
              作業名
            </th>
            {/* 年 */}
            {countYear["countBeforeTwoYear"] !== 0 && (
              <th
                className="bg-green-700 text-white p-2 font-normal"
                colSpan={countYear["countBeforeTwoYear"]}
              >
                {YEAR - 2}
              </th>
            )}
            {countYear["countBeforeOneYear"] !== 0 && (
              <th
                className="bg-green-700 text-white p-2 font-normal"
                colSpan={countYear["countBeforeOneYear"]}
              >
                {YEAR - 1}
              </th>
            )}
            <th
              className="bg-green-700 text-white p-2 font-normal"
              colSpan={countYear["countCurrentYear"]}
            >
              {YEAR}
            </th>
            <th rowSpan={2} className="bg-green-700 text-white p-0 font-normal">
              月<br />
              目標
            </th>
          </tr>
          {/* 月 */}
          <tr>
            {analysisWorkYearMonth["month"].map((m, index) => (
              <th
                className="bg-green-700 text-white p-2 font-normal"
                key={index}
              >
                {m}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {analysisAry.map((v: AnalysisWork, index: number) => (
            <tr key={index}>
              <>
                {/* 分類 */}
                <th
                  className={
                    index % 2 === 0
                      ? "bg-green-100 text-green-900 p-1 font-normal"
                      : "bg-green-200 text-green-900 p-1 font-normal"
                  }
                  key={v["typeid"]}
                >
                  {v["typename"]}
                </th>
                {/* 作業名 */}
                <th
                  className={
                    index % 2 === 0
                      ? "bg-green-100 text-green-900 p-1 font-normal underline cursor-pointer"
                      : "bg-green-200 text-green-900 p-1 font-normal underline cursor-pointer"
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
                        ? "bg-green-100 text-green-900 p-1 text-right"
                        : "bg-green-200 text-green-900 p-1 text-right"
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
                      ? "bg-green-100 text-green-900 p-1 text-right"
                      : "bg-green-200 text-green-900 p-1 text-right"
                  }
                >
                  {!v["averageReminderday"] ? "-" : v["averageReminderday"]}
                </td>
              </>
            </tr>
          ))}
          <tr>
            <td
              colSpan={2}
              className="bg-green-700 text-white p-2 font-normal text-center"
            >
              合計
            </td>
            {sumMonthWorkCount.map((v: number, index: number) => (
              <td
                key={index}
                className="bg-green-700 text-white p-2 font-normal text-right"
              >
                {v}
              </td>
            ))}
            <td className="bg-green-700 text-white p-2 font-normal">-</td>
          </tr>
        </tbody>
      </table>
    </>
  );
});
