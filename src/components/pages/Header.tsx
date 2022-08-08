import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { getAllRecordsData } from '../../api/record.api-service'
import { getAllStocksData } from '../../api/stock.api-service'
import { recordState } from '../../store/recordState'
import { stockState } from '../../store/stockState'

export default function Header() {
  const [,setRecordsInfo] = useRecoilState(recordState)
  const [,setStocksInfo] = useRecoilState(stockState)


  useEffect(()=>{
    getAllRecordsData().then((res)=>{
      setRecordsInfo(res)    
    })
    getAllStocksData().then((res)=>{
      setStocksInfo(res)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <header className='container bg-green-200 flex flex-row justify-between'>
      <h3 className='p-1'>work</h3>
      <nav>
        <ul className='flex flex-row'>
          <li className='p-1'><Link to={"/"}>top</Link></li>
          <li className='p-1'><Link to={"/analysis"}>分析</Link></li>
          <li className='p-1'><Link to={"/reminders"}>リマインダー</Link></li>
          <li className='p-1'><Link to={"/stocks"}>在庫一覧</Link></li>
        </ul>        
      </nav>
    </header>
  )
}
