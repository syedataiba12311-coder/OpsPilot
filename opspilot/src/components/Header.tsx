'use client';

import React from 'react';
import {
    Bot,
    Bell,
    Search,
    ChevronDown,
    Store,
    LayoutDashboard,
    TrendingUp,
    Package,
    Users,
    FileText,
    Settings,
} from 'lucide-react';

export type NavTab = 'dashboard' | 'sales' | 'inventory' | 'customers' | 'reports' | 'settings';

interface HeaderProps {
    activeTab: NavTab;
    setActiveTab: (tab: NavTab) => void;
    lowStockCount: number;
}

export const Header: React.FC<HeaderProps> = ({
    activeTab,
    setActiveTab,
    lowStockCount,
}) => {
    const navItems = [
        { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
        { id: 'sales' as NavTab, label: 'Sales', icon: TrendingUp },
        {
            id: 'inventory' as NavTab,
            label: 'Inventory',
            icon: Package,
            badge: lowStockCount > 0 ? `${lowStockCount} low` : undefined,
        },
        { id: 'customers' as NavTab, label: 'Customers', icon: Users },
        { id: 'reports' as NavTab, label: 'Reports', icon: FileText },
        { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
    ];

    return (
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Navbar Top Row */}
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Left: Logo & Store Switcher */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2.5 group cursor-pointer">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white shadow-md shadow-teal-700/20 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
                                <Bot className="h-5 w-5" />
                            </div>
                            <div>
                                <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-teal-900 transition-colors">
                                    Ops<span className="text-teal-700">Pilot</span>
                                </span>
                            </div>
                        </div>

                        {/* Store Switcher Pill */}
                        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-xs text-slate-700 hover:border-teal-300 hover:bg-white transition-all shadow-xs cursor-pointer">
                            <Store className="h-3.5 w-3.5 text-teal-700" />
                            <span className="font-bold text-slate-900">My Business (PKR)</span>
                            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                    </div>

                    {/* Center Search Bar */}
                    <div className="hidden lg:flex items-center w-72">
                        <div className="relative w-full">
                            <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search products, sales, suppliers..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-1.5 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Right: Notifications & Profile */}
                    <div className="flex items-center gap-3">
                        <button className="relative rounded-xl border border-slate-200 bg-slate-50/80 p-2 text-slate-600 hover:bg-white hover:text-slate-900 hover:border-slate-300 active:scale-95 transition-all">
                            <Bell className="h-4 w-4" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-white animate-pulse"></span>
                        </button>

                        <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-700 to-teal-900 text-xs font-black text-white shadow-sm ring-2 ring-teal-700/20 hover:scale-105 transition-transform cursor-pointer">
                                BO
                            </div>
                            <div className="hidden sm:block text-left">
                                <div className="text-xs font-bold text-slate-900">Business Owner</div>
                                <div className="text-[10px] font-semibold text-slate-500">Live Operations</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gusto Top Navigation Tab Bar */}
                <div className="flex items-center gap-1.5 border-t border-slate-100 overflow-x-auto py-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`relative flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all duration-200 whitespace-nowrap active:scale-95 ${isActive
                                    ? 'bg-teal-50 text-teal-800 border border-teal-300/80 shadow-xs'
                                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                                    }`}
                            >
                                <Icon
                                    className={`h-4 w-4 transition-colors ${isActive ? 'text-teal-700' : 'text-slate-400'
                                        }`}
                                />
                                <span>{item.label}</span>
                                {item.badge && (
                                    <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-800 animate-bounce">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </header>
    );
};
