import React from "react";

function DeleteCategoryAlert({ isOpen, handleClose, handleDelete, isPending }) {
  return (
    <div
      className={`h-screen z-40 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-md shadow-lg p-6 w-[400px] transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-90"
        }`}
      >
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
          Confirm Delete
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Are you sure you want to delete this category? This action cannot be
          undone.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleClose}
            className="py-2 px-10 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 transition duration-200"
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="py-2 px-10 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition duration-200 flex items-center justify-center"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></span>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCategoryAlert;
