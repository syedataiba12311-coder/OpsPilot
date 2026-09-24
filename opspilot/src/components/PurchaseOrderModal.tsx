'use client';

import React from 'react';
import { PurchaseOrder } from '../types';
import { X, Check, ShieldCheck, FileCheck, Building } from 'lucide-react';

interface PurchaseOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    purchaseOrder: PurchaseOrder;
    onApprove: () => void;
    isApproved: boolean;
}

export const PurchaseOrderModal: React.FC<PurchaseOrderModalProps> = ({
    isOpen,
    onClose,
    purchaseOrder,
    onApprove,
    isApproved,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-5 text-slate-900">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 ring-1 ring-teal-300">
                            <FileCheck className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-black text-slate-900">Purchase Order Review</h3>
                                <span className="rounded bg-teal-100 border border-teal-300 px-2 py-0.5 font-mono text-[10px] font-bold text-teal-900">
                                    {purchaseOrder.id}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 font-medium">AI-generated restocking requisition for human authorization</p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-200 p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* PO Line Items Table */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                        <span className="flex items-center gap-1.5">
                            <Building className="h-3.5 w-3.5 text-teal-700" />
                            {purchaseOrder.supplier_summary}
                        </span>
                        <span className="font-mono text-slate-500">{purchaseOrder.created_at}</span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-100 text-slate-700 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                                <tr>
                                    <th className="py-2.5 px-3">Product</th>
                                    <th className="py-2.5 px-3 text-center">Cur. Stock</th>
                                    <th className="py-2.5 px-3 text-center">Restock Qty</th>
                                    <th className="py-2.5 px-3 text-right">Est. Unit Price</th>
                                    <th className="py-2.5 px-3 text-right">Line Total (PKR)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 bg-white">
                                {purchaseOrder.items.map((item) => (
                                    <tr key={item.id} className="hover:bg-slate-50">
                                        <td className="py-2.5 px-3 font-bold text-slate-900">{item.product_name}</td>
                                        <td className="py-2.5 px-3 text-center text-amber-700 font-bold">{item.current_stock}</td>
                                        <td className="py-2.5 px-3 text-center font-black text-teal-800">+{item.recommended_qty}</td>
                                        <td className="py-2.5 px-3 text-right text-slate-600">PKR {item.unit_price.toLocaleString()}</td>
                                        <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                                            PKR {item.total_cost.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Financial Summary & Human Safety Notice */}
                <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <ShieldCheck className="h-4 w-4 text-emerald-600" />
                        <span>Human-in-the-loop authorization required before dispatches.</span>
                    </div>

                    <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-slate-500">Total Purchase Requisition</div>
                        <div className="text-lg font-black text-teal-800">
                            PKR {purchaseOrder.total_cost.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition"
                    >
                        Close & Review Later
                    </button>

                    {isApproved ? (
                        <div className="flex items-center gap-1.5 rounded-xl bg-emerald-100 border border-emerald-300 px-5 py-2 text-xs font-black text-emerald-900">
                            <Check className="h-4 w-4 text-emerald-700" />
                            <span>Purchase Order Approved</span>
                        </div>
                    ) : (
                        <button
                            onClick={() => {
                                onApprove();
                                onClose();
                            }}
                            className="flex items-center gap-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 px-6 py-2 text-xs font-black text-white shadow-md shadow-teal-700/25 transition active:scale-95"
                        >
                            <Check className="h-4 w-4" />
                            <span>Authorize & Issue PO</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
