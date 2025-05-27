"use client";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@acervo/components/ui/dialog";
import { Button } from "@acervo/components/ui/button";
import { useState } from "react";

interface LoanDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formattedReturnDate: string;
}

export function LoanDialog({
  isOpen,
  onOpenChange,
  formattedReturnDate,
}: LoanDialogProps) {
  const [code, setCode] = useState<string | null>(null);

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let generatedCode = "";
    for (let i = 0; i < 6; i++) {
      generatedCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return generatedCode;
  };

  const handleConfirm = () => {
    const newCode = generateCode();
    setCode(newCode);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCode(null);
    }
    onOpenChange(open);
  };

  return (
    <DialogContent onInteractOutside={() => handleOpenChange(false)}>
      <DialogHeader>
        <DialogTitle>Confirmar empréstimo</DialogTitle>

        {!code ? (
          <DialogDescription className="text-base">
            Deseja confirmar o empréstimo do livro? <br />A devolução deve ser
            feita até <strong>{formattedReturnDate}</strong> (7 dias corridos).
          </DialogDescription>
        ) : (
          <>
            <DialogDescription className="text-base">
              Empréstimo realizado com sucesso! <br />
              Apresente este código na biblioteca:
            </DialogDescription>
            <p className="mt-3 text-2xl font-bold tracking-widest bg-gray-100 p-2 rounded">
              {code}
            </p>
          </>
        )}
      </DialogHeader>

      <DialogFooter className="flex justify-end gap-4">
        {!code ? (
          <>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#007A7C]" onClick={handleConfirm}>
              Confirmar
            </Button>
          </>
        ) : (
          <Button onClick={() => handleOpenChange(false)}>Fechar</Button>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
