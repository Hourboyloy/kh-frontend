import React, { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

function UpdateCategory({
  mainId,
  subId,
  isOpenUpdateCategory,
  handleCloseUpdateCategory,
  token,
  setCategories,
  domain,
  setSubCategories,
  isPending,
  setIsPending,
}) {
  const fileInputRef = useRef(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryKhName, setCategoryKhName] = useState("");
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    setIsPending(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("khName", categoryKhName);
    formData.append("photo", file);
    formData.append("subCategoryId", subId);

    try {
      const res = await axios.put(
        ` ${domain}/${subId ? "sub-category" : "main-category"}/${mainId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        if (subId) {
          setSubCategories(res.data.category.subcategories);
        }
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === mainId ? res.data.category : category
          )
        );
        setIsPending(false);
        handleCloseUpdateCategory();
        setFile(null);
        setCategoryName("");
        setCategoryKhName("");
        fileInputRef.current.value = "";
        setTimeout(() => {
          alert("Category edited successfully");
        }, 100);
      }
    } catch (error) {
      alert("Error adding subcategory");
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className={`h-screen z-40 font-sans fixed transition-all ease-in-out duration-300 bg-black bg-opacity-50 inset-0 flex items-center justify-center
       ${
         isOpenUpdateCategory ? "opacity-100" : "opacity-0 pointer-events-none"
       }`}
    >
      <div
        className={`bg-white rounded-md shadow-lg p-6 relative w-[500px] transition-all duration-300 ease-in-out  ${
          isOpenUpdateCategory ? "scale-100" : "scale-90"
        }`}
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Edit Category
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
              <span className="text-red-600 text-xs"> *English</span>
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
              className="mt-2 w-full p-3 border-2 rounded-md focus:outline-none focus:border-[#FF8900] transition-all outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
              <span className="text-red-600 text-xs"> *Khmer</span>
            </label>
            <input
              type="text"
              value={categoryKhName}
              onChange={(e) => setCategoryKhName(e.target.value)}
              placeholder="Enter category name"
              required
              className="mt-2 w-full p-3 border-2 rounded-md focus:outline-none focus:border-[#FF8900] transition-all outline-none"
            />
          </div>

          {/* Upload Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Photo
            </label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              required
              className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none outline-none focus:border-[#FF8900] transition-all duration-200"
            />
          </div>
          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="relative w-full py-3 bg-[#FF8900] text-white font-semibold rounded-md hover:bg-[#db7601] hover:translate-y-0.5 transition duration-200 flex items-center justify-center"
              disabled={isPending} // Disable button when loading
            >
              {isPending ? (
                <>
                  <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  <span className="ml-2">Submiting...</span>
                </>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>

        <button
          onClick={handleCloseUpdateCategory}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <IoMdClose size={24} />
        </button>
      </div>
    </div>
  );
}

export default UpdateCategory;
