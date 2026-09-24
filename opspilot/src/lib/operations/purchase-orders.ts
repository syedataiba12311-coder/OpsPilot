import { supabase, isSupabaseConfigured } from '../supabase';
import { PurchaseOrder, RestockItem } from '@/types';
import { MOCK_PURCHASE_ORDER } from '@/data/mockData';
import { findLowStock } from './inventory';
import { localStore } from './store';

/**
 * Operations: createRestockList
 * Table: purchase_orders
 */
export async function createRestockList(): Promise<PurchaseOrder> {
    const { lowStockItems } = await findLowStock();

    const restockItems: RestockItem[] = lowStockItems.map((prod, idx) => {
        const recommended_qty = Math.max(10, prod.reorder_level * 2 - prod.stock);
        const unit_price = Math.round(prod.price * 0.15); // wholesale estimate
        const total_cost = recommended_qty * unit_price;

        return {
            id: `rst-${idx + 1}`,
            product_id: prod.id,
            product_name: prod.name,
            current_stock: prod.stock,
            reorder_level: prod.reorder_level,
            recommended_qty,
            unit_price,
            total_cost,
        };
    });

    const totalCost = restockItems.reduce((sum, item) => sum + item.total_cost, 0);

    const po: PurchaseOrder = {
        id: `PO-${new Date().toISOString().slice(0, 10)}-${Math.floor(Math.random() * 90 + 10)}`,
        created_at: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
        status: 'PENDING_APPROVAL',
        total_cost: totalCost > 0 ? totalCost : 73200,
        supplier_summary: 'Multi-supplier grouped order (4 vendors)',
        items: restockItems.length > 0 ? restockItems : MOCK_PURCHASE_ORDER.items,
    };

    localStore.purchaseOrder = po;

    if (isSupabaseConfigured && supabase) {
        await supabase.from('purchase_orders').insert({
            po_number: po.id,
            status: po.status,
            total_cost: po.total_cost,
            supplier_summary: po.supplier_summary,
            items: po.items,
        });
    }

    return po;
}

/**
 * Operations: createPurchaseOrder
 * Table: purchase_orders
 */
export async function createPurchaseOrder(
    supplierSummary: string,
    items: RestockItem[]
): Promise<PurchaseOrder> {
    const totalCost = items.reduce((sum, item) => sum + item.total_cost, 0);

    const po: PurchaseOrder = {
        id: `PO-${new Date().toISOString().slice(0, 10)}-${Math.floor(Math.random() * 90 + 10)}`,
        created_at: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
        status: 'PENDING_APPROVAL',
        total_cost: totalCost,
        supplier_summary: supplierSummary,
        items,
    };

    localStore.purchaseOrder = po;

    if (isSupabaseConfigured && supabase) {
        await supabase.from('purchase_orders').insert({
            po_number: po.id,
            status: po.status,
            total_cost: po.total_cost,
            supplier_summary: po.supplier_summary,
            items: po.items,
        });
    }

    return po;
}

/**
 * Operations: approvePurchaseOrder
 * Table: purchase_orders
 */
export async function approvePurchaseOrder(poId?: string): Promise<{ success: boolean; po: PurchaseOrder }> {
    localStore.purchaseOrder.status = 'APPROVED';

    if (isSupabaseConfigured && supabase && poId) {
        await supabase
            .from('purchase_orders')
            .update({ status: 'APPROVED' })
            .eq('po_number', poId);
    }

    return {
        success: true,
        po: localStore.purchaseOrder,
    };
}
