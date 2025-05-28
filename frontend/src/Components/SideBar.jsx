import React from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { Link, useLocation } from "react-router-dom";
import {
  BellIcon,
  HomeIcon,
  ShipWheelIcon,
  UserIcon,
  UserPlus,
  UsersIcon,
} from "lucide-react";
const Sidebar = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-base-300">
        <Link to="/" className="flex items-center gap-2.5">
          <ShipWheelIcon className="size-9 text-primary" />
          <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            Library
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/" ? "btn-active bg-gray-400 text-white" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>
        <Link
          to="/add-Student"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/add-Student"
              ? "btn-active bg-gray-400 test-white"
              : ""
          }`}
        >
          <UserPlus className="size-5 text-base-content opacity-70" />
          <span>Add Student</span>
        </Link>
        <Link
          to="/my-student"
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/my-student"
              ? "btn-active bg-gray-400 test-white"
              : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>My Student</span>
        </Link>
        <Link
          to={`/profile/${auth?.user?._id}`}
          className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
            currentPath === "/profile/:id"
              ? "btn-active bg-gray-400 test-white"
              : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Profile</span>
        </Link>
      </nav>

      {/* User Profile Section */}

      <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={auth?.user?.image} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{auth?.user?.fullname}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
