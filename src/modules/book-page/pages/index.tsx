import { BookDetails } from "@acervo/modules/book-page/components/BookDetails";
import { getLivroPorId } from "@acervo/service/livros";

interface Params {
  params: { id: string };
}

export default async function BookPage({ params }: Params) {
  try {
    const livro = await getLivroPorId(params.id);

    return <BookDetails book={livro} />;
  } catch {
    return (
      <div className="text-center p-20 text-xl text-red-600">
        Livro não encontrado.
      </div>
    );
  }
}
