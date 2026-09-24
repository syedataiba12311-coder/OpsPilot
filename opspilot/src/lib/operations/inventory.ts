import { supabase, isSupabaseConfigured } from '../supabase';
import { Product } from '@/types';
import { loadStore } from './store';

/**
 * Operations: getInventory
 * Table: products
 */
export async function getInventory(): Promise<{ products: Product[]; totalSkus: number; source: string }> {
    if (isSupabaseConfigured && supabase) {
        const { data: dbProducts, error } = await supabase
            .from('products')
            .select('*');

        if (!error && dbProducts && dbProducts.length > 0) {
            const mappedProducts: Product[] = dbProducts.map((p) => ({
                id: p.id,
                sku: p.sku,
                name: p.name,
                category: p.category,
                price: Number(p.price),
                stock: p.stock,
                reorder_level: p.reorder_level,
                supplier: p.supplier,
                lastUpdated: p.last_updated || new Date().toISOString(),
            }));

            return {
                products: mappedProducts,
                totalSkus: mappedProducts.length,
                source: 'Supabase DB (products table)',
            };
        }
    }

    const store = loadStore();

    return {
        products: store.products,
        totalSkus: store.products.length,
        source: isSupabaseConfigured ? 'Supabase DB (Fallback)' : 'OpsEngine Local Store',
    };
}

/**
 * Operations: findLowStock
 */
export async function findLowStock() {
    const { products, source } = await getInventory();
    const lowStockItems = products.filter((p) => p.stock <= p.reorder_level);

    return {
        low_stock_count: lowStockItems.length,
        threshold_breached: lowStockItems.length > 0,
        products: lowStockItems.map((p) => ({
            id: p.id,
            name: p.name,
            remaining: p.stock,
            reorder_level: p.reorder_level,
            risk: p.stock <= 3 ? 'critical' : 'high',
        })),
        lowStockItems, // internal alias
        count: lowStockItems.length,
        source,
    };
}
