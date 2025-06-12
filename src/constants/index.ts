
export const API_ENDPOINTS = {
    PRODUCTS: 'https://dummyjson.com/products',
    CATEGORIES: 'https://dummyjson.com/products/categories',
    PRODUCT_BY_ID: (id: number) => `https://dummyjson.com/products/${id}`,
    PRODUCTS_BY_CATEGORY: (category: string, limit: number, skip: number) => 
      `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`,
    PRODUCTS_PAGINATED: (limit: number, skip: number) => 
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  } as const;
  

  export const PAGINATION = {
    PRODUCTS_PER_PAGE: 12,
    MAX_VISIBLE_PAGES: 5
  } as const;
  
  export const SORT_OPTIONS = [
    { value: '', label: 'Sort by' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'rating-desc', label: 'Rating: High to Low' },
    { value: 'discount-desc', label: 'Discount: High to Low' }
  ] as const;
  
  export const ANIMATION_DELAYS = {
    CARD_STAGGER: 0.05,
    MODAL_CONTENT: 0.1,
    FILTER_PANEL: 0.2
  } as const;
  
  export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536
  } as const;
  
  export const MESSAGES = {
    LOADING: 'Loading amazing products...',
    ERROR_GENERIC: 'Failed to load products. Please try again.',
    ERROR_CATEGORIES: 'Failed to fetch categories',
    ERROR_PRODUCT_DETAILS: 'Failed to fetch product details',
    NO_PRODUCTS_FOUND: 'No products found',
    NO_PRODUCTS_DESCRIPTION: 'We couldn\'t find any products matching your criteria. Try adjusting your search or filters.',
    IMAGE_UNAVAILABLE: 'Image unavailable'
  } as const;