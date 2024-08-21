import { redirect } from "react-router-dom";

const isTokenAuthenticate = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    return redirect("/");
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/status`, {
    headers: { Authorization: `Bearer ${token.token}` },
  });
  if (response.status === 401) {
    localStorage.setItem("token", null);
    window.location.reload(false);
    return redirect("/");
  }
  return true;
};
export const isTokenAuthorized = async (userId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log("token", token.id);
  console.log("userId", userId);

  if (!token) {
    return redirect("/");
  }
  if (token.id !== userId) {
    return redirect("/");
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}/status`, {
    headers: { Authorization: `Bearer ${token.token}` },
  });
  if (response.status === 401) {
    localStorage.setItem("token", null);
    window.location.reload(false);
    return redirect("/");
  }
  return true;
};

export default isTokenAuthenticate;
