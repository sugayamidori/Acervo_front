"use client";

import * as React from "react";
import { Card } from "@acervo/components/card/index";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@acervo/components/ui/carousel";

import { Livro } from "@acervo/types/livro"

interface CarouselBooksProps {
  title: string;
  livros: Livro[];
}

export const CarouselBooks: React.FC<CarouselBooksProps> = ({ title, livros }) => {
  return (
    <section className="px-4 mt-16 max-w-[1400px] mx-auto">
      <h1 className="text-[20px] font-bold mb-6">{title}</h1>

      <Carousel className="w-full">
        <CarouselContent>
          {livros.map((livro) => (
            <CarouselItem
              key={livro.id}
              className="basis-3/4 md:basis-1/3 lg:basis-1/4" 
            >
              <Card
                id={livro.id}
                image={livro.imagem}
                title={livro.titulo}
                autor={livro.autor || "o caba vai endoidar é?"}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};
