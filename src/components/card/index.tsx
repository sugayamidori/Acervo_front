import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getBase64ImageSrc } from "@acervo/utils/formatter"; // Ajuste este caminho se necessário (ex: "utils/formatter" ou "@/utils/formatter")

type CardProps = {
  id: string | number;
  image: string; // A string base64 pura vinda do backend (assumimos ser PNG)
  title: string;
  autor: string;
};

export function Card({ id, image, title, autor }: CardProps) {
  // ASSUNÇÃO: Todas as imagens do backend são PNG.
  // Se isso mudar, esta lógica precisará ser ajustada ou o imageType precisará vir do backend.
  const assumedImageType = "image/png";

  // Gera o src da imagem formatado se a string base64 da imagem existir
  const imageSrc = image ? getBase64ImageSrc(image, assumedImageType) : "";

  return (
    <Link href={`/book/${id}`} className="no-underline">
      <div className="p-6 rounded-lg overflow-hidden bg-[#F7F7F7] flex flex-col h-full max-w-[260px] items-center px-10 cursor-pointer hover:shadow-lg transition-shadow">
        <div className="mb-4 flex-grow w-full flex justify-center">
          {imageSrc ? ( // Verifica se imageSrc foi gerado com sucesso
            <Image
              src={imageSrc} // Usa a string formatada aqui
              alt={title}
              width={180}
              height={276}
              style={{ objectFit: "cover", width: "100%" }} // Mantém o width: 100% para responsividade dentro do flex-grow
            />
          ) : (
            <div className="w-[180px] h-[276px] bg-gray-300 flex items-center justify-center text-gray-600 text-sm rounded">
              Imagem não disponível
            </div>
          )}
        </div>
        <h2 className="font-semibold text-[14px] min-h-[48px] leading-snug break-words">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground text-[12px] break-words">
          Por: {autor}
        </p>
      </div>
    </Link>
  );
}