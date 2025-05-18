import React from "react";
import Image from "next/image";
import Link from "next/link";

type CardProps = {
  id: string | number;
  image: string;
  title: string;
  description: string;
};

export function Card({ id, image, title, description }: CardProps) {
  return (
    <Link href={`/book/${id}`} className="no-underline">
  <div className="p-6 rounded-lg overflow-hidden bg-[#F7F7F7] flex flex-col h-full max-w-[260px] items-center px-10 cursor-pointer hover:shadow-lg transition-shadow">
    <div className="mb-4 flex-grow w-full flex justify-center">
      <Image
        src={image}
        alt={title}
        width={180}
        height={276}
        style={{ objectFit: "cover", width: "100%" }}
      />
    </div>
    <h2 className="font-semibold text-[14px] min-h-[48px] leading-snug break-words">{title}</h2>
    <p className="text-sm text-muted-foreground text-[12px] break-words">{description}</p>
  </div>
</Link>
  );
}
