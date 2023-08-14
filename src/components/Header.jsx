import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMathRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0  z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        {/* logo */}
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/*  */}
        <div>
          <ul className="flex space-x-10">
            <li
              onClick={() => navigate("/")}
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px]  border-b-transparent ${
                pathMathRoute("/") && "text-black border-b-red-800"
              }`}
            >
              Home
            </li>
            <li
              onClick={() => navigate("/offers")}
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent  ${
                pathMathRoute("/offers") && "text-black border-b-red-800 "
              }`}
            >
              Offers
            </li>
            <li
              onClick={() => navigate("/sign-in")}
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px]  border-b-transparent ${
                pathMathRoute("/sign-in") && "text-black border-b-red-800 "
              }`}
            >
              Sign in
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
