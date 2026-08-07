import { supabase } from './supabase'

export interface AnswerItem {
  question: string
  answer: string
}

export interface LeadPayload {
  name: string
  whatsapp: string
  main_need?: string
  answers?: AnswerItem[]
  completed?: boolean
}

export async function createLead(name: string, whatsapp: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('leads')
    .insert([{ name, whatsapp, answers: [] }])
    .select('id')
    .single()

  if (error) {
    console.error('Erro ao salvar lead inicial:', error)
    return null
  }

  return data?.id || null
}

export async function updateLead(
  id: string,
  payload: Partial<LeadPayload>
): Promise<boolean> {
  const { error } = await supabase
    .from('leads')
    .update(payload)
    .eq('id', id)

  if (error) {
    console.error('Erro ao atualizar lead:', error)
    return false
  }

  return true
}
