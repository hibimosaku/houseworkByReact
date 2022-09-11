import { YEAR } from "../../../model/analysis/analysisWorkYearMonth-model";
import { AnalysisMonthlyWorkTable } from "../../organisms/AnalysisMonthlyWorkTable";
import { AnalysisDailyWorkTable } from "../../organisms/AnalysisDailyWorkTable";
import { useAnalysis } from "../../../hooks/useAnalysis";
export const Analysis = () => {
  //【課題】再レンダリングが多い。初期時14回。ただ、ページ移動時は4回

  const {
    // onClickWorkOpenClose,
    selectYearMonth,
    currentYearMonth,
    countYear,
    analysisDailyWorks,
    aryDay,
    onChangeYear,
    sumMonthWorkCount,
    analysisWorkYearMonth,
    analysisMonthlyWorks,
    filMonthlyAnalysis,
    setFilMonthlyAnalysis,
    currentWorkType,
    filDailyAnalysis,
    setFilDailyAnalysis,
    onChangeDailyWorkType,
    filWorktypes,
  } = useAnalysis();

  return (
    <>
      <div className="relative z-20">
        <h1 className="font-bold text-md my-5 underline decoration-wavy">
          分析
        </h1>
        {/* <h3 className="text-md my-1 underline decoration-dash">グラフ</h3>
        <AnalysisGraph /> */}
        <h3 className="text-md my-1 underline decoration-dash">月別作業</h3>
        <AnalysisMonthlyWorkTable
          analysisWorkYearMonth={analysisWorkYearMonth}
          analysisMonthlyWorks={analysisMonthlyWorks}
          countYear={countYear}
          YEAR={YEAR}
          // onClickWorkOpenClose={onClickWorkOpenClose}
          sumMonthWorkCount={sumMonthWorkCount}
          filMonthlyAnalysis={filMonthlyAnalysis}
          setFilMonthlyAnalysis={setFilMonthlyAnalysis}
          currentWorkType={currentWorkType}
        />
        <h3 className="text-md mt-3 underline decoration-dash">日別作業</h3>
        <AnalysisDailyWorkTable
          onChangeYear={onChangeYear}
          currentYearMonth={currentYearMonth}
          selectYearMonth={selectYearMonth}
          aryDay={aryDay}
          analysisDailyWorks={analysisDailyWorks}
          currentWorkType={currentWorkType}
          filDailyAnalysis={filDailyAnalysis}
          setFilDailyAnalysis={setFilDailyAnalysis}
          onChangeDailyWorkType={onChangeDailyWorkType}
          filWorktypes={filWorktypes}
        />
      </div>
    </>
  );
};
