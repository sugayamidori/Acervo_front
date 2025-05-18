import { BookDetails } from "@acervo/modules/book-page/components/BookDetails";
import { mockData } from "@acervo/modules/home-member/data/mockBooks";

interface Params {
  params: { id: string };
}

export default function BookPage({ params }: Params) {
  const book = mockData.find((b) => String(b.id) === params.id);

  if (!book) {
    return (
      <div className="text-center p-20 text-xl">
        Livro não encontrado.
      </div>
    );
  }

  return <BookDetails book={book} />;
}
