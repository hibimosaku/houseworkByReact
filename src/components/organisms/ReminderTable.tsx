/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { ReminderRecord } from "../../model/reminder/reminderRecord-model";
import ModalWorkDetail from "./ModalWorkDetail";

type Props = {
  reminders: Array<ReminderRecord>;
};
export const ReminderTable: FC<Props> = (props) => {
  const { reminders } = props;
  const { setIdWork, isShowModal, setIsShowModal, idWork } = useModal();

  const [inProp, setInProp] = useState(false);
  const showWorkDetail = (id: number) => {
    setIdWork(id);
    setIsShowModal(true);
  };

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
                  showWorkDetail(reminder.workId);
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
      <ModalWorkDetail
        idWork={idWork}
        isShowModal={isShowModal}
        setIsShowModal={setIsShowModal}
      />
    </>
  );
};
