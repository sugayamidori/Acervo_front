// components/EmailInput.tsx
import { Input } from "@acervo/components/ui/input"

export function EmailInput(props: React.ComponentProps<typeof Input>) {
  return (
    <Input
      type="email"
      placeholder="Digite seu email"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 w-full max-w-6xl"
      {...props}
    />
  )
}
