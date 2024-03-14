import React, { createContext, useContext, useState, ReactNode } from "react";
import { AppUser } from "../utils/types";

const defaultUser: AppUser = {
  userName: "Ron",
  id: 1,
  email: "ronbert@gmail.com",
  isAdmin: true,
};

const UserContext = createContext<{
  appUser: AppUser;
  toggleAdmin: () => void;
}>({
  appUser: defaultUser,
  toggleAdmin: () => {},
});

export const useAppUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [appUser, setAppUser] = useState<AppUser>(defaultUser);

  const toggleAdmin = () => {
    setAppUser((currentUser) => ({
      ...currentUser,
      isAdmin: !currentUser.isAdmin,
    }));
  };

  return (
    <UserContext.Provider value={{ appUser, toggleAdmin }}>
      {children}
    </UserContext.Provider>
  );
};
