import React from "react";
import AdminLayout from "./AdminLayout";

const useAuth = () => {
  const token = localStorage.getItem("adminToken");
  return !!token;
};

const AdminLayoutWrapper = () => {
  const isAuthenticated = useAuth();
  return (
    <AdminLayout
      isAuthenticated={isAuthenticated}
      onLogout={() => {
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      }}
    />
  );
};

export default AdminLayoutWrapper;
