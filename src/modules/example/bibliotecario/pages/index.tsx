"use client"
import { Header } from "@acervo/components/header";
import { UserTableBibli } from "../../components/UserTableBibli";
import { Book, User, BookOpen, Pen, Trash2} from "lucide-react";
import { DashboardCard } from "@acervo/modules/example/components/DashboardCard";
import { EmailInput } from "@acervo/modules/example/components/EmailInput";
import { ToggleTabs } from "@acervo/components/ui/ToggleTabs";
import { Button } from "@acervo/components/ui/button";
import { useState } from "react";
import { TesteUsuarios } from "../../../../../TesteAPI/TesteUsuaario";
import { useUsuarios } from "../../../../../TesteAPI/UseUsuarios";


function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full max-w-6xl mx-auto">
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
const userInvoices = [
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
const loanInvoices = [
  {
    ID: "101",
    Livro: "1984",
    Usuario: "Matheus",
    Devolucao: "2025-06-01",
    Atraso: "Não",
    Multa: "R$ 0,00",
    Ações: "Ver detalhes",
  },
  {
    ID: "102",
    Livro: "O Hobbit",
    Usuario: "Ana Clara",
    Devolucao: "2025-05-10",
    Atraso: "Sim",
    Multa: "R$ 10,00",
    Ações: "Ver detalhes",
  },
];
const TelaBibli = () => {
  const [selectedTab, setSelectedTab] = useState("Usuários");
  const [mostrar, setMostrar] = useState(false);
  const { usuarios, erro, carregando } = useUsuarios(selectedTab === "Usuários");

  const dadosUsuarios = usuarios.map((u: any, i: number) => ({
    ID: `${i + 1}`,
    Nome: u.nome || u.login, // ou outro campo
    Email: u.email,
    TipoUsuario: u.roles?.[0] || "Desconhecido",
    Ações: "Editar",
  }));


  const handleSelect = (tab: string) => {
    setSelectedTab(tab);
    console.log("Aba selecionada:", tab);
  };
  return (
    <>
      <Header />
      <main className="pt-24 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold">Painel do Bibliotecário</h1>
        <Dashboard />

        <div className="w-full flex justify-center items-center h-10">
          <div className="w-full max-w-xl">
            <EmailInput />
          </div>
          <div>
          <Button className="ml-4 bg-teal-700 text-white font-semibold px-4 py-2 rounded hover:bg-teal-800 transition">
        Adicionar usuário
      </Button>
          </div>
        </div>
        <ToggleTabs options={["Usuários", "Empréstimos"]} onSelect={setSelectedTab} />
        
        {carregando && <p>Carregando dados...</p>}
        {erro && <p className="text-red-500">{erro}</p>}
        
        {!carregando && (
          <UserTableBibli
            type={selectedTab}
            invoices={selectedTab === "Usuários" ? dadosUsuarios : dadosEmprestimos}
          />
        )}
      </main>
    </>
  );
};

export default TelaBibli;
