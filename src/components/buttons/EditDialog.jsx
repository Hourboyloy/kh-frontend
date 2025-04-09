"use client";
import React, { useEffect, useCallback, useRef } from "react";
import Link from "next/link";

function EditDialog({
  toggleEdit,
  setToggleEdit,
  id,
  setToggleShow,
  setId,
  asDefault,
  handleToggleButtonDelete,
  t,
}) {
  const editRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setToggleEdit(false);
      }
    },
    [setToggleEdit]
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        setToggleEdit(false);
        setToggleShow(null);
        setId(null);
      }
    };

    if (toggleEdit) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleEdit, setToggleEdit, editRef, setId, setToggleShow]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    if (toggleEdit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [toggleEdit, handleKeyDown]);

  return (
    <div className="font-battambang">
      <div
        className={`fixed inset-0 mt-2 z-30 w-fit h-fit mx-auto bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          alert ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`fixed inset-0 z-20 bg-[#2d2727] h-screen bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          toggleEdit ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <section
        className={`fixed left-0 lg:inset-0 z-20 text-lg flex justify-center w-full lg:h-screen transition-all duration-200 ease-in-out ${
          toggleEdit
            ? "opacity-100 bottom-0 lg:translate-y-[120px]"
            : "opacity-0 -bottom-4 lg:bottom-0 lg:translate-y-[60px] pointer-events-none"
        }`}
      >
        <section
          ref={editRef}
          className="px-4 pb-4 lg:px-0 lg:pb-0 w-full lg:w-[500px] h-fit z-20 space-y-4"
        >
          <div className="w-full rounded-xl overflow-hidden *:px-5">
            <Link
              href={`/billing-addresses/edit?id=${id}`}
              className="bg-white w-full h-[59.05px] select-none outline-none focus:outline-none flex items-center justify-center"
            >
              <span className="text-[#169ADD]">{t("editBtn")}</span>
            </Link>
            {!asDefault && (
              <button
                onClick={handleToggleButtonDelete}
                className="bg-white w-full h-[59.05px] select-none outline-none focus:outline-none flex items-center justify-center border-t"
              >
                <span className="text-red-600">{t("deleteBtn")}</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setToggleEdit(false);
                setToggleShow(null);
                setId(null);
              }}
              className="w-full h-[58px] font-medium select-none outline-none focus:outline-none text-gray-800 bg-white hover:bg-[#f5f5f5] transition-all ease-in-out flex justify-center items-center rounded-xl border"
            >
              {t("cancelBtn")}
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default EditDialog;
