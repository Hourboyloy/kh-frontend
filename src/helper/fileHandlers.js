export const processImage = (
  file,
  alt,
  setPhotoCover,
  setPhotoProfile,
  setAlertWarning
) => {
  const image = new window.Image();
  image.src = URL.createObjectURL(file);
  image.onload = () => {
    if (alt.includes("photoCover") && image.width >= 360) {
      setPhotoCover(file);
    } else if (alt.includes("photoProfile")) {
      setPhotoProfile(file);
    } else {
      setAlertWarning(true);
    }
  };
};
