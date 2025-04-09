export const handleLogout = (
  setAccount,
  setProfile,
  setToken,
  handleCloseLogout,
  gotoHomePage
) => {
  localStorage.removeItem("account");
  localStorage.removeItem("profile");
  localStorage.removeItem("access_token");
  setAccount(null);
  setProfile(null);
  setToken(null);
  handleCloseLogout();
  gotoHomePage();
};
