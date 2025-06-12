'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Header } from '../components/layout/Header';
import { FilterPanel } from '../components/ui/FilterPanel';
import { ProductCard } from '../components/ui/ProductCard';
import { ProductDetailModal } from '../components/ui/ProductDetailModal';
import { Pagination } from '../components/ui/Pagination';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorState } from '../components/ui/ErrorState';

import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { usePagination } from '../hooks/usePagination';

import { Product } from '../types/product';
import { fetchProductById } from '../utils/api';
import { staggerContainer, scaleIn } from '../utils/animations';
import {  PAGINATION } from '../constants';

export default function ProductShowcaseExplorer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { categories } = useCategories();

  const pagination = usePagination({
    totalItems: 0, 
    itemsPerPage: PAGINATION.PRODUCTS_PER_PAGE,
    resetTriggers: [selectedCategory, searchTerm]
  });

  const { 
    filteredProducts, 
    loading, 
    error, 
    totalProducts, 
    refetch 
  } = useProducts({
    currentPage: pagination.currentPage,
    selectedCategory,
    searchTerm,
    sortBy
  });

  const totalPages = Math.ceil(totalProducts / PAGINATION.PRODUCTS_PER_PAGE);
  const startResult = (pagination.currentPage - 1) * PAGINATION.PRODUCTS_PER_PAGE + 1;
  const endResult = Math.min(pagination.currentPage * PAGINATION.PRODUCTS_PER_PAGE, totalProducts);

  const openProductDetail = async (productId: number) => {
    try {
      const product = await fetchProductById(productId);
      setSelectedProduct(product);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Failed to fetch product details:', err);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50 w-full overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Header onFilterToggle={() => setShowFilters(!showFilters)} />

      <div className="w-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          
          <FilterPanel
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            categories={categories}
            onClearFilters={clearFilters}
            showFilters={showFilters}
          />

          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div key="products" layout>
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 w-full place-items-center sm:place-items-stretch"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  layout
                >
                  <AnimatePresence>
                    {filteredProducts.map((product, index) => (
                      <div key={product.id} className="w-full max-w-sm sm:max-w-none">
                        <ProductCard
                          product={product}
                          index={index}
                          onClick={() => openProductDetail(product.id)}
                        />
                      </div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={totalPages}
                  onPageChange={pagination.setCurrentPage}
                  startResult={startResult}
                  endResult={endResult}
                  totalProducts={totalProducts}
                />
              </motion.div>
            ) : (
              <motion.div 
                key="no-results"
                className="text-center py-12 sm:py-20 px-4"
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </motion.div>
  );
}

