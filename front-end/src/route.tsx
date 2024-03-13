import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./pages/Users";
import Albums from "./pages/Albums";
import Photos from "./pages/Photos";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/users" />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:userId/albums" element={<Albums />} />
      <Route path="/albums/:albumId/photos" element={<Photos />} />
    </Routes>
  );
};
