import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import {
  AnalysisDailyWork,
  createAnalysisDailyWork,
} from "../analysis/analysisDailyyWork-model";
import { createAryDay } from "../analysis/analysisWorkMonthDay-model";
import {
  AnalysisWorkYearMonth,
  calcCountYear,
  createAnalysisWorkYearMonth,
} from "../analysis/analysisWorkYearMonth-model";
import {
  AnalysisMonthlyWork,
  createAnalysisMontlhlyWorks,
  createSumMonthWorkCount,
} from "../analysis/analysiyMonthlyWork-model";
import { Record } from "../record/record-model";
import { recordState } from "../record/recordState";
import { getAllReminder } from "../reminder/reminder.api-service";
import { WorkType } from "../worktype/workType-model";
import { WorkTypeState } from "../worktype/workTypeState";
import { useModal } from "./useModal";

export const useAnalysis = () => {
  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  // 共通用
  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  const { onClickWorkOpenClose } = useModal();
  const [recodsInfo] = useRecoilState<Array<Record>>(recordState);
  useEffect(() => {
    getAllReminder().then((res) => {
      const analysisMonthlyWorks: Array<AnalysisMonthlyWork> =
        createAnalysisMontlhlyWorks(recodsInfo, res);
      setAnalysisMonthlyWorks(analysisMonthlyWorks);
      setFilMonthlyAnalysis(analysisMonthlyWorks);
    });
    const analysisDailyWorks: Array<AnalysisDailyWork> =
      createAnalysisDailyWork(recodsInfo, targetDailyyear, dailymonth);
    setFilDailyAnalysis(analysisDailyWorks);
    setFilWorktypes(findFilWorktypes(analysisDailyWorks));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recodsInfo]);

  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  // monthly用
  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  const [analysisMonthlyWorks, setAnalysisMonthlyWorks] = useState<
    Array<AnalysisMonthlyWork>
  >([]);
  const [filMonthlyAnalysis, setFilMonthlyAnalysis] = useState<
    Array<AnalysisMonthlyWork>
  >([]);

  const sumMonthWorkCount = useMemo(
    () => createSumMonthWorkCount(filMonthlyAnalysis),
    [filMonthlyAnalysis]
  );

  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  // dailyly用
  // ＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊＊
  //*****年月 ********************************:*/
  //ベース：分析対象の年月
  const analysisWorkYearMonth: AnalysisWorkYearMonth =
    createAnalysisWorkYearMonth();
  //分析データ用の年月
  let s = new Set();
  analysisWorkYearMonth["year"].forEach((y) => {
    return analysisWorkYearMonth["month"].forEach((m) => {
      s.add(y + "/" + m);
    });
  });
  const selectYearMonth = Array.from(s.values());
  const countYear = calcCountYear(
    analysisWorkYearMonth["year"],
    new Date().getFullYear()
  );
  //現分析対象の年
  const [targetDailyyear, setTargetDailyyear] = useState<number>(
    analysisWorkYearMonth.year.slice(-1)[0]
  );
  //現分析対象の月
  const [dailymonth, setDailymonth] = useState<number>(
    analysisWorkYearMonth.month.slice(-1)[0]
  );
  //現在の対象の年月、画面用
  const [currentYearMonth, setCurrentYearMonth] = useState(
    targetDailyyear + "/" + dailymonth
  );

  //*****分析データ*****************************:*/
  //現在選択している分類
  const [currentWorkType, setCurrentWorkType] = useState<WorkType["id"]>();

  const aryDay = createAryDay(targetDailyyear, dailymonth);
  const analysisDailyWorks: Array<AnalysisDailyWork> = createAnalysisDailyWork(
    recodsInfo,
    targetDailyyear,
    dailymonth
  );

  const [filDailyAnalysis, setFilDailyAnalysis] = useState<
    Array<AnalysisDailyWork>
  >([]);
  const { worktypes } = WorkTypeState.useWorkTypes();
  const [filWorktypes, setFilWorktypes] = useState<Array<WorkType>>(worktypes);

  //選択できる分類へ変更
  //全分類から、現分析データで使用している分類のみ抽出
  const findFilWorktypes = (
    analysisDailyWorks: Array<AnalysisDailyWork>
  ): Array<WorkType> => {
    const m = new Map();
    analysisDailyWorks.forEach((r) => {
      worktypes.forEach((w) => {
        if (r.typeid === w.id) {
          m.set(w.id, w);
        }
      });
    });
    return Array.from(m.values());
  };

  const findAnalysisDailyWorks = (
    typeid: WorkType["id"],
    analysisDailyWorks: Array<AnalysisDailyWork>
  ): Array<AnalysisDailyWork> => {
    const result = analysisDailyWorks.filter((v) => {
      return v.typeid === typeid;
    });
    return result;
  };

  //年月の変更時の処理。分類はALLに戻す
  const onChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const split = event.target.value.split("/");
    setTargetDailyyear(Number(split[0]));
    setDailymonth(Number(split[1]));

    const analysisDailyWorks: Array<AnalysisDailyWork> =
      createAnalysisDailyWork(recodsInfo, Number(split[0]), Number(split[1]));
    setFilDailyAnalysis(analysisDailyWorks);
    setCurrentWorkType(0); //
    setCurrentYearMonth(event.target.value);
    setFilWorktypes(findFilWorktypes(analysisDailyWorks));
  };

  const onChangeDailyWorkType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const eventId = Number(event.target.value);
    setCurrentWorkType(eventId);
    if (eventId === 0) {
      setFilDailyAnalysis(analysisDailyWorks);
    } else {
      // findFilWorktypes(analysisDailyWorks);
      setFilDailyAnalysis(findAnalysisDailyWorks(eventId, filDailyAnalysis));
    }
  };

  return {
    onClickWorkOpenClose,
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
    worktypes,
    onChangeDailyWorkType,
    filWorktypes,
  };
};
