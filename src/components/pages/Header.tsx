import React from "react";
import { Link } from "react-router-dom";
import { RecordState } from "../../model/record/recordState";
import { StockState } from "../../model/stock/stockState";
import { WorkState } from "../../model/work/workState";
import { WorkTypeState } from "../../model/worktype/workTypeState";
// const ProfilePage = React.lazy(() => import('./ProfilePage'));

export default function Header() {
  const { initStock } = StockState.useInitStocks();
  const { initRecord } = RecordState.useInitRecords();
  const { initWork } = WorkState.useInitWorks();
  const { initWorkType } = WorkTypeState.useInitWorkTypes();
  initStock();
  initRecord();
  initWork();
  initWorkType();
  return (
    <div className="sticky top-0 z-50">
      <header className="block bg-green-700 py-3 mb-2">
        <div className="container flex flex-row justify-between px-1 text-white mx-auto  max-w-5xl">
          <h3 className="p-1">
            <Link to={"/"}>作業アプリ</Link>
          </h3>
          <nav>
            <ul className="flex flex-row container text-sm sm:text-base">
              <li className="p-1 relative">
                <Link
                  to={"/"}
                  className="after:transition after:duration-400 after:ease-in after:opacity-0 hover:after:opacity-100 after:absolute after:border-dotted after:inline-block after:border-b after:border-white after:w-1/3 after:-bottom-1 after:left-1/3 after:content-['']"
                >
                  home
                </Link>
              </li>
              <li className="p-1 relative">
                <Link
                  to={"/analysis"}
                  className="after:transition after:duration-400 after:ease-in after:opacity-0 hover:after:opacity-100 after:absolute after:border-dotted after:inline-block after:border-b after:border-white after:w-1/3 after:-bottom-1 after:left-1/3 after:content-['']"
                >
                  分析
                </Link>
              </li>
              <li className="p-1 relative">
                <Link
                  to={"/reminders"}
                  className="after:transition after:duration-400 after:ease-in after:opacity-0 hover:after:opacity-100 after:absolute after:border-dotted after:inline-block after:border-b after:border-white after:w-1/3 after:-bottom-1 after:left-1/3 after:content-['']"
                >
                  リマインダー
                </Link>
              </li>
              <li className="p-1 relative">
                <Link
                  to={"/stocks"}
                  className="after:transition after:duration-400 after:ease-in after:opacity-0 hover:after:opacity-100 after:absolute after:border-dotted after:inline-block after:border-b after:border-white after:w-1/3 after:-bottom-1 after:left-1/3 after:content-['']"
                >
                  在庫
                </Link>
              </li>
              <li className="p-1 relative">
                <Link
                  to={"/test"}
                  className="after:transition after:duration-400 after:ease-in after:opacity-0 hover:after:opacity-100 after:absolute after:border-dotted after:inline-block after:border-b after:border-white after:w-1/3 after:-bottom-1 after:left-1/3 after:content-['']"
                >
                  新規作成
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
