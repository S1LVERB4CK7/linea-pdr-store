import { supabase } from './supabaseClient';

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: string;
  stock: number;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  is_on_promotion: boolean;
  promotion_price: number | null;
}

// Repositório de categorias
export const categoryRepo = {
  async getAll(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error || !data) return null;
    return data;
  }
};

// Repositório de produtos
export const productRepo = {
  async getByCategory(categorySlug: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('categories.slug', categorySlug)
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getFeatured(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true)
      .limit(8);
    
    if (error) throw error;
    return data;
  }
};