import { NewRecord } from "../components/pages/NewRecord";
import RecordCreate from "../components/organisms/RecordCreate";
import { Analysis } from "../components/pages/analysis/Analysis";
import { Page404 } from "../components/pages/Page404";
import { Reminders } from "../components/pages/reminder/Reminders";
import StockDetail from "../components/pages/stock/StockDetail";
import Stocks from "../components/pages/stock/Stocks";
import Top from "../components/pages/Top";
import { ReactNode } from "react";

type HomeRoutes = {
  path: string;
  children: ReactNode;
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
  {
    path: "*",
    children: <Page404 />,
  },
  {
    path: "/test",
    children: <NewRecord />,
  },
];
