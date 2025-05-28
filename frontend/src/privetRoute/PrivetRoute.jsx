import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";
import { Outlet } from "react-router-dom";
import LoginPage from "../pages/Login";

export default function PrivetRoute() {
  const [ok, setoK] = useState(false);
  const { auth, backendUrl } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/auth/privet`);
        if (data.ok) {
          setoK(true);
        } else {
          setoK(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <LoginPage />;
}
