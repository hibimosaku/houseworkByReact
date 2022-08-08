import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { getRecordDetail } from '../../api/record.api-service'

type Record = {
  id:string,
  workid:string,
  workname:string,
  typeid:string,
  typename:string,
  created_at:string
}

export default function RecordDetail() {
  const [record,setRecord] = useState<Record>()
  const {id} = useParams()
  const navigation = useNavigate()

  useEffect(()=>{
    if(id){
      getRecordDetail(id).then((res)=>setRecord(res))
      .catch(()=>{
        navigation("/test")
      })
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <h1 className='font-bold text-lg pb-1'>詳細ページ</h1>
      {record?.workname}
    </div>
  )
}
