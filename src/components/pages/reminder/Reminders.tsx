import { useReminder } from "../../../hooks/useReminder";
import { ReminderTable } from "../../organisms/ReminderTable";

export const Reminders = () => {
  const {
    delayReminders,
    todayReminders,
    tendayReminders,
    thirtydayReminders,
  } = useReminder();

  return (
    <>
      <div className="relative">
        <h1 className="font-bold text-md my-5 underline decoration-wavy">
          リマインダー
        </h1>
        <h3 className="text-md my-1 underline decoration-dash">遅延</h3>
        {delayReminders.length === 0 ? (
          "なし"
        ) : (
          <ReminderTable reminders={delayReminders} />
        )}
        <hr />
        <h3 className="text-md my-1 underline decoration-dash">当日</h3>
        {todayReminders.length === 0 ? (
          "なし"
        ) : (
          <ReminderTable reminders={todayReminders} />
        )}
        <hr />

        <h3 className="text-md my-1 underline decoration-dash">10日前</h3>
        {tendayReminders.length === 0 ? (
          "なし"
        ) : (
          <ReminderTable reminders={tendayReminders} />
        )}
        <hr />

        <h3 className="text-md my-1 underline decoration-dash">30日以降</h3>
        {thirtydayReminders.length === 0 ? (
          "なし"
        ) : (
          <ReminderTable reminders={thirtydayReminders} />
        )}
        <hr />

        <h3 className="text-md my-1 underline decoration-dash">リセット中</h3>
      </div>
    </>
  );
};
