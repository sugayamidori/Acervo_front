"use client"
import { Header } from "@acervo/components/header";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@acervo/components/ui/table";
import { UserTable } from "@acervo/modules/example/components/UserTable";
import { Book, User, BookOpen } from "lucide-react";
import { DashboardCard } from "@acervo/modules/example/components/DashboardCard";
import { Input } from "@acervo/components/ui/input";
import { EmailInput } from "@acervo/modules/example/components/EmailInput";
import { ToggleTabs } from "@acervo/components/ui/ToggleTabs";
import { useState } from "react";
import { Button } from "@acervo/components/ui/button";

function Dashboard() {
  return (
    <div className="flex gap-6 p-6 flex-wrap">
      <DashboardCard
        icon={<Book className="text-white" size={20} />}
        label="Livros cadastrados"
        value={125}
        bgColor="bg-blue-400"
      />
      <DashboardCard
        icon={<User className="text-white" size={20} />}
        label="Usuários cadastrados"
        value={34}
        bgColor="bg-purple-300"
      />
      <DashboardCard
        icon={<BookOpen className="text-white" size={20} />}
        label="Empréstimos ativos"
        value={125}
        bgColor="bg-green-300"
      />
    </div>
  );
}
const invoices = [
  {
    ID: "01",
    Nome: "Matheus",
    Email: "Matheus@gmail.com",
    TipoUsuario: "Administrador",
    Ações: "Editar",
  },
  {
    ID: "02",
    Nome: "Ana Clara",
    Email: "ana.clara@email.com",
    TipoUsuario: "Usuário",
    Ações: "Editar"
  },
  {
    ID: "03",
    Nome: "João Pedro",
    Email: "joao.pedro@email.com",
    TipoUsuario: "Moderador",
    Ações: "Editar"
  },
  {
    ID: "04",
    Nome: "Carla Souza",
    Email: "carla.souza@email.com",
    TipoUsuario: "Usuário",
    Ações: "Editar"
  },
  {
    ID: "05",
    Nome: "Lucas Lima",
    Email: "lucas.lima@email.com",
    TipoUsuario: "Administrador",
    Ações: "Editar"
  },
  {
    ID: "06",
    Nome: "Fernanda Alves",
    Email: "fernanda.alves@email.com",
    TipoUsuario: "Usuário",
    Ações: "Editar"
  },
  {
    ID: "07",
    Nome: "Bruno Rocha",
    Email: "bruno.rocha@email.com",
    TipoUsuario: "Moderador",
    Ações: "Editar"
  },
  {
    ID: "08",
    Nome: "Juliana Ribeiro",
    Email: "juliana.ribeiro@email.com",
    TipoUsuario: "Administrador",
    Ações: "Editar"
  },
  {
    ID: "09",
    Nome: "Thiago Costa",
    Email: "thiago.costa@email.com",
    TipoUsuario: "Usuário",
    Ações: "Editar"
  },
  {
    ID: "10",
    Nome: "Mariana Nunes",
    Email: "mariana.nunes@email.com",
    TipoUsuario: "Moderador",
    Ações: "Editar"
  }
  
];

// export function TableDemo() {
//   return (
//     <div className="w-full flex justify-center">
//   <div className="w-full max-w-screen-xl">
//     <Table className="w-full">
//       <TableCaption>Lista de usuários recentes.</TableCaption>
//       <TableHeader className="bg-[#F4F4F4]">
//         <TableRow>
//           <TableHead className="w-[120px] px-8 text-center">ID</TableHead>
//           <TableHead className="min-w-[200px] px-8 text-center">Nome</TableHead>
//           <TableHead className="min-w-[250px] px-8 text-center">Email</TableHead>
//           <TableHead className="min-w-[200px] px-8 text-center">Tipo Usuário</TableHead>
//           <TableHead className="min-w-[180px] px-8 text-center">Ações</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {invoices.map((invoice) => (
//           <TableRow key={invoice.ID}>
//             <TableCell className="px-8 text-center font-medium">{invoice.ID}</TableCell>
//             <TableCell className="px-8 text-center">{invoice.Nome}</TableCell>
//             <TableCell className="px-8 text-center">{invoice.Email}</TableCell>
//             <TableCell className="px-8 text-center">{invoice.TipoUsuario}</TableCell>
//             <TableCell className="px-8 text-center">{invoice.Ações}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </div>
// </div>

//   );
// }

const TelaAdmin = () => {
  const handleSelect = (tab: string) => {
    console.log("Aba selecionada:", tab);
    // Aqui você pode setar um state e renderizar componentes diferentes, por exemplo
  };
  return (
    <>
      <Header />
      <main className="pt-24 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold">Painel do Administrador</h1>
        <Dashboard />

        <div className="w-full flex justify-center items-center h-10">
          <div className="w-full max-w-sm">
            <EmailInput />
          </div>
          <div>
          <Button className="ml-4 bg-teal-700 text-white font-semibold px-4 py-2 rounded hover:bg-teal-800 transition">
        Adicionar usuário
      </Button>
          </div>
        </div>
        <ToggleTabs options={["Usuários", "Empréstimos"]} onSelect={handleSelect} />
        <UserTable invoices={invoices} />
      </main>
    </>
  );
};

export default TelaAdmin;
