import { useRecordCreate } from "../../hooks/useRecordCreate";
import Button from "../atoms/Button";

export default function RecordCreate() {
  const {
    stock,
    stockNum,
    works,
    workid,
    isAddwork,
    isDecreasework,
    onChangeWork,
    onChangeStock,
    onClickCreateRecord,
    onClickCreateRecordAddStock,
    onClickCreateRecordDecreaseStock,
  } = useRecordCreate();

  return (
    <>
      <h3 className="text-md my-1 underline decoration-dash">作業実施登録</h3>
      <label className="my-1">作業名：</label>
      <select value={Number(workid)} onChange={onChangeWork}>
        <option value="0">選択してください</option>
        {(works || []).map((work) => (
          <option key={work.id} value={Number(work.id)}>
            {work.name}
          </option>
        ))}
      </select>
      {workid !== 0 && isAddwork && (
        <div className="block">
          <label className="my-1">数：</label>
          <select value={stockNum} onChange={onChangeStock}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <Button children="登録" onClick={onClickCreateRecordAddStock} />
        </div>
      )}
      {/* 【課題】stock.numを解消できず */}
      {workid !== 0 && isDecreasework && (
        <>
          {/* {stock.num  > 0 ? (
            <>
              <p>現在在庫数：{stock.num}</p>
              <Button
                children="登録"
                onClick={onClickCreateRecordDecreaseStock}
              />
            </>
          ) : (
            <p>在庫なしのため登録不可</p>
          )} */}
        </>
      )}
      {workid !== 0 && !isAddwork && !isDecreasework && (
        <Button children="登録" onClick={onClickCreateRecord} />
      )}
    </>
  );
}
