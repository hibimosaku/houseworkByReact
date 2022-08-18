import React from "react";
import RecordCreate from "../organisms/RecordCreate";
import { Records } from "../organisms/Records";

export default function Top() {
  return (
    <>
      <h1 className="font-bold text-md my-5 underline decoration-wavy">作業</h1>
      <RecordCreate />
      <div className="mb-3"></div>

      {/* <Records recordList={recordList} /> */}
      <Records />
    </>
  );
}
