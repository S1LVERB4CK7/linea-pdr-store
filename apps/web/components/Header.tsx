import { getCategories } from '@/lib/db';
import { HeaderClient } from './HeaderClient';

export default async function Header() {
  const categories = await getCategories();
  return <HeaderClient categories={categories} />;
}