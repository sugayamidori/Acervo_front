"use client";

import { Button } from "@acervo/components/ui/button";

export const SecondaryBanner = () => {
  return (
    <section className="w-full bg-gradient-to-r from-[#1AA1A3] to-[#007A7C] py-10 mt-40">
      <div className="w-full mx-auto max-w-[1200px] md:max-w-[1400px] grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-y-0 min-h-[400px] items-center px-6 sm:px-10 md:px-24 text-center lg:text-left">
        {/* Título e texto */}
        <div className="text-white flex flex-col items-center lg:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold mb-2">
            Livro em Destaque
          </h1>
          <p className="text-base sm:text-lg pt-[24px]">
            O Hobbit - J.R.R. Tolkien
            <br className="hidden sm:block" />
            Uma jornada mágica pela Terra
          </p>
        </div>

        {/* Imagem */}
        <div className="flex justify-center">
          <img
            src="https://covers.openlibrary.org/b/id/6979861-L.jpg"
            alt="Capa do Livro"
            className="rounded-lg max-w-[250px] sm:max-w-[280px] md:max-w-[320px] w-full h-auto object-cover"
          />
        </div>

        {/* Botão */}
        <div className="flex justify-center lg:justify-end">
          <Button
            variant="secondary"
            size="lg"
            className="w-full max-w-[260px]"
          >
            Clique Aqui
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SecondaryBanner;
