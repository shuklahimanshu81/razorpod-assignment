export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }
  
  export interface ApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  
  export interface ProductCardProps {
    product: Product;
    onClick: () => void;
    index: number;
  }
  
  export interface ProductDetailModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
  }
  
  export interface FilterPanelProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    sortBy: string;
    setSortBy: (sort: string) => void;
    categories: string[];
    onClearFilters: () => void;
    showFilters: boolean;
  }
  
  export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    startResult: number;
    endResult: number;
    totalProducts: number;
  }
  
  export interface LoadingSpinnerProps {
    message?: string;
  }
  
  export interface ErrorStateProps {
    error: string;
    onRetry: () => void;
  }
  
  export interface HeaderProps {
    onFilterToggle: () => void;
  }
  
  export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc' | 'discount-desc' | '';

  export interface CategoryItem {
    slug?: string;
    name?: string;
    id?: number;
    url?: string;
  }
  
  export type CategoryResponse = string | CategoryItem;