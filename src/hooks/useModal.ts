import { useState } from "react";

//【課題】ページ遷移のたび、レンタリングされるのがいや？
export const useModal = () => {
  const [isModalWork, setIsModalWork] = useState<Boolean>(false);

  const [idWork, setIdWork] = useState<number>();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  //【課題】any

  return {
    idWork,
    isModalWork,
    setIsModalWork,
    setIdWork,
    isShowModal,
    setIsShowModal,
  };
};
