import { Reminder } from "./reminder-model";
import { URL } from "../../api/url";

export async function getAllReminder(): Promise<Array<Reminder>> {
  const result = await fetch(`${URL}/reminder`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const reminders = await result.json();
  return reminders;
}
