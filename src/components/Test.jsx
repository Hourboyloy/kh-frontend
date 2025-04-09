import React, { useEffect, useState } from "react";

function Test({ products }) {
  const [loadingImages, setLoadingImages] = useState({});

  const checkImage = (url, id) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setLoadingImages((prev) => ({ ...prev, [id]: "loaded" }));
    };
    img.onerror = () => {
      setLoadingImages((prev) => ({ ...prev, [id]: "error" }));
    };
  };

  useEffect(() => {
    products.forEach((pro) => {
      const photoUrl = pro?.photos?.[0];
      if (photoUrl && !loadingImages[pro._id]) {
        setLoadingImages((prev) => ({ ...prev, [pro._id]: "loading" }));
        checkImage(photoUrl, pro._id);
      }
    });
  }, [products]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((pro) => {
        const imageStatus = loadingImages[pro._id];
        const photoUrl = pro?.photos?.[0];

        return (
          <div
            key={pro._id}
            className="border rounded-xl shadow p-3 bg-white space-y-2 transition hover:shadow-md"
          >
            {/* Image */}
            <div className="w-full h-[150px] rounded overflow-hidden bg-gray-100 flex justify-center items-center">
              {imageStatus === "loading" && (
                <div className="animate-pulse w-full h-full bg-gray-200" />
              )}

              {imageStatus === "loaded" && (
                <img
                  src={photoUrl}
                  alt=""
                  className="w-full h-full object-cover object-center"
                />
              )}

              {imageStatus === "error" && (
                <div className="text-sm text-gray-400">Image not available</div>
              )}
            </div>

            {/* Title */}
            <h3 className="text-[16px] font-semibold leading-snug">
              {pro.title}
            </h3>
          </div>
        );
      })}
    </div>
  );
}

export default Test;
