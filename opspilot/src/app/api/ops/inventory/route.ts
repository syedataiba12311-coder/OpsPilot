import { NextResponse } from 'next/server';
import { getInventory } from '@/lib/operations';
import { loadStore, saveStore } from '@/lib/operations/store';
import { Product } from '@/types';

export async function GET() {
    try {
        const data = await getInventory();
        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const store = loadStore();

        if (Array.isArray(body)) {
            const formatted: Product[] = body.map((p, index) => ({
                id: p.id || `prod-${Date.now()}-${index}`,
                sku: p.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
                name: p.name || 'Unnamed Product',
                category: p.category || 'General',
                price: Number(p.price) || 0,
                stock: Number(p.stock) || 0,
                reorder_level: Number(p.reorder_level) || 5,
                supplier: p.supplier || 'Primary Vendor',
                lastUpdated: p.lastUpdated || new Date().toISOString().split('T')[0],
            }));
            store.products.push(...formatted);
            saveStore(store);
            return NextResponse.json({ success: true, count: formatted.length, data: store.products });
        }

        const newProduct: Product = {
            id: body.id || `prod-${Date.now()}`,
            sku: body.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
            name: body.name || 'New Product',
            category: body.category || 'General',
            price: Number(body.price) || 0,
            stock: Number(body.stock) || 0,
            reorder_level: Number(body.reorder_level) || 5,
            supplier: body.supplier || 'Primary Vendor',
            lastUpdated: body.lastUpdated || new Date().toISOString().split('T')[0],
        };

        store.products.push(newProduct);
        saveStore(store);
        return NextResponse.json({ success: true, data: newProduct });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
