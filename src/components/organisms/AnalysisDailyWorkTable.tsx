import { Dispatch, FC, memo, SetStateAction, Suspense } from "react";
import { Transition } from "react-transition-group";
import { useModal } from "../../hooks/useModal";
import { AnalysisDailyWork } from "../../model/analysis/analysisDailyyWork-model";
import { WorkType } from "../../model/worktype/workType-model";
import ModalWorkDetail from "./ModalWorkDetail";

type Props = {
  onChangeYear: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  currentYearMonth: string;
  selectYearMonth: Array<string>;
  aryDay: Array<number>;
  analysisDailyWorks: Array<AnalysisDailyWork>;
  currentWorkType: WorkType["id"] | undefined;
  filDailyAnalysis: Array<AnalysisDailyWork>;
  setFilDailyAnalysis: Dispatch<SetStateAction<AnalysisDailyWork[]>>;
  onChangeDailyWorkType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  filWorktypes: Array<WorkType>;
};
export const AnalysisDailyWorkTable: FC<Props> = memo((props) => {
  const {
    onChangeYear,
    currentYearMonth,
    selectYearMonth,
    aryDay,
    currentWorkType,
    filDailyAnalysis,
    onChangeDailyWorkType,
    filWorktypes,
  } = props;

  const {
    isWork,
    isModalWork,
    onClickWorkOpenClose,
    modalPropState,
    transitionStyles,
  } = useModal();
  return (
    <>
      <label className="my-1 text-sm sm:text-base">年月：</label>
      <select
        className="border my-2 text-sm sm:text-base"
        onChange={onChangeYear}
        value={currentYearMonth}
      >
        {selectYearMonth.map((v: string, index: number) => (
          <option key={index}>{v}</option>
        ))}
      </select>

      <label className="my-1 text-sm sm:text-base">分類：</label>
      <select
        className="border my-2 text-sm sm:text-base"
        onChange={onChangeDailyWorkType}
        value={currentWorkType}
      >
        <option value="0" defaultValue={0} className="text-sm sm:text-base">
          ALL
        </option>

        {filWorktypes.map((v: WorkType, index: number) => (
          <option key={index} value={v.id}>
            {v.name}
          </option>
        ))}
      </select>

      <>
        <div className="w-full overflow-scroll">
          <table className="bg-white text-gray-900 border-separateshadow-none text-sm sm:text-base">
            <thead>
              <tr>
                {/* <th className="bg-green-700 text-white p-2 font-normal whitespace-nowrap"> */}
                <th className="bg-green-700 text-white p-2 font-normal">
                  分　　類
                </th>
                {/* <th className="bg-green-700 text-white p-2 font-normal whitespace-nowrap sticky left-0"> */}
                <th className="bg-green-700 text-white p-2 font-normal sticky left-0">
                  &nbsp;&nbsp;作　　業　　名&nbsp;&nbsp;
                </th>
                <td className="bg-green-700 text-white p-2 font-normal">
                  合計
                </td>

                {aryDay.map((m: any, index: number) => (
                  <td
                    className="bg-green-700 text-white p-2 font-normal"
                    key={index}
                  >
                    {m}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {filDailyAnalysis.map((v: AnalysisDailyWork, index: number) => (
                <tr key={index}>
                  <>
                    {/* 分類 */}
                    <th
                      className={
                        index % 2 === 0
                          ? "bg-green-100 text-green-900 p-1 font-normal sticky"
                          : "bg-green-200 text-green-900 p-1 font-normal sticky"
                      }
                      key={"type-" + index}
                    >
                      {v["work"]["typename"]}
                    </th>
                    {/* 作業名 */}
                    <th
                      className={
                        index % 2 === 0
                          ? "bg-green-100 text-green-900 p-1 font-normal underline cursor-pointer sticky left-0 sm:left-39 z-10"
                          : "bg-green-200 text-green-900 p-1 font-normal underline cursor-pointer sticky left-0 sm:left-39 z-10"
                      }
                      key={"work-" + index}
                      // onClick={() =>
                      //   onClickWorkOpenClose(v["workid"], isModalWork)
                      // }
                    >
                      {v["work"]["name"]}
                    </th>
                    {/* 合計 */}
                    <th
                      className={
                        index % 2 === 0
                          ? "bg-green-100 text-green-900 p-1 font-normal sticky left-18 sm:left-39"
                          : "bg-green-200 text-green-900 p-1 font-normal sticky left-18 sm:left-39"
                      }
                      key={"sum-" + index}
                    >
                      {v["sumWorkDailynum"]}
                    </th>

                    {/* 作業月数 */}
                    {v["workDailynum"] &&
                      v["workDailynum"].map((x: number, index: number) => (
                        <td
                          className={
                            index % 2 === 0
                              ? "bg-green-100 text-green-900 p-1 text-right"
                              : "bg-green-200 text-green-900 p-1 text-right"
                          }
                          key={"workDaily-" + index}
                        >
                          {x}
                        </td>
                      ))}
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
      <Transition in={modalPropState} timeout={1500}>
        {(state) => (
          <div style={transitionStyles[state]}>
            <Suspense fallback={<p>Loading...</p>}>
              {isModalWork && (
                <ModalWorkDetail id={isWork} isModalWork={isModalWork} />
              )}
            </Suspense>
          </div>
        )}
      </Transition>
    </>
  );
});
