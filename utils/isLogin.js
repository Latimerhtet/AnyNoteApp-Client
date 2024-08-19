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
    return redirect("/");
  }
  return true;
};

export default isTokenAuthenticate;
