import { useEffect, useState } from "react";

const API_URL = "http://15.228.247.160:8080/usuarios?nome=Admin";
const TOKEN = "eyJraWQiOiI1OGRmNzZhOS1hMWUyLTQzYWQtODc5Ni04NGJlNTNlZjcxZWMiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjbGllbnRfYWRtaW4tcHJvZHVjdGlvbiIsImF1ZCI6ImNsaWVudF9hZG1pbi1wcm9kdWN0aW9uIiwibmJmIjoxNzQ4MzQ1NjU1LCJzY29wZSI6WyJBRE1JTklTVFJBRE9SIl0sImlzcyI6Imh0dHA6Ly8xNS4yMjguMjQ3LjE2MDo4MDgwIiwiZXhwIjoxNzQ4NjA4NDU1LCJpYXQiOjE3NDgzNDU2NTUsImp0aSI6ImE5NDY3MzIzLTYwZjgtNDQyOC1iNzJhLWM4NDg0MjRlYmRiMCJ9.yhROOSGSRK_DGwmj1kw1HlnWVnELlSbyBQH8ge8XNgDR8sPvs3eqz9Lwz71Fss5eM5to6A_z_HPlftVeBW3LI-JJWmrAyKiahsP3rgK2kOQAjsPnOWYnzXYQwGgKSJwlF9bP6ZbyDaDZa0FTCE6ZLF9Ri52IqdSrzxhlyM5UPRM-iYlXZpUFic36Rgf4TRP0N4Hxwh_lW4dOjyUGjMVs5-uXtzmUvYiiBaodSBunBFbJa9Q84qbwxRCIVpHnJMcM2Nd9Ho3ZEnNDXp52INnFt4XY46XHNITkkeW17lJCl92Lg1mLuyAy1bQH3hBsPvqCLw4wyZVdHnWnl65HRze1GA";

export function useUsuarios(ativo: boolean = true) {
  const [usuarios, setUsuarios] = useState([]);
  const [loanInvoices, setLoanInvoices] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Carrega os usuários
  useEffect(() => {
    if (!ativo) return;

    const carregarUsuarios = async () => {
      setCarregando(true);
      try {
        const res = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${TOKEN}`, // ← CERTO!
              }
              ,
        });

        if (!res.ok) throw new Error("Erro ao buscar usuários");

        const data = await res.json();
        setUsuarios(data || []);
        setErro("");
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    carregarUsuarios();
  }, [ativo]);

  // Carrega os dados de empréstimos
// Carrega os dados de empréstimos
useEffect(() => {
  if (ativo) return; // só carrega empréstimos quando a aba "Empréstimos" estiver ativa

  const carregarEmprestimos = async () => {
    setCarregando(true);
    try {
      const res = await fetch("http://15.228.247.160:8080/emprestimos", {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      if (!res.ok) throw new Error("Erro ao buscar empréstimos");

      const data = await res.json();

      const emprestimos = data.map((item: any, index: number) => ({
        ID: (index + 1).toString().padStart(3, "0"),
        Livro: item.livroTitulo || "Desconhecido",
        Usuario: item.usuarioNome || "Anônimo",
        Devolucao: item.dataDevolucao || "Desconhecido",
        Atraso: item.diasAtraso > 0 ? "Sim" : "Não",
        Multa: item.valorMulta != null ? `R$ ${item.valorMulta.toFixed(2)}` : "R$ 0,00",
        Ações: "Ver detalhes",
      }));

      setLoanInvoices(emprestimos);
      setErro("");
    } catch (error: any) {
      setErro("Erro ao buscar empréstimos");
    } finally {
      setCarregando(false);
    }
  };

  carregarEmprestimos();
}, [ativo]);


  return { usuarios, erro, carregando, loanInvoices };
}
