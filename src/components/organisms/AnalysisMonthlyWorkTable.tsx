import { FC, memo } from "react";
import { AnalysisMonthlyWork } from "../../model/analysis/analysiyMonthlyWork-model";
import { AnalysisWorkYearMonth } from "../../model/analysis/analysisWorkYearMonth-model";
import { useModal } from "../../hooks/useModal";
import ModalWorkDetail from "./ModalWorkDetail";
import { WorkTypeState } from "../../model/worktype/workTypeState";
import { WorkType } from "../../model/worktype/workType-model";

type Props = {
  analysisWorkYearMonth: AnalysisWorkYearMonth;
  analysisMonthlyWorks: Array<AnalysisMonthlyWork>;
  filMonthlyAnalysis: Array<AnalysisMonthlyWork>;
  setFilMonthlyAnalysis: any;
  countYear: any;
  YEAR: any;
  // onClickWorkOpenClose: any;
  sumMonthWorkCount: any;
  currentWorkType: any;
};

export const AnalysisMonthlyWorkTable: FC<Props> = memo((props) => {
  const { idWork, setIdWork, isShowModal, setIsShowModal } = useModal();

  const showWorkDetail = (id: AnalysisMonthlyWork["work"]["id"]) => {
    setIdWork(Number(id));
    setIsShowModal(true);
  };

  const {
    analysisWorkYearMonth,
    analysisMonthlyWorks,
    setFilMonthlyAnalysis,
    filMonthlyAnalysis,
    countYear,
    YEAR,
    sumMonthWorkCount,
    currentWorkType,
  } = props;

  // const {
  //   isWork,
  //   isModalWork,
  //   onClickWorkOpenClose,
  //   modalPropState,
  //   transitionStyles,
  // } = useModal();

  const onChangeMonthlyWorkType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const eventId = Number(event.target.value);
    if (eventId === 0) {
      setFilMonthlyAnalysis(analysisMonthlyWorks);
    } else {
      const result = analysisMonthlyWorks.filter((v) => {
        return eventId === v["work"]["type"];
      });
      setFilMonthlyAnalysis(result);
    }
  };
  const { worktypes } = WorkTypeState.useWorkTypes();

  return (
    <>
      <label className="my-1 text-sm sm:text-base">分類：</label>
      <select
        className="border my-2 text-sm sm:text-base"
        onChange={onChangeMonthlyWorkType}
        value={currentWorkType}
      >
        <option value="0" defaultValue={0} className="text-sm sm:text-base">
          ALL
        </option>

        {worktypes.map((v: WorkType, index: number) => (
          <option key={index} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>

      <div className="h-1/2 overflow-y-scroll">
        <table className="bg-white text-gray-900 border-separate w-full shadow-none text-sm sm:text-base">
          <thead className="sticky top-0">
            <tr>
              <th
                rowSpan={2}
                className="bg-green-700 text-white p-2 font-normal sticky top-0"
              >
                分類
              </th>
              <th
                rowSpan={2}
                className="bg-green-700 text-white p-2 font-normal sticky top-0"
              >
                作業名
              </th>
              {/* 年 */}
              {countYear["countBeforeTwoYear"] !== 0 && (
                <th
                  className="bg-green-700 text-white p-2 font-normal sticky top-0"
                  colSpan={countYear["countBeforeTwoYear"]}
                >
                  {YEAR - 2}
                </th>
              )}
              {countYear["countBeforeOneYear"] !== 0 && (
                <th
                  className="bg-green-700 text-white p-2 font-normal sticky top-0"
                  colSpan={countYear["countBeforeOneYear"]}
                >
                  {YEAR - 1}
                </th>
              )}
              <th
                className="bg-green-700 text-white p-2 font-normal sticky top-0"
                colSpan={countYear["countCurrentYear"]}
              >
                {YEAR}
              </th>
              <th
                rowSpan={2}
                className="bg-green-700 text-white p-0 font-normal sticky top-0"
              >
                <span className="text-xs sm:text-sm">
                  月
                  <br />
                  目標
                </span>
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

            <tr>
              <td
                colSpan={2}
                className="bg-green-600 text-white p-2 font-normal text-center"
              >
                合計
              </td>
              {sumMonthWorkCount.map((v: number, index: number) => (
                <td
                  key={index}
                  className="bg-green-600 text-white p-2 font-normal text-right"
                >
                  {v}
                </td>
              ))}
              <td className="bg-green-600 text-white p-2 font-normal">-</td>
            </tr>
          </thead>
          <tbody>
            {filMonthlyAnalysis.map((v: AnalysisMonthlyWork, index: number) => (
              <tr key={index}>
                <>
                  {/* 分類 */}
                  <th
                    className={
                      index % 2 === 0
                        ? "bg-green-100 text-green-900 p-1 font-normal"
                        : "bg-green-200 text-green-900 p-1 font-normal"
                    }
                    key={"typeid-" + index}
                  >
                    {v["work"]["typename"]}
                  </th>
                  {/* 作業名 */}
                  <th
                    className={
                      index % 2 === 0
                        ? "bg-green-100 text-green-900 p-1 font-normal underline cursor-pointer"
                        : "bg-green-200 text-green-900 p-1 font-normal underline cursor-pointer"
                    }
                    key={"workid" + index}
                    onClick={
                      () => showWorkDetail(v["work"]["id"])
                      //   onClickWorkOpenClose(v["workid"], isModalWork)
                    }
                  >
                    {v["work"]["name"]}
                  </th>
                  {/* 作業月数 */}
                  {v["monthWorkCount"].map((x: number, index: number) => (
                    <td
                      className={
                        index % 2 === 0
                          ? "bg-green-100 text-green-900 p-1 text-right"
                          : "bg-green-200 text-green-900 p-1 text-right"
                      }
                      key={index}
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
          </tbody>
        </table>
      </div>
      <ModalWorkDetail
        idWork={idWork}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </>
  );
});
