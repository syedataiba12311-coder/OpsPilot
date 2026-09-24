-- OpsPilot Database Schema for Supabase
-- Business data tables: products, sales, customers, reports, purchase_orders

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    stock INTEGER NOT NULL DEFAULT 0,
    reorder_level INTEGER NOT NULL DEFAULT 10,
    supplier TEXT NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. SALES TABLE
CREATE TABLE IF NOT EXISTS sales (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    total NUMERIC(12, 2) NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    customer_name TEXT DEFAULT 'Walk-in Customer'
);

-- 3. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    total_spent NUMERIC(12, 2) DEFAULT 0.00,
    orders_count INTEGER DEFAULT 0,
    last_order TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. REPORTS TABLE
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL, -- 'Sales', 'Inventory', 'Restock', 'Executive'
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. PURCHASE ORDERS TABLE
CREATE TABLE IF NOT EXISTS purchase_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    po_number TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'PENDING_APPROVAL', -- 'PENDING_APPROVAL', 'APPROVED', 'CANCELLED'
    total_cost NUMERIC(12, 2) NOT NULL,
    supplier_summary TEXT NOT NULL,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SEED INITIAL DATA
INSERT INTO products (sku, name, category, price, stock, reorder_level, supplier) VALUES
('WHP-100', 'Wireless Noise-Canceling Headphones', 'Electronics', 18500.00, 4, 15, 'AcousticTech Ltd'),
('SWT-202', 'Ergonomic Smartwatch Ultra', 'Wearables', 24000.00, 3, 10, 'Apex Micro'),
('MCH-305', 'Mechanical RGB Gaming Keyboard', 'Accessories', 12500.00, 6, 20, 'KeyMaster Ind'),
('USC-408', 'Thunderbolt 4 Multi-Port Hub', 'Accessories', 8900.00, 2, 12, 'LinkPro Systems'),
('4KM-512', '27-inch 4K Color-Accurate Monitor', 'Displays', 85000.00, 5, 8, 'VisionDisplay Inc'),
('WCM-602', 'HD 1080p Web Camera with Mic', 'Electronics', 6800.00, 7, 25, 'AcousticTech Ltd'),
('SSD-700', '2TB NVMe PCIe 4.0 SSD Internal', 'Storage', 32000.00, 4, 15, 'MemTech Global'),
('CHG-808', '100W GaN Fast Charger 4-Port', 'Accessories', 5400.00, 8, 30, 'PowerVolt'),
('MIC-901', 'Studio Condenser USB Microphone', 'Audio', 14500.00, 45, 10, 'AcousticTech Ltd'),
('LPT-100', 'UltraSlim Developer Laptop 16GB', 'Computers', 210000.00, 18, 5, 'VisionDisplay Inc'),
('DES-110', 'Motorized Dual-Motor Standing Desk', 'Furniture', 65000.00, 22, 5, 'ErgoDesign'),
('CHR-120', 'Ergonomic Mesh Office Chair', 'Furniture', 42000.00, 14, 8, 'ErgoDesign')
ON CONFLICT (sku) DO NOTHING;

INSERT INTO customers (name, email, total_spent, orders_count) VALUES
('Tariq Mahmood', 'tariq.m@techops.pk', 425000.00, 18),
('Ayesha Khan', 'ayesha.k@designstudio.com', 312000.00, 12),
('Zainab Ahmed', 'zainab@innovate.org', 189500.00, 9),
('Bilal Hassan', 'b.hassan@logistics.net', 540000.00, 24),
('Usman Farooq', 'usman.f@cloudcorp.io', 98000.00, 4)
ON CONFLICT (email) DO NOTHING;

INSERT INTO sales (product_name, quantity, total, customer_name) VALUES
('Wireless Noise-Canceling Headphones', 2, 37000.00, 'Tariq Mahmood'),
('Ergonomic Smartwatch Ultra', 1, 24000.00, 'Ayesha Khan'),
('Mechanical RGB Gaming Keyboard', 3, 37500.00, 'Zainab Ahmed'),
('Thunderbolt 4 Multi-Port Hub', 2, 17800.00, 'Bilal Hassan'),
('27-inch 4K Color-Accurate Monitor', 1, 85000.00, 'Usman Farooq'),
('HD 1080p Web Camera with Mic', 4, 27200.00, 'Walk-in Customer'),
('2TB NVMe PCIe 4.0 SSD Internal', 1, 32000.00, 'Walk-in Customer'),
('100W GaN Fast Charger 4-Port', 4, 21600.00, 'Walk-in Customer');

INSERT INTO reports (type, title, summary, content) VALUES
('Sales', 'Daily Executive Sales & Performance Briefing', 'Todays revenue reached PKR 284,500 across 127 orders. Accessories and Displays drove 64% of total turnover.', '[{"label":"Total Revenue","value":"PKR 284,500"},{"label":"Completed Orders","value":"127"},{"label":"Avg Order Value","value":"PKR 2,240"}]'::jsonb),
('Restock', 'Automated Restock & Inventory Risk Assessment', 'Identified 8 products breaching safe reorder levels. Drafted restock PO with estimated cost PKR 73,200.', '[{"label":"Low Stock Products","value":"8 items"},{"label":"Estimated PO Cost","value":"PKR 73,200"},{"label":"Primary Supplier","value":"AcousticTech Ltd"}]'::jsonb),
('Inventory', 'Monthly Inventory Turnover & Valuation', 'Overall inventory health score 91%. Fast-moving SKUs require stock buffer increase ahead of upcoming demand spike.', '[{"label":"Total Asset Value","value":"PKR 4,850,000"},{"label":"Active SKUs","value":"142"},{"label":"Stockouts Prevented","value":"19"}]'::jsonb);

INSERT INTO purchase_orders (po_number, status, total_cost, supplier_summary, items) VALUES
('PO-2026-0903-88', 'PENDING_APPROVAL', 73200.00, 'Multi-supplier grouped order (4 vendors)', '[{"id":"rst-1","product_id":"prod-001","product_name":"Wireless Noise-Canceling Headphones","current_stock":4,"reorder_level":15,"recommended_qty":10,"unit_price":2400,"total_cost":24000},{"id":"rst-2","product_id":"prod-002","product_name":"Ergonomic Smartwatch Ultra","current_stock":3,"reorder_level":10,"recommended_qty":5,"unit_price":3600,"total_cost":18000}]'::jsonb)
ON CONFLICT (po_number) DO NOTHING;
