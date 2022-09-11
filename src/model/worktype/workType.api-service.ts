import { URL } from "../../api/url";
import { WorkType } from "./workType-model";

async function getAllWorkTypesData(): Promise<Array<WorkType>> {
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
