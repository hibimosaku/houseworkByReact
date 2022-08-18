import React from "react";
import { Link } from "react-router-dom";
import { RecordState } from "../../store/recordState";
import { StockState } from "../../store/stockState";
// const ProfilePage = React.lazy(() => import('./ProfilePage'));

export default function Header() {
  const { initStock } = StockState.useInitStocks();
  const { initRecord } = RecordState.useInitRecords();
  initStock();
  initRecord();
  return (
    <div className="sticky top-0 z-50">
      <header className="block bg-green-700 py-3 mb-2">
        <div className="container flex flex-row justify-between px-1 text-white mx-auto  max-w-5xl">
          <h3 className="p-1">
            <Link to={"/"}>作業アプリ</Link>
          </h3>
          <nav>
            <ul className="flex flex-row container text-sm sm:text-base">
              <li className="p-1">
                <Link to={"/"}>home</Link>
              </li>
              <li className="p-1">
                <Link to={"/analysis"}>分析</Link>
              </li>
              <li className="p-1">
                <Link to={"/reminders"}>リマインダー</Link>
              </li>
              <li className="p-1">
                <Link to={"/stocks"}>在庫</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
