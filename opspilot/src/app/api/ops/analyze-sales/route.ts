import { NextResponse } from 'next/server';
import { analyzeSales } from '@/lib/operations';

export async function GET() {
    try {
        const data = await analyzeSales();
        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST() {
    try {
        const data = await analyzeSales();
        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
