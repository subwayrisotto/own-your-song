import { createContext, useState, useContext, useEffect } from 'react';
import { logoutUser } from '../api';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("currentUser");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser)); // Parse full user object
      }
    } catch (error) {
      console.error("Error parsing sessionStorage:", error);
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    sessionStorage.setItem("currentUser", JSON.stringify(user)); // Store full user object
  };

  const logout = async () => {
    await logoutUser();
    setCurrentUser(null);
    sessionStorage.removeItem("currentUser"); // Ensure full user data is removed
  };

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error parsing sessionStorage:", error);
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};