import { useCallback } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { ApiWork } from "./work.api-service";
import { Work } from "./work-model";
import { RecoilAtomKeys } from "../store/RecoilKeys";

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
