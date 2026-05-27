import React, { useState } from 'react';
import { 
  Store, LayoutDashboard, Package, ShoppingCart, 
  TrendingUp, DollarSign, Plus, Trash, Edit, Search, ArrowUpRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useOS } from '../context/OSContext';
import { useEcommerce } from '../context/EcommerceContext';

export default function SellerDashboard() {
  const { darkMode } = useOS();
  const { products, orders, deleteProduct } = useEcommerce();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);
  const totalSales = products.reduce((acc, product) => acc + product.sales, 0);

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, trend: '+14%' },
          { title: 'Orders', value: orders.length.toString(), icon: ShoppingCart, trend: '+5%' },
          { title: 'Products Active', value: products.filter(p => p.status === 'Active').length, icon: Package, trend: '0%' },
          { title: 'Total Sales', value: totalSales.toString(), icon: TrendingUp, trend: '+1.2%' }
        ].map((stat, i) => (
          <div key={i} className={cn("p-4 rounded-xl border flex flex-col gap-2", darkMode ? "bg-[#18181b] border-white/10" : "bg-white border-gray-100")}>
            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
              {stat.title}
              <stat.icon className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-emerald-500 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              {stat.trend} from last month
            </div>
          </div>
        ))}
      </div>

      <div className={cn("rounded-xl border overflow-hidden", darkMode ? "bg-[#18181b] border-white/10" : "bg-white border-gray-100")}>
        <div className="p-4 border-b border-inherit">
          <h3 className="font-semibold">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className={cn("border-b", darkMode ? "bg-black/50 border-white/10 text-gray-400" : "bg-gray-50 border-gray-100 text-gray-500")}>
              <tr>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className={cn("border-b last:border-0", darkMode ? "border-white/5" : "border-gray-50")}>
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">${order.amount.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      order.status === 'Delivered' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : 
                      order.status === 'Processing' ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" : 
                      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
                    )}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => {
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      <div className="space-y-6 flex flex-col h-full pointer-events-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold">Product Inventory</h2>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        <div className={cn("flex-1 rounded-xl border flex flex-col overflow-hidden min-h-[400px]", darkMode ? "bg-[#18181b] border-white/10" : "bg-white border-gray-100")}>
          <div className="p-4 border-b border-inherit flex items-center gap-2 bg-inherit">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400"
            />
          </div>
          <div className="flex-1 overflow-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className={cn("border-b sticky top-0 z-10", darkMode ? "bg-[#18181b] border-white/10 text-gray-400" : "bg-gray-50 border-gray-100 text-gray-500")}>
                <tr>
                  <th className="p-4 font-medium">Product Name</th>
                  <th className="p-4 font-medium">Price</th>
                  <th className="p-4 font-medium">Stock</th>
                  <th className="p-4 font-medium">Sales</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} className={cn("border-b border-inherit last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors", darkMode ? "border-white/5" : "border-gray-50")}>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4">${product.price.toFixed(2)}</td>
                    <td className="p-4">{product.stock}</td>
                    <td className="p-4">{product.sales}</td>
                    <td className="p-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        product.status === 'Active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : 
                        product.status === 'Out of Stock' ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400" : 
                        "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
                      )}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 flex items-center justify-end gap-2">
                      <button className="p-2 rounded-md text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors" 
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderOrders = () => (
    <div className="space-y-6 flex flex-col h-full pointer-events-auto">
      <h2 className="text-2xl font-bold">All Orders</h2>
      <div className={cn("flex-1 rounded-xl border flex flex-col overflow-hidden min-h-[400px]", darkMode ? "bg-[#18181b] border-white/10" : "bg-white border-gray-100")}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className={cn("border-b sticky top-0", darkMode ? "bg-[#18181b] border-white/10 text-gray-400" : "bg-gray-50 border-gray-100 text-gray-500")}>
              <tr>
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Items</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className={cn("border-b last:border-0 hover:bg-black/5 dark:hover:bg-white/5 transition-colors", darkMode ? "border-white/5" : "border-gray-50")}>
                  <td className="p-4 font-medium">{order.id}</td>
                  <td className="p-4">{order.customer}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">${order.amount.toFixed(2)}</td>
                  <td className="p-4">{order.items.reduce((acc, item) => acc + item.quantity, 0)}</td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium",
                      order.status === 'Delivered' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : 
                      order.status === 'Processing' ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400" : 
                      "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400"
                    )}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("flex flex-col md:flex-row h-full w-full font-sans pointer-events-auto overflow-hidden", darkMode ? "bg-[#0B0D12] text-white" : "bg-gray-50 text-gray-900")}>
      {/* Sidebar Navigation */}
      <div className={cn(
        "w-full md:w-64 border-b md:border-b-0 md:border-r flex flex-row md:flex-col shrink-0 overflow-x-auto md:overflow-y-auto",
        darkMode ? "bg-black/40 border-white/10" : "bg-white border-gray-200"
      )}>
        <div className="p-4 md:p-6 flex items-center gap-2 font-bold text-lg shrink-0">
          <Store className="w-6 h-6 text-emerald-500" />
          <span className="hidden md:inline">Seller Hub</span>
        </div>
        
        <nav className="flex md:flex-col gap-1 p-2 md:p-4 flex-1">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors shrink-0",
                activeTab === tab.id 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                  : "hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400"
              )}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content Pane */}
      <div className="flex-1 min-h-0 p-4 md:p-8 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'orders' && renderOrders()}
      </div>
    </div>
  );
}
