'use client';

import React, { useState } from 'react';
import { Product } from '../types';
import { Search, AlertTriangle, CheckCircle2, RefreshCw, Layers, Plus, X, PackagePlus } from 'lucide-react';

interface InventoryTableProps {
    products: Product[];
    onRestockSelected?: () => void;
    onRefresh?: () => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
    products,
    onRestockSelected,
    onRefresh,
}) => {
    const [search, setSearch] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [showLowStockOnly, setShowLowStockOnly] = useState<boolean>(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // New product form state
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [category, setCategory] = useState('Electronics');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [reorderLevel, setReorderLevel] = useState('10');
    const [supplier, setSupplier] = useState('');

    const categories = Array.from(new Set(products.map((p) => p.category)));

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.sku.toLowerCase().includes(search.toLowerCase()) ||
            product.supplier.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            filterCategory === 'all' || product.category === filterCategory;

        const matchesLowStock = !showLowStockOnly || product.stock <= product.reorder_level;

        return matchesSearch && matchesCategory && matchesLowStock;
    });

    const lowStockCount = products.filter((p) => p.stock <= p.reorder_level).length;

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !price || !stock) return;

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/ops/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    sku: sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
                    category,
                    price: Number(price),
                    stock: Number(stock),
                    reorder_level: Number(reorderLevel) || 5,
                    supplier: supplier || 'Primary Supplier',
                }),
            });

            const data = await res.json();
            if (data.success) {
                setName('');
                setSku('');
                setPrice('');
                setStock('');
                setSupplier('');
                setIsAddModalOpen(false);
                if (onRefresh) onRefresh();
            }
        } catch (err) {
            console.error('Failed to add product:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="animate-slide-up delay-200 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs card-elevate">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">Inventory</h3>
                        <span className="rounded-full bg-slate-100 border border-slate-200 px-2.5 py-0.5 text-[10px] font-bold text-slate-700">
                            {products.length} Products
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Manage catalog products, stock levels, and suppliers.
                    </p>
                </div>

                {/* Action Button & Filters */}
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-1.5 text-xs font-bold shadow-xs transition-all active:scale-95"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Product</span>
                    </button>

                    <button
                        onClick={() => setShowLowStockOnly(!showLowStockOnly)}
                        className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all active:scale-95 shadow-xs ${showLowStockOnly
                            ? 'border-amber-400 bg-amber-100 text-amber-900'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                    >
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-700" />
                        <span>Low Stock ({lowStockCount})</span>
                    </button>

                    <button
                        onClick={onRestockSelected}
                        className="flex items-center gap-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white px-4 py-1.5 text-xs font-bold shadow-md shadow-teal-700/20 transition-all active:scale-95"
                    >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Prepare Restock PO</span>
                    </button>
                </div>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name, SKU or supplier..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-teal-600 focus:bg-white focus:outline-none transition-all shadow-inner"
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    <button
                        onClick={() => setFilterCategory('all')}
                        className={`rounded-lg px-3 py-1 text-xs font-bold whitespace-nowrap transition-all ${filterCategory === 'all'
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                            }`}
                    >
                        All Categories
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`rounded-lg px-3 py-1 text-xs font-bold whitespace-nowrap transition-all ${filterCategory === cat
                                ? 'bg-slate-900 text-white shadow-xs'
                                : 'text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Empty State when no products */}
            {products.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center bg-slate-50/50 my-2">
                    <PackagePlus className="mx-auto h-10 w-10 text-slate-400 mb-2" />
                    <h4 className="text-sm font-bold text-slate-800">No Inventory Items Found</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                        Demo data has been cleared. Click "Add Product" above or use the API endpoint <code className="text-teal-700 bg-teal-50 px-1 py-0.5 rounded font-mono">POST /api/ops/inventory</code> to add your actual inventory items.
                    </p>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white px-4 py-2 text-xs font-bold shadow-md shadow-teal-700/20 transition-all active:scale-95"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Add Your First Product</span>
                    </button>
                </div>
            ) : (
                /* Table */
                <div className="overflow-x-auto rounded-xl border border-slate-200/80">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100/80 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                            <tr>
                                <th className="py-3.5 px-4">SKU / Product</th>
                                <th className="py-3.5 px-4">Category</th>
                                <th className="py-3.5 px-4 text-right">Price (PKR)</th>
                                <th className="py-3.5 px-4 text-center">Stock Level</th>
                                <th className="py-3.5 px-4 text-center">Reorder Limit</th>
                                <th className="py-3.5 px-4">Supplier</th>
                                <th className="py-3.5 px-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
                            {filteredProducts.map((product) => {
                                const isLowStock = product.stock <= product.reorder_level;
                                return (
                                    <tr
                                        key={product.id}
                                        className={`hover:bg-teal-50/40 transition-colors duration-150 ${isLowStock ? 'bg-amber-50/40' : ''
                                            }`}
                                    >
                                        <td className="py-3.5 px-4">
                                            <div className="font-bold text-slate-900">{product.name}</div>
                                            <div className="text-[10px] font-mono text-slate-500">{product.sku}</div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700 border border-slate-200 font-semibold">
                                                <Layers className="h-3 w-3 text-slate-500" />
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right font-black text-slate-900">
                                            PKR {product.price.toLocaleString()}
                                        </td>
                                        <td className="py-3.5 px-4 text-center">
                                            <span
                                                className={`font-black text-sm ${isLowStock ? 'text-amber-800 font-extrabold' : 'text-slate-900'
                                                    }`}
                                            >
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4 text-center text-slate-500 font-mono font-medium">
                                            {product.reorder_level}
                                        </td>
                                        <td className="py-3.5 px-4 text-slate-700 font-medium">{product.supplier}</td>
                                        <td className="py-3.5 px-4 text-center">
                                            {isLowStock ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-0.5 text-[10px] font-black text-amber-900">
                                                    <AlertTriangle className="h-3 w-3 text-amber-700 animate-pulse" />
                                                    Low Stock
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-black text-emerald-900">
                                                    <CheckCircle2 className="h-3 w-3 text-emerald-700" />
                                                    In Stock
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ADD PRODUCT MODAL */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                            <div className="flex items-center gap-2">
                                <PackagePlus className="h-5 w-5 text-teal-700" />
                                <h3 className="text-base font-bold text-slate-900">Add Actual Inventory Item</h3>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddProduct} className="space-y-3">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Wireless Ergonomic Mouse"
                                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">SKU Code</label>
                                    <input
                                        type="text"
                                        value={sku}
                                        onChange={(e) => setSku(e.target.value)}
                                        placeholder="e.g. WEM-900"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                                    <input
                                        type="text"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        placeholder="e.g. Peripherals"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Price (PKR) *</label>
                                    <input
                                        type="number"
                                        required
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="4500"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Stock *</label>
                                    <input
                                        type="number"
                                        required
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        placeholder="15"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Reorder Level</label>
                                    <input
                                        type="number"
                                        value={reorderLevel}
                                        onChange={(e) => setReorderLevel(e.target.value)}
                                        placeholder="5"
                                        className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Supplier Name</label>
                                <input
                                    type="text"
                                    value={supplier}
                                    onChange={(e) => setSupplier(e.target.value)}
                                    placeholder="e.g. Apex Distribution Ltd"
                                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 px-3 text-xs text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-xl bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 text-xs font-bold shadow-md shadow-teal-700/20 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Adding...' : 'Save Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
