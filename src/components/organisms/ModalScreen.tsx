import { ReactNode } from "react";
import { useModal } from "../../hooks/useModal";

export const ModalScreen = ({ children }: { children: ReactNode }) => {
  const { isModal, onClickModal } = useModal();
  return (
    <>
      <div
        onClick={onClickModal}
        className={isModal ? "bg-gray-300 z-10 h-screen" : "z-0"}
      >
        {children}
      </div>
    </>
  );
};
