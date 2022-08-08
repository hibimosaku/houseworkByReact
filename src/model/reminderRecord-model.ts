export type ReminderRecord = {
  workId:number,
  workName:string,
  typeId:number,
  typeName:string
  day:string,
  reminderDay:number
}

const REMINDERDAY = {
  delay:-1,
  today:0,
  ten:10,
  thirty:30,
}

function JaWeekday(date:Date){
  switch(date.getDay()){
    case 0:
      return '日'
    case 1:
      return '月'
    case 2:
      return '火'
    case 3:
      return '水'
    case 4:
      return '木'
    case 5:
      return '金'
    case 6:
      return '土'
  }
  return date.getDay()

}

export const ReminderRecordModel={
  JaWeekday,
  REMINDERDAY
}