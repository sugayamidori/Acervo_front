"use client";

import Image from "next/image";
import Link from "next/link";
import { Logo } from "@acervo/constants/index";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 min-h-[400px]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-8 md:flex-row md:justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={Logo.logo}
            alt={Logo.title}
            width={180}
            height={30}
            className="h-auto w-[150px] sm:w-[180px]"
          />
        </Link>
        <div>
          <h3 className="mb-4 font-bold text-[20px] text-[#7DE6E8]">
            Links úteis
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white transition">
                Início
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Entrar
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white transition">
                Cadastre-se
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-bold text-[20px] text-[#7DE6E8]">Contato</h3>
          <ul className="space-y-2 text-[#9C9C9C]">
            <li>acervos@email.com</li>
            <li>(81) 91234-5678</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
