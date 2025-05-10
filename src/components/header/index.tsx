"use client";

import Link from "next/link";
import Image from "next/image";

import { Search } from "lucide-react";
import { Logo } from "@acervo/constants/index";
import { Input } from "@acervo/components/ui/input";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-[5em] flex items-center justify-between px-8 md:px-10 z-1 shadow-2xl">
      <Link href="/">
        <Image src={Logo.logo} alt={Logo.title} width={180} height={30} />
      </Link>

      <div className="flex h-10 w-full  md:w-[20em] mr-2 md:mr-0 items-center rounded-4xl border-1 border-[#007A7C]">
        <Input
          type="text"
          className="h-full w-full text-white pl-4 border-none  rounded-l-4xl rounded-r-none  outline-none focus:ring-0 focus:border-transparent border-2"
          placeholder="Busque por um livro"
          onKeyDown={(e) => e.key === "Enter"}
        />
        <span className="p-6 cursor-pointer ">
          <Search size={18} className="text-[#007A7C]" />
        </span>
      </div>

      <ul className="flex items-center justify-end gap-10 p-5 mr-4">
        <li>
          <Link href="#" className="text-sm text-gray-700">
            Fazer login
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="bg-[#007A7C] w-[8.5em] text-white text-sm font-semibold px-5 py-3 rounded-md hover:bg-teal-800"
          >
            Cadastre-se
          </Link>
        </li>
      </ul>
    </header>
  );
};
