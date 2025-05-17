"use client";

export const MainBanner = () => {
  return (
     <section className="w-screen bg-[#F7F7F7] relative left-1/2 right-1/2 -mx-[50vw] ">
  <div className="grid grid-cols-1 md:grid-cols-[45%_55%] min-h-[400px] items-center">
    <div className="flex flex-col justify-center h-full py-12 px-8 md:px-24">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
        Tudo em um só acervo, da organização à  <span className="text-[#007A7C]">leitura</span>.
      </h1>
      <p className="text-lg text-gray-600">
        Empreste, devolva e acompanhe livros com facilidade.
      </p>
    </div>
    <div className="h-full w-full bg-gray-800" />
  </div>
</section>
  );
};

export default MainBanner;
