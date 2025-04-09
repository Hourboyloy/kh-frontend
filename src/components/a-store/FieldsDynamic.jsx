import React, { useState } from "react";

function FieldsDynamic() {
  const [discount, setDiscount] = useState("");
  const [discountBy, setDiscountBy] = useState("%");
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [price, setPrice] = useState(""); // Default empty string for price
  const [salePrice, setSalePrice] = useState(""); // Default empty string for price
  const [description, setDescription] = useState("");

  // Handle discount value
  const handleDiscount = (val) => {
    const filteredValue = val.replace(/[^0-9.]/g, "");
    const isValidDecimal = /^(\d+(\.\d*)?)?$/.test(filteredValue);

    if (isValidDecimal) {
      setDiscount(filteredValue);
    }
  };

  const handleClickDiscount = (val) => {
    setDiscountBy(val);
  };

  // Free Delivery toggle
  const handleFreeDelivery = () => {
    setFreeDelivery(!freeDelivery);
  };

  // Handle price input, ensuring only valid characters remain, including backspace
  const handleSetPrice = (val) => {
    // Remove any invalid characters (anything that's not a number or dot)
    const validValue = val.replace(/[^0-9.]/g, "");

    // Update the displayed value immediately
    setPrice(validValue);
  };
  const handleSetSalePrice = (val) => {
    // Remove any invalid characters (anything that's not a number or dot)
    const validValue = val.replace(/[^0-9.]/g, "");

    // Update the displayed value immediately
    setSalePrice(validValue);
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };
  return (
    <div>
      <div className="max-w-[820px] mx-auto lg:pt-[14px] pb-[14px] bg-white lg:border lg:shadow rounded px-[20px] space-y-[17.5px]">
        <div className="space-y-[4px]">
          <label className="text-[15px]">Discount</label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              name="discount"
              placeholder=""
              value={discount} // Controlled input
              onChange={(e) => handleDiscount(e.target.value)}
              className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
            />
            <div className="w-[84px] h-[38px] flex items-center p-0.5 bg-gray-200 rounded-md">
              <button
                onClick={() => handleClickDiscount("%")}
                className={`w-full h-full rounded-md ${
                  discountBy === "%" ? "bg-white" : ""
                }`}
              >
                %
              </button>
              <button
                onClick={() => handleClickDiscount("$")}
                className={`w-full h-full rounded-md ${
                  discountBy === "$" ? "bg-white" : ""
                }`}
              >
                $
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-[4px] select-none">
          <label className="text-[15px]">Free Delivery</label>
          <div
            onClick={handleFreeDelivery}
            className="border rounded-md h-[40.1px] flex items-center px-3 space-x-2"
          >
            <div
              className={`flex items-center p-0.5 rounded-full w-[35px] h-[20px] border focus:border-blue-300 focus:ring-4 transition-all duration-50 ${
                freeDelivery ? "bg-[#028DCF]" : "bg-white"
              }`}
            >
              <button
                className={`w-[14.5px] h-[14.5px] rounded-full cursor-text transition-all ${
                  freeDelivery
                    ? "bg-white translate-x-[14.1px]"
                    : "bg-gray-400 translate-x-0"
                }`}
                onClick={handleFreeDelivery}
              ></button>
            </div>
            <p className="text-gray-800">{freeDelivery ? "Yes" : "No"}</p>
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">
            Price <span className="text-red-600">*</span>
          </label>
          <div className="">
            <input
              type="text"
              value={price} // Display the filtered price
              name="price"
              placeholder="$"
              className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
              onChange={(e) => handleSetPrice(e.target.value)} // Ensures backspace works
            />
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">
            Sale Price <span className="text-red-600">*</span>
          </label>
          <div className="">
            <input
              type="text"
              value={price} // Display the filtered price
              name="salePrice"
              placeholder="$"
              className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
              onChange={(e) => handleSetSalePrice(e.target.value)} // Ensures backspace works
            />
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">
            Price <span className="text-red-600">*</span>
          </label>
          <div className="">
            <input
              type="text"
              value={price} // Display the filtered price
              name="price"
              placeholder="$"
              className="w-full text-gray-800 px-3 focus:border-blue-300 focus:ring-4 focus:ring-[#C9DFFF] py-[6.2px] border rounded-md outline-none focus:outline-none"
              onChange={(e) => handleSetPrice(e.target.value)} // Ensures backspace works
            />
          </div>
        </div>

        <div className="space-y-[4px]">
          <label className="text-[15px]">
            Description <span className="text-red-600">*</span>
          </label>
          <div className="">
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              className="w-full h-[150px] text-gray-800 px-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 py-2 border rounded-md outline-none"
              placeholder="Write your description here..."
            ></textarea>
          </div>
        </div>
      </div>
      
      <div
        className="w-full min-h-[100px] p-3 bg-gray-100 border rounded-md text-gray-800"
        style={{ whiteSpace: "pre-wrap" }} // To preserve line breaks
      >
        {description}
      </div>
    </div>
  );
}

export default FieldsDynamic;
