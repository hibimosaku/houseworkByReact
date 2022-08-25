import { startTransition, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, modalWorkState } from "../store/modalState";

//【課題】ページ遷移のたび、レンタリングされるのがいや？
export const useModal = () => {
  const [isModal, setIsModal] = useRecoilState(modalState);
  const [modalPropState, setModalPropState] = useRecoilState(modalState);
  const [isModalWork, setIsModalWork] = useRecoilState(modalWorkState);

  const [isWork, setIsWork] = useState<number>();
  const onClickWorkOpenClose = (id: number) => {
    // console.log("0");
    setIsWork(id);
    setIsModal(!isModal);
    setIsModalWork(!isModalWork);
    startTransition(() => {
      setModalPropState(!modalPropState);
    });
  };

  const onClickModal = () => {
    if (isModal) {
      setIsModal(false);
      setIsModalWork(false);
      startTransition(() => {
        setModalPropState(!modalPropState);
      });
    }
  };

  const transitionStyles: any = {
    entering: { opacity: 1, transition: "all 1s ease" },
    entered: { opacity: 1 },
    exiting: { opacity: 0, transition: "all 1s ease" },
    exited: { opacity: 0 },
  };

  return {
    isModal,
    isWork,
    isModalWork,
    onClickWorkOpenClose,
    onClickModal,
    modalPropState,
    transitionStyles,
  };
};
