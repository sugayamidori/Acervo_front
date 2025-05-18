import { Header } from "@acervo/components/header";
import { MainBanner } from "@acervo/modules/home-member/components/MainBanner";
import { CarouselBooks } from "@acervo/modules/home-member/components/CarouselBooks";
import { mockData } from "@acervo/modules/home-member/data/mockBooks";
import { SecondaryBanner } from "@acervo/modules/home-member/components/SecondaryBanner";
import Footer from "@acervo/components/footer";

const IndexPage = () => {
  return (
    <div className="pt-20">
      <Header />
      <MainBanner />
      <div className="w-full mx-auto xl:max-w-[1200px] 2xl:max-w-[1400px] px-4 sm:px-6 md:px-8">
        <CarouselBooks title="Adicionados recentemente" books={mockData} />
        <CarouselBooks title="Mais populares" books={mockData} />
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
      <Footer />
    </div>
  );
};

export default IndexPage;
