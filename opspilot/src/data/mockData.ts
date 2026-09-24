import { Product, Customer, Report, PurchaseOrder } from '../types';

export const MOCK_PRODUCTS: Product[] = [];

export const MOCK_LOW_STOCK_ITEMS: Product[] = [];

export const MOCK_PURCHASE_ORDER: PurchaseOrder = {
    id: 'PO-NONE',
    created_at: new Date().toISOString().split('T')[0],
    status: 'NONE',
    total_cost: 0,
    supplier_summary: 'No pending purchase orders',
    items: [],
};

export const MOCK_DAILY_SALES_CHART: { time: string; sales: number; orders: number }[] = [];

export const MOCK_WEEKLY_SALES_CHART: { day: string; sales: number; orders: number }[] = [];

export const MOCK_CUSTOMERS: Customer[] = [];

export const MOCK_REPORTS: Report[] = [];
