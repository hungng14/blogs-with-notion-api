import React from "react";
import { BarLoader } from "react-spinners";

function AppLoading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.8)",
        display: "grid",
        placeItems: "center",
        zIndex: 10000,
      }}
    >
      {/* <div className={styles.wrapper_logo_app} style={{ background: `url(${logo.src}) no-repeat center`, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
    </div> */}
      <div
        className="d-flex justify-content-center flex-column absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
        }}
      >
        <h4 className="font-bold text-white text-center">
          LOADING
        </h4>
        <div className=" overflow-hidden">
          <BarLoader className="text-center" color="#fff" width={200} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(AppLoading);
