import React from 'react';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  AlertCircle
} from 'lucide-react';

const Dashboard = () => {
  const stats = {
    users: 12543,
    products: 834,
    orders: 1432,
    revenue: 845962,
    growth: 23.5,
    pending: 47
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Users div */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 border-slate-700 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 mb-1">Total Users</p>
                  <h2 className="text-3xl font-bold text-white">
                    {stats.users.toLocaleString()}
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+12% this month</span>
              </div>
            </div>
          </div>

          {/* Products div */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 border-slate-700 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer  transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 mb-1">Total Products</p>
                  <h2 className="text-3xl font-bold text-white">
                    {stats.products.toLocaleString()}
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-3 rounded-full">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-slate-300">
                <span className="text-sm">32 categories</span>
              </div>
            </div>
          </div>

          {/* Orders div */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 border-slate-700 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer  transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 mb-1">Total Orders</p>
                  <h2 className="text-3xl font-bold text-white">
                    {stats.orders.toLocaleString()}
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-full">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-yellow-400">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">{stats.pending} pending orders</span>
              </div>
            </div>
          </div>

          {/* Revenue div */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 border-slate-700 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-300 mb-1">Total Revenue</p>
                  <h2 className="text-3xl font-bold text-white">
                    ${stats.revenue.toLocaleString()}
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">+{stats.growth}% vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;