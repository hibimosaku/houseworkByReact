import RecordCreate from "../components/organisms/RecordCreate";
import { Analysis } from "../components/pages/analysis/Analysis";
import { Reminders } from "../components/pages/reminder/Reminders";
import StockDetail from "../components/pages/stock/StockDetail";
import Stocks from "../components/pages/stock/Stocks";
import Top from "../components/pages/Top";

type HomeRoutes = {
  path: string;
  children: any;
};
export const homeRoutes: Array<HomeRoutes> = [
  {
    path: "/",
    children: <Top />,
  },
  {
    path: "/recordCreate/",
    children: <RecordCreate />,
  },
  {
    path: "/stocks/",
    children: <Stocks />,
  },
  {
    path: "/stock/:id",
    children: <StockDetail />,
  },
  {
    path: "/analysis",
    children: <Analysis />,
  },
  {
    path: "/reminders",
    children: <Reminders />,
  },
];
