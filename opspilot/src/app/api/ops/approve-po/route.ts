import { NextResponse } from 'next/server';
import { approvePurchaseOrder } from '@/lib/operations';

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));
        const result = await approvePurchaseOrder(body.poId);
        return NextResponse.json({ success: true, data: result });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
