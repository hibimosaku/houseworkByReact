import React, { useEffect, useState } from 'react'
import { creatRecord, getAllRecordsData } from '../../api/record.api-service';
import { addStock, decreaseStock, getAllStocksData } from '../../api/stock.api-service';
import { getAllWorksData } from '../../api/work.api-service';
import { Stock, StockModel } from '../../model/stock-model'
import {useRecoilState} from 'recoil'
import { stockState } from '../../store/stockState';
import Button from '../atoms/Button';
import { recordState } from '../../store/recordState';
import { Work } from '../../model/work-model';
import { Record } from '../../model/record-model';

const defaultStock = {
  id:null,
  name:"",
  num:undefined,
  add_work:null,
  add_workname:"",
  decrease_work:null,
  decrease_workname:"",
  updated_at:""
}

export default function RecordCreate() {
  // const location = useLocation();
  const [stocksInfo,setStocksInfo] = useRecoilState<Array<Stock>>(stockState)
  const [,setRecordsInfo] = useRecoilState<Array<Record>>(recordState)

  const [stockNum,setStockNum] = useState<number>(1)
  const [stock,setStock]= useState<Stock>(defaultStock)
  const [works,setWorks] = useState<Array<Work>>([])
  const [workid,setWorkId] = useState<number | null>(0)
  //【課題】1つにまとめれそう
  const [isAddwork,setIsAddwork] = useState(false)
  const [isDecreasework,setIsDecreasework] = useState(false)
   

  useEffect(()=>{
    getAllWorksData().then((res)=>{      
      setWorks(res)
      return 
    })
  },[])

  const onChangeWork = (event:React.ChangeEvent<HTMLSelectElement>)=>{
    const eventId = Number(event.target.value)
    
    setWorkId(Number(eventId))
    if(Number(eventId)===0){
      return
    }

    setIsAddwork(false)
    setIsDecreasework(false)
    const isAdd = StockModel.isStockAddwrok(stocksInfo,eventId) 
    const isDecrease = StockModel.isStockDecreasewrok(stocksInfo,eventId)


    if(isAdd){
      setIsAddwork(true)
      return
    }else if(isDecrease){
      const stock = StockModel.findStockDecreasework(stocksInfo,eventId)
      setIsDecreasework(true)
      setStock(stock)
      return
    }else{
      setStock(defaultStock)
      return
    }
    

    //stock減らすworkの場合の対応
    // const isDecrease = StockModel.isStockDecreasewrok(stocksInfo,eventId)
    // const isDecrease = stocksInfo.filter((v)=>{
    //   return Number(eventId) === v.decrease_work
    // })
    // if(isDecrease){
    //   setIsDecreasework(true)
    //   setStock(isDecrease[0])
    // }else{
    //   setIsDecreasework(false)
    //   setStock(defaultStock)
    // }
  }
  const onChangeStock = (event:React.ChangeEvent<HTMLSelectElement>)=>{
    setStockNum(Number(event.target.value))
  }
  const onClickCreateRecord = ()=>{
    const targetWork = works.filter((v)=> v.id === workid)
    creatRecord(targetWork[0].id)
    .then(()=>{
      getAllRecordsData().then((res)=>setRecordsInfo(res))//課題 onClickCreateRecordAddStockではこの書き方では反映せず
    })
    setWorkId(null)
  }
  
  const onClickCreateRecordAddStock=()=>{
    const targetWork = works.filter((v)=> v.id === workid)
    creatRecord(targetWork[0].id,stockNum)
    .then(()=>{
      const targetAddStock:Stock = stocksInfo.filter((v:Stock)=>v.add_work === workid)[0]
      //きたない。awaitを考えたが、変数がない場合もあり。
      addStock(targetAddStock,stockNum).then(()=>{
        getAllRecordsData().then((res)=>{
          setRecordsInfo(res)  
          getAllStocksData().then((res)=>{
            setStocksInfo(res)
          })  
        })
      })      
    })
    setIsAddwork(false)
    setWorkId(null)
  }

  const onClickCreateRecordDecreaseStock=()=>{
    const targetWork = works.filter((v)=> v.id === workid)
    creatRecord(targetWork[0].id,1)
    .then(()=>{
      const targetDecreaseStock:Stock = stocksInfo.filter((v:Stock)=>v.decrease_work === workid)[0]
      decreaseStock(targetDecreaseStock).then(()=>{
        getAllRecordsData().then((res)=>{
          setRecordsInfo(res)  
          getAllStocksData().then((res)=>{
            setStocksInfo(res)
          })  
        })
      })      
    })
    setIsDecreasework(false)
    setWorkId(null)
  }

  return (
    <>
      <h1 className='font-bold text-lg pb-1'>作業実施</h1>
      <select value={Number(workid)} onChange={onChangeWork}>
        <option value="0">選択してください</option>
        {(works || []).map((work)=>(
          <option key={work.id} value={Number(work.id)}>{work.name}</option>
        ))}
      </select>

      {(workid!==0 && isAddwork) && (
        <div className='block'>
          数：<select value={stockNum} onChange={onChangeStock}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <Button children="登録" onClick={onClickCreateRecordAddStock} />
        </div>
      )}

      {(workid!==0 && isDecreasework) && (
        <>
          { ( stock.num && stock.num > 0)
            ? (
              <>
                <p>現在在庫数：{stock.num}</p>
                <Button children="登録" onClick={onClickCreateRecordDecreaseStock} />
              </>
            )
            : <p>在庫なしのため登録不可</p>
          }
        </>
      )}

      {((workid!==0 && (!isAddwork && !isDecreasework))) && (
        <Button children="登録" onClick={onClickCreateRecord} />
      )}
      
    </>
  )
}
