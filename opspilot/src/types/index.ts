export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // in PKR
  stock: number;
  reorder_level: number;
  supplier: string;
  sku: string;
  lastUpdated: string;
}

export interface Sale {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  total: number; // in PKR
  date: string;
  customer_name: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  total_spent: number; // in PKR
  orders_count: number;
  last_order: string;
}

export interface Report {
  id: string;
  type: 'Sales' | 'Inventory' | 'Restock' | 'Executive';
  title: string;
  summary: string;
  created_at: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export interface RestockItem {
  id: string;
  product_id: string;
  product_name: string;
  current_stock: number;
  reorder_level: number;
  recommended_qty: number;
  unit_price: number;
  total_cost: number;
}

export interface PurchaseOrder {
  id: string;
  created_at: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'CANCELLED' | 'NONE';
  items: RestockItem[];
  total_cost: number;
  supplier_summary: string;
}
