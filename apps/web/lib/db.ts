import { categoryRepo, type Category } from "./products";

export type { Category };

export async function getCategories(): Promise<Category[]> {
  try {
    return await categoryRepo.getAll();
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
    return []; // fallback: array vazio em caso de erro
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    return await categoryRepo.getBySlug(slug);
  } catch {
    return null;
  }
}
