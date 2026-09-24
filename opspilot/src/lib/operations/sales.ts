import { supabase, isSupabaseConfigured } from '../supabase';
import { findLowStock } from './inventory';
import { loadStore } from './store';

/**
 * Operations: getSales
 * Table: sales
 */
export async function getSales(dateStr?: string) {
    if (isSupabaseConfigured && supabase) {
        const { data: sales, error } = await supabase
            .from('sales')
            .select('*');

        if (!error && sales && sales.length > 0) {
            const revenue = sales.reduce((acc, curr) => acc + (Number(curr.total) || 0), 0);
            return {
                date: dateStr || new Date().toISOString().split('T')[0],
                revenue,
                orders: sales.length,
                items: sales,
                chart: [],
                currency: 'PKR',
                source: 'Supabase DB (sales table)',
            };
        }
    }

    const store = loadStore();

    // Fallback store response
    return {
        date: dateStr || new Date().toISOString().split('T')[0],
        revenue: store.sales.revenue,
        orders: store.sales.orders,
        chart: store.sales.chart,
        currency: 'PKR',
        source: isSupabaseConfigured ? 'Supabase DB (Empty, fallback)' : 'OpsEngine Local Store',
    };
}

/**
 * Operations: analyzeSales
 * Analyzes today's sales and identifies top low-stock inventory risks
    */
export async function analyzeSales() {
    const sales = await getSales();
    const lowStock = await findLowStock();

    const sortedRisk = [...lowStock.lowStockItems].sort((a, b) => a.stock - b.stock);
    const topRisk = sortedRisk.slice(0, 3);

    const formattedOutput = `Analysis complete.

Today's sales:
PKR ${sales.revenue.toLocaleString()}

Orders:
${sales.orders}

Low-stock products:
${lowStock.count}

Highest-risk products:
${topRisk.map((p) => `• ${p.name} — ${p.stock} remaining`).join('\n')}

Recommended action:
Prepare a restock order.`;

    return {
        revenue: sales.revenue,
        orders: sales.orders,
        lowStockCount: lowStock.count,
        highestRiskProducts: topRisk.map((p) => ({ name: p.name, remaining: p.stock })),
        recommendedAction: 'Prepare a restock order.',
        formattedOutput,
        source: sales.source,
    };
}
