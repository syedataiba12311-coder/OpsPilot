/**
 * WebMCP Tool Registry Layer
 * 
 * Directly connects WebMCP tool execution handlers to the Central Operations Layer.
 */

import {
    getSales,
    getInventory,
    findLowStock,
    analyzeSales,
    getCustomers,
    generateReport,
    getReports,
    createRestockList,
    createPurchaseOrder,
    approvePurchaseOrder,
} from '@/lib/operations';

export const webMcpTools = {
    getSales: (dateStr?: string) => getSales(dateStr),
    getInventory: () => getInventory(),
    findLowStock: () => findLowStock(),
    analyzeSales: () => analyzeSales(),
    getCustomers: () => getCustomers(),
    generateReport: (type?: 'Sales' | 'Inventory' | 'Restock' | 'Executive') => generateReport(type),
    getReports: () => getReports(),
    createRestockList: () => createRestockList(),
    createPurchaseOrder: (summary: string, items: any[]) => createPurchaseOrder(summary, items),
    approvePurchaseOrder: (poId?: string) => approvePurchaseOrder(poId),
};
