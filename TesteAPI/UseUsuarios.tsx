// hooks/useUsuarios.ts
import { useEffect, useState } from "react";

const API_URL = "http://15.228.247.160:8080/usuarios";
const TOKEN = "eyJraWQiOiJlZjE1ZmQyMC1kMGVkLTQwNzgtYmQ3MC1iMTcxZDJiZmE0NzQiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjbGllbnRfYWRtaW4tcHJvZHVjdGlvbiIsImF1ZCI6ImNsaWVudF9hZG1pbi1wcm9kdWN0aW9uIiwibmJmIjoxNzQ4MTE2Mjg3LCJzY29wZSI6WyJBRE1JTklTVFJBRE9SIl0sImlzcyI6Imh0dHA6Ly8xNS4yMjguMjQ3LjE2MDo4MDgwIiwiZXhwIjoxNzQ4Mzc5MDg3LCJpYXQiOjE3NDgxMTYyODcsImp0aSI6ImIxYWQ1NThhLWM2YTEtNGZiNi1iODI1LWZkNDU5YTY2OTdmNiJ9.rDdxJLuYtpcvdu6HC9ItxZnmchpxpov0ppM_z92v_ITJDm5KXIrR3qQK6LqGymYQiZD9KZwUPcZJG-zotihcE5lPKazJrtfL_ObfkxqBB5MKVG9vRkEQZt20x-x0BuHE5AmMqakcEdSuGFiEIx4795_9yP7e_3C9tYWNdpCnMjQazZRoYc_O_liJlsu2LcODRLiTq8nGcAF-EbOwH0Xg0_OsRdLYN9fOSWhhbhDXvYRfa2RN_4GV9okh75bnJRFf_pKfRpFog4EElpkB4YpAtM6dgQhVzTXOEPDd6IMZRILjoDfwCiGD1AgGoVB0rbwzq4-TsmKbs_lqCX_efqwqhQ";

export function useUsuarios(ativo: boolean = true) {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!ativo) return;

    const carregarUsuarios = async () => {
      setCarregando(true);
      try {
        const res = await fetch(`${API_URL}?login=Admin`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
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

  return { usuarios, erro, carregando };
}
