import { NextResponse } from 'next/server';
import { createRestockList } from '@/lib/operations';

export async function GET() {
    try {
        const po = await createRestockList();
        return NextResponse.json({ success: true, data: po });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST() {
    try {
        const po = await createRestockList();
        return NextResponse.json({ success: true, data: po });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
