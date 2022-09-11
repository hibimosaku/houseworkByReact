// import React from "react";
// import { rest } from "msw";
import { createAnalysisDailyWork } from "./analysisDailyyWork-model";
import { ApiRecord } from "../record/record.api-service";

//【課題】これはテストじゃないですよね？
describe("analysisDailyWork", () => {
  it("createCheck", async () => {
    const records = await ApiRecord.getAllRecordsData();
    const recordsFil = records.slice(0, 1);
    const result = createAnalysisDailyWork(recordsFil, 2022, 9);
    expect(result).toEqual([
      {
        month: "09",
        sumWorkDailynum: 1,
        work: { id: 8, name: "トイレットP購入", type: 4, typename: "トイレ" },
        workDailynum: [
          1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0,
        ],
        year: "2022",
      },
    ]);
  });
});
