'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpDown, ChevronRight } from 'lucide-react';
import { FilterPanelProps } from '@/types/product';
import { slideInFromRight, staggerContainer, fadeInUp, buttonHover, buttonTap } from '@/utils/animations';
import { formatCategoryName } from '@/utils/api';
import { SORT_OPTIONS } from '@/constants';

export const FilterPanel: React.FC<FilterPanelProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
  onClearFilters,
  showFilters,
}) => {
  const shouldShowFilters = showFilters || (typeof window !== 'undefined' && window.innerWidth >= 768);

  return (
    <AnimatePresence>
      {shouldShowFilters && (
        <motion.div 
          className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl sm:rounded-3xl shadow-xl shadow-black/5 p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 w-full"
          variants={slideInFromRight}
          initial="hidden"
          animate="visible"
          exit="hidden"
          layout
        >
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} className="relative group sm:col-span-2 lg:col-span-1">
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50/50 border border-gray-200/50 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white/80 transition-all duration-300 text-gray-900 placeholder-gray-500 text-sm sm:text-base"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-gray-50/50 border border-gray-200/50 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white/80 transition-all duration-300 text-gray-900 appearance-none cursor-pointer text-sm sm:text-base"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {formatCategoryName(category)}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-90" />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative group">
              <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gray-50/50 border border-gray-200/50 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white/80 transition-all duration-300 text-gray-900 appearance-none cursor-pointer text-sm sm:text-base"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.button
              variants={fadeInUp}
              onClick={onClearFilters}
              className="px-4 sm:px-6 py-3 sm:py-4 text-gray-600 hover:text-gray-900 bg-gray-100/50 hover:bg-gray-100 border border-gray-200/50 hover:border-gray-300/50 rounded-xl sm:rounded-2xl transition-all duration-300 font-semibold text-sm sm:text-base"
              whileHover={{ ...buttonHover, y: -1 }}
              whileTap={buttonTap}
            >
              Clear Filters
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
