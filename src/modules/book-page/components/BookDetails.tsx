"use client";

import { useState } from "react";
import { Button } from "@acervo/components/ui/button";
import { Dialog, DialogTrigger } from "@acervo/components/ui/dialog";
import { LoanDialog } from "@acervo/modules/book-page/components/LoanDialog";
import { format } from "date-fns";

import { Livro } from "@acervo/types/livro";

interface Props {
  book: Livro;
}

export function BookDetails({ book }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const today = new Date();
  const returnDate = new Date(today);
  returnDate.setDate(today.getDate() + 7);
  const formattedReturnDate = format(returnDate, "dd/MM/yyyy");

  return (
    <>
      <div className="mt-20 mb-60 pt-20 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
          <img
            src={book.imagem}
            alt={book.titulo}
            className="rounded shadow-md max-w-[290px] w-full"
          />

          <div className="flex flex-col justify-center items-center md:items-start w-full max-w-xl text-center md:text-left">
            <h1 className="text-xl mb-5 font-bold">Detalhes do livro</h1>
            <h2 className="text-3xl font-bold mb-4">{book.titulo}</h2>
            <p className="text-gray-700 text-base">{book.autor}</p>
            <p
              className={`mt-2 inline-block px-2 py-1 rounded w-fit text-xs	font-bold ${
                book.status.toLowerCase() === "disponivel"
                  ? "bg-[#CAFFDF]"
                  : "bg-red-500 text-white"
              }`}
            >
              {book.status.charAt(0).toUpperCase() +
                book.status.slice(1).toLowerCase()}{" "}
              para empréstimo
            </p>

            <h5 className="font-bold mt-10">Sumário:</h5>
            <p className="mt-2">
              {book.sumario && book.sumario.trim() !== ""
                ? book.sumario
                : "Sumário não disponível."}
            </p>
            <p className="mt-10">
              <span className="font-bold">Data de publicação: </span>
              {book.dataPublicacao}
            </p>
            <p className="mt-2">
              <span className="font-bold">Gênero: </span>
              {book.genero}
            </p>
            <p className="mt-2">
              <span className="font-bold">ISBN: </span>
              {book.isbn}
            </p>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="mt-10 max-w-[260px] w-full bg-[#007A7C]">
                  Adicionar ao empréstimo
                </Button>
              </DialogTrigger>

              <LoanDialog
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                formattedReturnDate={formattedReturnDate}
              />
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
