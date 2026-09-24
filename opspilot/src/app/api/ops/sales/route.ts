import { NextResponse } from 'next/server';
import { getSales } from '@/lib/operations';
import { localStore, saveStore } from '@/lib/operations/store';

export async function GET() {
    try {
        const data = await getSales();
        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const amount = Number(body.amount) || 0;
        const ordersCount = Number(body.ordersCount) || 1;
        const timeLabel = body.timeLabel || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        localStore.sales.revenue += amount;
        localStore.sales.orders += ordersCount;
        localStore.sales.chart.push({
            time: timeLabel,
            sales: localStore.sales.revenue,
            orders: localStore.sales.orders,
        });

        saveStore(localStore);

        return NextResponse.json({
            success: true,
            data: {
                revenue: localStore.sales.revenue,
                orders: localStore.sales.orders,
                chart: localStore.sales.chart,
            },
        });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
