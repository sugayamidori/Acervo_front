import { Header } from "@acervo/components/header";
import { mockData } from "@acervo/modules/home-member/data/mockBooks";
import { Button } from "@acervo/components/ui/button";


interface Params {
  params: { id: string };
}

export default function BookPage({ params }: { params: { id: string } }) {
  const book = mockData.find((b) => String(b.id) === params.id);

  return (
    <>
      <Header />
      {!book ? (
        <div className="pt-20 p-8 text-center text-xl">
          Livro não encontrado.
        </div>
      ) : (
        <main className="pt-40  mx-auto p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={book.image}
                alt={book.title}
                className="rounded shadow-md max-w-[290px] w-full"
              />
            </div>

            <div className="flex flex-col justify-start">
              <h1 className="text-xl mb-5 font-bold">Detalhes do livro</h1>
              <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
              <p className="text-gray-700 text-base">{book.description}</p>

              <h5 className="font-bold mt-10">Sumário:</h5>
              <p className="mt-2">{book.summary}</p>

              <Button variant="default" size="lg" className="mt-10 max-w-[260px] w-full bg-[#007A7C]">
                Adicionar ao empréstimo
              </Button>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
