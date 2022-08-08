import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getWorkDetail } from '../../../api/record.api-service';

type Work = {
  id:string,
  name:string,
  type :string
}

const WorkDetail = () => {
  const [work,setWork] = useState<Work>()
  let { id } = useParams();
  
  useEffect(()=>{
    if(id){
      getWorkDetail(id).then((work)=>setWork(work))
    }
  },[id])

  return (
    <>
      <div>
        <h1 className='font-bold text-lg pb-1'>作業詳細</h1>
        {work?.name}
      </div>
    </>
  )
}

export default WorkDetail
