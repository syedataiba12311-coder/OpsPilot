'use client';

import React, { useState, useEffect } from 'react';
import { Header, NavTab } from '@/components/Header';
import { KpiCards } from '@/components/KpiCards';
import { SalesChart } from '@/components/SalesChart';
import { InventoryTable } from '@/components/InventoryTable';
import { AIOperatorPanel } from '@/components/AIOperatorPanel';
import { PurchaseOrderModal } from '@/components/PurchaseOrderModal';
import { CustomersView } from '@/components/CustomersView';
import { ReportsView } from '@/components/ReportsView';
import {
  MOCK_PRODUCTS,
  MOCK_CUSTOMERS,
  MOCK_REPORTS,
  MOCK_PURCHASE_ORDER,
} from '@/data/mockData';
import { Product, Customer, Report, PurchaseOrder } from '@/types';
import { WebMcpProvider } from '@/components/WebMcpProvider';
import { Sliders, Sparkles, ArrowRight, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [poApproved, setPoApproved] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>(MOCK_PURCHASE_ORDER);
  const [dataSource, setDataSource] = useState<string>('Live Data Store');
  const [salesStats, setSalesStats] = useState<{ revenue: number; orders: number }>({ revenue: 0, orders: 0 });

  // Load live data from API routes on mount
  const loadAllData = async () => {
    try {
      // 1. Fetch Products / Inventory
      const invRes = await fetch('/api/ops/inventory').then((r) => r.json());
      if (invRes.success && invRes.data.products) {
        setProducts(invRes.data.products);
        if (invRes.data.source) {
          setDataSource(invRes.data.source);
        }
      }

      // 2. Fetch Sales Stats
      const salesRes = await fetch('/api/ops/sales').then((r) => r.json());
      if (salesRes.success && salesRes.data) {
        setSalesStats({
          revenue: salesRes.data.revenue || 0,
          orders: salesRes.data.orders || 0,
        });
      }

      // 3. Fetch Customers
      const custRes = await fetch('/api/ops/customers').then((r) => r.json());
      if (custRes.success && custRes.data.customers) {
        setCustomers(custRes.data.customers);
      }

      // 4. Fetch Reports
      const repRes = await fetch('/api/ops/reports').then((r) => r.json());
      if (repRes.success && repRes.data.reports) {
        setReports(repRes.data.reports);
      }

      // 5. Fetch Restock PO
      const poRes = await fetch('/api/ops/restock-list').then((r) => r.json());
      if (poRes.success && poRes.data) {
        setPurchaseOrder(poRes.data);
      }
    } catch (err) {
      console.error('Failed loading initial live data:', err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const lowStockCount = products.filter((p) => p.stock <= p.reorder_level).length;

  const handleApprovePO = async () => {
    setPoApproved(true);
    try {
      await fetch('/api/ops/approve-po', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ po_id: purchaseOrder.id }),
      });
      loadAllData();
    } catch (err) {
      console.error('Failed approving PO:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans antialiased text-slate-800 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lowStockCount={lowStockCount}
      />

      {/* Main Single Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <WebMcpProvider />
        {/* Simplified Hero Welcome Banner */}
        <div className="animate-fade-in rounded-3xl bg-gradient-to-br from-teal-950 via-teal-900 to-slate-950 text-white p-8 sm:p-10 shadow-xl border border-teal-800/40 relative overflow-hidden group">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 border border-teal-400/30 px-3.5 py-1 text-xs font-bold text-teal-200 backdrop-blur-md shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-teal-300 animate-pulse" />
              <span>OpsPilot AI Operations</span>
              <span className="text-teal-400">•</span>
              <span className="text-emerald-300 font-mono flex items-center gap-1">
                <Database className="h-3 w-3" /> {dataSource}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Welcome to OpsPilot
            </h1>

            <p className="text-sm text-teal-100/90 leading-relaxed font-medium">
              Manage sales, inventory, and AI purchase order workflows in one simple dashboard.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-bold">
              <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 backdrop-blur-sm shadow-xs cursor-default">
                <CheckCircle2 className="h-4 w-4 text-teal-300" />
                Sales: <strong className="text-white font-extrabold">PKR {salesStats.revenue.toLocaleString()}</strong>
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 backdrop-blur-sm shadow-xs cursor-default">
                <CheckCircle2 className="h-4 w-4 text-amber-300" />
                Low Stock: <strong className="text-amber-200 font-extrabold">{lowStockCount} Items</strong>
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/15 backdrop-blur-sm shadow-xs cursor-default">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                System Active
              </span>
            </div>
          </div>

          {/* Ambient Glowing Background Animations */}
          <div className="absolute -right-12 -bottom-12 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl pointer-events-none animate-pulse-glow"></div>
          <div className="absolute left-1/2 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none animate-float"></div>
        </div>

        {/* TAB 1: DASHBOARD MAIN FLOW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* 1. EXECUTIVE KPI CARDS */}
            <section className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                <span>Overview</span>
                <span>PKR</span>
              </div>
              <KpiCards
                revenue={salesStats.revenue}
                orders={salesStats.orders}
                lowStockCount={lowStockCount}
                restockCost={purchaseOrder?.total_cost || 0}
                onRestockClick={() => setIsReviewModalOpen(true)}
              />
            </section>

            {/* 2. AI OPERATOR INTERACTIVE PANEL */}
            <section className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                <span>AI Assistant</span>
              </div>
              <AIOperatorPanel
                onOpenReviewModal={() => setIsReviewModalOpen(true)}
                onApprovePO={handleApprovePO}
                poApproved={poApproved}
              />
            </section>

            {/* 3. SALES ANALYTICS CHART */}
            <section className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                <span>Sales Trajectory</span>
              </div>
              <SalesChart />
            </section>

            {/* 4. LIVE INVENTORY TABLE */}
            <section className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                <span>Inventory Catalog</span>
              </div>
              <InventoryTable
                products={products}
                onRestockSelected={() => setIsReviewModalOpen(true)}
                onRefresh={loadAllData}
              />
            </section>
          </div>
        )}

        {/* TAB 2: SALES */}
        {activeTab === 'sales' && (
          <div className="space-y-8">
            <KpiCards
              revenue={salesStats.revenue}
              orders={salesStats.orders}
              lowStockCount={lowStockCount}
              restockCost={purchaseOrder?.total_cost || 0}
              onRestockClick={() => setIsReviewModalOpen(true)}
            />
            <SalesChart />
          </div>
        )}

        {/* TAB 3: INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-8">
            <InventoryTable
              products={products}
              onRestockSelected={() => setIsReviewModalOpen(true)}
              onRefresh={loadAllData}
            />
          </div>
        )}

        {/* TAB 4: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="space-y-8">
            <CustomersView customers={customers} />
          </div>
        )}

        {/* TAB 5: REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            <ReportsView reports={reports} />
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="h-5 w-5 text-teal-700" />
              <span>Supabase Database & Ops Engine Status</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              Database schema deployed with 5 core tables: products, sales, customers, reports, purchase_orders.
            </p>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <div className="font-bold text-slate-900">Supabase SQL Migration File</div>
                  <div className="text-slate-500 text-[11px]">Located at supabase/schema.sql</div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-extrabold rounded-lg border border-emerald-300">
                  READY
                </span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <div className="font-bold text-slate-900">API Route Endpoints</div>
                  <div className="text-slate-500 text-[11px]">/api/ops/sales, /api/ops/inventory, /api/ops/customers, /api/ops/low-stock, /api/ops/reports</div>
                </div>
                <span className="px-3 py-1 bg-teal-100 text-teal-900 font-extrabold rounded-lg border border-teal-300">
                  7 ENDPOINTS ACTIVE
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* HUMAN APPROVAL REVIEW MODAL */}
      <PurchaseOrderModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        purchaseOrder={purchaseOrder}
        onApprove={handleApprovePO}
        isApproved={poApproved}
      />
    </div>
  );
}
