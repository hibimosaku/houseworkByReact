import { useRecoilValue } from "recoil"
import { recordState } from "../../../store/recordState"
import { Record } from "../../../model/record-model"

export const Analysis= ()=>{
  const setStockInfo = useRecoilValue<Array<Record>>(recordState)
  console.log(setStockInfo)
  return(
    <>
      <p>工事中</p>
      {/* <p>月別集計</p> */}
    </>
  )
}