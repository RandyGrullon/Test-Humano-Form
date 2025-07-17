"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F7FA] dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center max-w-md">
        <h1 className="text-5xl font-bold text-[#00B5E2] dark:text-blue-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {t("notFound.title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {t("notFound.message")}
        </p>
        <Link
          href="/"
          className="inline-block bg-[#00B5E2] dark:bg-blue-600 text-white py-2 px-6 rounded-md font-medium hover:bg-[#008bbd] dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#00B5E2] dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
        >
          {t("notFound.goHome")}
        </Link>
      </div>
    </div>
  );
}
