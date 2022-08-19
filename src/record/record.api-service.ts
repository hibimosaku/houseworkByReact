import { Record } from "./record-model";
import { Work } from "../work/work-model";
import { URL } from "../api/url";

async function getAllRecordsData(): Promise<Array<Record>> {
  const result = await fetch(`${URL}/record`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const records = await result.json();
  return records;
}
async function creatRecord(workFil: Work["id"], num?: number): Promise<void> {
  const data = {
    work: workFil,
    num: num,
  };
  fetch(`${URL}/record/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  //reactniはサスペンス機能あり
  //再描画、
  // .then((res)=>{
  //   console.log('成功',res)
  // })
  // .catch((err)=>{
  //   console.log('失敗',err)
  // })
}

async function deleteRecord(id: number): Promise<void> {
  await fetch(`${URL}/record/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  // .then((res)=>{
  //   console.log('成功',res)
  // })
  // .catch((err)=>{
  //   console.log('失敗',err)
  // })
}

async function getRecordDetail(id: string): Promise<Record> {
  const result = await fetch(`${URL}/record/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const record = await result.json();
  console.log(record);
  return record;
}

export const ApiRecord = {
  getAllRecordsData,
  creatRecord,
  deleteRecord,
  getRecordDetail,
};
