import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@acervo/components/ui/table";

interface User {
  ID: number;
  Nome: string;
  Email: string;
  TipoUsuario: string;
  Ações: React.ReactNode;
}

interface UserTableProps {
  invoices: User[];
}

export function UserTable({ invoices }: UserTableProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-screen-xl">
        <Table className="w-full">
          <TableCaption>Lista de usuários recentes.</TableCaption>
          <TableHeader className="bg-[#F4F4F4]">
            <TableRow>
              <TableHead className="w-[120px] px-8 text-center">ID</TableHead>
              <TableHead className="min-w-[200px] px-8 text-center">Nome</TableHead>
              <TableHead className="min-w-[250px] px-8 text-center">Email</TableHead>
              <TableHead className="min-w-[200px] px-8 text-center">Tipo Usuário</TableHead>
              <TableHead className="min-w-[180px] px-8 text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.ID}>
                <TableCell className="px-8 text-center font-medium">{invoice.ID}</TableCell>
                <TableCell className="px-8 text-center">{invoice.Nome}</TableCell>
                <TableCell className="px-8 text-center">{invoice.Email}</TableCell>
                <TableCell className="px-8 text-center">{invoice.TipoUsuario}</TableCell>
                <TableCell className="px-8 text-center">{invoice.Ações}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
