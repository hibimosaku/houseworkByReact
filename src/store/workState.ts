import { useCallback } from "react";
import {
  atom,
  selector,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { ApiStock } from "../api/stock.api-service";
import { ApiWork } from "../api/work.api-service";
import { Work } from "../model/work-model";
import { RecoilAtomKeys } from "./RecoilKeys";

const workState = atom<Array<Work>>({
  key: RecoilAtomKeys.WORK_STATE,
  default: [],
});

//stateの読み取り
const useWorks = () => {
  return {
    works: useRecoilValue(workState),
  };
};

//初期値の取得(useRecoilbackを使わないパターン)
const useInitWorks = () => {
  const setState = useSetRecoilState(workState);
  return {
    initWork: useCallback(() => {
      ApiWork.getAllWorksData()
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

//stateの保存

export const WorkState = {
  useWorks,
  useInitWorks,
};
