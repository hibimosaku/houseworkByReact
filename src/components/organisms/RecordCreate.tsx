import { useRecordCreate } from "../../hooks/useRecordCreate";
import { Stock } from "../../model/stock/stock-model";
import { WorkType } from "../../model/worktype/workType-model";
import Button from "../atoms/Button";

export default function RecordCreate() {
  const {
    stock,
    stockNum,
    worktypes,
    workid,
    isAddwork,
    isDecreasework,
    onChangeWork,
    onChangeStock,
    onClickCreateRecord,
    onClickCreateRecordAddStock,
    onClickCreateRecordDecreaseStock,
    workTypeid,
    onChangeWorkType,
    filWorks,
  } = useRecordCreate();
  return (
    <>
      <h3 className="text-md my-1 underline decoration-dash">作業実施登録</h3>
      <label className="my-1 text-sm sm:text-base">種類：</label>
      <select
        value={Number(workTypeid)}
        onChange={onChangeWorkType}
        className="text-sm sm:text-base"
      >
        <option value="0" defaultValue={0} className="text-sm sm:text-base">
          ALL
        </option>
        {/* <option value="all" defaultValue={"all"}>
          ALL
        </option> */}
        {(worktypes || []).map((worktype: WorkType) => (
          <option
            key={worktype.id}
            value={Number(worktype.id)}
            className="text-sm sm:text-base"
          >
            {worktype.name}
          </option>
        ))}
      </select>
      <br />

      <label className="my-1 text-sm sm:text-base">作業名：</label>
      <select
        value={Number(workid)}
        onChange={onChangeWork}
        className="text-sm sm:text-base"
      >
        <option value="0" className="text-sm sm:text-base">
          選択してください
        </option>
        {filWorks.map((work) => (
          <option
            key={work.id}
            value={Number(work.id)}
            className="text-sm sm:text-base"
          >
            {work.name}
          </option>
        ))}
      </select>
      {workid !== 0 && isAddwork && (
        <div className="block">
          <label className="my-1">数：</label>
          <select value={stockNum} onChange={onChangeStock}>
            <option className="text-sm sm:text-base">1</option>
            <option className="text-sm sm:text-base">2</option>
            <option className="text-sm sm:text-base">3</option>
            <option className="text-sm sm:text-base">4</option>
            <option className="text-sm sm:text-base">5</option>
          </select>
          <Button children="登録" onClick={onClickCreateRecordAddStock} />
        </div>
      )}
      {/* 【課題】stock.numを解消できず */}
      {workid !== 0 && isDecreasework && (
        <>
          {checkEmpty(stock) ? (
            <>
              <p>現在在庫数：{stock.num}</p>
              <Button
                children="登録"
                onClick={onClickCreateRecordDecreaseStock}
              />
            </>
          ) : (
            <p>在庫なしのため登録不可</p>
          )}
        </>
      )}
      {workid !== 0 && !isAddwork && !isDecreasework && (
        <Button children="登録" onClick={onClickCreateRecord} />
      )}
    </>
  );
}

//型述語。【勉強】typescript && && は無理。順番が無理
function checkEmpty(stock: any): stock is Stock {
  if (stock.num && stock.num > 0) {
    return true;
  } else {
    return false;
  }
}
