'use client';

import React from 'react';
import { DollarSign, ShoppingBag, AlertTriangle, ShoppingCart } from 'lucide-react';

interface KpiCardsProps {
    revenue?: number;
    orders?: number;
    lowStockCount?: number;
    restockCost?: number;
    onRestockClick?: () => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({
    revenue = 0,
    orders = 0,
    lowStockCount = 0,
    restockCost = 0,
    onRestockClick,
}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Revenue */}
            <div className="animate-slide-up rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs card-elevate group">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Sales</span>
                    <div className="rounded-xl bg-teal-50 p-2.5 text-teal-700 ring-1 ring-teal-200 group-hover:scale-105 transition-transform">
                        <DollarSign className="h-5 w-5" />
                    </div>
                </div>
                <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-baseline gap-1">
                        <span className="text-sm font-bold text-teal-700">PKR</span>
                        <span>{revenue.toLocaleString()}</span>
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500 font-medium">Real-time revenue today</p>
                </div>
            </div>

            {/* 2. Orders */}
            <div className="animate-slide-up delay-100 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs card-elevate group">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Orders</span>
                    <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-700 ring-1 ring-indigo-200 group-hover:scale-105 transition-transform">
                        <ShoppingBag className="h-5 w-5" />
                    </div>
                </div>
                <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                        {orders}
                    </div>
                    <p className="mt-1.5 text-xs text-slate-500 font-medium">Completed orders</p>
                </div>
            </div>

            {/* 3. Low Stock */}
            <div className={`animate-slide-up delay-200 rounded-2xl border p-5 shadow-xs card-elevate group transition-colors ${lowStockCount > 0 ? 'border-amber-300 bg-amber-50/40' : 'border-slate-200/80 bg-white'
                }`}>
                <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold uppercase tracking-wider ${lowStockCount > 0 ? 'text-amber-800' : 'text-slate-500'
                        }`}>Low Stock Items</span>
                    <div className={`rounded-xl p-2.5 ring-1 group-hover:scale-105 transition-transform ${lowStockCount > 0 ? 'bg-amber-100 text-amber-800 ring-amber-300' : 'bg-slate-50 text-slate-600 ring-slate-200'
                        }`}>
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                </div>
                <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
                        <span>{lowStockCount}</span>
                        {lowStockCount > 0 && (
                            <span className="text-xs font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full border border-amber-300">
                                Requires Action
                            </span>
                        )}
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Below reorder threshold</span>
                        {lowStockCount > 0 && (
                            <button
                                onClick={onRestockClick}
                                className="text-amber-900 font-bold hover:underline active:scale-95 transition-all"
                            >
                                Restock →
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 4. Restock PO Cost */}
            <div className="animate-slide-up delay-300 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs card-elevate group">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Restock PO Cost</span>
                    <div className="rounded-xl bg-purple-50 p-2.5 text-purple-700 ring-1 ring-purple-200 group-hover:scale-105 transition-transform">
                        <ShoppingCart className="h-5 w-5" />
                    </div>
                </div>
                <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-baseline gap-1">
                        <span className="text-sm font-bold text-purple-700">PKR</span>
                        <span>{restockCost.toLocaleString()}</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Draft purchase orders</span>
                        {restockCost > 0 && (
                            <button
                                onClick={onRestockClick}
                                className="text-purple-900 font-bold bg-purple-100 hover:bg-purple-200 border border-purple-300 px-2.5 py-0.5 rounded-lg transition-all"
                            >
                                Review PO
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
