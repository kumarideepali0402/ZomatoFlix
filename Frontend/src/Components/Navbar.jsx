import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navLinkClasses = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <h1 className="text-xl font-bold text-blue-700">
            ZomatoFlix
          </h1>
          <div className="flex space-x-2">
            <Link to="/user/register" className={navLinkClasses("/user/register")}>
              User Register
            </Link>
            <Link to="/user/login" className={navLinkClasses("/user/login")}>
              User Login
            </Link>
            <Link to="/foodpartner/register" className={navLinkClasses("/foodpartner/register")}>
              Partner Register
            </Link>
            <Link to="/foodpartner/login" className={navLinkClasses("/foodpartner/login")}>
              Partner Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
