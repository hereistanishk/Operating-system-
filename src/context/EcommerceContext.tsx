import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: string;
  sales: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  items: { productId: string; quantity: number }[];
}

interface EcommerceContextType {
  products: Product[];
  orders: Order[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  placeOrder: (customer: string, amount: number, items: { productId: string; quantity: number }[]) => void;
}

const INITIAL_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Nexus ProBook', 
    price: 1299, 
    stock: 45, 
    status: 'Active', 
    sales: 124,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600',
    description: 'Ultra-thin, high-performance laptop designed for professionals. Features a stunning 14" OLED display and all-day battery life.',
    rating: 4.8,
    reviews: 124
  },
  { 
    id: '2', 
    name: 'SonicWave Earbuds', 
    price: 149, 
    stock: 12, 
    status: 'Low Stock', 
    sales: 89,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
    description: 'Active noise cancellation earbuds with crystal clear sound and 24 hours of playback time with the charging case.',
    rating: 4.6,
    reviews: 89
  },
  { 
    id: '3', 
    name: 'Vanguard Smartwatch', 
    price: 299, 
    stock: 0, 
    status: 'Out of Stock', 
    sales: 210,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600',
    description: 'Advanced fitness tracking, heart rate monitoring, and seamless notifications straight to your wrist.',
    rating: 4.5,
    reviews: 210
  },
  { 
    id: '4', 
    name: 'Luminal Keyboard', 
    price: 129, 
    stock: 88, 
    status: 'Active', 
    sales: 56,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a0e2?auto=format&fit=crop&q=80&w=600',
    description: 'Mechanical keyboard with customizable RGB lighting and tactile switches for the ultimate typing experience.',
    rating: 4.9,
    reviews: 56
  },
  { 
    id: '5', 
    name: 'Aero Desk Chair', 
    price: 349, 
    stock: 34, 
    status: 'Active', 
    sales: 178,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600',
    description: 'Ergonomic office chair with breathable mesh back and adjustable lumbar support perfectly suited for long hours.',
    rating: 4.7,
    reviews: 432
  },
  {
    id: '6',
    name: 'Focus 4K Monitor',
    price: 499,
    stock: 50,
    status: 'Active',
    sales: 178,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600',
    description: '27-inch 4K UHD monitor delivering stunning visual quality and color accuracy for creators and gamers alike.',
    rating: 4.8,
    reviews: 178
  }
];

const INITIAL_ORDERS: Order[] = [
  { id: 'ORD-001', customer: 'Alice Johnson', date: '2026-05-18', amount: 1299, status: 'Processing', items: [{ productId: '1', quantity: 1 }] },
  { id: 'ORD-002', customer: 'Bob Smith', date: '2026-05-17', amount: 149, status: 'Shipped', items: [{ productId: '2', quantity: 1 }] },
  { id: 'ORD-003', customer: 'Charlie Davis', date: '2026-05-16', amount: 299, status: 'Delivered', items: [{ productId: '3', quantity: 1 }] },
  { id: 'ORD-004', customer: 'Diana Prince', date: '2026-05-15', amount: 499, status: 'Processing', items: [{ productId: '6', quantity: 1 }] },
];

const EcommerceContext = createContext<EcommerceContextType | undefined>(undefined);

export function EcommerceProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('os_ecommerce_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('os_ecommerce_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('os_ecommerce_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('os_ecommerce_orders', JSON.stringify(orders));
  }, [orders]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const placeOrder = (customer: string, amount: number, items: { productId: string; quantity: number }[]) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer,
      date: new Date().toISOString().split('T')[0],
      amount,
      status: 'Processing',
      items,
    };
    
    setOrders(prev => [newOrder, ...prev]);

    // Also update product stock and sales
    setProducts(prev => prev.map(p => {
      const orderItem = items.find(item => item.productId === p.id);
      if (orderItem) {
        const newStock = Math.max(0, p.stock - orderItem.quantity);
        return { 
          ...p, 
          stock: newStock, 
          sales: p.sales + orderItem.quantity,
          status: newStock === 0 ? 'Out of Stock' : (newStock < 20 ? 'Low Stock' : 'Active')
        };
      }
      return p;
    }));
  };

  return (
    <EcommerceContext.Provider value={{
      products,
      orders,
      addProduct,
      updateProduct,
      deleteProduct,
      placeOrder
    }}>
      {children}
    </EcommerceContext.Provider>
  );
}

export function useEcommerce() {
  const context = useContext(EcommerceContext);
  if (context === undefined) {
    throw new Error('useEcommerce must be used within an EcommerceProvider');
  }
  return context;
}
