import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

const axiosInstance = axios.create({
  withCredentials: true,
});

export const AuthProvider = ({ children }) => {
  const [cookies] = useCookies(["sessionId"]);
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
        document.cookie = `sessionId=${process.env.REACT_APP_SESSION_COOKIE}; path=/`;
        setUser(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    document.cookie =
      "sessionId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    setUser(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
