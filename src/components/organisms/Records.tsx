import React, { Suspense } from "react";
import { useModal } from "../../hooks/useModal";
import { useRecord } from "../../hooks/useRecord";
import { Transition } from "react-transition-group";

export const Records = () => {
  const WorkDetail = React.lazy(() => import("./ModalWorkDetail"));
  const {
    isWork,
    isModalWork,
    onClickWorkOpenClose,
    modalPropState,
    transitionStyles,
  } = useModal();
  const {
    filTypes,
    filWorks,
    filRecords,
    onClickDeleteRecord,
    onChangeFiltype,
    onChangeWorktype,
  } = useRecord();
  return (
    <>
      <div className="relative">
        <h3 className="text-md my-1 underline decoration-dash">作業一覧</h3>
        <label className="text-sm sm:text-base">種類別：</label>
        <select onChange={onChangeFiltype} className="text-sm sm:text-base">
          <option value="all" defaultValue={"all"}>
            ALL
          </option>
          {filTypes.map((type) => (
            <option key={type.typeid} value={Number(type.typeid)}>
              {type.typename}
            </option>
          ))}
        </select>
        <label className="text-sm sm:text-base">作業別：</label>
        <select
          id="work"
          onChange={onChangeWorktype}
          className="text-sm sm:text-base"
        >
          <option value="all">ALL</option>
          {filWorks.map((work) => (
            <option key={work.work} value={Number(work.work)}>
              {work.workname}
            </option>
          ))}
        </select>
        <div
          className="overflow-y-scroll"
          style={{ height: window.innerHeight - 265 + "px" }}
        >
          <table className="bg-white text-gray-900 border-separate w-full shadow-none text-sm sm:text-base">
            <thead className="sticky top-0">
              <tr>
                <th className="bg-green-700 text-white p-2 sticky top-0">No</th>
                <th className="bg-green-700 text-white p-2 sticky top-0">
                  種類
                </th>
                <th className="bg-green-700 text-white p-2 sticky top-0">
                  作業名
                </th>
                <th className="bg-green-700 text-white p-2 sticky top-0">数</th>
                <th className="bg-green-700 text-white p-2 sticky top-0">
                  作業日
                </th>
                <th className="bg-green-700 text-white p-2 sticky top-0">
                  削除
                </th>
              </tr>
            </thead>
            {filRecords.map((record, index) => (
              <tbody key={record.id}>
                <tr>
                  <td
                    className={
                      index % 2 === 0
                        ? "bg-green-100 text-green-900 p-1"
                        : "bg-green-200 text-green-900 p-1"
                    }
                  >
                    {index + 1}
                  </td>
                  {/* <td className="bg-green-100 text-green-900 p-1 text-red-500 underline">
                <Link to={`/work/${record.typeid}`}>{record.typename}</Link>
              </td> */}
                  <td
                    className={
                      index % 2 === 0
                        ? "bg-green-100 text-green-900 p-1"
                        : "bg-green-200 text-green-900 p-1"
                    }
                  >
                    {record.typename}
                  </td>
                  <td
                    className={
                      index % 2 === 0
                        ? "bg-green-100 text-green-900 p-1 cursor-pointer underline"
                        : "bg-green-200 text-green-900 p-1 cursor-pointer underline"
                    }
                    onClick={() => onClickWorkOpenClose(record.work)}
                  >
                    {record.workname}
                  </td>
                  <td
                    className={
                      index % 2 === 0
                        ? "bg-green-100 text-green-900 p-1"
                        : "bg-green-200 text-green-900 p-1"
                    }
                  >
                    {record.num === null ? "-" : record.num}
                  </td>
                  <td
                    className={
                      index % 2 === 0
                        ? "bg-green-100 text-green-900"
                        : "bg-green-200 text-green-900"
                    }
                  >
                    {record.created_at}
                  </td>
                  <td
                    className={
                      index % 2 === 0
                        ? "bg-green-100 text-green-900 p-1 cursor-pointer"
                        : "bg-green-200 text-green-900 p-1 cursor-pointer"
                    }
                    onClick={() => onClickDeleteRecord(record.id, record.work)}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        {/* 【課題】animation方法。本当は、WorkDetailにいれたかった */}
        <Transition in={modalPropState as boolean} timeout={1500}>
          {(state) => (
            <div style={transitionStyles[state]}>
              <Suspense fallback={<p>Loading...</p>}>
                {isModalWork && <WorkDetail id={isWork} />}
              </Suspense>
            </div>
          )}
        </Transition>
      </div>
    </>
  );
};
