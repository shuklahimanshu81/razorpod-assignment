// components/ui/ProductCard.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { ProductCardProps } from '../../types/product';
import { fadeInUp, cardHover } from '../../utils/animations';
import { calculateSavings } from '../../utils/api';

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Add to cart:', product.id);
  };

  return (
    <motion.div 
      layout
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ delay: index * 0.05 }}
      whileHover={cardHover}
      whileTap={{ scale: 0.97 }}
      className="group relative bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-3xl overflow-hidden cursor-pointer hover:bg-white/90 hover:border-gray-300/70 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/5 pointer-events-none" />
      
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 aspect-[4/3]">
        <motion.div 
          className="w-full h-full flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            {!imageLoaded && !imageError && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
                <div className="text-xs text-gray-400 font-medium">Loading...</div>
              </motion.div>
            )}
            {imageError ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-gray-400 text-center p-6"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium">Image unavailable</p>
              </motion.div>
            ) : (
              <motion.img 
                key="image"
                src={product.thumbnail} 
                alt={product.title}
                className={`w-full h-full object-cover ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: imageLoaded ? 1 : 0,
                  scale: 1
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                whileHover={{ scale: 1.08 }}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            )}
          </AnimatePresence>
        </motion.div>
        
        {product.discountPercentage > 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 15 }}
            className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-red-500/25"
          >
            -{Math.round(product.discountPercentage)}%
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center"
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-900 shadow-lg"
          >
            View Details
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="p-6 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="space-y-2">
          <motion.h3 
            className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors duration-300"
            whileHover={{ scale: 1.01 }}
          >
            {product.title}
          </motion.h3>
          <motion.span 
            className="inline-block px-3 py-1 bg-gray-100/80 text-gray-600 text-xs font-medium rounded-full capitalize tracking-wide"
            whileHover={{ backgroundColor: "rgb(243 244 246)" }}
          >
            {product.category}
          </motion.span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-yellow-700">{product.rating}</span>
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {product.stock} left
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
        </div>
        
        <div className="flex items-end justify-between pt-2">
          <div className="space-y-1">
            <motion.div 
              className="text-2xl font-black text-gray-900"
              whileHover={{ scale: 1.05 }}
            >
              ${product.price}
            </motion.div>
            {product.discountPercentage > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400 line-through font-medium">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                  Save ${calculateSavings(product.price, product.discountPercentage).toFixed(0)}
                </span>
              </div>
            )}
          </div>
          
          <motion.button
            onClick={handleAddToCart}
            className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300"
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};