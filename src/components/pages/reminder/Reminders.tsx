import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { getAllReminder } from "../../../api/reminder.api-service"
import { Record } from "../../../model/record-model"
import { Reminder } from "../../../model/reminder-model"
import { ReminderRecord, ReminderRecordModel } from "../../../model/reminderRecord-model"
import { recordState } from "../../../store/recordState"

export const Reminders = ()=>{
  const [,setReminders] = useState<Array<Reminder>>()
  const [,setReminderRecords] = useState<Array<ReminderRecord>>([])
  const [delayReminders,setDelayReminders] = useState<Array<ReminderRecord>>([])
  const [todayReminders,setTodayReminders] = useState<Array<ReminderRecord>>([])
  const [tendayReminders,setTendayReminders] = useState<Array<ReminderRecord>>([])
  const [thirtydayReminders,setThirtydayReminders] = useState<Array<ReminderRecord>>([])
  
  const setRecordsInfo = useRecoilValue<Array<Record>>(recordState)

  useEffect(()=>{
    getAllReminder().then((res)=>{
      setReminders(res)
      if(!res) return
      const recordsCopy = [...setRecordsInfo]
      recordsCopy.reverse()
  
      const resultType = Array.from(
        new Map(recordsCopy.map((record:Record)=>[record.work,record])).values()
      ) as Array<Record>
      let reminderAry:any =[]
      let today = new Date()
      resultType.forEach((v)=>{
        res.forEach((y:Reminder)=>{
          if(v.work === y.work){
            let reminderDay = new Date(v.created_at)
            reminderDay.setDate(reminderDay.getDate()+y.day)

            let diffDay =Math.floor((reminderDay.getTime() - today.getTime())/(1000*60*60*24))
            let reminderday = ()=>{
              if(diffDay < 0) return ReminderRecordModel.REMINDERDAY['delay']
              if(diffDay ===0) return ReminderRecordModel.REMINDERDAY['today']
              if(diffDay > 0 && diffDay <=10 ) return ReminderRecordModel.REMINDERDAY['ten']
              if(diffDay > 10 ) return ReminderRecordModel.REMINDERDAY['thirty']
            }
            const JaWeekday = ReminderRecordModel.JaWeekday(reminderDay)
            const reminderData = {
              workId:y.work,
              workName:v.workname,
              typeId:v.typeid,
              typeName:v.typename,
              day:reminderDay.getFullYear() +'-'+ (reminderDay.getMonth()+1) + '-' + reminderDay.getDate()+'('+JaWeekday+ ')',
              reminderDay:Number(reminderday())
            }
            reminderAry.push(reminderData)
          }
        })
      })
      setReminderRecords(reminderAry)
      setDelayReminders(reminderAry.filter((v:ReminderRecord)=>v.reminderDay===ReminderRecordModel.REMINDERDAY['delay']).reverse())
      setTodayReminders(reminderAry.filter((v:ReminderRecord)=>v.reminderDay===ReminderRecordModel.REMINDERDAY['today']).reverse())
      setTendayReminders(reminderAry.filter((v:ReminderRecord)=>v.reminderDay===ReminderRecordModel.REMINDERDAY['ten']).reverse())
      setThirtydayReminders(reminderAry.filter((v:ReminderRecord)=>v.reminderDay===ReminderRecordModel.REMINDERDAY['thirty']).reverse())
      
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[setRecordsInfo])



  return (
    <>
      <p className="font-bold text-lg">遅延</p>
      {delayReminders.length===0 ? 'なし' :(
        <>
          <table className='table-fixed border-collapse'>
            <thead>
              <tr>
                <th className='p-2 border border-solid border-gray-600'>作業名</th>
                <th className='p-2 border border-solid border-gray-600'>リマインダー日</th>
                <th className='p-2 border border-solid border-gray-600'>実行</th>
                <th className='p-2 border border-solid border-gray-600'>リセット</th>
              </tr>
            </thead>
            {delayReminders.map((reminder)=>(
              <tbody key={reminder.workId}>
                  <tr>
                    <td className='p-2 border border-solid border-gray-600'>{reminder.workName}</td>          
                    <td className='p-2 border border-solid border-gray-600'>{reminder.day}</td>          
                  </tr>
              </tbody>
            ))}
          </table>
        </>
      )}
      <p className="font-bold text-lg">当日</p>
      {todayReminders.length===0 ? 'なし' :(
        <>
          <table className='table-fixed border-collapse'>
            <thead>
              <tr>
                <th className='p-2 border border-solid border-gray-600'>作業名</th>
                <th className='p-2 border border-solid border-gray-600'>リマインダー日</th>
                <th className='p-2 border border-solid border-gray-600'>実行</th>
                <th className='p-2 border border-solid border-gray-600'>リセット</th>
              </tr>
            </thead>
            {todayReminders.map((reminder)=>(
              <tbody key={reminder.workId}>
                  <tr>
                    <td className='p-2 border border-solid border-gray-600'>{reminder.workName}</td>          
                    <td className='p-2 border border-solid border-gray-600'>{reminder.day}</td>          
                  </tr>
              </tbody>
            ))}
          </table>
        </>
      )}
      <p className="font-bold text-lg">10日前</p>
      {tendayReminders.length===0 ? 'なし' :(
        <>
          <table className='table-fixed border-collapse'>
            <thead>
              <tr>
                <th className='p-2 border border-solid border-gray-600'>作業名</th>
                <th className='p-2 border border-solid border-gray-600'>リマインダー日</th>
                <th className='p-2 border border-solid border-gray-600'>実行</th>
                <th className='p-2 border border-solid border-gray-600'>リセット</th>
              </tr>
            </thead>
            {tendayReminders.map((reminder)=>(
              <tbody key={reminder.workId}>
                  <tr>
                    <td className='p-2 border border-solid border-gray-600'>{reminder.workName}</td>          
                    <td className='p-2 border border-solid border-gray-600'>{reminder.day}</td>          
                  </tr>
              </tbody>
            ))}
          </table>
        </>
      )}
      <p className="font-bold text-lg">30日以降</p>
      {thirtydayReminders.length===0 ? 'なし' :(
        <>
          <table className='table-fixed border-collapse'>
            <thead>
              <tr>
                <th className='p-2 border border-solid border-gray-600'>作業名</th>
                <th className='p-2 border border-solid border-gray-600'>リマインダー日</th>
                <th className='p-2 border border-solid border-gray-600'>実行</th>
                <th className='p-2 border border-solid border-gray-600'>リセット</th>
              </tr>
            </thead>
            {thirtydayReminders.map((reminder)=>(
              <tbody key={reminder.workId}>
                  <tr>
                    <td className='p-2 border border-solid border-gray-600'>{reminder.workName}</td>          
                    <td className='p-2 border border-solid border-gray-600'>{reminder.day}</td>          
                  </tr>
              </tbody>
            ))}
          </table>
        </>
      )}
      <p className="font-bold text-lg">リセット中</p>
    </>

  )
}