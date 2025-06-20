import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@acervo/components/ui/table";
  import { Pen, Trash2, Repeat } from "lucide-react";
  
  interface UserTableProps {
    invoices: any[];
    type: "Usuários" | "Empréstimos";
  }
  
  export function UserTableBibli({ invoices, type }: UserTableProps) {
    return (
      <div className="w-full flex justify-center">
        <div className="w-full max-w-screen-xl">
          <Table className="w-full">
            <TableCaption>
              {type === "Usuários"
                ? "Lista de usuários recentes."
                : "Lista de empréstimos recentes."}
            </TableCaption>
  
            <TableHeader className="bg-[#F4F4F4]">
              <TableRow>
                <TableHead className="px-8 text-center">ID</TableHead>
                {type === "Usuários" ? (
                  <>
                    <TableHead className="px-8 text-center">Nome</TableHead>
                    <TableHead className="px-8 text-center">Email</TableHead>
                    <TableHead className="px-8 text-center">Tipo Usuário</TableHead>
                  </>
                ) : (
                  <>
                    <TableHead className="px-8 text-center">Livro</TableHead>
                    <TableHead className="px-8 text-center">Usuário</TableHead>
                    <TableHead className="px-8 text-center">Devolução</TableHead>
                    <TableHead className="px-8 text-center">Atraso</TableHead>
                    <TableHead className="px-8 text-center">Multa</TableHead>
                    <TableHead className="px-8 text-center">Ações</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
  
            <TableBody>
              {invoices.map((item, index) => (
                <TableRow key={item.ID || index}>
                  <TableCell className="px-8 text-center font-medium">
                    {item.ID}
                  </TableCell>
                  {type === "Usuários" ? (
                    <>
                      <TableCell className="px-8 text-center">{item.Nome}</TableCell>
                      <TableCell className="px-8 text-center">{item.Email}</TableCell>
                      <TableCell className="px-8 text-center">{item.TipoUsuario}</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="px-8 text-center">{item.Livro}</TableCell>
                      <TableCell className="px-8 text-center">{item.Usuario}</TableCell>
                      <TableCell className="px-8 text-center">{item.Devolucao}</TableCell>
                      <TableCell className="px-8 text-center">{item.Atraso}</TableCell>
                      <TableCell className="px-8 text-center">{item.Multa}</TableCell>
                      <TableCell className="px-8 text-center">
                        <div className="flex justify-center gap-3 items-center">
                          <button className="flex items-center gap-1 text-teal-700 font-medium hover:underline">
                            <Repeat size={18} />
                            Devolver
                          </button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  