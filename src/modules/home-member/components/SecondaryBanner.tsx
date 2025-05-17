"use client";

import { Button } from "@acervo/components/ui/button";

export const SecondaryBanner = () => {
  return (
    <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-gradient-to-r from-[#1AA1A3] to-[#007A7C] py-10 mt-40">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 md:gap-y-0 min-h-[400px] items-center px-6 sm:px-10 md:px-24">

        {/* Coluna 1: título e subtítulo */}
        <div className="text-white text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold mb-2">
            Livro em Destaque
          </h1>
          <p className="text-base sm:text-lg">
            O Hobbit - J.R.R. Tolkien<br className="hidden sm:block" />
            Uma jornada mágica pela Terra
          </p>
        </div>

        {/* Coluna 2: imagem */}
        <div className="flex justify-center">
          <img
            src="https://covers.openlibrary.org/b/id/6979861-L.jpg"
            alt="Capa do Livro"
            className="rounded-lg max-w-[250px] sm:max-w-[280px] md:max-w-[320px] w-full h-auto object-cover"
          />
        </div>

        {/* Coluna 3: botão */}
        <div className="flex justify-center md:justify-end">
          <Button variant="secondary" size="lg">
            Clique Aqui
          </Button>
        </div>

      </div>
    </section>
  );
};

export default SecondaryBanner;
