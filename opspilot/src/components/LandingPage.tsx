'use client';

import React, { useState } from 'react';
import {
    Bot,
    Play,
    ArrowRight,
    CheckCircle2,
    TrendingUp,
    ShieldCheck,
    Zap,
    Layers,
    Sparkles,
    BarChart3,
    Package,
    ShoppingBag,
    Clock,
    ChevronRight,
    Database,
    Sliders,
} from 'lucide-react';

interface LandingPageProps {
    onLaunchDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDashboard }) => {
    const [activeTab, setActiveTab] = useState<'sales' | 'inventory' | 'ai'>('sales');

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
            {/* 1. TOP NAVBAR (Gusto Style) */}
            <header className="sticky top-0 z-40 bg-white/90 border-b border-slate-200/80 backdrop-blur-md px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo & Navigation Links */}
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-md shadow-teal-600/20">
                                <Bot className="h-5 w-5" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-900">
                                Ops<span className="text-teal-600">Pilot</span>
                            </span>
                        </div>

                        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                            <a href="#features" className="hover:text-teal-600 transition">Why OpsPilot</a>
                            <a href="#how-it-works" className="hover:text-teal-600 transition">Products & AI</a>
                            <a href="#solutions" className="hover:text-teal-600 transition">Solutions</a>
                            <a href="#pricing" className="hover:text-teal-600 transition">Pricing</a>
                        </nav>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onLaunchDashboard}
                            className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 transition"
                        >
                            <Play className="h-4 w-4 fill-teal-700" />
                            <span>See live demo</span>
                        </button>

                        <button
                            onClick={onLaunchDashboard}
                            className="rounded-xl bg-teal-700 hover:bg-teal-800 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-700/20 transition active:scale-95"
                        >
                            Launch Dashboard
                        </button>

                        <button
                            onClick={onLaunchDashboard}
                            className="hidden lg:flex rounded-xl border border-teal-700 text-teal-700 hover:bg-teal-50 px-5 py-2.5 text-sm font-bold transition"
                        >
                            How it works
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. HERO SECTION */}
            <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left Hero Content */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200 px-3.5 py-1 text-xs font-bold text-teal-800">
                            <span>Time & Operations Tools</span>
                            <span className="text-teal-400">•</span>
                            <span className="flex items-center gap-1 text-teal-700">
                                Features <ChevronRight className="h-3 w-3" />
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight">
                            Plan and manage your business — in one place
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                            Say goodbye to manual data entry and standalone inventory sheets. Track sales, detect low stock items, prepare automated purchase orders, and maintain human control — all within the OpsPilot platform.
                        </p>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                            <button
                                onClick={onLaunchDashboard}
                                className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 hover:bg-teal-800 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-teal-700/25 transition active:scale-95"
                            >
                                <span>Launch OpsPilot Free</span>
                                <ArrowRight className="h-4 w-4" />
                            </button>

                            <button
                                onClick={onLaunchDashboard}
                                className="flex items-center justify-center gap-2 rounded-xl border-2 border-teal-700 text-teal-700 hover:bg-teal-50 px-6 py-3.5 text-base font-bold transition"
                            >
                                Create business account
                            </button>
                        </div>

                        {/* Feature Checklist */}
                        <div className="grid grid-cols-2 gap-3 pt-4 text-xs font-semibold text-slate-600">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                <span>Real-time Sales Tracking (PKR)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                <span>Automated Low-Stock Scanning</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                <span>Human-in-the-Loop Safety Gate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-teal-600" />
                                <span>Supabase SQL Integration</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Showcase Card & Mockup (Gusto Video Container Style) */}
                    <div className="lg:col-span-6 relative">
                        <div className="relative rounded-2xl border-4 border-slate-900 bg-slate-900 shadow-2xl overflow-hidden group">
                            {/* App Header Preview Bar */}
                            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
                                <div className="flex items-center gap-2">
                                    <span className="h-3 w-3 rounded-full bg-rose-500"></span>
                                    <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                                    <span className="h-3 w-3 rounded-full bg-emerald-500"></span>
                                    <span className="font-bold text-slate-200 ml-2">OpsPilot Business Suite</span>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-[10px] text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800">
                                    <Database className="h-3 w-3" />
                                    <span>Supabase Live</span>
                                </div>
                            </div>

                            {/* Mock Dashboard UI Inside */}
                            <div className="p-6 bg-slate-900 text-slate-100 space-y-4">
                                {/* KPI Bar */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                                        <div className="text-[11px] text-slate-400 font-medium">Today's Sales</div>
                                        <div className="text-xl font-black text-white mt-1">PKR 284,500</div>
                                        <div className="text-[10px] text-emerald-400 font-bold mt-1">↑ +14.2% growth</div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
                                        <div className="text-[11px] text-amber-300 font-medium">Low Stock Warning</div>
                                        <div className="text-xl font-black text-white mt-1">8 products</div>
                                        <div className="text-[10px] text-amber-400 font-bold mt-1">PO Draft Prepared</div>
                                    </div>
                                </div>

                                {/* AI Workflow Action Card */}
                                <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/60 via-slate-800 to-indigo-950/60 border border-teal-500/40 space-y-2">
                                    <div className="flex items-center justify-between text-xs font-bold text-teal-300">
                                        <span className="flex items-center gap-1.5">
                                            <Sparkles className="h-4 w-4 text-teal-400" />
                                            AI Operator Restock Pipeline
                                        </span>
                                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                                            5/5 Tools Complete
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-200">
                                        "I found 8 products below threshold. I've prepared restock PO #PO-2026-09-03 (PKR 73,200) for your authorization."
                                    </p>
                                    <div className="flex items-center justify-end gap-2 pt-2">
                                        <button
                                            onClick={onLaunchDashboard}
                                            className="px-3 py-1.5 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white rounded-lg transition"
                                        >
                                            Approve & Dispatch PO →
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Mobile Preview Mockup Overlay */}
                            <div className="absolute -bottom-4 -right-4 hidden sm:block w-48 rounded-2xl border-4 border-slate-900 bg-white p-3 shadow-2xl ring-1 ring-slate-200">
                                <div className="text-[10px] font-bold text-slate-400 uppercase">OpsPilot Mobile</div>
                                <div className="text-xs font-black text-slate-900 mt-1">3 Action Approvals</div>
                                <div className="mt-2 text-[10px] text-slate-600 bg-teal-50 p-2 rounded-lg border border-teal-100">
                                    <span className="font-semibold text-teal-800">Restock Authorized</span>
                                    <div className="text-[9px] text-slate-500">PKR 73,200 • AcousticTech</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. THREE CORE CAPABILITIES */}
            <section id="features" className="py-16 bg-white border-y border-slate-200/80 px-6">
                <div className="max-w-7xl mx-auto space-y-12">
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700">
                            Why Business Owners Choose OpsPilot
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                            Everything you need to automate daily store operations
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition space-y-4 shadow-sm">
                            <div className="h-12 w-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Real-time Sales Analytics</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Track revenue growth, average order value, and peak sales hours in PKR with instant charts and daily summaries.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition space-y-4 shadow-sm">
                            <div className="h-12 w-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                                <Package className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Intelligent Inventory Scan</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Automatically monitor stock levels against custom reorder thresholds and get alerts before items run out.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-300 transition space-y-4 shadow-sm">
                            <div className="h-12 w-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Human-in-the-Loop Safety</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                The AI operator generates restock purchase orders and drafts reports, but requires explicit human authorization before executing financial actions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. FOOTER CALL TO ACTION */}
            <section className="py-16 bg-slate-900 text-white px-6">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                        Ready to streamline your business with AI operations?
                    </h2>
                    <p className="text-slate-300 text-base max-w-2xl mx-auto">
                        Experience the OpsPilot AI Operator dashboard today with full Supabase integration and live REST API engine.
                    </p>
                    <div>
                        <button
                            onClick={onLaunchDashboard}
                            className="inline-flex items-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 px-8 py-4 text-base font-bold text-slate-950 shadow-xl shadow-teal-500/20 transition active:scale-95"
                        >
                            <span>Launch OpsPilot Dashboard Now</span>
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
