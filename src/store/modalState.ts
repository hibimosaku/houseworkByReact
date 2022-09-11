import { useCallback } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { RecoilAtomKeys } from "./RecoilKeys";

//画面全体のscreenのopen/close判断用
//workクリックされたら、表示する
export const modalState = atom<boolean>({
  key: RecoilAtomKeys.MODAL_STATE,
  default: false,
});
//workがクリックされたときのmodalのopen/close判断用
export const modalWorkState = atom<Boolean>({
  key: "modalWorkState",
  default: false,
});

export const modalWorkReminderState = atom<boolean>({
  key: "modalWorkReminderState",
  default: false,
});

const useIsModal = () => {
  return {
    isModal: useRecoilValue(modalState),
  };
};
const useIsReminderModal = () => {
  return {
    isModalReminder: useRecoilValue(modalWorkReminderState),
  };
};

const useChangeIsModal = () => {
  const [, setIsModalState] = useRecoilState(modalState);
  const [, setIsModalReminderState] = useRecoilState(modalWorkReminderState);
  return {
    changeIsModal: useCallback((isBollean: boolean) => {
      setIsModalState(isBollean);
    }, []),
    changeIsModalReminder: useCallback((isBollean: boolean) => {
      setIsModalReminderState(isBollean);
    }, []),
  };
};

//transitonで利用。あまり理解せず作成している。。。
export const modalPropState = atom<Boolean>({
  key: "modalPropState",
  default: false,
});

export const ModalState = {
  useIsModal,
  useChangeIsModal,
  useIsReminderModal,
};
