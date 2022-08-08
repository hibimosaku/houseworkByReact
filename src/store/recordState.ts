import {atom} from 'recoil'
import { Record } from '../model/record-model'

export const recordState = atom<Array<Record>>({
  key:'recordState',
  default:[{
    id:null,
    work:null,
    workname:"",
    typeid:null,
    typename:"",
    num:null,
    created_at:""
    }]
})

//selector
// const testSelector = selector({
//   key:'testSelector',
//   get({get}){
//     return get(recordState)
//   }
// })

// export const useRecordState = ()=>{
//   return{
//     recordsState:useRecoilValue(recordState),
//     testSelector:useRecoilValue(testSelector)
//   }
// }


