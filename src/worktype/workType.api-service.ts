import { Work } from "../work/work-model";
import { URL } from "../api/url";

async function getAllWorkTypesData(): Promise<Array<Work>> {
  const result = await fetch(`${URL}/list-worktype`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const workTypes = await result.json();
  return workTypes;
}

export const ApiWorkType = {
  getAllWorkTypesData,
};
