/* eslint-disable react-hooks/rules-of-hooks */
import { FC, Suspense, useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { useRecoilState, useRecoilValue } from "recoil";
import { useModal } from "../../hooks/useModal";
import { ReminderRecord } from "../../model/reminder/reminderRecord-model";
import { ModalState, modalWorkReminderState } from "../../store/modalState";
import ModalWorkDetail from "./ModalWorkDetail";
import ModalWorkDetailTest from "./ModalWorkDetailTest";

type Props = {
  reminders: Array<ReminderRecord>;
  isWork: any;
  onClickWorkOpenClose: any;
};
export const ReminderTable: FC<Props> = (props) => {
  const { reminders, isWork, onClickWorkOpenClose } = props;
  const [isModalReminder, setIsModalReminder] = useRecoilState<any>(
    modalWorkReminderState
  );
  // const { isModalReminder } = ModalState.useIsReminderModal(modalWorkReminderState);

  // useEffect(() => {
  //   setIsModalReminder(!isModalReminder);
  // }, [isModalReminder]);

  const {
    // isWork,
    setIsModalWork,
    isModalWork,
    // onClickWorkOpenClose,
    modalPropState,
    transitionStyles,
  } = useModal();

  const [inProp, setInProp] = useState(false);

  return (
    <>
      <table className="bg-white text-gray-900 border-separate w-full shadow-none text-sm sm:text-base">
        <thead>
          <tr>
            <th className="bg-green-700 text-white p-2">分類</th>
            <th className="bg-green-700 text-white p-2">作業名</th>
            <th className="bg-green-700 text-white p-2">リマインダー日</th>
          </tr>
        </thead>
        {reminders.map((reminder, index) => (
          <tbody key={reminder.workId}>
            <tr>
              <td
                className={
                  index % 2 === 0
                    ? "bg-green-100 text-green-900 p-1"
                    : "bg-green-200 text-green-900 p-1"
                }
              >
                {reminder.typeName}
              </td>
              <td
                className={
                  index % 2 === 0
                    ? "bg-green-100 text-green-900 p-1 cursor-pointer underline"
                    : "bg-green-200 text-green-900 p-1 cursor-pointer underline"
                }
                onClick={() => {
                  onClickWorkOpenClose(reminder.workId);
                  setInProp(!inProp);
                }}
              >
                {reminder.workName}
              </td>
              <td
                className={
                  index % 2 === 0
                    ? "bg-green-100 text-green-900 p-1"
                    : "bg-green-200 text-green-900 p-1"
                }
              >
                {reminder.day}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      {/* <Transition in={modalPropState} timeout={1500}> */}
      {/* <Transition in={isModalReminder} timeout={1500}>
        {(state) => (
          <div style={transitionStyles[state]}>
            <ModalWorkDetail id={isWork} isModalWork={isModalWork} />
          </div>
        )}
      </Transition> */}
      {/* <ModalWorkDetailTest
        isWork={isWork}
        isModalWork={isModalWork}
        setIsModalWork={setIsModalWork}
      /> */}
    </>
  );
};
