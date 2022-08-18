import { FC } from "react";
import { ReminderRecord } from "../../model/reminderRecord-model";

type Props = {
  reminders: Array<ReminderRecord>;
};

export const ReminderTable: FC<Props> = (props) => {
  const { reminders } = props;

  return (
    <>
      <table className="bg-white text-gray-900 border-separate w-full shadow-none text-sm sm:text-base">
        <thead>
          <tr>
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
    </>
  );
};
