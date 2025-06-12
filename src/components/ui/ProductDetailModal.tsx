'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { ProductDetailModalProps } from '@/types/product';
import { scaleIn, staggerContainer, fadeInUp } from '@/utils/animations';

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  product, 
  isOpen, 
  onClose 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  const handleAddToCart = () => {
    console.log('Add to cart:', product?.id);
  };

  const handleAddToWishlist = () => {
    console.log('Add to wishlist:', product?.id);
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      >
          <div className="absolute inset-0 backdrop-blur-md bg-black/50" />
          
          <motion.div 
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-black/20"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-6 flex justify-between items-center z-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">{product.title}</h2>
                  <p className="text-sm text-gray-500 capitalize font-medium">{product.category}</p>
                </div>
              </div>
              <motion.button 
                onClick={onClose}
                className="p-3 hover:bg-gray-100/50 rounded-2xl transition-all duration-300 group"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
              </motion.button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8"
            >
              <div className="grid lg:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-6"
                >
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-3xl overflow-hidden aspect-square">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={currentImageIndex}
                        src={product.images[currentImageIndex] || product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                    </AnimatePresence>
                    
                    {product.images.length > 1 && (
                      <>
                        <motion.button 
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center"
                          whileHover={{ scale: 1.1, x: -3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </motion.button>
                        <motion.button 
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center"
                          whileHover={{ scale: 1.1, x: 3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        </motion.button>
                      </>
                    )}

                    {product.discountPercentage > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg shadow-red-500/25"
                      >
                        -{Math.round(product.discountPercentage)}% OFF
                      </motion.div>
                    )}

                    {product.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                        {currentImageIndex + 1} / {product.images.length}
                      </div>
                    )}
                  </div>
                  
                  {product.images.length > 1 && (
                    <motion.div 
                      className="flex gap-3 overflow-x-auto pb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {product.images.map((img, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                            currentImageIndex === index 
                              ? 'border-blue-500 shadow-lg shadow-blue-500/25' 
                              : 'border-gray-200/50 hover:border-gray-300'
                          }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-8"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-6">
                      <motion.span 
                        className="text-4xl font-black text-gray-900"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                      >
                        ${product.price}
                      </motion.span>
                      {product.discountPercentage > 0 && (
                        <div className="space-y-1">
                          <span className="text-xl text-gray-400 line-through font-medium">
                            ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                          </span>
                          <motion.div 
                            className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, type: "spring" }}
                          >
                            Save ${((product.price / (1 - product.discountPercentage / 100)) - product.price).toFixed(0)}
                          </motion.div>
                        </div>
                      )}
                    </div>
                    
                    <motion.div 
                      className="flex items-center gap-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-2xl">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-yellow-700">{product.rating}</span>
                        <span className="text-yellow-600 text-sm">rating</span>
                      </div>
                      <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-2xl">
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <span className="font-bold text-green-700">{product.stock}</span>
                        <span className="text-green-600 text-sm">in stock</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    className="space-y-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={fadeInUp} className="space-y-3">
                      <h3 className="text-lg font-bold text-gray-900">Description</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                    </motion.div>

                    <motion.div 
                      className="grid grid-cols-2 gap-6"
                      variants={fadeInUp}
                    >
                      <div className="bg-gray-50/50 p-4 rounded-2xl">
                        <h4 className="font-bold text-gray-900 mb-1">Brand</h4>
                        <p className="text-gray-600 font-medium">{product.brand}</p>
                      </div>
                      <div className="bg-gray-50/50 p-4 rounded-2xl">
                        <h4 className="font-bold text-gray-900 mb-1">Category</h4>
                        <p className="text-gray-600 font-medium capitalize">{product.category}</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="space-y-4"
                      variants={fadeInUp}
                    >
                      <motion.button 
                        onClick={handleAddToCart}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/25"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ShoppingCart className="w-6 h-6" />
                        Add to Cart
                      </motion.button>
                      
                      <motion.button 
                        onClick={handleAddToWishlist}
                        className="w-full bg-gray-100/50 hover:bg-gray-100 text-gray-700 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Star className="w-6 h-6" />
                        Add to Wishlist
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};