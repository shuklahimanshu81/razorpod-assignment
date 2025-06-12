import { useState, useEffect, useMemo } from 'react';
import { PAGINATION } from '@/constants';

interface UsePaginationParams {
    totalItems: number;
    itemsPerPage?: number;
    resetTriggers?: (string | number | boolean | null | undefined)[];
  }

interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  startResult: number;
  endResult: number;
  pageNumbers: number[];
  setCurrentPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function usePagination({ 
  totalItems, 
  itemsPerPage = PAGINATION.PRODUCTS_PER_PAGE,
  resetTriggers = []
}: UsePaginationParams): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (resetTriggers.length > 0) {
      setCurrentPage(1);
    }
  }, resetTriggers);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startResult = (currentPage - 1) * itemsPerPage + 1;
  const endResult = Math.min(currentPage * itemsPerPage, totalItems);

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];
    const maxVisible = PAGINATION.MAX_VISIBLE_PAGES;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;

  return {
    currentPage,
    totalPages,
    startResult,
    endResult,
    pageNumbers,
    setCurrentPage,
    goToNextPage,
    goToPreviousPage,
    canGoNext,
    canGoPrevious
  };
}