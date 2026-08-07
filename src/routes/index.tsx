import { createFileRoute } from '@tanstack/react-router'
import { FormContainer } from '../components/FormContainer'
import { ThemeProvider } from '../context/ThemeContext'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <ThemeProvider>
      <FormContainer />
    </ThemeProvider>
  )
}
