import { URL } from "./url";

export async function getAllReminder(){
  const result = await fetch(`${URL}/reminder`,{
    method:'GET',
    headers:{
      'Content-Type': 'application/json'
    },
  })
  const reminders = await result.json()
  return reminders
}