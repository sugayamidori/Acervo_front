"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";

import { Logo } from "@acervo/constants/index";
import { Input } from "@acervo/components/ui/input";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 shadow-md bg-white">
      <div className="w-full max-w-[1400px] mx-auto px-4 flex flex-wrap md:flex-nowrap h-auto md:h-[5em] items-center justify-between gap-4 py-2 relative">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 order-1">
          <Image
            src={Logo.logo}
            alt={Logo.title}
            width={180}
            height={30}
            className="h-auto w-[150px] sm:w-[180px]"
          />
        </Link>

        {/* Menu mobile toggle */}
        <div className="md:hidden ml-auto order-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#007A7C] focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Campo de busca */}
        <div className="flex h-10 w-full md:w-[20em] order-3 items-center rounded-4xl border border-[#007A7C] cursor-pointer focus-within:border-yellow-400 focus-within:shadow-[0_0_0_2px_#FACC15]">
          <Input
            type="text"
            className="h-full w-full text-black pl-4 border-none rounded-l-4xl rounded-r-none outline-none focus:ring-0 focus:border-transparent border-2 focus-visible:ring-0 focus-visible:border-transparent"
            placeholder="Busque por um livro"
            onKeyDown={(e) => e.key === "Enter"}
          />
          <span className="p-2 mr-2 rounded-full transition-all duration-200 hover:bg-[#DEDEDE] cursor-pointer">
            <Search size={18} className="text-[#007A7C]" />
          </span>
        </div>

        {/* Menu desktop */}
        <ul className="hidden md:flex items-center justify-end gap-6 md:gap-10 order-4">
          <li>
            <Link href="#" className="text-sm text-gray-700">
              Fazer login
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="bg-[#007A7C] text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-teal-800"
            >
              Cadastre-se
            </Link>
          </li>
        </ul>

        {/* Dropdown mobile */}
        {isOpen && (
          <div className="absolute top-full right-4 bg-white shadow-md rounded-md p-4 mt-2 w-[200px] flex flex-col gap-2 z-50 md:hidden">
            <Link href="#" className="text-sm text-gray-700 hover:text-black">
              Fazer login
            </Link>
            <Link
              href="#"
              className="bg-[#007A7C] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-teal-800 text-center"
            >
              Cadastre-se
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
