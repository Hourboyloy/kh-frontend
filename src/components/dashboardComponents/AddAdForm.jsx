import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const formatDate = (isoString) => {
  return isoString ? isoString.split("T")[0] : "";
};

const AddAdForm = ({
  showForm,
  setShowForm,
  token,
  domain,
  setCurrentPage,
  setAds,
  ad = null,
  isUpdate = false,
  setAdToEdit,
}) => {
  const formRef = useRef(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showForm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      // Reset form when modal closes
      resetForm();
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showForm]);

  useEffect(() => {
    if (isUpdate && ad) {
      setStartDate(formatDate(ad.startDate));
      setEndDate(formatDate(ad.endDate));
      setPreview(ad?.image);
    }
  }, [isUpdate, ad]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = document.createElement("img");
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width / height >= 3) {
          setImage(file);
          setPreview(URL.createObjectURL(file));
        } else {
          alert(
            "Please upload an image with a width greater than 3 times the height."
          );
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const resetForm = () => {
    setImage(null);
    setPreview(null);
    setStartDate("");
    setEndDate("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image && !preview) {
      alert("Please upload an image!");
      return;
    }
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const formData = new FormData();
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      const url = isUpdate
        ? `${domain}/update-ad/${ad?._id}`
        : `${domain}/create-ad`;
      const method = isUpdate ? "put" : "post";
      const res = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        if (!isUpdate) {
          setCurrentPage(1);
        }
        setShowForm(false);

        setAds((prev) => {
          const updatedAds = isUpdate
            ? prev.map((a) => (a._id === ad._id ? res.data : a))
            : [res.data, ...prev];

          return updatedAds.slice(0, 10);
        });

        setTimeout(() => {
          alert(
            isUpdate ? "Ad updated successfully!" : "Ad created successfully!"
          );
        }, 200);

        // Reset form
        resetForm();
      }
    } catch (error) {
      console.error("Error creating or updating ad:", error);
      alert("Failed to create or update ad.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
        if (isUpdate) {
          setAdToEdit(null);
        }
      }
    };
    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm, isUpdate, setAdToEdit, setShowForm]);

  return (
    <div
      className={`p-4 fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-all duration-300 ${
        showForm ? "opacity-100 visible" : "opacity-0 invisible absolute"
      }`}
    >
      <div
        ref={formRef}
        className={`bg-white shadow-lg rounded-md p-6 w-full max-w-md transform transition-all duration-300 ${
          showForm ? "scale-100" : "scale-90"
        }`}
      >
        <button
          onClick={() => setShowForm(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <IoMdClose className="text-2xl" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {isUpdate ? "Update Advertisement" : "Create Advertisement"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block space-y-1">
            <span className="text-gray-700 font-semibold">Upload Image</span>
            <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center space-y-2">
                {preview ? (
                  <Image
                    src={preview}
                    alt="Preview"
                    width={800}
                    height={600}
                    className="w-full h-32 object-cover rounded-md shadow-md"
                  />
                ) : (
                  <>
                    <FaCloudUploadAlt className="text-4xl text-gray-400" />
                    <span className="text-gray-500">Click to upload</span>
                  </>
                )}
              </div>
            </div>
          </label>

          <label className="block space-y-1">
            <span className="text-gray-700 font-semibold">Start Date</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-gray-700 font-semibold">End Date</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </label>

          <button
            type="submit"
            className="relative w-full py-3 bg-[#FF8900] text-white font-semibold rounded-md hover:bg-[#db7601] hover:translate-y-0.5 transition duration-200 flex items-center justify-center"
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <>
                <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                <span className="ml-2">Submiting...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdForm;
