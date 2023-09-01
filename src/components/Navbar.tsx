"use client";

import { FC } from "react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  return (
    <div className="fixed inset-x-0 top-0">
      <div className="w-full max-w-6xl mx-auto flex justify-end sm:px-6 md:px-8 lg:px-10 pt-4">
        <div className="p-1 rounded-md dark:bg-gray-800">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
