import { supabase, isSupabaseConfigured } from '../supabase';
import { Report } from '@/types';
import { getSales } from './sales';
import { findLowStock } from './inventory';
import { localStore } from './store';

/**
 * Operations: getReports
 * Table: reports
 */
export async function getReports(): Promise<{ reports: Report[]; count: number; source: string }> {
    if (isSupabaseConfigured && supabase) {
        const { data: dbReports, error } = await supabase
            .from('reports')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && dbReports && dbReports.length > 0) {
            const mappedReports: Report[] = dbReports.map((r) => ({
                id: r.id,
                type: r.type,
                title: r.title,
                summary: r.summary,
                created_at: r.created_at || new Date().toISOString(),
                metrics: Array.isArray(r.content) ? r.content : [],
            }));
            return {
                reports: mappedReports,
                count: mappedReports.length,
                source: 'Supabase DB (reports table)',
            };
        }
    }

    return {
        reports: localStore.reports,
        count: localStore.reports.length,
        source: isSupabaseConfigured ? 'Supabase DB (Fallback)' : 'OpsEngine Local Store',
    };
}

/**
 * Operations: generateReport
 * Table: reports
 */
export async function generateReport(
    type: 'Sales' | 'Inventory' | 'Restock' | 'Executive' = 'Restock'
): Promise<Report> {
    const sales = await getSales();
    const lowStock = await findLowStock();

    const newReport: Report = {
        id: `rep-${Date.now().toString().slice(-4)}`,
        type,
        title: `${type} & Operations Inspection Briefing`,
        summary: `Automated scan identified ${lowStock.count} products below reorder thresholds. Today revenue: PKR ${sales.revenue.toLocaleString()} across ${sales.orders} orders.`,
        created_at: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
        metrics: [
            { label: "Low Stock SKUs", value: `${lowStock.count} items` },
            { label: "Today Revenue", value: `PKR ${sales.revenue.toLocaleString()}` },
            { label: "Action Status", value: "PO Drafted" },
        ],
    };

    if (isSupabaseConfigured && supabase) {
        await supabase.from('reports').insert({
            type: newReport.type,
            title: newReport.title,
            summary: newReport.summary,
            content: newReport.metrics,
        });
    }

    localStore.reports.unshift(newReport);
    return newReport;
}
