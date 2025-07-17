"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useLoading } from "@/context/LoadingContext";
import LanguageToggle from "@/components/LanguageToggle";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const { showLoader } = useLoading();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    const userName = user?.nombre;

    showLoader();

    setTimeout(() => {
      logout();

      toast.success(
        t("notifications.logoutSuccessMessage", { name: userName }),
        {
          duration: 4000,
        }
      );

      setTimeout(() => {
        router.push("/");
      }, 100);
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#00B5E2] dark:bg-gray-800 text-white shadow-md z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg sm:text-xl font-bold hover:text-gray-200 dark:hover:text-gray-300 transition-colors"
            >
              {t("navbar.brand")}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <Link
                href="/registro"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-[#008bbd] dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00B5E2] dark:focus:ring-offset-gray-800"
              >
                {t("navbar.register")}
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-[#008bbd] dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00B5E2] dark:focus:ring-offset-gray-800"
                  >
                    <div className="w-8 h-8 bg-[#008bbd] dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {user.nombre.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden lg:block">{user.nombre}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isUserDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1" role="menu">
                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                          <div className="font-medium">{user.nombre}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            <span
                              className="max-w-[120px] truncate block cursor-pointer"
                              title={user.email}
                            >
                              {user.email}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center"
                          role="menuitem"
                        >
                          <svg
                            className="w-4 h-4 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                          </svg>
                          {t("navbar.logout")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <LanguageToggle />
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-white hover:bg-[#008bbd] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#00B5E2]"
              aria-label="Abrir menú"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 pb-4"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-2 pb-3 space-y-1 border-t border-[#008bbd] dark:border-gray-700">
            {!user ? (
              <Link
                href="/registro"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-[#008bbd] dark:hover:bg-gray-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navbar.register")}
              </Link>
            ) : (
              <div className="space-y-2">
                <div className="px-3 py-2 text-sm text-gray-200 dark:text-gray-300 border-b border-[#008bbd] dark:border-gray-700">
                  <div className="font-medium">{user.nombre}</div>
                  <div className="text-xs text-gray-400">
                    <span
                      className="max-w-[120px] truncate block cursor-pointer"
                      title={user.email}
                    >
                      {user.email}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium bg-[#008bbd] dark:bg-gray-700 hover:bg-[#006a94] dark:hover:bg-gray-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  {t("navbar.logout")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
