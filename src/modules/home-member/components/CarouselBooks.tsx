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

interface Book {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface CarouselBooksProps {
  title: string;
  books: Book[];
}

export const CarouselBooks: React.FC<CarouselBooksProps> = ({ title, books }) => {
  return (
    <section className="px-4 mt-16 max-w-[1400px] mx-auto">
      <h1 className="text-[20px] font-bold mb-6">{title}</h1>

      <Carousel className="w-full">
        <CarouselContent>
          {books.map((book) => (
            <CarouselItem
              key={book.id}
              className="basis-3/4 md:basis-1/3 lg:basis-1/4" 
            >
              <Card
                id={book.id}
                image={book.image}
                title={book.title}
                description={book.description}
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
