import { API_ENDPOINTS } from '@/constants';
import { Product, ApiResponse } from '@/types/product';

async function fetchWithErrorHandling<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchProducts(page: number, limit: number): Promise<ApiResponse> {
  const skip = (page - 1) * limit;
  const url = API_ENDPOINTS.PRODUCTS_PAGINATED(limit, skip);
  return fetchWithErrorHandling<ApiResponse>(url);
}

export async function fetchProductsByCategory(
  category: string, 
  page: number, 
  limit: number
): Promise<ApiResponse> {
  const skip = (page - 1) * limit;
  const url = API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category, limit, skip);
  return fetchWithErrorHandling<ApiResponse>(url);
}

export async function fetchProductById(id: number): Promise<Product> {
  const url = API_ENDPOINTS.PRODUCT_BY_ID(id);
  return fetchWithErrorHandling<Product>(url);
}

export async function fetchCategories(): Promise<string[]> {
  const data = await fetchWithErrorHandling<any[]>(API_ENDPOINTS.CATEGORIES);
  return data.map((cat: any) => cat.slug || cat.name || cat);
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'name-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'discount-desc':
      return sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
    default:
      return sorted;
  }
}

export function filterProductsBySearch(products: Product[], searchTerm: string): Product[] {
  if (!searchTerm.trim()) return products;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return products.filter(product =>
    product.title.toLowerCase().includes(lowerSearchTerm) ||
    product.description.toLowerCase().includes(lowerSearchTerm) ||
    product.brand.toLowerCase().includes(lowerSearchTerm)
  );
}

export function formatCategoryName(category: string): string {
  if (typeof category !== 'string') return category;
  return category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ');
}

export function calculateOriginalPrice(price: number, discountPercentage: number): number {
  return price / (1 - discountPercentage / 100);
}

export function calculateSavings(price: number, discountPercentage: number): number {
  const originalPrice = calculateOriginalPrice(price, discountPercentage);
  return originalPrice - price;
}