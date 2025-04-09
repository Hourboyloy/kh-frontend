import React, { useRef, useEffect } from "react";

function ButtonDeleteTemplate({
  toggleShowDeleteTemplate,
  handleToggleButtonDelete,
  handleDelete,
  question,
}) {
  useEffect(() => {
    if (toggleShowDeleteTemplate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [toggleShowDeleteTemplate]);

  return (
    <div className=" font-sans">
      <div
        className={`fixed inset-0 z-20 bg-[#2d2727] h-screen bg-opacity-60 transition-opacity duration-300 ease-in-out ${
          toggleShowDeleteTemplate
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <section
        className={`fixed left-0 inset-0 z-20 bottom-0 text-lg flex justify-center items-center w-full h-screen transition-all duration-200 ease-in-out ${
          toggleShowDeleteTemplate
            ? "opacity-100 -translate-y-20"
            : "opacity-0 -translate-y-28 pointer-events-none"
        }`}
      >
        <section className="px-4 w-[500px] h-fit">
          <div className="bg-white w-full h-fit rounded-md flex flex-col">
            <h1 className="h-[61px] flex items-center px-5 text-[17.5px]">
              {question}
            </h1>
            <div className="h-[62px] flex items-center justify-end space-x-5 text-[17px] border-t px-5 select-none *:focus:outline-none *:outline-none">
              <button onClick={() => handleToggleButtonDelete(null)}>
                Cancel
              </button>
              <button onClick={handleDelete} className="text-red-600">
                Yes
              </button>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default ButtonDeleteTemplate;
