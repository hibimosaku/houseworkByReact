import React from "react";
import { CSSTransition } from "react-transition-group";

import "./styles.css";

function TestOpe(props: any) {
  const { show, setShow } = props;
  const closeModal = () => {
    setShow(!show);
  };
  const overlay: any = {
    zIndex: 2,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  };
  const overlayA: any = {
    zIndex: 3,
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <CSSTransition
        classNames="modal-all"
        in={show}
        timeout={700}
        unmountOnExit
      >
        <div style={overlay}></div>
      </CSSTransition>

      <CSSTransition classNames="modal" in={show} timeout={700} unmountOnExit>
        <div style={overlayA} className="fixed" onClick={closeModal}>
          <div
            className="z-2 p-4 w-2/4 bg-white"
            // onClick={(e) => e.stopPropagation()}
          >
            <p>これがモーダルウィンドウです。</p>
            <p>
              <button onClick={() => setShow(false)}>close</button>
            </p>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}
export default TestOpe;
