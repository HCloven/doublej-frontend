import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Icons
const IconDashboard = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 13h8V3H3v10zM3 21h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" />
  </svg>
);

const IconOrders = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);

const IconUsers = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11zM2 20c0-2.5 3.582-4.5 8-4.5s8 2 8 4.5" />
  </svg>
);

const IconLogout = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7M7 8v8" />
  </svg>
);

const navItems = [
  { to: "/admin", label: "Dashboard", icon: <IconDashboard /> },
  { to: "/admin/orders", label: "Orders", icon: <IconOrders /> },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [openMgmt, setOpenMgmt] = useState(false);
  const [dark, setDark] = useState(localStorage.getItem("adminDarkMode") === "true");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("adminDarkMode", String(next));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/portal/login");
  };

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded transition ${
      isActive(path)
        ? "bg-primary text-navy font-semibold"
        : dark
        ? "text-gray-200 hover:bg-gray-800"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className={`flex min-h-screen ${dark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 shadow-lg transform transition-transform duration-200
        ${dark ? "bg-gray-950" : "bg-white"}
        ${open ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className={linkClass(item.to)} onClick={() => setOpen(false)}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setOpenMgmt(!openMgmt)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-2 rounded transition ${
              dark ? "text-gray-200 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="flex items-center gap-3">
              <IconUsers />
              <span>Management</span>
            </span>
            <span>{openMgmt ? "\u25B4" : "\u25BE"}</span>
          </button>

          {openMgmt && (
            <div className="pl-6 space-y-1">
              <Link to="/admin/drivers" className={linkClass("/admin/drivers")} onClick={() => setOpen(false)}>
                Drivers
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={toggleDark}
            className={`w-full text-left px-4 py-2 rounded transition ${
              dark ? "text-gray-200 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {dark ? "Light mode" : "Dark mode"}
          </button>

          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded bg-red-600 text-white mt-4 hover:bg-red-700"
          >
            <IconLogout />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        <div className={`shadow p-4 flex items-center justify-between md:hidden ${dark ? "bg-gray-950" : "bg-white"}`}>
          <button type="button" onClick={() => setOpen(!open)} className="font-semibold">
            ☰ Menu
          </button>
        </div>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
