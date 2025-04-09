import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { Pagination, Modal } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";

function ListAd({
  t,
  locale,
  ads,
  currentPage,
  totalPages,
  handlePageChange,
  onEdit,
  handleDelete,
}) {
  const [isShowImg, setShowImg] = useState(false);
  const [isShowUrl, setShowUrl] = useState("");
  const handleShow = (v) => {
    setShowUrl(v);
    if (v) {
      setShowImg(true);
    }
  };
  return (
    <div>
      {/* show img */}
      <Modal
        open={isShowImg}
        footer={null}
        onCancel={() => setShowImg(false)}
        centered
        width={700}
        closeIcon={
          <div className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition cursor-pointer">
            <IoClose className="text-gray-700 text-xl" />
          </div>
        } // Custom close button without a <button> tag
        styles={{
          mask: { backgroundColor: "rgba(0, 0, 0, 0.6)" }, // Overlay background transparency
          content: {
            borderRadius: "6px", // Rounded xs
            padding: "20px",
            textAlign: "center",
            background: "#fff",
            marginTop: "20px", // Add margin top
            marginBottom: "20px", // Add margin bottom
          },
        }}
      >
        <Image
          src={isShowUrl}
          priority
          alt="Ad Preview"
          width={600}
          height={400}
          className="w-full h-auto object-cover object-center rounded-[6px] md:rounded-lg shadow-lg"
        />
      </Modal>

      <div className=" border-t md:border border-gray-300 bg-white md:p-5 md:rounded-lg md:shadow-md min-h-[621.6px] md:max-h-[621.6px]">
        <div
          className={`grid md:grid-cols-5 grid-cols-4 md:gap-6 gap-3 p-4 bg-gray-100 text-sm font-semibold text-gray-700 md:rounded-t-lg ${
            locale == "en" ? "font-sans" : " font-battambang"
          }`}
        >
          <p>#</p>
          <p className="">{t("photo")}</p>
          <div className="hidden md:flex">{t("StartAd")}</div>
          <div className="text-nowrap">{t("endAd")}</div>
          <div className="text-center">{t("action")}</div>
        </div>

        {/* Ad Rows */}
        {ads.length > 0 &&
          ads.map((ad, index) => (
            <div
              key={ad + index}
              className="grid md:grid-cols-5 grid-cols-4 md:gap-6 gap-3 px-4 py-1.5 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 font-sans"
            >
              <div className="md:text-sm text-xs">
                {(currentPage - 1) * 10 + (index + 1)}
              </div>
              <div>
                {ad?.image && (
                  <Image
                    onClick={() => handleShow(ad?.image)}
                    src={ad?.image}
                    priority
                    alt="Ad Image"
                    width={600}
                    height={400}
                    className="object-cover object-center w-[80] h-[40px]"
                  />
                )}
              </div>

              <div className="md:text-sm text-xs hidden md:flex">
                {new Date(ad?.startDate)?.toLocaleDateString()}
              </div>
              <div className="text-sm">
                {new Date(ad?.endDate)?.toLocaleDateString()}
              </div>

              <div className=" flex md:gap-1 items-center justify-center">
                <button
                  onClick={() => onEdit(ad)}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <FaEdit className="md:text-sm text-xs" />
                </button>

                <button
                  onClick={() => handleDelete(ad?._id)}
                  className="px-3 py-2 bg-red-500 text-white rounded ml-2 hover:bg-red-600"
                >
                  <FaTrash className="md:text-sm text-xs" />
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex justify-center md:justify-end mt-3">
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          pageSize={10}
          onChange={handlePageChange}
          showSizeChanger={false} // Hide size changer (if you don't want to change items per page)
          showQuickJumper={false} // Enable quick jump to page feature
          className="pagination"
        />
      </div>
    </div>
  );
}

export default ListAd;
