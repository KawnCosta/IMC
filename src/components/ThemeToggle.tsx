import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      className="size-11"
      onClick={toggleTheme}
      aria-label="Modo escuro"
      aria-pressed={isDark}
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  )
}
