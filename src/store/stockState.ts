import {atom} from 'recoil'
import { Stock } from '../model/stock-model'

export const stockState = atom<Array<Stock>>({
  key:'stockState',
  default:[{
    id:null,
    name:"",
    num:0,
    add_work:null,
    add_workname:"",
    decrease_work:null,
    decrease_workname:"",
    updated_at:""
  }]
  // default:[]
})