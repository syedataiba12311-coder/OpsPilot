import { NextResponse } from 'next/server';
import { findLowStock } from '@/lib/operations';

export async function GET() {
    try {
        const data = await findLowStock();
        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
