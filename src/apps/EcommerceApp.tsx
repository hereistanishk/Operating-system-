import React, { useState } from 'react';
import { ShoppingCart, ArrowLeft, Plus, Minus, Trash, CreditCard, ShoppingBag, Star, Package, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useOS } from '../context/OSContext';
import { useEcommerce, Product } from '../context/EcommerceContext';

export default function EcommerceApp() {
  const { darkMode } = useOS();
  const { products, placeOrder } = useEcommerce();
  const [view, setView] = useState<'home' | 'product' | 'cart' | 'checkout' | 'success'>('home');
  const [cart, setCart] = useState<{product: Product, quantity: number}[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };
  
  const handleCheckout = () => {
    // Generate order data
    const items = cart.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));
    
    // Simulate current user placing order
    placeOrder('Guest User', cartTotal, items);
    
    setView('success');
    setCart([]);
  };

  const renderHome = () => (
    <div className="flex-1 overflow-y-auto pb-10" style={{ WebkitOverflowScrolling: 'touch' }}>
      {/* Hero section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white rounded-b-3xl shadow-md">
        <h2 className="text-3xl font-bold mb-2">Summer Tech Sale</h2>
        <p className="text-blue-100 mb-6">Up to 30% off on selected electronical accessories</p>
        <button 
          onClick={() => setView('product')}
          className="bg-white text-indigo-600 px-6 py-2 rounded-full font-medium shadow-sm hover:bg-blue-50 transition-colors"
        >
          Shop Now
        </button>
      </div>

      {/* Product Grid */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className={cn("text-xl font-semibold", darkMode ? "text-white" : "text-gray-900")}>Featured Products</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {products.filter(p => p.status !== 'Out of Stock').map(product => (
            <div 
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setView('product');
              }}
              className={cn(
                "rounded-2xl overflow-hidden cursor-pointer shadow-sm border transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col",
                darkMode ? "bg-[#18181b] border-white/10" : "bg-white border-gray-100"
              )}
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <p className="text-xs text-blue-500 font-medium mb-1">{product.category}</p>
                <h4 className={cn("font-medium line-clamp-1 mb-1", darkMode ? "text-white" : "text-gray-900")}>{product.name}</h4>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className={cn("text-xs", darkMode ? "text-gray-400" : "text-gray-500")}>{product.rating}</span>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <span className={cn("font-bold", darkMode ? "text-white" : "text-gray-900")}>${product.price}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProduct = () => {
    if (!selectedProduct) return null;
    return (
      <div className="flex-1 flex flex-col overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="relative aspect-[4/3] w-full bg-gray-100">
            <button 
                onClick={() => setView('home')}
                className="absolute top-4 left-4 p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition z-10"
            >
                <ArrowLeft className="w-5 h-5" />
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
        </div>
        <div className={cn("flex-1 p-6 flex flex-col", darkMode ? "text-white" : "text-gray-900")}>
            <div className="flex items-start justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                    <p className="text-blue-500 font-medium">{selectedProduct.category}</p>
                </div>
                <div className="text-2xl font-bold">${selectedProduct.price}</div>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded text-yellow-700">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{selectedProduct.rating}</span>
                </div>
                <span className={cn("text-sm", darkMode ? "text-gray-400" : "text-gray-500")}>
                    ({selectedProduct.reviews} reviews)
                </span>
            </div>

            <div className="mb-8">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className={cn("leading-relaxed", darkMode ? "text-gray-300" : "text-gray-600")}>
                    {selectedProduct.description}
                </p>
            </div>

            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800 pb-10">
                <button 
                    onClick={() => { addToCart(selectedProduct); setView('cart'); }}
                    className="w-full py-4 rounded-xl font-medium bg-blue-600 text-white flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart - ${selectedProduct.price}
                </button>
            </div>
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className={cn("flex-1 flex flex-col p-6 overflow-y-auto", darkMode ? "text-white" : "text-gray-900")} style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setView('home')} className={cn("p-2 rounded-full", darkMode ? "hover:bg-white/10" : "hover:bg-gray-100")}>
                <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold">Your Cart</h2>
        </div>

        {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs">Looks like you haven't added any products to your cart yet.</p>
                <button 
                    onClick={() => setView('home')}
                    className="px-8 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                    Start Shopping
                </button>
            </div>
        ) : (
            <>
                <div className="flex-1 space-y-4">
                    {cart.map(item => (
                        <div key={item.product.id} className={cn("flex gap-4 p-4 rounded-2xl border", darkMode ? "bg-[#18181b] border-white/10" : "bg-white border-gray-100")}>
                            <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl" />
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                                    <button onClick={() => updateQuantity(item.product.id, -item.quantity)} className="text-gray-400 hover:text-red-500">
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-sm font-bold text-blue-500 mb-auto">${item.product.price}</p>
                                
                                <div className="flex items-center gap-3">
                                    <button onClick={() => updateQuantity(item.product.id, -1)} className={cn("p-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200", darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "")}>
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-4 text-center font-medium">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.product.id, 1)} className={cn("p-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200", darkMode ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "")}>
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className={cn("pt-6 mt-6 border-t", darkMode ? "border-white/10" : "border-gray-100")}>
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Subtotal</span>
                            <span className="font-medium">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className={darkMode ? "text-gray-400" : "text-gray-500"}>Shipping</span>
                            <span className="font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => setView('checkout')}
                        className="w-full py-4 rounded-xl font-medium bg-blue-600 text-white flex items-center justify-center gap-2 hover:bg-blue-700 transition mb-6"
                    >
                        Checkout
                    </button>
                </div>
            </>
        )}
    </div>
  );

  const renderCheckout = () => (
    <div className={cn("flex-1 p-6 overflow-y-auto flex flex-col", darkMode ? "text-white" : "text-gray-900")} style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setView('cart')} className={cn("p-2 rounded-full", darkMode ? "hover:bg-white/10" : "hover:bg-gray-100")}>
                <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold">Checkout</h2>
        </div>

        <div className="space-y-6 flex-1">
            <div className={cn("p-4 rounded-2xl border", darkMode ? "bg-[#18181b] border-white/10" : "bg-white border-gray-100")}>
                <h3 className="font-medium mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    Shipping Information
                </h3>
                <div className="space-y-3">
                    <input type="text" placeholder="Full Name" className={cn("w-full px-4 py-3 rounded-xl outline-none border focus:border-blue-500 transition-colors", darkMode ? "bg-black/50 border-white/10 text-white" : "bg-gray-50 border-gray-200")} />
                    <input type="text" placeholder="Address" className={cn("w-full px-4 py-3 rounded-xl outline-none border focus:border-blue-500 transition-colors", darkMode ? "bg-black/50 border-white/10 text-white" : "bg-gray-50 border-gray-200")} />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="City" className={cn("w-full px-4 py-3 rounded-xl outline-none border focus:border-blue-500 transition-colors", darkMode ? "bg-black/50 border-white/10 text-white" : "bg-gray-50 border-gray-200")} />
                        <input type="text" placeholder="ZIP" className={cn("w-full px-4 py-3 rounded-xl outline-none border focus:border-blue-500 transition-colors", darkMode ? "bg-black/50 border-white/10 text-white" : "bg-gray-50 border-gray-200")} />
                    </div>
                </div>
            </div>

            <div className={cn("p-4 rounded-2xl border", darkMode ? "bg-[#18181b] border-white/10" : "bg-white border-gray-100")}>
                <h3 className="font-medium mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    Payment Info
                </h3>
                <div className="space-y-3">
                    <input type="text" placeholder="Card Number" className={cn("w-full px-4 py-3 rounded-xl outline-none border focus:border-blue-500 transition-colors", darkMode ? "bg-black/50 border-white/10 text-white" : "bg-gray-50 border-gray-200")} />
                    <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="MM/YY" className={cn("w-full px-4 py-3 rounded-xl outline-none border focus:border-blue-500 transition-colors", darkMode ? "bg-black/50 border-white/10 text-white" : "bg-gray-50 border-gray-200")} />
                        <input type="text" placeholder="CVC" className={cn("w-full px-4 py-3 rounded-xl outline-none border focus:border-blue-500 transition-colors", darkMode ? "bg-black/50 border-white/10 text-white" : "bg-gray-50 border-gray-200")} />
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-8 pb-10">
            <button 
                onClick={handleCheckout}
                className="w-full py-4 rounded-xl font-medium bg-blue-600 text-white flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
                Pay ${cartTotal.toFixed(2)}
            </button>
        </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className={cn("text-2xl font-bold mb-2", darkMode ? "text-white" : "text-gray-900")}>Order Confirmed!</h2>
        <p className={cn("mb-8 max-w-sm", darkMode ? "text-gray-400" : "text-gray-500")}>
            Thank you for your purchase. We'll send you a confirmation email with your order details.
        </p>
        <button 
            onClick={() => setView('home')}
            className="px-8 py-3 rounded-xl font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
        >
            Continue Shopping
        </button>
    </div>
  );

  return (
    <div className={cn("flex flex-col h-full pt-8", darkMode ? "bg-black" : "bg-gray-50")}>
      {/* Top Header */}
      <div className={cn(
        "h-[60px] border-b flex items-center justify-between px-6 shrink-0",
        darkMode ? "bg-black border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
      )}>
        <h1 className="font-bold text-lg cursor-pointer" onClick={() => setView('home')}>Nexus Store</h1>
        
        <button 
          onClick={() => setView('cart')}
          className={cn("p-2 rounded-full relative", darkMode ? "hover:bg-white/10" : "hover:bg-gray-100")}
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-inherit">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col min-h-0 pointer-events-auto">
        {view === 'home' && renderHome()}
        {view === 'product' && renderProduct()}
        {view === 'cart' && renderCart()}
        {view === 'checkout' && renderCheckout()}
        {view === 'success' && renderSuccess()}
      </div>
    </div>
  );
}
