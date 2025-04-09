import React, { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";

function AddSubCategoryForm({
  categoryId,
  isOpenAddCategory,
  handleOpenAddCategory,
  token,
  setCategories,
  domain,
  setSubCategories,
  isPending,
  setIsPending,
}) {
  const fileInputRef = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
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

    try {
      const res = await axios.post(
        `${domain}/sub-category/${categoryId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 30000,
        }
      );

      if (res.status === 200) {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === categoryId ? res.data.category : category
          )
        );
        setSubCategories(res.data.category.subcategories);
        setCategoryName("");
        setCategoryKhName("");
        setFile(null);
        fileInputRef.current.value = "";
        inputRef1.current.value = "";
        inputRef2.current.value = "";
        handleOpenAddCategory();
        setTimeout(() => {
          alert("Add sub category successfully");
        }, 100);
      } else {
        alert("Error adding subcategory");
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
       ${isOpenAddCategory ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className={`bg-white rounded-md shadow-lg p-6 relative w-[500px] transition-all duration-300 ease-in-out  ${
          isOpenAddCategory ? "scale-100" : "scale-90"
        }`}
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Add New Subcategory
        </h2>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Category Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name{" "}
              <span className="text-red-600 text-xs">*English</span>
            </label>
            <input
              type="text"
              ref={inputRef1}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              required
              className="mt-2 w-full p-3 border-2 rounded-md focus:outline-none focus:border-[#0098D5] transition-all outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category Name
              <span className="text-red-600 text-xs"> *Khmer</span>
            </label>
            <input
              type="text"
              ref={inputRef2}
              value={categoryKhName}
              onChange={(e) => setCategoryKhName(e.target.value)}
              placeholder="Enter category name"
              required
              className="mt-2 w-full p-3 border-2 rounded-md focus:outline-none focus:border-[#0098D5] transition-all outline-none"
            />
          </div>

          {/* Upload Photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Photo
            </label>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
              required
              className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none outline-none focus:border-[#0098D5] transition-all duration-200"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="relative w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 hover:translate-y-0.5 transition duration-200 flex items-center justify-center"
              disabled={isPending} // Disable button when loading
            >
              {isPending ? (
                <>
                  <span className="h-5 w-5 rounded-full border-2 border-blue-200 border-t-transparent animate-spin"></span>
                  <span className="ml-2">Submiting...</span>
                </>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </form>

        <button
          onClick={handleOpenAddCategory}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Close"
        >
          <IoMdClose size={24} />
        </button>
      </div>
    </div>
  );
}

export default AddSubCategoryForm;
