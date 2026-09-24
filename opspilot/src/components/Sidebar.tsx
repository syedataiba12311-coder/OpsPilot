'use client';

import React from 'react';
import {
    LayoutDashboard,
    TrendingUp,
    Package,
    Users,
    FileText,
    Settings,
} from 'lucide-react';

export type NavTab = 'dashboard' | 'sales' | 'inventory' | 'customers' | 'reports' | 'settings';

interface SidebarProps {
    activeTab: NavTab;
    setActiveTab: (tab: NavTab) => void;
    lowStockCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
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
            badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        },
        { id: 'customers' as NavTab, label: 'Customers', icon: Users },
        { id: 'reports' as NavTab, label: 'Reports', icon: FileText },
        { id: 'settings' as NavTab, label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 flex-shrink-0 border-r border-slate-700/60 bg-slate-900/80 flex flex-col justify-between p-4 hidden md:flex backdrop-blur-md">
            <div className="space-y-6">
                {/* Navigation Group */}
                <div>
                    <div className="px-3 mb-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Main Navigation
                    </div>
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ${isActive
                                            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon
                                            className={`h-4.5 w-4.5 transition ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                                                }`}
                                        />
                                        <span>{item.label}</span>
                                    </div>

                                    {item.badge && (
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold border ${item.badgeColor}`}
                                        >
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Footer System Status */}
            <div className="rounded-xl border border-slate-700/80 bg-slate-800/60 p-3.5 shadow-inner">
                <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">System Status</span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Operational
                    </span>
                </div>
                <div className="mt-1.5 text-[11px] text-slate-400 font-medium">
                    PKR Currency • Live Database
                </div>
            </div>
        </aside>
    );
};
