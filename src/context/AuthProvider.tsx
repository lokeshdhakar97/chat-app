"use client";
import React, { useEffect, useState } from "react";
import AuthContext from "@/context/AuthContext";
import { AuthContextType } from "@/types";

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [selectedChat, setSelectedChat] = useState();
  const [chat, setChat] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const contextValue: AuthContextType = {
    user,
    setUser,
    setSelectedChat,
    selectedChat,
    chat,
    setChat,
    loading,
    setLoading
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
