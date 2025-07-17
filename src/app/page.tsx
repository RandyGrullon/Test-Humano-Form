"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Home() {
  const [showJson, setShowJson] = useState(false);
  const [isTogglingJson, setIsTogglingJson] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const isSuccess = searchParams.get("success") === "1";

  useEffect(() => {
    if (isSuccess && user) {
      setShowSuccessBanner(true);
    }
  }, [isSuccess, user]);

  const handleCloseBanner = () => {
    setShowSuccessBanner(false);
  };

  const handleToggleJson = () => {
    setIsTogglingJson(true);

    setTimeout(() => {
      setShowJson(!showJson);
      setIsTogglingJson(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        {showSuccessBanner && (
          <div
            className="mb-6 sm:mb-8 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg transition-colors duration-300"
            role="alert"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-sm sm:text-base">
                  {t("notifications.registerSuccess")}, {user?.nombre}!
                </span>
              </div>
              <button
                onClick={handleCloseBanner}
                className="ml-4 flex-shrink-0 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-green-900 rounded-sm"
                aria-label={t("common.close")}
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 transition-colors duration-300 px-2">
            {t("home.title")}
          </h1>

          {user ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-[#00B5E2] dark:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300">
                    <span className="text-2xl font-bold text-white">
                      {user.nombre.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                  {t("home.welcomeBack", { name: user.nombre })}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  {t("home.accountCreatedSuccess")}
                </p>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={handleToggleJson}
                    disabled={isTogglingJson}
                    className="bg-[#00B5E2] dark:bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-[#008bbd] dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#00B5E2] dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
                  >
                    {isTogglingJson ? (
                      <div className="flex items-center">
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t("home.loading")}
                      </div>
                    ) : (
                      <span className="flex items-center">
                        {showJson ? (
                          <>
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M15.536 15.536L16.95 16.95"
                              />
                            </svg>
                            {t("home.hideJson")}
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            {t("home.viewJson")}
                          </>
                        )}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 mb-8 transition-colors duration-300">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                  {t("home.startRegistration")}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                  {t("home.joinDescription")}
                </p>

                <div className="pt-4">
                  <Link
                    href="/registro"
                    className="inline-block bg-[#00B5E2] dark:bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-[#008bbd] dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#00B5E2] dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                  >
                    {t("home.registerNow")}
                  </Link>
                </div>
              </div>
            </div>
          )}

          {showJson && user && (
            <div className="grid md:grid-cols-2 gap-6 mt-12 animate-fade-in ">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 opacity-0 animate-slide-in-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  {t("home.userDataTitle")}
                </h3>
                <pre
                  className="text-gray-600 dark:text-gray-300 transition-colors duration-300 text-sm bg-gray-50 dark:bg-gray-700 p-4 rounded-md overflow-x-auto break-words whitespace-pre-line max-w-full sm:max-w-full md:max-w-full lg:max-w-full truncate-text"
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    whiteSpace: "pre-line",
                  }}
                >
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 opacity-0 animate-slide-in-right">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                  {t("home.accountInfoTitle")}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {t("home.nameLabel")}
                    </span>
                    <span
                      className="text-sm text-gray-900 dark:text-white break-words whitespace-pre-line max-w-full sm:max-w-full md:max-w-full lg:max-w-full truncate-text"
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {user.nombre}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {t("home.emailLabel")}
                    </span>
                    <span
                      className="text-sm text-gray-900 dark:text-white break-words whitespace-pre-line max-w-full sm:max-w-full md:max-w-full lg:max-w-full truncate-text"
                      style={{
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {user.email}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {t("home.statusLabel")}
                    </span>
                    <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {t("home.statusActive")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {t("home.registrationDateLabel")}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-white">
                      {new Date().toLocaleDateString(
                        language === "es" ? "es-ES" : "en-US"
                      )}
                    </span>
                  </div>
                  {user.password && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Password
                      </span>
                      <span
                        className="text-sm text-gray-900 dark:text-white break-words whitespace-pre-line max-w-full sm:max-w-full md:max-w-full lg:max-w-full truncate-text"
                        style={{
                          wordBreak: "break-word",
                          overflowWrap: "break-word",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {user.password}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
