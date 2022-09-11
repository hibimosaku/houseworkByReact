import { startTransition, useCallback, useState } from "react";
import { TransitionStatus } from "react-transition-group";
import { useRecoilState } from "recoil";
import { ModalState, modalState, modalWorkState } from "../store/modalState";

//【課題】ページ遷移のたび、レンタリングされるのがいや？
export const useModal = () => {
  // const [isModal, setIsModal] = useRecoilState(modalState);
  const [modalPropState, setModalPropState] = useRecoilState(modalState);
  const [isModalWork, setIsModalWork] = useState<Boolean>(false);

  const { changeIsModal } = ModalState.useChangeIsModal();
  const { changeIsModalReminder } = ModalState.useChangeIsModal();
  const { isModal } = ModalState.useIsModal();
  const [isModalWorkState, setIsModalWorkState] =
    useRecoilState(modalWorkState);

  const [isWork, setIsWork] = useState<number>();
  const [idWork, setIdWork] = useState<number>();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const onClickWorkOpenClose = (id: number) => {
    setIsWork(id);
    changeIsModal(true);
    changeIsModalReminder(true);
    setIsModalWork(true);
    startTransition(() => {
      setModalPropState(!modalPropState);
    });
    setIsModalWorkState(true);
  };

  const onClickModal = useCallback(() => {
    // if (isModal) {
    // setIsModal(false);
    changeIsModal(false);
    setIsModalWork(false);
    changeIsModalReminder(false);

    startTransition(() => {
      setModalPropState(false);
    });
  }, [isModalWork, isModal]);

  const onClickModal1 = useCallback(() => {
    // if (isModal) {
    // setIsModal(false);
    changeIsModal(false);
    setIsModalWork(false);
    changeIsModalReminder(false);

    // startTransition(() => {
    //   setModalPropState(false);
    // });
  }, [isModalWork, isModal]);

  //【課題】any
  const transitionStyles: any =
    // TransitionStatus
    // {
    //   entering: {};
    //   entered: {};
    //   exiting: {};
    //   exited: {};
    // }
    {
      entering: {
        opacity: 1,
        position: "absolute",
        top: "10px",
        left: "25%",
        transition: "all 3s ease",
      },
      entered: {
        position: "absolute",
        top: "10px",
        left: "25%",
        opacity: 1,
        // transition: "all 3s ease",
      },
      exiting: {
        opacity: 0,
        // transition: "all 1s ease",
        position: "absolute",
        top: "10px",
        left: "25%",
      },
      // exited: { opacity: 0, position: "absolute", left: "-100%" },
      //【課題】上手くいかず。reminderで調査中
      // exited: { opacity: 0, display: "none", transition: "all 1s ease" },
    };

  return {
    isModal,
    isWork,
    idWork,
    isModalWork,
    onClickWorkOpenClose,
    onClickModal,
    modalPropState,
    transitionStyles,
    // isModalWorkTest,
    onClickModal1,
    setIsModalWork,
    setIdWork,
    isShowModal,
    setIsShowModal,
  };
};
