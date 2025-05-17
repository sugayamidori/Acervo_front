import { Header } from "@acervo/components/header";
// import { Table } from "@acervo/components/ui/table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@acervo/components/ui/table";

const invoices = [
  {
    ID: "01",
    Nome: "Matheus",
    Email: "Matheus@gmail.com",
    TipoUsuario: "Administrador",
    Ações: "Editar",
  },
  // {
  //   invoice: "INV002",
  //   paymentStatus: "Pending",
  //   totalAmount: "$150.00",
  //   paymentMethod: "PayPal",
  // },
  // {
  //   invoice: "INV003",
  //   paymentStatus: "Unpaid",
  //   totalAmount: "$350.00",
  //   paymentMethod: "Bank Transfer",
  // },
  // {
  //   invoice: "INV004",
  //   paymentStatus: "Paid",
  //   totalAmount: "$450.00",
  //   paymentMethod: "Credit Card",
  // },
  // {
  //   invoice: "INV005",
  //   paymentStatus: "Paid",
  //   totalAmount: "$550.00",
  //   paymentMethod: "PayPal",
  // },
  // {
  //   invoice: "INV006",
  //   paymentStatus: "Pending",
  //   totalAmount: "$200.00",
  //   paymentMethod: "Bank Transfer",
  // },
  // {
  //   invoice: "INV007",
  //   paymentStatus: "Unpaid",
  //   totalAmount: "$300.00",
  //   paymentMethod: "Credit Card",
  // },
];

export function TableDemo() {
  return (
    <div className="flex justify-center">
    <Table >
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Tipo Usuário</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.ID}>
            <TableCell className="font-medium">{invoice.ID}</TableCell>
            <TableCell>{invoice.Nome}</TableCell>
            <TableCell>{invoice.Email}</TableCell>
            <TableCell>{invoice.TipoUsuario}</TableCell>
            <TableCell>{invoice.Ações}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
    </div>
  )
}
const TelaAdmin = () => {
  return (
    <>
      <Header />
      <main className="pt-24 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Painel do Administrador</h1>
        <TableDemo />
      </main>
    </>
  );
};

export default TelaAdmin;
