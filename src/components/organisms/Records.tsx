import React, { useEffect, useState } from 'react'
import { Record } from '../../model/record-model'
import { deleteRecord, getAllRecordsData } from '../../api/record.api-service';
import { useRecoilState } from 'recoil';
import { recordState } from '../../store/recordState';
import { Stock, StockModel } from '../../model/stock-model';
import { stockState } from '../../store/stockState';
import { addStock, decreaseStock, getAllStocksData } from '../../api/stock.api-service';


// type Props = {
//   recordList:Array<Record>
// }

// export const Records:FC<Array<Props>>　=　(props)=>{ //【課題1】propsの型 Array<Record>でエラー
// export const Records:FC<Props>　=　(props)=>{ //【課題1】propsの型 Array<Record>でエラー
export const Records=()=>{ //【課題1】propsの型 Array<Record>でエラー

  //propsの前にここがレンタリングされている
  // const setRecordsInfo = useRecoilValue<Array<Record>>(recordState)
  const [recodsInfo,setRecordsInfo] = useRecoilState<Array<Record>>(recordState)
  const [stocksInfo,] = useRecoilState<Array<Stock>>(stockState)
  const [,setStocksInfo] = useRecoilState<Array<Stock>>(stockState)

  // const [list]:Array<Record> = props//これだとうまくいかず
  // const {recordList} = props
  // const [records,setRecords] = useState<Array<Record>>([])
  const [filTypes,setFilTypes] = useState<Array<Pick<Record,'typeid' | 'typename'>>>([])
  const [filType,setFilType] = useState<number | string>('all')
  const [,setFilWork] = useState<number | string>('all')
  const [filWorks,setFilWorks] = useState<Array<Pick<Record,'work' | 'workname' | 'typeid'>>>([])
  const [filRecords,setFilRecords] = useState<Array<Record>>([])//抽出用

  const [defaultWorks,setDefaultWorks] = useState<Array<Pick<Record,'work' | 'workname' | 'typeid'>>>([])
  

  //重複
  // useEffect(()=> setRecords(props.recordList),[props.recordList]);
  useEffect(()=> {
      setFilRecords(recodsInfo)
      const resultType = Array.from(
        new Map(recodsInfo.map((record:Record)=>[record.typeid,record])).values()
      ) as Array<Record>
      const arraytype = resultType.map((v)=>{
      return {
        typeid: v.typeid,
        typename:v.typename
      }
      })
      setFilTypes(arraytype)

      const resultWork = Array.from(
        new Map(recodsInfo.map((record:Record)=>[record.work,record])).values()
      ) as Array<Record>
      const arraywork = resultWork.map((v)=>{
      return {
        work:v.work,
        workname:v.workname,
        typeid:v.typeid
      }
      })
      setFilWorks(arraywork) 
      setDefaultWorks(arraywork) 

  },[recodsInfo]);//【課題】recordsInfoもよくない？ recoil更新用 

  const onClickDeleteRecord = (id:number | null,workid:number | null)=>{
    if(!id || !workid) return
    const isAdd = StockModel.isStockAddwrok(stocksInfo,workid)
    const isDecrease = StockModel.isStockDecreasewrok(stocksInfo,workid)

    if(!isAdd && !isDecrease){
      deleteRecord(id).then(()=>{
        getAllRecordsData().then((res)=>{
          setRecordsInfo(res)
          return
        }
      )})
    }else if(isAdd && !isDecrease){
      deleteRecord(id).then(()=>{
        const filRecord = recodsInfo.filter((v)=>v.id === id)
         const targetRecord = recodsInfo.filter((v)=>v.id === id)[0]
         const targetStock = stocksInfo.filter((v)=>v.add_work === filRecord[0].work)[0]
         if(!targetRecord.num) return
         addStock(targetStock,-(targetRecord.num)).then(()=>{
          getAllRecordsData().then((res)=>{
              setRecordsInfo(res)
              getAllStocksData().then((res)=>{
                setStocksInfo(res)
              })  
            })
            return
        }).catch(err=>console.log(err))
      })
    }else if(!isAdd && isDecrease){
      deleteRecord(id).then(()=>{
        const filRecord = recodsInfo.filter((v)=>v.id === id)
        const targetRecord = recodsInfo.filter((v)=>v.id === id)[0]
        const targetStock = stocksInfo.filter((v)=>v.decrease_work === filRecord[0].work)[0]
        if(!targetRecord.num) return
        decreaseStock(targetStock,-(targetRecord.num)).then(()=>{
          getAllRecordsData().then((res)=>{
            setRecordsInfo(res)
            getAllStocksData().then((res)=>{
              setStocksInfo(res)
            })  
          })
          return
        }).catch(err=>console.log(err))
     })
    }
    throw new Error('why')

  }

  const onChangeFiltype = (event:React.ChangeEvent<HTMLSelectElement>)=>{
    if(!event) return
    const eventFilType = event.target.value

    const currentFilWork = document.querySelectorAll('select')
    currentFilWork[2].value = 'all'

    if(eventFilType==='all'){
      setFilType(eventFilType)
      setFilWorks(defaultWorks) 
      setFilRecords(recodsInfo)
    } 
    if(eventFilType!=='all') {
      setFilType(Number(eventFilType))
      const result = defaultWorks.filter((v)=>{
        return v.typeid === Number(eventFilType)
      })
      setFilWorks(result)
      const res = recodsInfo.filter((v:Record)=> v.typeid === Number(eventFilType))
      setFilRecords(res)
    } 
  }

  const onChangeWorktype = (event:React.ChangeEvent<HTMLSelectElement>)=>{
    if(!event) return
    const eventFilWork = event.target.value

    if(eventFilWork==='all') setFilWork(eventFilWork)
    if(eventFilWork!=='all') setFilWork(Number(eventFilWork))
    
    //種類別=all,作業別=all
    if(filType==='all' && eventFilWork==='all'){
      setFilRecords(recodsInfo)
      setFilWorks(defaultWorks) 
    }
    //種類別=allじゃない,作業別=allじゃない
    if(filType!=='all' && eventFilWork!=='all'){
      const res = recodsInfo.filter((v:Record)=> v.typeid === filType && v.work === Number(eventFilWork))
      setFilRecords(res)
    }
    //種類別=all,作業別=allじゃない
    if(filType ==='all' && eventFilWork!=='all'){
      const res = recodsInfo.filter((v:Record)=> v.work === Number(eventFilWork))
      setFilRecords(res)
    }
    //種類別=allじゃない,作業別=all
    if(filType!=='all' && event.target.value==='all'){
      const res = recodsInfo.filter((v:Record)=> v.typeid === filType )
      setFilRecords(res)
    }
  }


  return (
    <>
          <h3 className='font-bold text-lg pb-1'>作業一覧</h3>
          種類別：
          <select onChange={onChangeFiltype}>
            <option value="all" defaultValue={"all"}>ALL</option>
            {filTypes.map((type)=>(
              <option key={type.typeid} value={Number(type.typeid)}>{type.typename}</option>
            ))}
          </select>
          作業別：
          <select id='work' onChange={onChangeWorktype}>
            <option value="all">ALL</option>
            {filWorks.map((work)=>(
              <option key={work.work} value={Number(work.work)}>{work.workname}</option>
            ))}
          </select>
          <table className='table-fixed border-collapse'>
            <thead>
              <tr>
                <th className='p-2 border border-solid border-gray-600'>No</th>
                <th className='p-2 border border-solid border-gray-600'>種類</th>
                <th className='p-2 border border-solid border-gray-600'>作業名</th>
                <th className='p-2 border border-solid border-gray-600'>数</th>
                <th className='p-2 border border-solid border-gray-600'>作業日</th>
                <th className='p-2 border border-solid border-gray-600'>削除</th>
              </tr>
            </thead>
            {filRecords.map((record,index)=>( 
              <tbody key={record.id}>
                <tr>
                    <td className='p-2 border border-solid border-gray-600'>{index+1}</td>
                    {/* <td className='p-2 border border-solid border-gray-600 text-red-500 underline'><Link to={`/work/${record.typeid}`}>{record.typename}</Link></td> */}
                    <td className='p-2 border border-solid border-gray-600'>{record.typename}</td>
                    <td className='p-2 border border-solid border-gray-600'>{record.workname}</td>
                    <td className='p-2 border border-solid border-gray-600'>{record.num===null ? '-':record.num}</td>
                    <td className='p-2 border border-solid border-gray-600'>{record.created_at}</td>
                    <td className='p-2 border border-solid border-gray-600 cursor-pointer' onClick={()=>onClickDeleteRecord(record.id,record.work)} ><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></td>
                </tr>
              </tbody>
            ))}
          </table>
    </>
  )
}
