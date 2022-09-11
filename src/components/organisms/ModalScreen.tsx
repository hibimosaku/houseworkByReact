import { ReactNode } from "react";
import { useModal } from "../../hooks/useModal";
import { ModalState } from "../../store/modalState";

export const ModalScreen = ({ children }: { children: ReactNode }) => {
  // const { isModal, onClickModal } = useModal();
  const { onClickModal } = useModal();
  const { isModal } = ModalState.useIsModal();

  return (
    <>
      <div
        onClick={isModal ? onClickModal : undefined}
        className={isModal ? "bg-gray-300 z-100 h-screen" : "z-0"}
      >
        {children}
      </div>
    </>
  );
};
