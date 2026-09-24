import { Product, Report, PurchaseOrder, Customer } from '@/types';
import fs from 'fs';
import path from 'path';

export interface LocalStore {
    products: Product[];
    customers: Customer[];
    reports: Report[];
    purchaseOrder: PurchaseOrder;
    sales: {
        revenue: number;
        orders: number;
        chart: { time: string; sales: number; orders: number }[];
    };
}

const DATA_FILE = path.join(process.cwd(), 'opspilot-store.json');

const defaultData: LocalStore = {
    products: [],
    customers: [],
    reports: [],
    purchaseOrder: {
        id: 'PO-NONE',
        created_at: new Date().toISOString().split('T')[0],
        status: 'NONE',
        total_cost: 0,
        supplier_summary: 'No pending purchase orders',
        items: [],
    },
    sales: {
        revenue: 0,
        orders: 0,
        chart: [],
    },
};

const globalForStore = globalThis as unknown as {
    localStore: LocalStore | undefined;
};

export function loadStore(): LocalStore {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const raw = fs.readFileSync(DATA_FILE, 'utf-8');
            const parsed = JSON.parse(raw);
            if (globalForStore.localStore) {
                globalForStore.localStore.products = parsed.products || [];
                globalForStore.localStore.customers = parsed.customers || [];
                globalForStore.localStore.reports = parsed.reports || [];
                globalForStore.localStore.purchaseOrder = parsed.purchaseOrder || defaultData.purchaseOrder;
                globalForStore.localStore.sales = parsed.sales || defaultData.sales;
            } else {
                globalForStore.localStore = parsed;
            }
            return parsed;
        }
    } catch (e) {
        console.error('Failed reading opspilot-store.json:', e);
    }
    return defaultData;
}

export function saveStore(store: LocalStore) {
    try {
        if (globalForStore.localStore) {
            globalForStore.localStore.products = store.products;
            globalForStore.localStore.customers = store.customers;
            globalForStore.localStore.reports = store.reports;
            globalForStore.localStore.purchaseOrder = store.purchaseOrder;
            globalForStore.localStore.sales = store.sales;
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2), 'utf-8');
    } catch (e) {
        console.error('Failed writing opspilot-store.json:', e);
    }
}

export const localStore: LocalStore = globalForStore.localStore ?? loadStore();

if (process.env.NODE_ENV !== 'production') {
    globalForStore.localStore = localStore;
}
