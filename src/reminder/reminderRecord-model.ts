import { Record } from "../record/record-model";
import { Reminder } from "./reminder-model";

export type ReminderRecord = {
  readonly workId: number;
  readonly workName: string;
  readonly typeId: number;
  readonly typeName: string;
  readonly day: string;
  readonly reminderDay: REMINDERDAY;
};

enum REMINDERDAY {
  delay = -1,
  today = 0,
  ten = 10,
  thirty = 30,
}

function createReminderRecord(
  records: Array<Record>,
  reminders: Array<Reminder>
): Array<ReminderRecord> {
  const recordsCopy = [...records];
  recordsCopy.reverse();
  const resultType = Array.from(
    new Map(recordsCopy.map((record: Record) => [record.work, record])).values()
  );

  let reminderAry: any = [];
  let today = new Date();
  resultType.forEach((v) => {
    reminders.forEach((y: Reminder) => {
      if (v.work === y.work) {
        let reminderDay = new Date(v.created_at);
        reminderDay.setDate(reminderDay.getDate() + y.day);

        let diffDay = Math.floor(
          (reminderDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );

        let reminderday = () => {
          if (diffDay < 0) return REMINDERDAY["delay"];
          if (diffDay === 0) return REMINDERDAY["today"];
          if (diffDay > 0 && diffDay <= 10) return REMINDERDAY["ten"];
          if (diffDay > 10) return REMINDERDAY["thirty"];
        };
        const jaWeekday = JaWeekday(reminderDay);
        const reminderData = {
          workId: y.work,
          workName: v.workname,
          typeId: v.typeid,
          typeName: v.typename,
          day:
            reminderDay.getFullYear() +
            "-" +
            (reminderDay.getMonth() + 1) +
            "-" +
            reminderDay.getDate() +
            "(" +
            jaWeekday +
            ")",
          reminderDay: Number(reminderday()),
        };
        reminderAry.push(reminderData);
      }
    });
  });
  return reminderAry;
}

function findReminderRecord(
  reminderRecords: Array<ReminderRecord>,
  reminderday: REMINDERDAY
) {
  return reminderRecords
    .filter((v: ReminderRecord) => {
      return v.reminderDay === reminderday;
    })
    .reverse();
}

function JaWeekday(date: Date) {
  switch (date.getDay()) {
    case 0:
      return "日";
    case 1:
      return "月";
    case 2:
      return "火";
    case 3:
      return "水";
    case 4:
      return "木";
    case 5:
      return "金";
    case 6:
      return "土";
  }
  return date.getDay();
}

export const ReminderRecordModel = {
  JaWeekday,
  REMINDERDAY,
  createReminderRecord,
  findReminderRecord,
};
