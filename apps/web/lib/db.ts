import { supabase } from './supabaseClient';

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: string;
}

// Função para buscar categorias - será usada em Server Components
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('Erro ao buscar categorias:', error);
    return []; // fallback: array vazio em caso de erro
  }

  return data;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}