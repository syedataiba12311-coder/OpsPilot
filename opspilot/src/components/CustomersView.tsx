'use client';

import React from 'react';
import { Customer } from '../types';
import { Mail, ShoppingCart, UserCheck, Star } from 'lucide-react';

interface CustomersViewProps {
    customers: Customer[];
}

export const CustomersView: React.FC<CustomersViewProps> = ({ customers }) => {
    return (
        <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                        <h3 className="text-base font-bold text-slate-900">VIP Customer Insights</h3>
                        <p className="text-xs text-slate-500 font-medium">Customer order history & lifetime spend (PKR)</p>
                    </div>
                    <span className="rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-bold text-teal-800">
                        {customers.length} Accounts Active
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {customers.map((c) => (
                        <div
                            key={c.id}
                            className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 hover:border-teal-300 transition space-y-3 shadow-xs"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-black text-xs">
                                        {c.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-slate-900">{c.name}</div>
                                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            {c.email}
                                        </div>
                                    </div>
                                </div>
                                <Star className="h-4 w-4 text-amber-500 fill-amber-400" />
                            </div>

                            <div className="border-t border-slate-200 pt-3 grid grid-cols-2 gap-2 text-xs">
                                <div>
                                    <div className="text-[10px] text-slate-500 font-medium">Lifetime Spend</div>
                                    <div className="font-black text-slate-900">PKR {c.total_spent.toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-500 font-medium">Total Orders</div>
                                    <div className="font-bold text-teal-800 flex items-center gap-1">
                                        <ShoppingCart className="h-3 w-3" />
                                        {c.orders_count} orders
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
