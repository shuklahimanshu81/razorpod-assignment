import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { fetchProducts, fetchProductsByCategory, sortProducts, filterProductsBySearch } from '@/utils/api';
import { PAGINATION } from '@/constants';

interface UseProductsReturn {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  totalProducts: number;
  refetch: () => void;
}

interface UseProductsParams {
  currentPage: number;
  selectedCategory: string;
  searchTerm: string;
  sortBy: string;
}

export function useProducts({ 
  currentPage, 
  selectedCategory, 
  searchTerm, 
  sortBy 
}: UseProductsParams): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProductsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (selectedCategory) {
        data = await fetchProductsByCategory(
          selectedCategory, 
          currentPage, 
          PAGINATION.PRODUCTS_PER_PAGE
        );
      } else {
        data = await fetchProducts(
          currentPage, 
          PAGINATION.PRODUCTS_PER_PAGE
        );
      }
      
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    let filtered = [...products];

    filtered = filterProductsBySearch(filtered, searchTerm);

    filtered = sortProducts(filtered, sortBy);

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy]);

  const refetch = () => {
    fetchProductsData();
  };

  return {
    products,
    filteredProducts,
    loading,
    error,
    totalProducts,
    refetch
  };
}