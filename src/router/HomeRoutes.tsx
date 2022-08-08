import RecordCreate from "../components/organisms/RecordCreate";
import RecordDetail from "../components/organisms/RecordDetail";
import { Analysis } from "../components/pages/analysis/Analysis";
import WorkDetail from "../components/pages/record/WorkDetail";
import { Reminders } from "../components/pages/reminder/Reminders";
import StockDetail from "../components/pages/stock/StockDetail";
import Stocks from "../components/pages/stock/Stocks";
import Top from "../components/pages/Top";
import Test from '../test'


type HomeRoutes ={
  path:string,
  children:any
}


export const homeRoutes:Array<HomeRoutes> = [
  {
    path:"/",
    children:<Top />
  },
  {
    path:"/test",
    children:<Test />
  },
  {
    path:"/record/:id",
    children:<RecordDetail />
  },
  {
    path:"/work/:id",
    children:<WorkDetail />
  },
  {
    path:"/recordCreate/",
    children:<RecordCreate />
  },
  {
    path:"/stocks/",
    children:<Stocks />
  },
  {
    path:"/stock/:id",
    children:<StockDetail />
  },
  {
    path:"/analysis",
    children:<Analysis />
  },
  {
    path:"/reminders",
    children:<Reminders />
  },
  



]