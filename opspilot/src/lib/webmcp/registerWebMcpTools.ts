/**
 * WebMCP Tool Registration Module
 * 
 * Registers the 5 core WebMCP tools on navigator.modelContext:
 *  1. get_sales
 *  2. get_inventory
 *  3. find_low_stock
 *  4. analyze_sales
 *  5. generate_report
 */

export interface WebMcpTool {
    name: string;
    description: string;
    inputSchema: Record<string, any>;
    execute: (args?: any) => Promise<any>;
}

export function registerWebMcpTools(): WebMcpTool[] {
    if (typeof window === 'undefined') return [];

    const tools: WebMcpTool[] = [
        {
            name: 'get_sales',
            description: "Get today's sales, revenue, and order information from OpsPilot engine",
            inputSchema: {
                type: 'object',
                properties: {
                    date: { type: 'string', description: 'Optional date string (YYYY-MM-DD)' }
                }
            },
            execute: async (args: { date?: string } = {}) => {
                const url = args.date ? `/api/ops/sales?date=${args.date}` : '/api/ops/sales';
                const res = await fetch(url).then((r) => r.json());
                return res.data;
            }
        },
        {
            name: 'get_inventory',
            description: "Get product catalog, stock levels, and active SKU counts",
            inputSchema: { type: 'object', properties: {} },
            execute: async () => {
                const res = await fetch('/api/ops/inventory').then((r) => r.json());
                return res.data;
            }
        },
        {
            name: 'find_low_stock',
            description: "Find products with stock levels at or below their reorder thresholds",
            inputSchema: { type: 'object', properties: {} },
            execute: async () => {
                const res = await fetch('/api/ops/low-stock').then((r) => r.json());
                return res.data;
            }
        },
        {
            name: 'analyze_sales',
            description: "Analyze today's sales trends against low-stock inventory risks",
            inputSchema: { type: 'object', properties: {} },
            execute: async () => {
                const res = await fetch('/api/ops/analyze-sales').then((r) => r.json());
                return res.data;
            }
        },
        {
            name: 'generate_report',
            description: "Generate and save an operational briefing report",
            inputSchema: {
                type: 'object',
                properties: {
                    type: { type: 'string', description: 'Report type (Sales, Inventory, Restock, Executive)' }
                }
            },
            execute: async (args: { type?: 'Sales' | 'Inventory' | 'Restock' | 'Executive' } = {}) => {
                const res = await fetch('/api/ops/reports', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type: args.type || 'Restock' })
                }).then((r) => r.json());
                return res.data;
            }
        }
    ];

    // Ensure navigator.modelContext exists
    const nav = navigator as any;
    if (!nav.modelContext) {
        nav.modelContext = {
            tools: new Map<string, WebMcpTool>(),
            registerTool(tool: WebMcpTool) {
                this.tools.set(tool.name, tool);
                console.log(`[WebMCP] Registered tool on navigator.modelContext: ${tool.name}`);
            },
            getTools() {
                return Array.from(this.tools.values());
            }
        };
    }

    // Register each tool on navigator.modelContext
    tools.forEach((tool) => {
        nav.modelContext.registerTool(tool);
    });

    // Expose for browser debugging
    (window as any).__WEBMCP_TOOLS__ = tools;
    console.log(`[WebMCP] Successfully registered ${tools.length} tools on navigator.modelContext.`);

    return tools;
}
