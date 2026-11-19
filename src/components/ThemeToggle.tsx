import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      className="size-11"
      onClick={toggleTheme}
      aria-label="Modo escuro"
      aria-pressed={theme === 'dark'}
    >
      {/* O ícone segue a classe .dark via CSS: aparece certo antes mesmo de o React saber o tema. */}
      <Moon aria-hidden="true" className="dark:hidden" />
      <Sun aria-hidden="true" className="hidden dark:block" />
    </Button>
  )
}
