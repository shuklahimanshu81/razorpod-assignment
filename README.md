# 🛍️ Razorpod Assignment : Interactive Data Explorer

A modern, responsive product browsing experience built with React and TypeScript. This project demonstrates advanced frontend techniques including animation systems, state management, and API integration.

![Interactive Data Explorer](https://raw.githubusercontent.com/shuklahimanshu81/razorpod-assignment/refs/heads/main/public/preview.png)

## 🎯 What This Project Is About

I built this as a showcase of modern React development practices, combining beautiful UI/UX with solid engineering fundamentals. It's a product catalog that feels smooth, looks great, and handles real-world scenarios like loading states, error handling, and responsive design.

**Live Demo:** [View Live](https://razorpod-assignment-himanshu.netlify.app/) | **API:** [DummyJSON Products](https://dummyjson.com/products)

## ✨ Features I'm Proud Of

### 🎨 **Modern UI/UX**
- **Glassmorphism design** with backdrop blur effects
- **Smooth animations** using Framer Motion throughout
- **Responsive grid** that works beautifully on all devices
- **Interactive hover states** that feel satisfying

### ⚡ **Performance & UX**
- **Intelligent pagination** with clean URL management
- **Real-time search** with instant filtering
- **Advanced sorting** by price, name, rating, and discount
- **Loading skeletons** that match the final content layout

### 🔧 **Technical Highlights**
- **Custom hooks** for data fetching and state management
- **TypeScript throughout** with proper interface definitions
- **Component composition** following React best practices
- **Error boundaries** with graceful fallbacks

### 🎭 **Animation System**
- **Staggered entrance animations** for product cards
- **Modal transitions** with spring physics
- **Micro-interactions** on buttons and cards
- **Layout animations** when filtering/sorting

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/shuklahimanshu81/razorpod-assignment
cd razorpod-assignment

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

That's it! The app will fetch products from the DummyJSON API and you're ready to explore.

## 🏗️ Project Structure

I organized the code to be maintainable and scalable:

```
src/
├── app/                    # Next.js app directory
│   └── page.tsx           # Main application component
├── components/            # Reusable UI components
│   ├── layout/
│   │   └── Header.tsx     # App header with branding
│   └── ui/
│       ├── ProductCard.tsx        # Individual product display
│       ├── ProductDetailModal.tsx # Product detail popup
│       ├── FilterPanel.tsx        # Search and filter controls
│       ├── Pagination.tsx         # Page navigation
│       ├── LoadingSpinner.tsx     # Loading states
│       └── ErrorState.tsx         # Error handling
├── hooks/                 # Custom React hooks
│   ├── useProducts.ts     # Product data management
│   ├── useCategories.ts   # Category data fetching
│   └── usePagination.ts   # Pagination logic
├── types/                 # TypeScript definitions
│   └── product.ts         # Product and API interfaces
├── utils/                 # Helper functions
│   ├── api.ts            # API calls and data processing
│   └── animations.ts     # Framer Motion variants
└── constants/            # App configuration
    └── index.ts          # API endpoints and settings
```

## 🎨 Design Decisions

### Why I Chose These Technologies

**React + TypeScript**: The type safety has saved me countless hours of debugging, especially when working with the API responses.

**Framer Motion**: After trying several animation libraries, Framer Motion felt the most intuitive for creating the smooth, spring-based animations I wanted.

**Tailwind CSS**: The utility-first approach let me iterate quickly on the design while keeping the CSS bundle small.

**Custom Hooks**: I extracted data fetching logic into hooks to keep components focused on rendering and make the logic reusable.

### Animation Philosophy

I believe animations should enhance the user experience, not distract from it. Each animation serves a purpose:
- **Entrance animations** help users understand the page structure
- **Hover effects** provide immediate feedback
- **Loading states** reduce perceived wait time
- **Modal transitions** create spatial context

## 🔧 Technical Implementation

### State Management Approach

Instead of reaching for Redux immediately, I used a combination of:
- **React's built-in state** for component-specific data
- **Custom hooks** for shared logic and API state
- **URL state** for filters and pagination (makes sharing links possible)

### Error Handling Strategy

I implemented error handling at multiple levels:
- **Network errors** are caught and displayed with retry options
- **Invalid product IDs** show helpful 404-style messages  
- **API timeouts** fall back gracefully with loading indicators
- **Image loading failures** show placeholder content

### Performance Optimizations

- **Debounced search** to avoid excessive API calls
- **Memoized calculations** for sorting and filtering
- **Optimized re-renders** using proper dependency arrays
- **Image lazy loading** for better initial page load

## 🎯 API Integration

The app integrates with the DummyJSON API:

```typescript
// Clean API abstraction
const fetchProducts = async (page: number, limit: number): Promise<ApiResponse> => {
  const skip = (page - 1) * limit;
  const url = `${API_BASE}/products?limit=${limit}&skip=${skip}`;
  return fetchWithErrorHandling<ApiResponse>(url);
};
```

I wrapped all API calls with error handling and added response caching for better UX.

## 🧪 What I Learned Building This

### Challenges I Overcame

**Animation Performance**: Initially, I had too many elements animating simultaneously. I solved this by implementing staggered animations and using `transform` properties instead of animating layout properties.

**State Synchronization**: Keeping URL state, component state, and API state in sync was tricky. I ended up creating a custom hook that manages all three sources of truth.

**TypeScript Complexity**: The DummyJSON API responses have some inconsistencies. I created robust types that handle the edge cases while maintaining type safety.

### What I'd Do Differently Next Time

- **Add testing earlier** - I focused on functionality first, but having tests would have caught some edge cases sooner
- **Implement virtualization** - For very large product lists, virtual scrolling would improve performance
- **Add proper caching** - A simple cache layer would reduce API calls and improve perceived performance

## 🛠️ Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript compilation check
```

## 📱 Browser Support

- **Chrome/Edge**: Full support with all animations
- **Firefox**: Full support  
- **Safari**: Full support (tested on macOS and iOS)
- **Mobile browsers**: Responsive design works on all modern mobile browsers

## 🎨 Design System

I created a small but consistent design system:

### Colors
- **Primary**: Blue to purple gradients
- **Secondary**: Warm grays for backgrounds
- **Accent**: Emerald for success states, red for errors
- **Text**: High contrast grays for accessibility

### Typography
- **Headings**: Inter font with tight tracking
- **Body**: Inter with relaxed line height for readability
- **UI Elements**: Medium weight for better hierarchy


*Built with ❤️ and way too much coffee ☕*