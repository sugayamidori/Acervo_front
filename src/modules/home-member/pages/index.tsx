"use client";

import { useEffect, useState } from "react";
import { getLivros } from "@acervo/service/livros";
import { Livro } from "@acervo/types/livro";

import { MainBanner } from "@acervo/modules/home-member/components/MainBanner";
import { CarouselBooks } from "@acervo/modules/home-member/components/CarouselBooks";
import { SecondaryBanner } from "@acervo/modules/home-member/components/SecondaryBanner";
import { Header } from "@acervo/components/header";
import Footer from "@acervo/components/footer";

const IndexPage = () => {
  const [recentBooks, setRecentBooks] = useState<Livro[]>([]);
  const [popularBooks, setPopularBooks] = useState<Livro[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getLivros();

      setRecentBooks(data.slice(0, 5));
      setPopularBooks(data.slice(6, 12));
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Header />
      <div className="pt-20">
        <MainBanner />
        <div className="w-full mx-auto xl:max-w-[1200px] 2xl:max-w-[1400px] px-4 sm:px-6 md:px-8">
          <CarouselBooks
            title="Adicionados recentemente"
            livros={recentBooks}
          />
          <CarouselBooks title="Mais populares" livros={popularBooks} />
        </div>
        <SecondaryBanner />
        <section className="my-24 px-4 py-12 text-center max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Encontre seu livro favorito
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6">
            Use o campo abaixo para buscar livros por título, autor ou ISBN.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default IndexPage;
