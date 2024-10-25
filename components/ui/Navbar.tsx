"use client";
import React, { useState, useEffect } from "react";
import { RootState } from "@/lib/store";
import { toggleTheme } from "@/lib/features/themeSlice";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import SearchBar from "./SearchBar";
import { IoSunny, IoMoon } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.theme.mode);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-yellow-500 dark:text-yellow-400 text-2xl font-bold"
        >
          Nagorik Movies
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex w-2/3">
          <SearchBar />
        </div>

        {/* Right section for theme toggle and burger menu */}
        <div className="flex items-center space-x-8">
          {/* My Watchlist Link */}
          <Link
            href="/watchlist"
            className="hidden md:flex text-yellow-500 dark:text-yellow-400 text-lg font-semibold hover:text-white transition-colors"
          >
            My Watchlist
          </Link>
          {/* Dark Mode Toggle */}
          <button
            onClick={handleToggleTheme}
            className="text-yellow-500 dark:text-yellow-400 p-2 rounded-full border border-yellow-500 dark:border-yellow-400"
          >
            {theme === "light" ? (
              <IoSunny className="text-2xl" />
            ) : (
              <IoMoon className="text-2xl" />
            )}
          </button>

          {/* Burger Menu Toggle */}
          <button
            onClick={handleToggleMenu}
            className="text-yellow-500 dark:text-yellow-400 md:hidden p-2"
          >
            {menuOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden ${
          menuOpen ? "block" : "hidden"
        } bg-gray-800 dark:bg-gray-900 mt-4`}
      >
        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <Link
              href="/"
              className="text-yellow-500 dark:text-yellow-400 text-lg font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/watchlist"
              className="text-yellow-500 dark:text-yellow-400 text-lg font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              My Watchlist
            </Link>
          </li>
          <SearchBar />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
