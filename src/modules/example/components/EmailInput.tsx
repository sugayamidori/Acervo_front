// components/EmailInput.tsx
import { Input } from "@acervo/components/ui/input"

export function EmailInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      type="email"
      placeholder="Digite seu email"
      className="border-blue-500 focus-visible:ring-blue-300"
      {...props}
    />
  )
}
