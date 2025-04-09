"use client";
import React, { useEffect } from "react";
import "../css/Loading.css";

function Loading({ isPending }) {
  useEffect(() => {
    if (isPending) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPending]);
  return (
    <div className="fixed h-screen w-full z-50 flex justify-center items-center top-0 left-0  inset-0 bg-[#0f0d0d] bg-opacity-50">
      <button className="w-[3.3rem] h-[3.3rem] rounded-lg bg-white flex items-center justify-center shadow -translate-y-10">
        <div className="spinner">
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
          <div className="spinner-blade"></div>
        </div>
      </button>
    </div>
  );
}

export default Loading;
