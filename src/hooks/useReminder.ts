import { useEffect, useState } from "react";
import { getAllReminder } from "../reminder/reminder.api-service";
import {
  ReminderRecord,
  ReminderRecordModel,
} from "../reminder/reminderRecord-model";
import { RecordState } from "../record/recordState";

export const useReminder = () => {
  const [delayReminders, setDelayReminders] = useState<Array<ReminderRecord>>(
    []
  );
  const [todayReminders, setTodayReminders] = useState<Array<ReminderRecord>>(
    []
  );
  const [tendayReminders, setTendayReminders] = useState<Array<ReminderRecord>>(
    []
  );
  const [thirtydayReminders, setThirtydayReminders] = useState<
    Array<ReminderRecord>
  >([]);
  const { records } = RecordState.useRecords();

  useEffect(() => {
    getAllReminder().then((res) => {
      if (!res) return;
      const reminderRecords = ReminderRecordModel.createReminderRecord(
        records,
        res
      );
      const delay = ReminderRecordModel.findReminderRecord(
        reminderRecords,
        ReminderRecordModel.REMINDERDAY["delay"]
      );
      setDelayReminders(delay);

      setTodayReminders(
        reminderRecords
          .filter(
            (v: ReminderRecord) =>
              v.reminderDay === ReminderRecordModel.REMINDERDAY["today"]
          )
          .reverse()
      );
      setTendayReminders(
        ReminderRecordModel.findReminderRecord(
          reminderRecords,
          ReminderRecordModel.REMINDERDAY["ten"]
        )
      );
      setThirtydayReminders(
        reminderRecords
          .filter(
            (v: ReminderRecord) =>
              v.reminderDay === ReminderRecordModel.REMINDERDAY["thirty"]
          )
          .reverse()
      );
    });
  }, [records]);

  return {
    delayReminders,
    todayReminders,
    tendayReminders,
    thirtydayReminders,
  };
};
