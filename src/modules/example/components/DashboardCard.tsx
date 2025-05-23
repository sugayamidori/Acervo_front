// components/DashboardCard.tsx
// import { Card, CardContent } from "@/components/ui/card";
import { Card, CardContent } from "../../../components/ui/card";

import { ReactNode } from "react";

interface DashboardCardProps {
  icon: ReactNode;
  label: string;
  value: number;
  bgColor: string; // Tailwind color, ex: "bg-blue-400"
}

export function DashboardCard({ icon, label, value, bgColor }: DashboardCardProps) {
  return (
    <Card className="w-full max-w-xs shadow-sm">
      <CardContent className="flex items-center gap-4 p-4">
        <div className={`rounded-full p-3 ${bgColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </CardContent>
    </Card>
  );
}
