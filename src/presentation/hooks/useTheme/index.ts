import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Verifica se há tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      return savedTheme
    }

    // Verifica a preferência do sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }

    return 'light'
  })

  useEffect(() => {
    const html = document.documentElement

    // Remove ambas as classes primeiro
    html.classList.remove('light', 'dark')

    // Adiciona a classe do tema atual
    html.classList.add(theme)

    // Define o atributo data-theme
    html.setAttribute('data-theme', theme)

    // Salva no localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return { theme, setTheme }
}
