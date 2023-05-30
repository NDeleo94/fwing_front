import React from "react";

export const Loading = () => {
  return (
    <>
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-grow text-warning" style={{width: "3rem", height: "3rem"}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};
