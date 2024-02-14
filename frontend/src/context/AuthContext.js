import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

const axiosInstance = axios.create({
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [cookies] = useCookies([process.env.REACT_APP_SESSION_COOKIE]);
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (cookies.sessionId) {
      setUser(true);
    }
  }, []);

  const login = async (payload) => {
    const url = process.env.REACT_APP_BACKEND_URL;
    try {
      const loginResponse = await axiosInstance.post(
        `${url}/auth/login`,
        payload
      );
      if (loginResponse.data.success) {
        document.cookie = "sessionId=valorDeLaSesion; path=/";
        setUser(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    const url = process.env.REACT_APP_BACKEND_URL;
    const logoutResponse = await axiosInstance.post(`${url}/auth/logout`);
    document.cookie =
      "sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    console.log(logoutResponse.data);
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
