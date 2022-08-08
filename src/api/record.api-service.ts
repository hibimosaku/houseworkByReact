import { Work } from "../model/work-model"
import { URL } from "./url"

export async function getAllRecordsData(){
  const result = 
    await fetch(`${URL}/record`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  const records = await result.json()
  return records
}
export async function creatRecord(workFil:Work['id'],num?:number){
  const data = {
    work:workFil,
    num:num
  }
  fetch(`${URL}/record/`,{
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
  })
  //reactniはサスペンス機能あり
  //再描画、
  // .then((res)=>{
  //   console.log('成功',res)
  // })
  // .catch((err)=>{
  //   console.log('失敗',err)
  // })
}

export async function deleteRecord(id:number){
  await fetch(`${URL}/record/${id}`,{
    method:"DELETE",
    headers:{
      'Content-Type': 'application/json'
    },
  })
  // .then((res)=>{
  //   console.log('成功',res)
  // })
  // .catch((err)=>{
  //   console.log('失敗',err)
  // })

}

export async function getRecordDetail(id:string){
  const result = 
    await fetch(`${URL}/record/${id}`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  const records = await result.json()
  return records
}

export async function getWorkDetail(id:string){
  const result = 
    await fetch(`${URL}/detail-work/${id}`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  const records = await result.json()
  return records

}