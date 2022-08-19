import { useCallback } from "react";
import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ApiWork } from "../api/work.api-service";
import { ApiWorkType } from "../api/workType.api-service";
import { Work } from "../model/work-model";
import { WorkType } from "../model/workType-model";
import { RecoilAtomKeys } from "./RecoilKeys";

const workTypeState = atom<Array<WorkType>>({
  key: RecoilAtomKeys.WORKTYPE_STATE,
  default: [],
});

//stateの読み取り
const useWorkTypes = () => {
  return {
    worktypes: useRecoilValue(workTypeState),
  };
};

//初期値の取得(useRecoilbackを使わないパターン)
const useInitWorkTypes = () => {
  const setState = useSetRecoilState(workTypeState);
  return {
    initWorkType: useCallback(() => {
      ApiWorkType.getAllWorkTypesData()
        .then((res) => {
          setState(res);
        })
        .catch((err) => {
          console.log(err);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  };
};

export const WorkTypeState = {
  useWorkTypes,
  useInitWorkTypes,
};
