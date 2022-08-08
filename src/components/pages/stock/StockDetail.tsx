import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { recordState } from '../../../store/recordState'
import { Record } from '../../../model/record-model'
import { Stock } from '../../../model/stock-model'

const StockDetail = () => {
  const location = useLocation()
  const {data}:any = location.state
  const [stock,setStock] = useState<Stock>()
  const [adds,setAdd] =useState<Array<Record>>()
  const [decreases,setDecrease] =useState<Array<Record>>()
  const setRecordInfo = useRecoilValue<Array<Record>>(recordState)

  useEffect(()=>{
    if(setRecordInfo[0].id===null) return
    setStock(data)
    const addres = setRecordInfo.filter((v)=>{
      return v.work === stock?.add_work
    })
    const decreaseres = setRecordInfo.filter((v)=>{
      return v.work === stock?.decrease_work
    })
    setAdd(addres)
    setDecrease(decreaseres)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[setRecordInfo,stock])

  return (
    <>
      <h1 className='font-bold text-lg pb-1'>在庫詳細</h1>
      名前：{(stock || {}).name}<br />
      数：{(stock || {}).num}<br />
      
      <h2>増加履歴情報</h2>
      <table className='table-fixed border-collapse'>
        <thead>
          <tr>
            <th className='p-2 border border-solid border-gray-600'>No</th>
            <th className='p-2 border border-solid border-gray-600'>種類</th>
            <th className='p-2 border border-solid border-gray-600'>作業名</th>
            <th className='p-2 border border-solid border-gray-600'>購入数</th>
            <th className='p-2 border border-solid border-gray-600'>作業日</th>
          </tr>
        </thead>
        {(adds || []).map((add,index)=>( 
          <tbody key={add.id}>
            <tr>
              <td className='p-2 border border-solid border-gray-600'>{index+1}</td>
              <td className='p-2 border border-solid border-gray-600'><Link to={`/work/${add.typeid}`}>{add.typename}</Link></td>
              <td className='p-2 border border-solid border-gray-600'>{add.workname}</td>
              <td className='p-2 border border-solid border-gray-600'>{add.num}</td>
              <td className='p-2 border border-solid border-gray-600'>{add.created_at}</td>
            </tr>
          </tbody>
        ))}
      </table>

      <h2>減少履歴情報</h2>
      <table className='table-fixed border-collapse'>
        <thead>
          <tr>
            <th className='p-2 border border-solid border-gray-600'>No</th>
            <th className='p-2 border border-solid border-gray-600'>種類</th>
            <th className='p-2 border border-solid border-gray-600'>作業名</th>
            <th className='p-2 border border-solid border-gray-600'>使用数</th>
            <th className='p-2 border border-solid border-gray-600'>作業日</th>
          </tr>
        </thead>
        {(decreases || []).map((decrease,index)=>( 
          <tbody key={decrease.id}>
            <tr>
              <td className='p-2 border border-solid border-gray-600'>{index+1}</td>
              <td className='p-2 border border-solid border-gray-600'>{decrease.typename}</td>
              <td className='p-2 border border-solid border-gray-600'>{decrease.workname}</td>
              <td className='p-2 border border-solid border-gray-600'>{decrease.num}</td>
              <td className='p-2 border border-solid border-gray-600'>{decrease.created_at}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  )
}

export default StockDetail
