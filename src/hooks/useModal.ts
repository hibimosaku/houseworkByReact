import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, modalWorkState } from "../store/modalState";

export const useModal = () => {
  const [isModal, setIsModal] = useRecoilState(modalState);
  const [isModalWork, setIsModalWork] = useRecoilState(modalWorkState);

  const [isWork, setIsWork] = useState<number>();
  const onClickWorkOpenClose = (id: number) => {
    setIsWork(id);
    setIsModal(!isModal);
    setIsModalWork(!isModalWork);
  };

  const onClickModal = () => {
    if (isModal) {
      setIsModal(false);
      setIsModalWork(false);
    }
  };

  return {
    isModal,
    isWork,
    isModalWork,
    onClickWorkOpenClose,
    onClickModal,
  };
};
