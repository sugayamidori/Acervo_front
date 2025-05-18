"use client";

export const MainBanner = () => {
  return (
    <section className="relative w-full bg-[#F7F7F7] min-h-[360px] flex items-center">
  <div className="max-w-[1400px] mx-auto px-8 w-full text-center">
    <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight max-w-2xl mx-auto">
      Tudo em um só acervo, da organização à{" "}
      <span className="text-[#007A7C]">leitura</span>.
    </h1>
    <p className="text-lg text-gray-600  mx-auto">
      Empreste, devolva e acompanhe livros com facilidade.
    </p>
  </div>
</section>

  );
};

export default MainBanner;
