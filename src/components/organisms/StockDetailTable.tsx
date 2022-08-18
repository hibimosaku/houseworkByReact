import { FC } from "react";
import { Link } from "react-router-dom";
import { Record } from "../../model/record-model";

type Props = {
  records: Array<Record>;
};

export const StockDetailTable: FC<Props> = (props) => {
  const { records } = props;

  return (
    <>
      <table className="bg-white text-gray-900 border-separate w-full shadow-none text-sm sm:text-base">
        <thead>
          <tr>
            <th className="bg-green-700 text-white p-2">No</th>
            <th className="bg-green-700 text-white p-2">種類</th>
            <th className="bg-green-700 text-white p-2">作業名</th>
            <th className="bg-green-700 text-white p-2">購入数</th>
            <th className="bg-green-700 text-white p-2">作業日</th>
          </tr>
        </thead>
        {(records || []).map((add, index) => (
          <tbody key={add.id}>
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
              <td
                className={
                  index % 2 === 0
                    ? "bg-green-100 text-green-900 p-1"
                    : "bg-green-200 text-green-900 p-1"
                }
              >
                <Link to={`/work/${add.typeid}`}>{add.typename}</Link>
              </td>
              <td
                className={
                  index % 2 === 0
                    ? "bg-green-100 text-green-900 p-1"
                    : "bg-green-200 text-green-900 p-1"
                }
              >
                {add.workname}
              </td>
              <td
                className={
                  index % 2 === 0
                    ? "bg-green-100 text-green-900 p-1"
                    : "bg-green-200 text-green-900 p-1"
                }
              >
                {add.num}
              </td>
              <td
                className={
                  index % 2 === 0
                    ? "bg-green-100 text-green-900 p-1"
                    : "bg-green-200 text-green-900 p-1"
                }
              >
                {add.created_at}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  );
};
