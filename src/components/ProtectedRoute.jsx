import { Navigate } from "react-router-dom";

// Wraps an admin page. If there's no token in localStorage, the user
// is bounced to /admin/login instead of seeing the protected page.
//
// Usage:
// <Route path="/admin/projects" element={
//   <ProtectedRoute><AdminProjects /></ProtectedRoute>
// } />
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;