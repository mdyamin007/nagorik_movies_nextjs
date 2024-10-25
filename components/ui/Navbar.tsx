'use client';
import React, { useEffect } from 'react';
import { RootState } from '@/lib/store'; // Import the RootState type
import { toggleTheme } from '@/lib/features/themeSlice'; // Import toggleTheme action
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import SearchBar from './SearchBar';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state: RootState) => state.theme.mode); // Get theme from Redux

  // Apply theme on mount and whenever it changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Toggle theme using Redux action
  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-yellow-500 dark:text-yellow-400 text-2xl font-bold cursor-pointer">
          Nagorik Movies
        </Link>

        <SearchBar />
        
        {/* Dark Mode Toggle */}
        <button
          onClick={handleToggleTheme}
          className="bg-gray-200 dark:bg-gray-600 text-black dark:text-white py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
