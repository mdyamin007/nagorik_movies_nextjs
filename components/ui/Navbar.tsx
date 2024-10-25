"use client";
import React, { useEffect } from "react";
import { RootState } from "@/lib/store";
import { toggleTheme } from "@/lib/features/themeSlice";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import SearchBar from "./SearchBar";
import { IoSunny } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href={"/"}
          className="text-yellow-500 dark:text-yellow-400 text-2xl font-bold cursor-pointer"
        >
          Nagorik Movies
        </Link>

        <SearchBar />

        {/* Right section with watchlist and theme toggle */}
        <div className="flex items-center space-x-8">
          {/* My Watchlist Link */}
          <Link
            href="/watchlist"
            className="text-yellow-500 dark:text-yellow-400 text-lg font-semibold hover:underline"
          >
            My Watchlist
          </Link>

          {/* Dark Mode Toggle */}
          <button
            onClick={handleToggleTheme}
            className="text-yellow-500 dark:text-yellow-400 p-2 rounded-full transition border border-yellow-500 dark:border-yellow-400"
          >
            {theme === "light" ? (
              <IoSunny className="text-2xl" />
            ) : (
              <IoMoon className="text-2xl" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
