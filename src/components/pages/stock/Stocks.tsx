import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import useSWR, { Fetcher } from "swr";
import { URL } from "../../../api/url";
import { Stock } from "../../../model/stock-model";
import { asyncStockState, testState } from "../../../store/stockState";

function TestChild() {
  const [test] = useRecoilState<Array<Stock>>(asyncStockState);

  return (
    <div>
      <h4>Test Child</h4>
      <h5>
        current value:{" "}
        {test.map((v) => (
          <p key={v.id}>{v.num}</p>
        ))}
      </h5>
      {/* <button type='button' onClick={() => setTest((currentTest) => currentTest + 1)}>
        increment
      </button> */}
    </div>
  );
}

const Stocks = () => {
  const fetcher: Fetcher<Array<Stock>> = (url: string): Promise<Array<Stock>> =>
    fetch(url).then((res) => res.json());
  const { data: stocks, error, mutate } = useSWR(`${URL}/stock`, fetcher, {});
  return (
    <>
      <h1 className="font-bold text-md my-5 underline decoration-wavy">
        在庫一覧
      </h1>
      <table className="bg-white text-gray-900 border-separate w-full shadow-none">
        <thead>
          <tr>
            <th className="bg-green-700 text-white p-2">No</th>
            <th className="bg-green-700 text-white p-2">在庫名</th>
            <th className="bg-green-700 text-white p-2">在庫数</th>
          </tr>
        </thead>
        {(stocks || []).map((stock, index) => (
          <tbody key={stock.id}>
            <tr>
              <td className="bg-green-100 text-green-900 p-1">{index + 1}</td>
              <td className="bg-green-100 text-green-900 p-1 text-red-500 underline">
                <Link to={`/stock/${stock.id}`} state={{ data: stock }}>
                  {stock.name}
                </Link>
              </td>
              <td className="bg-green-100 text-green-900 p-1">{stock.num}</td>
            </tr>
          </tbody>
        ))}
      </table>
      <hr />
      suspenseのテスト
      <React.Suspense fallback={<div>loaking...</div>}>
        <TestChild />
      </React.Suspense>
    </>
  );
};

export default Stocks;
