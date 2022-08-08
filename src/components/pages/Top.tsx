// import React, { useEffect, useState } from 'react'
// import { useRecoilState, useRecoilValue } from 'recoil'
// import { getAllRecordsData } from '../../api/record.api-service'
// import { recordState } from '../../store/recordState'
// import { Record } from '../../type/record-type'
import RecordCreate from '../organisms/RecordCreate'
import {Records} from '../organisms/Records'


export default function Top() {
  // const [recordList,setRecordList] = useState<Array<Record>>([])
  // const [recodsInfo,setRecordsInfo] = useRecoilState(recordState)

  //作成時作業一覧が更新されるが、仕組みが？
  //create側が更新されたから、リロードされている
  // useEffect(()=>{
  //   getAllRecordsData().then((res)=>{
  //     setRecordList(res)
  //     setRecordsInfo(res)
  //   })
  // },[]);
  return (
    <div>
      <RecordCreate />
      
      <br />
      <hr />
      {/* <Records recordList={recordList} /> */}
      <Records />
    </div>
  )
}
