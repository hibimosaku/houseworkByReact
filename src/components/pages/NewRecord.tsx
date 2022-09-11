import { useState } from "react";
import TestOpe from "./TestOpe";

export const NewRecord = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <TestOpe show={show} setShow={setShow} />
      <button onClick={() => setShow(!show)}>Click to Enter</button>
    </>
  );
};
