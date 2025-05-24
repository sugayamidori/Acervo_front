"use client";

import { useEffect, useState } from "react";
import { Livro } from "@acervo/types/livro";
import { getLivros } from "@acervo/service/livros";
import { Button } from "@acervo/components/ui/button";

export const SecondaryBanner = () => {
  const [livroDestaque, setLivroDestaque] = useState<Livro | null>(null);

  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const livros = await getLivros();
        const livro = livros.find((l: Livro) => l.genero === "MISTERIO");
        if (livro) setLivroDestaque(livro);
      } catch (error) {
        console.error("Erro ao exibir o livro:", error);
      }
    };

    fetchLivro();
  }, []);

  if (!livroDestaque) return null;

  return (
    <section className="w-full bg-gradient-to-r from-[#1AA1A3] to-[#007A7C] py-10 mt-40">
      <div className="w-full mx-auto max-w-[1200px] md:max-w-[1400px] grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-y-0 min-h-[400px] items-center px-6 sm:px-10 md:px-24 text-center lg:text-left">
        {/* Título e texto */}
        <div className="text-white flex flex-col items-center lg:items-start">
          <h1 className="text-3xl sm:text-4xl md:text-[48px] font-bold mb-2">
            Livro em Destaque
          </h1>
          <p className="text-base sm:text-lg pt-[24px]">
            {livroDestaque.titulo}
          </p>
        </div>

        {/* Imagem */}
        <div className="flex justify-center">
          {livroDestaque.imagem ? (
            <img
              src={livroDestaque.imagem}
              alt={livroDestaque.titulo}
              className="rounded-lg max-w-[250px] sm:max-w-[280px] md:max-w-[320px] w-full h-auto object-cover"
            />
          ) : (
            <div className="rounded-lg max-w-[250px] sm:max-w-[280px] md:max-w-[320px] w-full h-[400px] bg-gray-300 flex items-center justify-center text-gray-600 text-center px-4">
              Imagem não disponível
            </div>
          )}
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
