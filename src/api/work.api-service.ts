import { Work } from "../model/work-model";
import { URL } from "./url";

async function getAllWorksData(): Promise<Array<Work>> {
  const result =
    // await fetch("http://127.0.0.1:8000/api/list-work",{
    await fetch(`${URL}/list-work`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  const works = await result.json();
  return works;
}

async function getWorkDetail(id: number): Promise<Work> {
  const result = await fetch(`${URL}/detail-work/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const works = await result.json();
  return works;
}

export const ApiWork = {
  getAllWorksData,
  getWorkDetail,
};
