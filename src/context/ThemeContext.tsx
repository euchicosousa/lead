import React, { createContext, useContext, useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: ThemeMode
  effectiveTheme: 'light' | 'dark'
  setThemeMode: (mode: ThemeMode) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme_mode') as ThemeMode
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved
    return 'system'
  })

  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const effectiveTheme = themeMode === 'system' ? systemTheme : themeMode

  useEffect(() => {
    localStorage.setItem('theme_mode', themeMode)
    const faviconLink = document.getElementById('favicon') as HTMLLinkElement | null
    if (effectiveTheme === 'dark') {
      document.documentElement.classList.add('dark')
      if (faviconLink) faviconLink.href = '/ico-white.png'
    } else {
      document.documentElement.classList.remove('dark')
      if (faviconLink) faviconLink.href = '/ico-black.png'
    }
  }, [themeMode, effectiveTheme])

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode)
  }

  const toggleTheme = () => {
    if (themeMode === 'system') {
      setThemeModeState('dark')
    } else if (themeMode === 'dark') {
      setThemeModeState('light')
    } else {
      setThemeModeState('system')
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: themeMode,
        effectiveTheme,
        setThemeMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
