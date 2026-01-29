import API from "./api";

export const adminLogin = async (credentials) => {
  const { data } = await API.post("/admin/login", credentials);
  return data;
};
