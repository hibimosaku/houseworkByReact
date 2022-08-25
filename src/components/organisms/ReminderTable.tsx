import { FC, Suspense } from "react";
import { Transition } from "react-transition-group";
import { useModal } from "../../hooks/useModal";
import { ReminderRecord } from "../../reminder/reminderRecord-model";
import ModalWorkDetail from "./ModalWorkDetail";

type Props = {
  reminders: Array<ReminderRecord>;
};

export const ReminderTable: FC<Props> = (props) => {
  const { reminders } = props;
  // const { isWork, isModalWork, onClickWorkOpenClose } = useModal();
  const {
    isWork,
    isModalWork,
    onClickWorkOpenClose,
    modalPropState,
    transitionStyles,
  } = useModal();

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
                onClick={() => onClickWorkOpenClose(reminder.workId)}
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
      <Transition in={modalPropState as boolean} timeout={1500}>
        {(state) => (
          <div style={transitionStyles[state]}>
            <Suspense fallback={<p>Loading...</p>}>
              {isModalWork && <ModalWorkDetail id={isWork} />}
            </Suspense>
          </div>
        )}
      </Transition>
    </>
  );
};
