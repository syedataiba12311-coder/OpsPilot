import { supabase, isSupabaseConfigured } from '../supabase';
import { Customer } from '@/types';
import { MOCK_CUSTOMERS } from '@/data/mockData';

/**
 * Operations: getCustomers
 * Table: customers
 */
export async function getCustomers(): Promise<{ customers: Customer[]; count: number; source: string }> {
    if (isSupabaseConfigured && supabase) {
        const { data: dbCustomers, error } = await supabase
            .from('customers')
            .select('*');

        if (!error && dbCustomers && dbCustomers.length > 0) {
            const mappedCustomers: Customer[] = dbCustomers.map((c) => ({
                id: c.id,
                name: c.name,
                email: c.email,
                total_spent: Number(c.total_spent),
                orders_count: c.orders_count,
                last_order: c.last_order,
            }));

            return {
                customers: mappedCustomers,
                count: mappedCustomers.length,
                source: 'Supabase DB (customers table)',
            };
        }
    }

    return {
        customers: MOCK_CUSTOMERS,
        count: MOCK_CUSTOMERS.length,
        source: isSupabaseConfigured ? 'Supabase DB (Fallback)' : 'OpsEngine Local Store',
    };
}
