/**
 * OpsEngine Interface Layer
 * Re-exports from Central Operations Layer (@/lib/operations)
 */

import {
    getSales,
    getInventory,
    findLowStock,
    getCustomers,
    generateReport,
    getReports,
    createRestockList,
    createPurchaseOrder,
    approvePurchaseOrder,
} from './operations';

export {
    getSales,
    getInventory,
    findLowStock,
    getCustomers,
    generateReport,
    getReports,
    createRestockList,
    createPurchaseOrder,
    approvePurchaseOrder,
};

// Aliases for legacy imports
export {
    getSales as getSalesEngine,
    getInventory as getInventoryEngine,
    findLowStock as findLowStockEngine,
    getCustomers as getCustomersEngine,
    generateReport as generateReportEngine,
    getReports as getReportsEngine,
    createRestockList as createRestockListEngine,
    createPurchaseOrder as createPurchaseOrderEngine,
    approvePurchaseOrder as approvePurchaseOrderEngine,
};

export * from './operations';
