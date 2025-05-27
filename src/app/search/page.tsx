"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getLivros } from "@acervo/service/livros";
import { Livro } from "@acervo/types/livro";
import { Card } from "@acervo/components/card/index";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@acervo/components/ui/pagination"; 

export default function PaginaDeBusca() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [todosOsLivrosFiltrados, setTodosOsLivrosFiltrados] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);

  //Estados para controle da paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    if (query) {
      setLoading(true);
      setCurrentPage(1); 
      getLivros()
        .then((todosOsLivros) => {
          const livrosFiltrados = todosOsLivros.filter(
            (livro) =>
              livro.titulo.toLowerCase().includes(query.toLowerCase()) ||
              (livro.autor &&
                livro.autor.toLowerCase().includes(query.toLowerCase())) ||
              livro.isbn.toLowerCase().includes(query.toLowerCase())
          );
          setTodosOsLivrosFiltrados(livrosFiltrados);
        })
        .catch((error) => {
          console.error("Erro ao buscar livros:", error);
          setTodosOsLivrosFiltrados([]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setTodosOsLivrosFiltrados([]);
      setLoading(false);
    }
  }, [query]);

  // Cálculos para a paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = todosOsLivrosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(todosOsLivrosFiltrados.length / itemsPerPage);


  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:p-4 mt-[8em] md:mt-[6em] text-center">
        <p className="text-base sm:text-lg">Carregando resultados...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:p-4 mt-[8em] md:mt-[6em]">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 md:mb-6 text-center sm:text-left">
        Resultados da busca por: "{query || ""}"
      </h1>
      {currentItems.length > 0 ? ( 
        <>
          <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 sm:justify-items-start md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {currentItems.map((livro) => ( 
              <Card
                key={livro.id}
                id={livro.id}
                image={livro.imagem}
                title={livro.titulo}
                autor={livro.autor || "Autor desconhecido"}
              />
            ))}
          </div>

          
          {totalPages > 1 && ( // Só mostra a paginação se houver mais de uma página
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      isActive={currentPage === page}
                      aria-current={currentPage === page ? "page" : undefined}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <p className="text-gray-600 text-base sm:text-lg text-center">
          Nenhum livro encontrado para "{query || ""}". Tente outros termos.
        </p>
      )}
    </div>
  );
}