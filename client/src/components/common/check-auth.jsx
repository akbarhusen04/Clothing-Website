import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log("Current Path:", location.pathname, "| Auth:", isAuthenticated, "| Role:", user?.role);

  // 1. Root Path Pe Redirect Logic
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  // 2. Agar user authenticated NAHI hai aur kisi private page pe jane ki koshish kare
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // 3. Agar user authenticated HAI aur Login/Register page pe jane ki koshish kare
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // 4. Agar User 'admin' NAHI hai par Admin pages access karne ki koshish kare
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin") // Path check with "/" is safer
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // 5. Agar Admin 'shop' pages (user side) access karne ki koshish kare
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Agar upar ki koi condition match nahi hoti, toh actual page dikhao
  return <>{children}</>;
}

export default CheckAuth;