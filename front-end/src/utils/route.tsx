import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Page404 from "../pages/Page404";
import UsersPage from "../pages/Users";
import Albums from "../pages/Albums";
import Photos from "../pages/Photos";
import UserForm from "../pages/UserForm";
import AlbumForm from "../pages/AlbumForm";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/users" />} />
      <Route path="*" element={<Page404 />} /> {}
      <Route path="/users" element={<UsersPage />} />
      <Route path="/user/form/:userId?" element={<UserForm />} />
      <Route path="/users/:userId/albums" element={<Albums />} />
      <Route path="/albumForm/:albumId" element={<AlbumForm />} />
      <Route path="/albums/:albumId/photos" element={<Photos />} />
    </Routes>
  );
};
